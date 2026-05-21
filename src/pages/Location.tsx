import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart, CartItem } from '../context/CartContext';
import { equipmentList } from '../data/equipment';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Footprints, ShieldCheck, Sparkles, Package, ClipboardList, Trash2, Calendar, ShoppingCart, ArrowRight, ShieldAlert, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export const LocationPage: React.FC = () => {
  const { isAuthenticated, user, addRentalLink, bookings } = useAuth();
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

  // Selected gear state for size/date picker modal
  const [selectedGear, setSelectedGear] = useState<any | null>(null);
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);
  
  // Picker fields
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    // default to tomorrow's date
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return tom.toISOString().split('T')[0];
  });
  const [quantity, setQuantity] = useState(1);

  // Cart overlay model
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'success'>('review');

  const getIcon = (id: string) => {
    switch (id) {
      case 'shoes':
        return Footprints;
      case 'harness':
        return ShieldCheck;
      case 'chalk_powder':
        return Sparkles;
      case 'full_kit':
        return Package;
      default:
        return ClipboardList;
    }
  };

  const getUserMembershipName = () => {
    return user?.membership || 'none';
  };

  const handleOpenPicker = (gear: any) => {
    setSelectedGear(gear);
    setSelectedSize(gear.sizes ? gear.sizes[0] : 'Taille Unique');
    setQuantity(1);
    setIsPickerModalOpen(true);
  };

  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGear) return;

    addToCart(selectedGear, selectedSize, selectedDate, quantity);
    toast.success(`Ajouté au panier : ${selectedGear.name} (${selectedSize})`);
    setIsPickerModalOpen(false);
  };

  const handleCartCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour valider l’équipement de location.');
      setIsCartModalOpen(false);
      return;
    }

    setCheckoutStep('review');
    setIsCheckoutProcessing(true);
    toast.loading('Simulation de facturation sécurisée...', { id: 'rent-pay-toast' });

    setTimeout(() => {
      setIsCheckoutProcessing(false);
      toast.dismiss('rent-pay-toast');

      // Add to user account history
      cartItems.forEach((item) => {
        addRentalLink({
          id: Math.random().toString(36).substr(2, 9),
          name: `${item.equipment.name} (${item.size})`,
          pricePerSession: item.equipment.pricePerSession,
          pricePerMonthMember: item.equipment.pricePerMonthMember,
          size: item.size,
          date: item.date
        });
      });

      setCheckoutStep('success');
      clearCart();
      toast.success('Félicitations, matériel réservé !');
    }, 2000);
  };

  // Compute calculated pricing representation for grid display
  const getGearPricingDetails = (item: any) => {
    const mem = getUserMembershipName();
    let memberLabel = `${item.pricePerMonthMember} €`;
    
    if (item.id === 'shoes') {
      memberLabel = "Gratuit (2/mois)";
    } else if (item.id === 'chalk_powder') {
      memberLabel = "Inclus d'office";
    }

    if (mem === 'communauté') {
      memberLabel = "Entièrement Gratuit";
    }

    return {
      pricePublic: `${item.pricePerSession} €`,
      priceMember: memberLabel
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. HEADER HERO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C4603E] bg-terracotta-100/50 px-3.5 py-1.5 rounded-full font-semibold">
            Boutique & Vestiaire
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-900 mt-4 animate-fade-in">
            Tout le matériel, aucun engagement.
          </h1>
          <p className="text-sm font-light text-stone-500 mt-2 max-w-xl leading-relaxed">
            Parcourez nos équipements haut de gamme choisis avec soin pour préserver vos pouces, genoux et articulations. Tarifs préférentiels pour nos membres.
          </p>
        </div>

        {/* Floating Cart Button activator */}
        <Button
          variant="terracotta"
          size="md"
          className="relative items-center hover:scale-105"
          onClick={() => setIsCartModalOpen(true)}
        >
          <ShoppingCart size={18} className="mr-2" />
          <span>Mon Panier</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-sage-900 border border-cream-100 text-cream-50 text-xs font-bold flex items-center justify-center">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Membership specific warning bar */}
      {isAuthenticated && (
        <div className="bg-sage-100/40 rounded-2xl p-4 border border-sage-300/30 mb-10 text-xs text-sage-900 flex items-center justify-between">
          <p className="font-light">
            ✓ Profil actif : <b>« {user?.name} »</b> · Formule <b>« {user?.membership} »</b>. Les réductions s’appliquent de manière 100% automatique dans le panier de location.
          </p>
          <Badge variant="sage">{user?.membership}</Badge>
        </div>
      )}

      {/* 2. EQUIPMENT LIST GRID */}
      <div id="equipment_list_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {equipmentList.map((item) => {
          const IconComponent = getIcon(item.id);
          const pricing = getGearPricingDetails(item);

          return (
            <div
              key={item.id}
              className="bg-cream-50 rounded-2xl border border-stone-200/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Visual Circle Holder */}
                <div className="h-12 w-12 rounded-xl bg-sage-500/10 text-sage-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent size={24} />
                </div>

                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-1 group-hover:text-sage-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Pricing row comparison */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-stone-200/60 mb-6 font-mono text-xs">
                  <div>
                    <span className="text-[#a19d94] text-[10px] uppercase block">Prix Séance</span>
                    <span className="text-sm font-semibold text-stone-900">{pricing.pricePublic}</span>
                  </div>
                  <div>
                    <span className="text-sage-500 text-[10px] uppercase block">Membres</span>
                    <span className="text-sm font-semibold text-sage-700 font-bold">{pricing.priceMember}</span>
                  </div>
                </div>
              </div>

              {/* Loader Picker activator link */}
              <Button
                variant="primary"
                onClick={() => handleOpenPicker(item)}
                className="w-full text-xs font-semibold py-3"
              >
                Louer pour ma prochaine séance
              </Button>
            </div>
          );
        })}
      </div>

      {/* 3. DYNAMIC ITEM PICKER MODAL */}
      <Modal
        isOpen={isPickerModalOpen}
        onClose={() => setIsPickerModalOpen(false)}
        title={selectedGear ? `Louer : ${selectedGear.name}` : ''}
      >
        {selectedGear && (
          <form onSubmit={handleAddToCartSubmit} className="space-y-6">
            
            <div className="bg-stone-100/50 rounded-2xl p-4 border border-stone-200/50 text-xs space-y-2">
              <p className="font-serif font-semibold text-[#1a3328] text-sm">{selectedGear.name}</p>
              <p className="font-light text-stone-500 leading-relaxed">{selectedGear.description}</p>
            </div>

            {/* Sizes & Dates Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Size Select dropdown */}
              {selectedGear.sizes && (
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                    Sélectionner la Taille / Format
                  </label>
                  <select
                    className="w-full px-3 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {selectedGear.sizes.map((sz: string) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date selection picker */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                  Séance prévue (Date)
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs font-mono outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-2 border-t border-dashed border-stone-200/60 font-mono text-xs">
              <span className="text-stone-400">Quantité d’exemplaires :</span>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-stone-300 flex items-center justify-center font-bold hover:bg-stone-100 active:scale-95"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="font-bold text-sm text-stone-800">{quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-stone-300 flex items-center justify-center font-bold hover:bg-stone-100 active:scale-95"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Warning if no booked classes map this date */}
            {bookings.length > 0 && !bookings.some(b => b.date === selectedDate && b.status !== 'cancelled') && (
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-150 text-[10px] text-amber-800 flex items-start space-x-1 font-mono">
                <ShieldAlert size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  Note : Vous n’avez aucun cours collectif réservé à la date du {selectedDate}. Vous passerez récupérer d’office vos clés à l’accueil pour une séance en accès libre.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-stone-200">
              <Button variant="ghost" className="flex-1" onClick={() => setIsPickerModalOpen(false)}>
                Fermer
              </Button>
              <Button type="submit" variant="terracotta" className="flex-1">
                Ajouter au panier
              </Button>
            </div>

          </form>
        )}
      </Modal>

      {/* 4. SHOPPING CART OVERLAY MODAL */}
      <Modal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        title={checkoutStep === 'success' ? "Paiement Validé !" : "Mon Panier de Location"}
      >
        <div className="space-y-6">
          
          {checkoutStep === 'review' ? (
            <>
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="text-center space-y-4 py-8">
                  <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium text-stone-900">Votre Panier est vide</h4>
                    <p className="text-xs text-stone-400 font-light max-w-xs mx-auto mt-1">
                      Explorez notre sélection d’équipements d’escalade et ajoutez ce qu’il vous manque à votre prochaine séance.
                    </p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setIsCartModalOpen(false)}>
                    Retourner à la boutique
                  </Button>
                </div>
              ) : (
                /* Cart Items List Review */
                <div className="space-y-4">
                  
                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 bg-stone-100/55 border border-stone-200/50 rounded-xl text-xs"
                      >
                        <div className="space-y-1">
                          <p className="font-serif font-semibold text-stone-900">{item.equipment.name}</p>
                          <div className="flex space-x-3 text-[10px] text-stone-400 font-mono font-light uppercase">
                            <span>Taille: {item.size}</span>
                            <span>Quantité: {item.quantity}</span>
                            <span>Date: {item.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-stone-850 font-mono">
                            {item.equipment.pricePerSession * item.quantity} €
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            aria-label="Supprimer cet article"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations breakdown block */}
                  {(() => {
                    const totalObj = getCartTotal();
                    return (
                      <div className="space-y-2 border-t border-dashed border-stone-200/70 pt-4 font-mono text-xs">
                        
                        <div className="flex justify-between text-stone-400">
                          <span>Sous-total Public :</span>
                          <span>{totalObj.originalTotal} €</span>
                        </div>

                        {totalObj.savings > 0 && (
                          <div className="flex justify-between text-sage-600 font-medium bg-sage-100/30 p-2 rounded">
                            <span>Avantage Adhérent Dévers ({getUserMembershipName()}) :</span>
                            <span>- {totalObj.savings} €</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-250 border-stone-200">
                          <span>Total Net à Régler (Simulé) :</span>
                          <span className="font-serif text-md">{totalObj.finalTotal} €</span>
                        </div>

                      </div>
                    );
                  })()}

                  {/* Payment form mock checkout info */}
                  <div className="space-y-3 pt-3">
                    <h5 className="text-[10px] font-mono tracking-wider font-bold uppercase text-stone-400">
                      Méthode de prélèvement simulé
                    </h5>
                    
                    {!isAuthenticated ? (
                      <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-800">
                        Attention : Vous n’êtes pas connecté. Pour valider et mémoriser votre matériel, veuillez d’abord vous identifier.
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-stone-100 p-3.5 rounded-xl border border-stone-200 text-xs font-mono text-stone-600">
                        <CreditCard size={14} className="text-stone-400" />
                        <span>Carte par défaut activée : <b>4532 •••• •••• 9811</b></span>
                      </div>
                    )}
                  </div>

                  {/* Final Action buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-stone-200">
                    <Button variant="ghost" className="flex-1 text-xs" onClick={() => clearCart()}>
                      Vider Panier
                    </Button>
                    <Button
                      variant="terracotta"
                      className="flex-1 text-xs"
                      disabled={!isAuthenticated || isCheckoutProcessing}
                      isLoading={isCheckoutProcessing}
                      onClick={handleCartCheckout}
                    >
                      {!isAuthenticated ? "Connexion requise" : "Payer & Valider"}
                    </Button>
                  </div>

                </div>
              )}
            </>
          ) : (
            /* Success screen state */
            <div className="text-center space-y-6 py-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck size={32} />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-xl font-semibold text-stone-900">Commande Confirmée !</h4>
                <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
                  Votre matériel a été mémorisé de façon sécurisée sous votre code d’adhérent. Présentez-vous ainsi à l’accueil de notre boutique lors de votre prochaine venue physique pour récupérer vos chaussons, baudriers et sacs.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" className="flex-grow text-xs" onClick={() => setIsCartModalOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}

        </div>
      </Modal>

    </div>
  );
};

export default LocationPage;
