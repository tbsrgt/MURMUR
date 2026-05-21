import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, Booking, Rental, MembershipType } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserMembership: (membership: MembershipType) => void;
  toggleFavorite: (videoId: string) => void;
  addBooking: (booking: Omit<Booking, 'status'>) => boolean;
  cancelBooking: (courseId: string) => void;
  addRentalLink: (rental: Rental) => void;
  cancelRental: (rentalId: string) => void;
  clearRentals: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pre-configured static accounts
const DEMO_ACCOUNTS = [
  {
    email: 'demo@murmur.fr',
    password: 'demo123',
    user: {
      id: 'usr_demo',
      name: 'Jean-Marc Dubois',
      email: 'demo@murmur.fr',
      avatarInitial: 'J',
      membership: 'régulier' as MembershipType,
      joinedDate: '2025-10-15'
    }
  },
  {
    email: 'premium@murmur.fr',
    password: 'premium123',
    user: {
      id: 'usr_premium',
      name: 'Adèle Chardin',
      email: 'premium@murmur.fr',
      avatarInitial: 'A',
      membership: 'communauté' as MembershipType,
      joinedDate: '2024-03-01'
    }
  },
  {
    email: 'free@murmur.fr',
    password: 'free123',
    user: {
      id: 'usr_free',
      name: 'Lucas Bernard',
      email: 'free@murmur.fr',
      avatarInitial: 'L',
      membership: 'none' as MembershipType,
      joinedDate: '2026-05-10'
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try retrieving state from localStorage or start fresh
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('murmur_auth_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved auth state', e);
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      favorites: ['v3', 'v5'], // pre-favorite a few of the free ones
      bookings: [],
      rentals: []
    };
  });

  useEffect(() => {
    localStorage.setItem('murmur_auth_state', JSON.stringify(authState));
  }, [authState]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated API call latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const matched = DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (matched) {
      setAuthState((prev) => ({
        ...prev,
        user: matched.user,
        isAuthenticated: true
      }));
      return true;
    }

    // Try finding custom registered user from localStorage
    const customUsersRaw = localStorage.getItem('murmur_custom_users');
    if (customUsersRaw) {
      try {
        const users = JSON.parse(customUsersRaw);
        const customMatched = users.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (customMatched) {
          setAuthState((prev) => ({
            ...prev,
            user: {
              id: customMatched.id,
              name: customMatched.name,
              email: customMatched.email,
              avatarInitial: customMatched.name.charAt(0).toUpperCase(),
              membership: customMatched.membership || 'none',
              joinedDate: customMatched.joinedDate
            },
            isAuthenticated: true
          }));
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }

    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists in demo or custom list
    const isDemo = DEMO_ACCOUNTS.some((acc) => acc.email.toLowerCase() === email.toLowerCase());
    if (isDemo) return false;

    const customUsersRaw = localStorage.getItem('murmur_custom_users') || '[]';
    let users = [];
    try {
      users = JSON.parse(customUsersRaw);
    } catch (e) {
      users = [];
    }

    if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUserObj = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      membership: 'none' as MembershipType,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUserObj);
    localStorage.setItem('murmur_custom_users', JSON.stringify(users));

    // Automatically log in
    setAuthState((prev) => ({
      ...prev,
      user: {
        id: newUserObj.id,
        name: newUserObj.name,
        email: newUserObj.email,
        avatarInitial: newUserObj.name.charAt(0).toUpperCase(),
        membership: newUserObj.membership,
        joinedDate: newUserObj.joinedDate
      },
      isAuthenticated: true
    }));

    return true;
  };

  const logout = () => {
    setAuthState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false
    }));
  };

  const updateUserMembership = (membership: MembershipType) => {
    if (!authState.user) return;
    setAuthState((prev) => {
      const updatedUser = prev.user ? { ...prev.user, membership } : null;
      return {
        ...prev,
        user: updatedUser
      };
    });

    // Also update custom users list if registered
    const customUsersRaw = localStorage.getItem('murmur_custom_users');
    if (customUsersRaw && authState.user) {
      try {
        const users = JSON.parse(customUsersRaw);
        const index = users.findIndex((u: any) => u.id === authState.user!.id);
        if (index !== -1) {
          users[index].membership = membership;
          localStorage.setItem('murmur_custom_users', JSON.stringify(users));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleFavorite = (videoId: string) => {
    setAuthState((prev) => {
      const isFav = prev.favorites.includes(videoId);
      const newFavs = isFav
        ? prev.favorites.filter((id) => id !== videoId)
        : [...prev.favorites, videoId];
      return {
        ...prev,
        favorites: newFavs
      };
    });
  };

  const addBooking = (bookingData: Omit<Booking, 'status'>): boolean => {
    if (!authState.user) return false;

    // Avoid double booking
    const alreadyBooked = authState.bookings.some(
      (b) => b.courseId === bookingData.courseId && b.status !== 'cancelled'
    );
    if (alreadyBooked) return false;

    const newBooking: Booking = {
      ...bookingData,
      status: 'confirmed'
    };

    setAuthState((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings]
    }));

    return true;
  };

  const cancelBooking = (courseId: string) => {
    setAuthState((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) =>
        b.courseId === courseId ? { ...b, status: 'cancelled' as const } : b
      )
    }));
  };

  const addRentalLink = (rental: Rental) => {
    setAuthState((prev) => ({
      ...prev,
      rentals: [rental, ...prev.rentals]
    }));
  };

  const cancelRental = (rentalId: string) => {
    setAuthState((prev) => ({
      ...prev,
      rentals: prev.rentals.filter((r) => r.id !== rentalId)
    }));
  };

  const clearRentals = () => {
    setAuthState((prev) => ({
      ...prev,
      rentals: []
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUserMembership,
        toggleFavorite,
        addBooking,
        cancelBooking,
        addRentalLink,
        cancelRental,
        clearRentals
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
