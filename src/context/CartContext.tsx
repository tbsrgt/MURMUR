import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Equipment } from '../types';

export interface CartItem {
  id: string; // unique cart item id (e.g. key: gearId-size-date)
  equipment: Equipment;
  size: string;
  date: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (equipment: Equipment, size: string, date: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => { originalTotal: number; finalTotal: number; savings: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, rentals } = useAuth();

  // Clean cart if user logs out or changes
  useEffect(() => {
    setCartItems([]);
  }, [user?.id]);

  const addToCart = (equipment: Equipment, size: string, date: string, quantity: number) => {
    const id = `${equipment.id}-${size}-${date}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, equipment, size, date, quantity }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Compute total taking into account user membership discount
  const getCartTotal = () => {
    let originalTotal = 0;
    let finalTotal = 0;

    const membership = user?.membership || 'none';

    // Count existing shoe rentals of this user during this session/database to implement "Inclus 2x/mois"
    const shoeRentalsCount = rentals.filter(r => r.name.toLowerCase().includes('chausson')).length;
    let freeShoesRemaining = Math.max(0, 2 - shoeRentalsCount);

    cartItems.forEach((item) => {
      const perSessionPrice = item.equipment.pricePerSession;
      originalTotal += perSessionPrice * item.quantity;

      let itemPrice = perSessionPrice;

      if (membership === 'communauté') {
        // Free for Communauté members
        itemPrice = 0;
      } else if (membership === 'régulier') {
        if (item.equipment.id === 'shoes') {
          // First 2 shoe rentals are free
          const qty = item.quantity;
          if (qty <= freeShoesRemaining) {
            itemPrice = 0;
            freeShoesRemaining -= qty;
          } else {
            // Part is free, part is regular
            const freeQty = freeShoesRemaining;
            const paidQty = qty - freeQty;
            itemPrice = (paidQty * perSessionPrice) / qty; // average price for this item
            freeShoesRemaining = 0;
          }
        } else if (item.equipment.id === 'chalk_powder') {
          // biological chalk is free for members
          itemPrice = 0;
        } else {
          // Member monthly price
          itemPrice = item.equipment.pricePerMonthMember;
        }
      }

      finalTotal += itemPrice * item.quantity;
    });

    const savings = Math.max(0, originalTotal - finalTotal);

    return {
      originalTotal,
      finalTotal,
      savings
    };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
