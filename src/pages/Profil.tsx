import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { videos } from '../data/videos';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Calendar, CreditCard, Heart, ClipboardList, Settings, LogOut, Trash2, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { formatDateFrench } from '../utils/formatDate';
import toast from 'react-hot-toast';

export const Profil: React.FC = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    bookings,
    favorites,
    rentals,
    logout,
    cancelBooking,
    cancelRental,
    updateUserMembership
  } = useAuth();

  // Guard: if not authenticated -> redirect to login
  React.useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error('Veuillez vous connecter pour accéder à votre espace profil.');
      navigate('/connexion?returnUrl=profil');
    }
  }, [isAuthenticated, user, navigate]);

  // Tab State
  const [activeTab, setActiveTab] = useState<'bookings' | 'plan' | 'videos' | 'rentals' | 'settings'>('bookings');

  // Input states for settings simulation
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnecté de votre session.');
  };

  const handleCancelBooking = (courseId: string, title: string) => {
    cancelBooking(courseId);
    toast.success(`Réservation annulée : ${title}`);
  };

  const handleCancelRental = (rentalId: string, name: string) => {
    cancelRental(rentalId);
    toast.success(`Location retirée : ${name}`);
  };

  const handleUpgradeToCommunity = () => {
    updateUserMembership('communauté');
    toast.success('Félicitations, vous êtes monté au rang Communauté ✨ !');
  };

  // Filter actual premium video details favorited
  const favoriteVideos = videos.filter((v) => favorites.includes(v.id));

  // Avatar background coloration matching rule
  const getAvatarStyle = () => {
    switch (user.membership) {
      case 'communauté':
        return 'bg-amber-100 border-2 border-amber-400 text-amber-950 font-extrabold ring-4 ring-amber-100';
      case 'régulier':
        return 'bg-sage-100 border-2 border-sage-500 text-sage-900 font-extrabold ring-4 ring-sage-100';
      default:
        return 'bg-stone-100 border border-stone-300 text-stone-700 ring-4 ring-stone-100';
    }
  };

  const getMembershipColors = () => {
    switch (user.membership) {
      case 'communauté':
        return 'gold' as const;
      case 'régulier':
        return 'sage' as const;
      default:
        return 'stone' as const;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. DYNAMIC PROFILE HEADER */}
      <div className="bg-cream-50 border border-stone-250/50 rounded-3xl p-6 sm:p-8 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left identity holder */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4">
          <div className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl ${getAvatarStyle()}`}>
            {user.avatarInitial}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">{user.name}</h1>
              <Badge variant={getMembershipColors()}>
                {user.membership === 'none' ? 'Aucun Abonnement' : `Formule ${user.membership}`}
              </Badge>
            </div>
            
            <p className="text-xs text-stone-400 font-mono">
              Adhérent depuis le : <b>{user.joinedDate}</b> · ID : {user.id}
            </p>
          </div>
        </div>

        {/* Quick summary stats metrics */}
        <div className="grid grid-cols-3 gap-6 text-center border-t border-stone-200/40 md:border-none pt-4 md:pt-0 w-full md:w-auto font-mono text-xs">
          <div className="px-3">
            <span className="text-2xl font-serif font-bold text-sage-900 block">
              {bookings.filter(b => b.status !== 'cancelled').length}
            </span>
            <span className="text-[10px] text-stone-400 uppercase">Cours réservés</span>
          </div>
          <div className="px-3 border-x border-stone-200">
            <span className="text-2xl font-serif font-bold text-sage-900 block">{favorites.length}</span>
            <span className="text-[10px] text-stone-400 uppercase">Vidéos favs</span>
          </div>
          <div className="px-3">
            <span className="text-2xl font-serif font-semibold text-terracotta-500 block">
              {rentals.length}
            </span>
            <span className="text-[10px] text-stone-400 uppercase">Matériels loués</span>
          </div>
        </div>

      </div>

      {/* 2. TAB CONTROLS DESKTOP & MOBILE */}
      <div className="flex space-x-2 border-b border-stone-200/50 pb-px mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-terracotta-500 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <span className="flex items-center space-x-1">
            <Calendar size={13} className="mr-1.5" />
            Mes Réservations
          </span>
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'plan'
              ? 'border-terracotta-500 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <span className="flex items-center space-x-1">
            <CreditCard size={13} className="mr-1.5" />
            Mon Abonnement
          </span>
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'videos'
              ? 'border-terracotta-500 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <span className="flex items-center space-x-1">
            <Heart size={13} className="mr-1.5" />
            Ma Vidéothèque
          </span>
        </button>
        <button
          onClick={() => setActiveTab('rentals')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'rentals'
              ? 'border-terracotta-500 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <span className="flex items-center space-x-1">
            <ClipboardList size={13} className="mr-1.5" />
            Mes Locations
          </span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-terracotta-500 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          <span className="flex items-center space-x-1">
            <Settings size={13} className="mr-1.5" />
            Mon Profil
          </span>
        </button>
      </div>

      {/* 3. TABS ACTIVE CONTENT PANEL */}
      <div className="bg-cream-50 border border-stone-200/40 rounded-3xl p-6 sm:p-8 min-h-64 shadow-inner">
        
        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200/40">
              <h3 className="font-serif text-lg font-semibold text-stone-950">Mes séances de grimpe planifiées</h3>
              <span className="text-[10px] font-mono text-stone-400">Arrivez 10min avant</span>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-stone-450 text-stone-400">Vous n’avez réservé aucun cours collectif à venir.</p>
                <Link to="/cours">
                  <Button variant="outline" size="sm">Consulter l’agenda des cours</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((book) => {
                  const isCancelled = book.status === 'cancelled';
                  return (
                    <div
                      key={book.courseId}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${
                        isCancelled
                          ? 'bg-stone-100 border-stone-200 opacity-60'
                          : 'bg-cream-50 border-stone-200/40 hover:border-sage-500/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-sage-600">
                            {book.discipline}
                          </span>
                          <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${isCancelled ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            {isCancelled ? 'Annulé' : 'Confirmé ✓'}
                          </span>
                        </div>
                        <h4 className="font-serif text-md font-semibold text-stone-800">{book.courseTitle}</h4>
                        <p className="text-xs text-stone-450 text-stone-400 font-mono">
                          {formatDateFrench(book.date)} · <b className="text-[#1a3328] font-normal">{book.time}</b> · Animateur : {book.instructorName}
                        </p>
                      </div>

                      {!isCancelled && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelBooking(book.courseId, book.courseTitle)}
                        >
                          Annuler ma place
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEMBERSHIP PLAN MANAGEMENT */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <h3 className="font-sans text-sm font-bold text-stone-950 uppercase">Ma Facturation & Abonnements</h3>
              <span className="text-[10px] font-mono text-orange-600 bg-orange-100 px-2 py-0.5 rounded font-bold uppercase">Actif</span>
            </div>

            {/* Physical Club Entrance Card (QR / NFC RFID badge scanner) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-7 bg-stone-950 text-white rounded-2xl p-6 border border-stone-800 shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase bg-stone-800 text-stone-300 px-2.5 py-1 rounded">Format d’entrée actuel</span>
                  <h4 className="font-sans text-2xl font-black uppercase mt-1 text-white">murmur. {user.membership === 'none' ? '— Pass Séance' : `« ${user.membership === 'régulier' ? 'Liberté' : 'Club' } »`}</h4>
                  <p className="text-xs text-stone-400 font-normal leading-relaxed max-w-sm">
                    {user.membership === 'none'
                      ? 'Aucun abonnement actif enregistré. Vous réglez au coup par coup lors de votre passage.'
                      : 'Accès libre illimité 7j/7 à la salle de bloc, zone d’entraînement athlétique et sauna.'}
                  </p>
                </div>

                <div className="flex justify-between items-end border-t border-stone-800 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block">PROCHAIN PRÉLÈVEMENT</span>
                    <span className="text-xl font-sans font-black text-white block mt-0.5">
                      {user.membership === 'communauté' ? '690 € / an' : user.membership === 'régulier' ? '65 € / mois' : '0 €'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500">Simulation de renouvellement : 21 juin 2026</span>
                </div>
              </div>

              {/* NFC Badge container */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-bold">BADGE NUMÉRIQUE SANS CONTACT</span>
                
                {/* Simulated QR Code / Barcode representation */}
                <div className="p-3 bg-stone-100 rounded-xl inline-block border border-zinc-200">
                  <svg className="w-24 h-24 text-stone-900" viewBox="0 0 100 100" fill="currentColor">
                    {/* Abstract high-contrast qr lines */}
                    <rect x="5" y="5" width="25" height="25" rx="2" />
                    <rect x="70" y="5" width="25" height="25" rx="2" />
                    <rect x="5" y="70" width="25" height="25" rx="2" />
                    <rect x="12" y="12" width="11" height="11" fill="white" />
                    <rect x="77" y="12" width="11" height="11" fill="white" />
                    <rect x="12" y="77" width="11" height="11" fill="white" />
                    {/* random noise */}
                    <rect x="40" y="10" width="15" height="5" />
                    <rect x="45" y="20" width="10" height="15" />
                    <rect x="10" y="40" width="20" height="8" />
                    <rect x="45" y="45" width="20" height="10" />
                    <rect x="70" y="40" width="12" height="12" />
                    <rect x="75" y="60" width="15" height="25" />
                    <rect x="40" y="70" width="15" height="15" />
                  </svg>
                </div>
                
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Prêt pour le portillon d’entrée
                  </span>
                  <p className="text-[9px] text-stone-405 text-stone-500 leading-normal font-light">Approchez le QR code ou activez le NFC de votre smartphone contre l’écran murmur. pour entrer.</p>
                </div>
              </div>

            </div>

            {/* Upgrade option to premium tier if not already community */}
            {user.membership !== 'communauté' && (
              <div className="bg-neutral-50 rounded-2xl p-6 border border-zinc-200 mt-6 space-y-4 max-w-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <h5 className="font-sans text-sm font-bold text-stone-950 uppercase">MONTER VERS LE « Club murmur. » (ANNUEL)</h5>
                    <p className="text-xs text-stone-600 font-light leading-relaxed mt-1">
                      Débloquez la gratuité 100% illimitée sur toutes les locations de chaussons Scarpa d'élite, profitez d'évaluations de grimpe trimestrielles et de 2 pass invités par mois pour seulement 690€ / an.
                    </p>
                  </div>
                </div>
                <Button variant="terracotta" size="sm" onClick={handleUpgradeToCommunity} className="font-bold py-2 rounded-lg text-xs uppercase">
                  DEVENIR MEMBRE DU CLUB murmur. (ANNUEL)
                </Button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VIDEOS FAVORITES */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200/40">
              <h3 className="font-serif text-lg font-semibold text-stone-900">Ma Vidéothèque (Enregistrements sauvegardés)</h3>
              <span className="text-[10px] font-mono text-stone-400">{favoriteVideos.length} vidéos aimées</span>
            </div>

            {favoriteVideos.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-stone-400">Aucune vidéo enregistrée dans vos coups de cœur.</p>
                <Link to="/videos">
                  <Button variant="outline" size="sm">Consulter le catalogue vidéo</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteVideos.map((video) => (
                  <div
                    key={video.id}
                    className="p-4 bg-cream-50 border border-stone-200/40 rounded-2xl flex flex-col justify-between hover:shadow shadow-sm transition-all"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-sage-600 uppercase font-bold tracking-wider">{video.type}</span>
                      <h4 className="font-serif font-semibold text-stone-900 text-sm mt-1 leading-tight mb-2">{video.title}</h4>
                      <p className="text-[11px] text-stone-400 font-light line-clamp-2 leading-snug">{video.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-stone-200/60">
                      <span className="text-[10px] text-stone-450 text-stone-400 font-mono">Durée : {video.duration}</span>
                      <Link to={`/videos/${video.id}`}>
                        <Button variant="primary" size="sm" className="h-8 py-0">
                          <Play size={10} className="mr-1 fill-current" />
                          <span>Visionner</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: RENTALS HISTORY */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200/40">
              <h3 className="font-serif text-lg font-semibold text-stone-900">Matériel loué pour mes séances</h3>
              <span className="text-[10px] font-mono text-stone-400">Retrait au vestiaire physique</span>
            </div>

            {rentals.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-stone-400">Aucune réservation d’équipement active.</p>
                <Link to="/location">
                  <Button variant="outline" size="sm">Réserver du matériel d’escalade</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl border border-stone-200/50 bg-cream-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-sage-500/20 transition-all"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif text-md font-semibold text-stone-850">{r.name}</h4>
                      <p className="text-xs text-stone-450 text-stone-400 font-mono">
                        Date de mise à disposition : {r.date} · Code d’entrepôt : <b className="text-[#1a3328] font-normal font-sans">#DEV-{r.id.toUpperCase()}</b>
                      </p>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleCancelRental(r.id, r.name)}
                    >
                      <Trash2 size={13} className="mr-1.5" />
                      <span>Retirer location</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-lg">
            <h3 className="font-serif text-lg font-semibold text-stone-900 pb-2 border-b border-stone-200/40">Paramètres Profil</h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">Prénom & Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-stone-200/40 flex items-center gap-4">
                <Button
                  variant="primary"
                  onClick={() => toast.success('Profil mis à jour de manière simulée !')}
                  size="sm"
                >
                  Sauvegarder les modifications
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  size="sm"
                >
                  <LogOut size={13} className="mr-1.5" />
                  <span>Me déconnecter</span>
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default Profil;
