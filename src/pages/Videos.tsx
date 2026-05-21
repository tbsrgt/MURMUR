import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { videos } from '../data/videos';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';
import { Lock, Heart, Play, Clock, Eye, Search, Filter, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export const Videos: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, favorites, toggleFavorite } = useAuth();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [selectedDuration, setSelectedDuration] = useState<string>('Tous');
  const [premiumOnly, setPremiumOnly] = useState(false);

  const videoTypes = ['Tous', 'Technique', 'Échauffement', 'Récupération', 'Yoga', 'Force', 'Mental'];
  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
  const durations = [
    { key: 'Tous', label: 'Toutes durées' },
    { key: 'short', label: '< 10 min' },
    { key: 'mid', label: '10 - 20 min' },
    { key: 'long', label: '20+ min' }
  ];

  // Favorite toggle callback
  const handleToggleFav = (video: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour mémoriser des favoris.');
      return;
    }

    toggleFavorite(video.id);
    const isNowFav = !favorites.includes(video.id);
    if (isNowFav) {
      toast.success(`Ajouté à vos favoris : ${video.title}`);
    } else {
      toast.success(`Retiré de vos favoris : ${video.title}`);
    }
  };

  // Convert duration like "08:45" to total minutes for filter comparison
  const getMinutesFromDurationString = (dur: string): number => {
    const parts = dur.split(':');
    if (parts.length < 2) return 0;
    return parseInt(parts[0], 10);
  };

  // Filter logic
  const filteredVideos = videos.filter((video) => {
    // 1. Text Query
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()) && !video.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // 2. Video Type
    if (selectedType !== 'Tous' && video.type !== selectedType) {
      return false;
    }
    // 3. User Level
    if (selectedLevel !== 'Tous' && video.level !== selectedLevel) {
      return false;
    }
    // 4. Premium toggle
    if (premiumOnly && !video.premium) {
      return false;
    }
    // 5. Duration ranges
    if (selectedDuration !== 'Tous') {
      const minutes = getMinutesFromDurationString(video.duration);
      if (selectedDuration === 'short' && minutes >= 10) return false;
      if (selectedDuration === 'mid' && (minutes < 10 || minutes > 20)) return false;
      if (selectedDuration === 'long' && minutes <= 20) return false;
    }

    return true;
  });

  const getGradientOfCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technique':
        return 'from-emerald-800 to-teal-950';
      case 'échauffement':
        return 'from-amber-700 to-amber-950';
      case 'récupération':
        return 'from-terracotta-700 to-stone-900';
      case 'yoga':
        return 'from-indigo-800 to-indigo-950';
      case 'force':
        return 'from-rose-800 to-stone-950';
      default:
        return 'from-sage-800 to-stone-900';
    }
  };

  const isUserPremium = user?.membership !== 'none';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. HEADER ROW */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-sage-500 bg-sage-100/50 px-3.5 py-1.5 rounded-full font-semibold">
          E-Learning & Respirations
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-900 mt-4">
          La Vidéothèque Dévers
        </h1>
        <p className="text-sm font-light text-[#524d46] mt-2 max-w-xl leading-relaxed">
          Le savoir-faire de nos instructeurs à portée de main. Visionnez nos tutoriels d’escalade de bloc, échauffements express indispensables et flows de yoga restauratifs.
        </p>
      </div>

      {/* 2. PERSISTENT SEARCH BAR */}
      <div className="relative mb-10 max-w-lg">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
        <input
          type="text"
          placeholder="Rechercher un sujet, un mouvement, un muscle (ex: dalle, étirement)..."
          className="w-full pl-11 pr-4 py-3 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none placeholder-stone-400 font-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 3. LAYOUT GRID - SIDEBAR (3 cols) + GRID (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar Filtering Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-cream-100/40 border border-cream-200/50 rounded-2xl p-5 space-y-5">
            
            <div className="flex items-center space-x-1 border-b border-stone-200/40 pb-3">
              <Filter size={14} className="text-[#C4603E]" />
              <h3 className="font-serif text-md font-semibold text-stone-900">Affiner vos résultats</h3>
            </div>

            {/* A. Category select list */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">Discipline</span>
              <div className="flex flex-col space-y-1">
                {videoTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-left text-xs px-3 py-2 rounded-xl transition-colors font-medium ${
                      selectedType === type
                        ? 'bg-sage-700 text-cream-50 font-semibold'
                        : 'text-stone-600 hover:bg-[#F5EDD8]/40 hover:text-stone-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* B. Level filter check buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">Niveau</span>
              <div className="flex flex-wrap gap-1">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                      selectedLevel === lvl
                        ? 'bg-sage-700 text-cream-50 border-transparent font-semibold'
                        : 'bg-stone-50 border-stone-250 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* C. Duration checks */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">Durée</span>
              <div className="flex flex-col space-y-1">
                {durations.map((dur) => (
                  <button
                    key={dur.key}
                    onClick={() => setSelectedDuration(dur.key)}
                    className={`text-left text-xs px-3 py-2 rounded-xl transition-colors font-medium ${
                      selectedDuration === dur.key
                        ? 'bg-sage-700 text-cream-50'
                        : 'text-stone-600 hover:bg-[#F5EDD8]/40 hover:text-stone-900'
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* D. Premium locked filter toggle */}
            <div className="pt-3 border-t border-stone-200/40">
              <label className="flex items-center space-x-2.5 text-xs text-stone-650 font-mono cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-stone-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
                  checked={premiumOnly}
                  onChange={(e) => setPremiumOnly(e.target.checked)}
                />
                <span>Membres Premium 🔒</span>
              </label>
            </div>

          </div>
        </div>

        {/* Right main video card grid list (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Rangs affichés : {filteredVideos.length} vidéos trouvées</span>
            <span>Abonnez-vous pour accéder à 100% du catalogue</span>
          </div>

          {filteredVideos.length === 0 ? (
            /* EMPTY VIDEO STATE */
            <div className="bg-cream-50 border border-stone-200/40 rounded-3xl p-12 text-center space-y-4 max-w-sm mx-auto">
              <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Info size={22} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900">Aucun enregistrement</h4>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Aucun cours e-learning ne répond précisément à vos options de filtres actuellement.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => {
                const isFav = favorites.includes(video.id);
                // Video is locked if it is premium AND user is not a premium member
                const isLocked = video.premium && !isUserPremium;

                return (
                  <div
                    key={video.id}
                    className="bg-cream-50 rounded-2xl border border-stone-200/40 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                  >
                    
                    {/* Upper Thumbnail Gradient block */}
                    <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                      
                      {/* Gradient matching category */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${getGradientOfCategory(video.type)} opacity-85 mix-blend-multiply group-hover:scale-105 transition-transform duration-500`} />
                      
                      {/* Abstract organic SVG wave decoration to look premium */}
                      <svg className="absolute inset-0 w-full h-full text-cream-50/5 opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,45 Q20,70 50,45 T100,55 L100,100 L0,100 Z" fill="currentColor" />
                      </svg>

                      {/* Header indicators top badges */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="stone">{video.level}</Badge>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center space-x-2">
                        <span className="bg-stone-900/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-cream-100 font-mono">
                          {video.duration}
                        </span>
                      </div>

                      {/* Overlays or controls based of lock state */}
                      {isLocked ? (
                        <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-10">
                          <Lock size={16} className="text-terracotta-300 mb-1 animate-pulse" />
                          <span className="text-[10px] text-cream-100 uppercase tracking-widest font-semibold block">
                            Membres uniquement
                          </span>
                          <Link
                            to="/abonnements"
                            className="text-[9px] text-[#E0917A] underline mt-1 block"
                          >
                            Souscrire pour débloquer
                          </Link>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`/videos/${video.id}`}
                            className="h-11 w-11 rounded-full bg-cream-50 text-sage-900 shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform"
                          >
                            <Play size={16} className="fill-sage-900 ml-0.5" />
                          </Link>
                        </div>
                      )}

                      {/* Love favorites heart */}
                      <button
                        onClick={(e) => handleToggleFav(video, e)}
                        className={`absolute bottom-3 right-3 p-1.5 rounded-full backdrop-blur-md ${
                          isFav
                            ? 'bg-red-50 text-red-600 shadow'
                            : 'bg-stone-900/40 text-cream-50 hover:bg-cream-50 hover:text-[#C4603E]'
                        } z-25 transition-all outline-none`}
                        aria-label="Sauvegarder en favoris"
                      >
                        <Heart size={14} className={cn(isFav && 'fill-red-600')} />
                      </button>

                    </div>

                    {/* Footer text information */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-sage-500 mb-1 block">
                          {video.type}
                        </span>
                        
                        {/* Play link if unlocked */}
                        {isLocked ? (
                          <h4 className="font-serif text-sm font-semibold text-stone-800 line-clamp-2 leading-tight">
                            {video.title}
                          </h4>
                        ) : (
                          <Link
                            to={`/videos/${video.id}`}
                            className="font-serif text-sm font-semibold text-stone-900 group-hover:text-sage-700 transition-colors line-clamp-2 leading-tight block"
                          >
                            {video.title}
                          </Link>
                        )}

                        <p className="text-[11px] text-stone-400 font-light mt-1.5 leading-snug line-clamp-2">
                          {video.description}
                        </p>
                      </div>

                      {/* Under details row metadata */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-t border-stone-200/40 pt-3 mt-4">
                        <span>Animateur : {video.instructor}</span>
                        <span className="flex items-center">
                          <Eye size={11} className="mr-0.5" />
                          {video.views} vues
                        </span>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Videos;
