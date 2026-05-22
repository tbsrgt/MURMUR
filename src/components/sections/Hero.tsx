import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Star, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import gymHeroImage from '../../assets/images/murmur_gym_hero_1779357276135.png';

export const Hero: React.FC = () => {
  // Simulating active climbers count
  const [activeGrimpeurs, setActiveGrimpeurs] = useState(38);
  const [occupancyPct, setOccupancyPct] = useState(34);

  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation
      setActiveGrimpeurs(prev => {
        const diff = Math.random() > 0.5 ? 1 : -1;
        const next = Math.max(25, Math.min(65, prev + diff));
        setOccupancyPct(Math.round((next / 120) * 100));
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] pt-12 pb-20 lg:py-24 border-b border-zinc-200">
      
      {/* Background Subtle Tech-Grid for that industrial physical room feeling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column: Strong Minimalist Impact */}
          <div className="col-span-1 lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-stone-900 text-white px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>murmur. paris 11</span>
              <span className="text-zinc-500">|</span>
              <span className="text-orange-400 font-semibold">{activeGrimpeurs} grimpeurs actuellement</span>
            </div>

            {/* Title Statement */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-stone-950 uppercase leading-[0.9] select-none">
                L’ESCALADE <br />
                DE BLOC <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-950 via-stone-850 to-orange-600">
                  RE-PENSÉE.
                </span>
              </h1>
              <p className="text-stone-600 text-base sm:text-lg font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Un club d’escalade de bloc haut de gamme axé sur l’intensité du geste, l’entraînement ciblé, le matériel d’élite (La Sportiva, Scarpa) et la récupération physique par le sauna.
              </p>
            </div>

            {/* Quick Feature Pillars to trigger the physical gym presence */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2 text-left">
              <div className="flex items-start space-x-2.5">
                <div className="p-1 rounded bg-stone-100 text-stone-900 mt-0.5">
                  <Zap size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase">1100 m² de structures</h4>
                  <p className="text-[10px] text-stone-500 leading-normal font-light">Dalles suspendues, dévers massifs et toits.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2.5">
                <div className="p-1 rounded bg-stone-100 text-stone-900 mt-0.5">
                  <Activity size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase">120 Blocs Neufs / Semaine</h4>
                  <p className="text-[10px] text-stone-500 leading-normal font-light">Reset permanent par des ouvreurs nationaux.</p>
                </div>
              </div>
            </div>

            {/* Two Action-oriented CTAs to target subscriptions and bookings */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/essai"
                className="w-full sm:w-auto text-center px-8 py-4 bg-terracotta-500 hover:bg-terracotta-700 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 transform hover:scale-[1.03] flex items-center justify-center space-x-2 shadow-lg shadow-terracotta-500/15"
              >
                <span>SÉANCE D’ESSAI OFFERTE</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/abonnements"
                className="w-full sm:w-auto text-center px-8 py-4 bg-stone-900 hover:bg-black text-white rounded-xl font-bold text-xs tracking-wider uppercase border border-stone-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:scale-[1.01]"
              >
                <span>TARIFS & ABONNEMENTS</span>
              </Link>
            </div>

            {/* Subtle disclaimer */}
            <p className="text-[10px] font-mono text-stone-400 text-center lg:text-left">
              * Entrée sans rendez-vous autorisée · Location de chaussons techniques sur place.
            </p>

          </div>

          {/* Right Visual Column: The Architectural Image & Live Occupancy Bento Card */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-md bg-white p-3 rounded-3xl border border-zinc-200 shadow-xl overflow-hidden group">
              
              {/* Image Frame */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-stone-100">
                <img
                  src={gymHeroImage}
                  alt="murmur. Bouldering Club Paris Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Physical Tag elements overlay */}
                <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-sm text-white text-[9px] font-mono uppercase px-2.5 py-1 rounded-md tracking-wider border border-stone-800">
                  SECTEUR DÉVERS & CLIMBING LAB
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-stone-900 text-[10px] px-3 py-1.5 rounded-lg border border-zinc-200 flex items-center space-x-1.5 font-bold shadow-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>OUVERT 07:00 - 23:00</span>
                </div>
              </div>

              {/* Physical Occupancy Bento Bar below picture */}
              <div className="mt-4 p-4 bg-stone-50 border border-zinc-200/50 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-tight">Affluence de la salle</span>
                  <span className="text-xs font-mono text-stone-600">{occupancyPct}% (Capacité : 120 max)</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-terracotta-500 rounded-full transition-all duration-1000"
                    style={{ width: `${occupancyPct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                  <span>Fluide</span>
                  <span className="font-bold text-orange-600">Heure idéale pour grimper</span>
                  <span>Saturé</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
