import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Lock, Eye, Clock, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export const VideosTeaser: React.FC = () => {
  const teaserVideos = [
    {
      id: 'v1',
      title: 'Maîtriser les mouvements dynamiques en devers',
      instructor: 'Marc T.',
      duration: '08:45',
      views: 2450,
      premium: false,
      level: 'Débutant',
      gradient: 'from-stone-900 to-amber-950'
    },
    {
      id: 'v8',
      title: 'Enchaîner son premier bloc rouge (6b+) : Analyse complète',
      instructor: 'Marc T.',
      duration: '18:50',
      views: 1840,
      premium: true,
      level: 'Intermédiaire',
      gradient: 'from-stone-900 to-stone-950'
    },
    {
      id: 'v9',
      title: 'Routine d’échauffement articulaire grimpeur pro',
      instructor: 'Sophie B.',
      duration: '11:25',
      views: 1105,
      premium: true,
      level: 'Tous niveaux',
      gradient: 'from-orange-950 to-stone-900'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 block mb-2 font-bold">DIGITAL LAB</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-stone-950 uppercase leading-none tracking-tight">
              VIDÉOTHÈQUE murmur. : Apprenez partout
            </h2>
            <p className="text-sm font-light text-stone-600 mt-2 max-w-xl">
              Prolongez l’entraînement technique hors de la salle avec nos modules vidéo haute définition : biomecanique de grimpe, échauffement, et gainage spécifique.
            </p>
          </div>
          <Link to="/videos">
            <Button variant="outline" size="sm" className="group rounded-xl border-stone-800 font-bold">
              <span>ACCÉDER AUX VIDÉOS</span>
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* 3 Columns Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teaserVideos.map((video) => (
            <div
              key={video.id}
              className="bg-[#FAFAFA] rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:border-stone-900 transition-all flex flex-col justify-between group"
            >
              
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                
                {/* Visual Placeholder: CSS Abstract Aesthetic Gradient with Play Button */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${video.gradient} opacity-85 mix-blend-multiply transition-transform duration-500 group-hover:scale-105`} />
                
                {/* SVG Abstract Climbing-like Wave inside the video background */}
                <svg className="absolute inset-0 w-full h-full text-white/5 opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,70 50,55 T100,60 L100,100 L0,100 Z" fill="currentColor" />
                </svg>

                {/* Video Info Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className="bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wide text-white">
                    {video.level}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-zinc-100 font-mono">
                    {video.duration}
                  </span>
                </div>

                {/* Dark Lock Overlay for premium videos */}
                {video.premium ? (
                  <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-10 transition-opacity">
                    <div className="h-10 w-10 rounded-full bg-stone-800 border border-zinc-800 flex items-center justify-center mb-2">
                      <Lock size={16} className="text-orange-500" />
                    </div>
                    <span className="text-xs uppercase font-bold text-white tracking-wider">
                      Membres murmur.
                    </span>
                    <Link
                      to="/abonnements"
                      className="text-[10px] text-orange-400 hover:text-orange-300 underline mt-1.5 font-mono"
                    >
                      Déverrouiller avec un abonnement
                    </Link>
                  </div>
                ) : (
                  /* Standard Play Button Overlay */
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Link
                      to={`/videos/${video.id}`}
                      className="h-12 w-12 rounded-xl bg-white hover:bg-zinc-100 text-stone-900 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all border border-zinc-300"
                      aria-label="Regarder la vidéo"
                    >
                      <Play size={18} className="fill-stone-900 ml-0.5 text-stone-900" />
                    </Link>
                  </div>
                )}

              </div>

              {/* Title information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-sm font-bold text-stone-950 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug uppercase">
                    {video.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-normal mt-1.5">
                    Par {video.instructor} · Coach National murmur.
                  </p>
                </div>

                {/* Under row details */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-200 text-[10px] font-mono text-stone-400">
                  <span className="flex items-center">
                    <Eye size={11} className="mr-1" />
                    {video.views} visionnages
                  </span>
                  <span className="uppercase text-orange-600 font-semibold">
                    {video.premium ? 'Abonnés' : 'Accès Libre'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideosTeaser;
