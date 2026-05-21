import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/cours', label: 'Cours' },
    { path: '/abonnements', label: 'Abonnements' },
    { path: '/location', label: 'Location' },
    { path: '/videos', label: 'Vidéothèque' }
  ];

  // Helper to color user avatar according to membership rank
  const getAvatarBg = (tier: string) => {
    switch (tier) {
      case 'communauté':
        return 'bg-amber-100 border border-amber-300 ring-2 ring-amber-400 text-amber-950 font-bold';
      case 'régulier':
        return 'bg-sage-100 border border-sage-500 ring-2 ring-sage-500 text-sage-900 font-bold';
      default:
        return 'bg-stone-100 border border-stone-300 ring-1 ring-stone-300 text-stone-700';
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2.5 group">
              {/* Dynamic Logo Symbol: Industrial Bouldering Symbol (M) */}
              <div className="h-10 w-10 rounded-xl bg-stone-900 flex items-center justify-center text-white font-mono font-black text-xl tracking-tighter group-hover:bg-terracotta-500 transition-colors">
                M
              </div>
              <span className="font-serif text-2xl font-extrabold tracking-tighter text-stone-950 uppercase group-hover:text-stone-700 transition-colors">
                murmur<span className="text-terracotta-500">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors tracking-wide",
                    isActive ? "text-sage-900" : "text-stone-500 hover:text-stone-900"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-terracotta-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Context */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Rent Cart */}
            <Link
              to="/location"
              className="relative p-2.5 text-stone-600 hover:text-sage-700 bg-stone-100/50 hover:bg-stone-100 rounded-full transition-all"
              aria-label="Voir le panier de location"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-terracotta-500 text-cream-50 text-[10px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-sm", getAvatarBg(user.membership))}>
                    {user.avatarInitial}
                  </div>
                  <span className="text-sm font-medium text-stone-800 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={cn("text-stone-500 transition-transform", isDropdownOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-cream-50 border border-stone-200 shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-200/40">
                      <p className="text-xs text-stone-400">Connecté en tant que</p>
                      <p className="text-sm font-semibold text-stone-800 truncate">{user.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase font-bold text-sage-900 bg-sage-100 rounded-full">
                        Formule : {user.membership === 'none' ? 'Aucune' : user.membership}
                      </span>
                    </div>
                    <Link
                      to="/profil"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>Espace Membre</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-stone-200/40 mt-1"
                    >
                      <LogOut size={16} />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/connexion"
                  className="text-stone-600 hover:text-stone-900 text-sm font-medium px-4 py-2 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/essai"
                  className="bg-terracotta-500 hover:bg-terracotta-700 text-cream-50 text-xs uppercase tracking-wider font-semibold py-2.5 px-5 rounded-full shadow-sm shadow-terracotta-500/10 transition-all hover:scale-105"
                >
                  Essai Gratuit
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Mobile Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/location"
              className="relative p-2 text-stone-600 bg-stone-100/50 rounded-full"
            >
              <ShoppingBag size={18} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-terracotta-500 text-cream-50 text-[9px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Ouvrir le menu de navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-cream-50/95 backdrop-blur-lg flex flex-col p-6 space-y-6 md:hidden transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xl font-serif font-medium py-2.5 border-b border-stone-200/30",
                    isActive ? "text-sage-900 font-semibold" : "text-stone-500"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-col space-y-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-3 pb-2">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-md", getAvatarBg(user.membership))}>
                    {user.avatarInitial}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-stone-900">{user.name}</p>
                    <p className="text-xs text-stone-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profil"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-3 px-4 bg-stone-100 rounded-xl text-stone-700"
                >
                  <User size={18} />
                  <span>Mon Espace Membre</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 py-3 px-4 bg-red-50 text-red-700 rounded-xl"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-stone-100 text-stone-800 font-semibold text-sm"
                >
                  Se connecter
                </Link>
                <Link
                  to="/essai"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-terracotta-500 text-cream-50 font-semibold tracking-wider uppercase text-sm shadow-md"
                >
                  Essai Gratuit
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
