import React from 'react';
import { ShieldCheck, Target, Coffee, Check } from 'lucide-react';

export const Philosophie: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header decoration */}
        <div className="flex justify-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-900 bg-stone-100 px-4 py-1.5 rounded-full font-bold">
            NOTRE CONCEPTION DE L'ESCALADE
          </span>
        </div>

        {/* Dynamic Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Majestic Bold Quote */}
          <div className="lg:col-span-6 relative space-y-6">
            
            {/* Background design accents */}
            <div className="absolute -top-10 -left-10 w-44 h-44 text-stone-100 pointer-events-none -z-10 font-bold text-9xl font-sans tracking-tighter select-none opacity-20">
              MUR
            </div>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-stone-950 uppercase leading-none relative z-10 select-none tracking-tight">
              « CHEZ MURMUR., LA GRIMPE EST BRUTE, LE GESTE EST PUR ET LA COMMUNAUTÉ EST SOUDÉE. »
            </p>

            <div className="flex items-center space-x-3 mt-4">
              <span className="h-0.5 w-10 bg-orange-600" />
              <span className="text-[10px] font-mono uppercase text-stone-500 tracking-wider">
                L’équipe de création, murmur. paris 11
              </span>
            </div>

          </div>

          {/* Right Column: Mission narrative paragraphs & small icons row */}
          <div className="lg:col-span-6 space-y-6 text-stone-700 font-light text-sm leading-relaxed">
            
            <p>
              Dans un tissu urbain de plus en plus virtuel, nous avons imaginé une salle d’escalade physique d’une sincérité totale. Chez murmur., pas de miroirs flatteurs, pas d'écrans distrayants. L'espace tire sa force de ses murs de béton brut, de structures monolithiques s’élevant à 4,5 mètres et d'une magnésie fine flottant dans une atmosphère épurée.
            </p>

            <p>
              Que vous veniez tenter de flasher votre premier bloc de niveau rouge (6b-6c), peaufiner vos suspensions sur notre <b>Pan Güllich à lattes multiples</b>, ou décoder un passage d’équilibre complexe avec d’autres grimpeurs, vous êtes au centre de l'effort. Ici, nous valorisons la technique fine plutôt que la force pure.
            </p>

            {/* Micro value cards row */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="p-4 bg-stone-50 border border-zinc-200 rounded-xl flex flex-col items-center">
                <Target className="text-stone-950 mb-2" size={18} />
                <span className="font-bold text-xs text-stone-950 uppercase">Ouvrage Élite</span>
                <span className="text-[9px] text-stone-500 mt-1">Cotations ultra-précises</span>
              </div>
              <div className="p-4 bg-stone-50 border border-zinc-200 rounded-xl flex flex-col items-center">
                <ShieldCheck className="text-stone-950 mb-2" size={18} />
                <span className="font-bold text-xs text-stone-950 uppercase">Équipé Scarpa</span>
                <span className="text-[9px] text-stone-500 mt-1">Chaussons d'élite en rent</span>
              </div>
              <div className="p-4 bg-stone-50 border border-zinc-200 rounded-xl flex flex-col items-center">
                <Coffee className="text-stone-950 mb-2" size={18} />
                <span className="font-bold text-xs text-stone-950 uppercase">Barista & Craft</span>
                <span className="text-[9px] text-stone-500 mt-1">Espresso & IPA locales</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Philosophie;
