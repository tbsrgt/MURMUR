import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { videos } from '../data/videos';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Play, Pause, ChevronLeft, Volume2, VolumeX, RefreshCw, Lock, Radio, Tv, Star, StarOff, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user, favorites, toggleFavorite } = useAuth();

  // Find current active video
  const activeVideo = videos.find((v) => v.id === id);

  // States for player simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isMuted, setIsMuted] = useState(false);
  const [playbackTime, setPlaybackTime] = useState('00:00');

  // Ref or timers
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto clean timer
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sync controls timer with play/pause state
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return prev + 1; // increases progress
        });
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // Translate progress % into duration timestamp equivalent
  useEffect(() => {
    if (!activeVideo) return;
    const durParts = activeVideo.duration.split(':');
    const totalSecs = parseInt(durParts[0], 10) * 60 + parseInt(durParts[1], 10);
    const activeSecs = Math.round((progress / 100) * totalSecs);

    const min = Math.floor(activeSecs / 60);
    const sec = activeSecs % 60;
    const padMin = String(min).padStart(2, '0');
    const padSec = String(sec).padStart(2, '0');

    setPlaybackTime(`${padMin}:${padSec}`);
  }, [progress, activeVideo]);

  if (!activeVideo) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-stone-600">
        <p className="font-serif text-xl font-medium">Vidéo introuvable</p>
        <Link to="/videos" className="text-sage-700 underline text-xs mt-2 block">
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  // Determine gate lock parameters
  const isPremiumVideo = activeVideo.premium;
  const isUserPremium = user && user.membership !== 'none';
  const isLocked = isPremiumVideo && !isUserPremium;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value, 10));
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const isFav = favorites.includes(activeVideo.id);

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous authentifier.');
      return;
    }
    toggleFavorite(activeVideo.id);
    toast.success(isFav ? 'Retiré de vos favoris' : 'Enregistré dans vos favoris !');
  };

  // Filter 4 related videos from same category or levels
  const relatedVideos_ = videos
    .filter((v) => v.id !== activeVideo.id && (v.type === activeVideo.type || v.level === activeVideo.level))
    .slice(0, 4);

  const relatedVideos = relatedVideos_.length > 0 ? relatedVideos_ : videos.filter(v => v.id !== activeVideo.id).slice(0, 4);

  const getGradientOfCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technique':
        return 'from-emerald-800 to-teal-950';
      case 'échauffement':
        return 'from-amber-700 to-amber-950';
      case 'récupération':
        return 'from-terracotta-700 to-stone-900';
      case 'yoga':
        return 'from-[#4F46E5] to-indigo-950';
      case 'force':
        return 'from-rose-800 to-stone-950';
      default:
        return 'from-sage-800 to-stone-900';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. BACK NAVIGATION */}
      <Link
        to="/videos"
        className="inline-flex items-center space-x-1.5 text-xs text-stone-500 hover:text-stone-950 transition-colors uppercase font-mono tracking-wider mb-6"
      >
        <ChevronLeft size={14} />
        <span>Retourner à la vidéothèque</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main core media suite (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Aspect-ratio 16:9 Player container */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-stone-950 border border-stone-200/50 shadow-lg flex flex-col justify-between">
            
            {isLocked ? (
              /* PREMIUM WALL GATE OVERLAY */
              <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-cream-50 z-20 space-y-6">
                
                <div className="space-y-2 max-w-sm">
                  <div className="h-10 w-10 rounded-full bg-terracotta-500/20 border border-terracotta-500/40 text-terracotta-300 flex items-center justify-center mx-auto mb-2">
                    <Lock size={18} className="animate-pulse" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">
                    Contenu réservé aux membres Dévers
                  </h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Ce cours e-learning requiert l’adhésion Régulier ou Communauté. Rejoignez notre communauté de grimpeurs pour débloquer l’ensemble du catalogue.
                  </p>
                </div>

                {/* mini layout comparator */}
                <div className="bg-[#1A3328]/40 border border-sage-800/60 p-4 rounded-2xl grid grid-cols-2 gap-4 max-w-md w-full text-left text-[11px] leading-relaxed font-mono">
                  <div>
                    <h4 className="font-semibold text-cream-105 text-[#8FB88A]">Régulier — 59€/m</h4>
                    <p className="font-light text-stone-400">Illimité salle + 4 cours collectifs physiques + 100% Vidéothèque</p>
                  </div>
                  <div className="border-l border-sage-800/40 pl-4">
                    <h4 className="font-semibold text-[#E0917A]">Communauté — 499€/a</h4>
                    <p className="font-light text-stone-400">Illimité salle + cours collectifs illimités + matériel gratuit + événements</p>
                  </div>
                </div>

                <div className="flex space-x-3 w-full max-w-sm">
                  <Link to="/abonnements" className="flex-1">
                    <Button variant="terracotta" size="sm" className="w-full">
                      Prendre un abonnement
                    </Button>
                  </Link>
                  <Link to="/connexion?returnUrl=videos" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-cream-50 hover:text-stone-950 border-stone-105">
                      Connexion
                    </Button>
                  </Link>
                </div>

              </div>
            ) : (
              /* ACTIVE STREAM SIMULATOR */
              <>
                {/* Visual Video Background Canvas */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${getGradientOfCategory(activeVideo.type)} opacity-90`} />
                
                {/* Visual Sine Wave pattern simulated live video */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                  <svg className="w-72 h-72 animate-spin text-cream-50" style={{ animationDuration: '40s' }} viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50,15 C20,15 15,20 15,50 C15,80 20,85 50,85 C80,85 85,80 85,50 C85,20 80,15 50,15 Z M50,22 C67,34 68,55 68,68 C68,72 65,75 50,75 C35,75 32,72 32,68 C32,55 33,34 50,22 Z" />
                  </svg>
                </div>

                {isMuted && (
                  <div className="absolute top-4 right-4 bg-stone-900/60 p-2 rounded-full text-cream-50 z-10 text-[10px] uppercase font-mono tracking-wider flex items-center space-x-1">
                    <VolumeX size={10} />
                    <span>Muet</span>
                  </div>
                )}

                {isPlaying && (
                  <div className="absolute top-4 left-4 bg-emerald-950/50 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center space-x-1.5 z-10 animate-pulse">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Lecture en cours</span>
                  </div>
                )}

                {/* Simulated center big Play button */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={handlePlayPause}
                      className="h-16 w-16 rounded-full bg-cream-50/95 hover:bg-cream-50 text-sage-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                    >
                      <Play size={24} className="fill-sage-900 ml-1" />
                    </button>
                  </div>
                )}

                {/* BOTTOM JS CONTROLS CONSOLE */}
                <div className="mt-auto bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-5 space-y-3 z-10 select-none">
                  
                  {/* Timeline progress line */}
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono text-stone-400">{playbackTime}</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      className="flex-grow accent-terracotta-500 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer"
                      value={progress}
                      onChange={handleSeek}
                    />
                    <span className="text-[10px] font-mono text-stone-400">{activeVideo.duration}</span>
                  </div>

                  {/* Operational controls buttons */}
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="text-cream-50 hover:text-terracotta-300 transition-colors"
                        aria-label={isPlaying ? "Suspendre" : "Lancer"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>

                      <button
                        onClick={handleReset}
                        className="text-stone-400 hover:text-cream-50 transition-colors"
                        aria-label="Recommencer"
                      >
                        <RefreshCw size={14} />
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-cream-50 hover:text-terracotta-300 transition-colors"
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] font-mono text-stone-400">
                      <span className="flex items-center">
                        <Radio size={12} className="mr-1 text-sage-400" />
                        HD 1080p
                      </span>
                      <span className="flex items-center">
                        <Tv size={12} className="mr-1" />
                        Autoplay
                      </span>
                    </div>

                  </div>

                </div>
              </>
            )}

          </div>

          {/* 3. DETAILS BELOW PLAYER */}
          <div className="space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant={activeVideo.premium ? "terracotta" : "sage"}>
                    {activeVideo.premium ? "Membres Premium 🔒" : "Accès Libre"}
                  </Badge>
                  <Badge variant="stone">{activeVideo.type}</Badge>
                </div>
                
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
                  {activeVideo.title}
                </h1>
              </div>

              {/* Heart Fav Button */}
              <button
                onClick={handleFavorite}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                  isFav
                    ? 'border-red-200 bg-red-50 text-red-700 shadow-sm'
                    : 'border-stone-300 hover:bg-stone-100 text-stone-600'
                }`}
              >
                {isFav ? <Star className="fill-red-600 text-red-600" size={13} /> : <StarOff size={13} />}
                <span>{isFav ? 'Sauvegardé ✓' : 'Favori'}</span>
              </button>
            </div>

            <p className="text-xs text-stone-600 font-light leading-relaxed">
              {activeVideo.description}
            </p>

            {/* Instructor Profile Card below */}
            <div className="p-4 bg-cream-100/40 border border-cream-200/50 rounded-2xl flex items-center space-x-3 max-w-md">
              <div className="h-10 w-10 rounded-full bg-sage-500 text-cream-50 font-bold text-sm flex items-center justify-center">
                {activeVideo.instructor.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-serif font-semibold text-stone-900">{activeVideo.instructor}</p>
                <p className="text-stone-400 font-mono text-[10px]">COACH DÉVERS · ENSEIGNANT AGGRÉÉ</p>
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Related Videos (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-cream-100/30 border border-stone-200/40 rounded-3xl p-5 space-y-4">
            
            <h3 className="font-serif text-md font-semibold text-stone-900 pb-2 border-b border-stone-200/50">
              Vidéos associées
            </h3>

            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <Link
                  key={video.id}
                  to={`/videos/${video.id}`}
                  className="flex items-center space-x-3 group block transition-all hover:translate-x-0.5"
                  onClick={handleReset} // reset seeker
                >
                  {/* Small Aspect Video thumbnail */}
                  <div className="relative h-14 w-24 rounded-lg overflow-hidden bg-stone-950 flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${getGradientOfCategory(video.type)} opacity-85 group-hover:scale-105 transition-transform`} />
                    <div className="absolute inset-0 flex items-center justify-center text-cream-50/70">
                      <Play size={10} className="fill-current" />
                    </div>
                  </div>

                  <div className="text-xs space-y-0.5 min-w-0">
                    <h4 className="font-serif font-semibold text-stone-900 group-hover:text-sage-700 transition-colors line-clamp-2 leading-tight">
                      {video.title}
                    </h4>
                    <p className="text-[10px] text-stone-400 font-mono">
                      {video.duration} · Par {video.instructor}
                    </p>
                  </div>

                </Link>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default VideoPlayer;
