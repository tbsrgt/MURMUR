import React from 'react';
import { Link } from 'react-router-dom';
import { Footprints, Shield, Award, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export const GearTeaser: React.FC = () => {
  const previewItems = [
    {
      icon: Footprints,
      name: 'Chaussons de Grimpe',
      desc: 'Modèles de pointe Scarpa et La Sportiva pour adhérence maximale.',
      price: '5 €'
    },
    {
      icon: Shield,
      name: 'Magnésie Liquide',
      desc: 'Formule exclusive à forte rétention pour garder les mains sèches.',
      price: '2 €'
    },
    {
      icon: Award,
      name: 'Packs Conditionnement',
      desc: 'Élastiques de tension, anneaux en bois de cèdre et balles de massage.',
      price: '3 €'
    }
  ];

  return (
    <section className="py-20 bg-stone-100/30 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">ÉQUIPEMENT DE SPORT</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-stone-950 uppercase leading-none tracking-tight">
              NE GRIMPEZ PAS EN COMPROMIS. Louez le meilleur.
            </h2>
            <p className="text-sm font-light text-stone-600 leading-relaxed">
              Venez l’esprit léger. Nous mettons à disposition exclusive le matériel de référence mondiale à chaque séance. Nos membres disposent d’options gratuites et illimitées intégrées à leur forfait annuel.
            </p>
            <div className="pt-2">
              <Link to="/location">
                <Button variant="outline" size="md" className="font-bold border-stone-800 hover:bg-stone-900 hover:text-white rounded-xl">
                  RÉSERVER MES ÉQUIPEMENTS
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Cards Row Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {previewItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-zinc-200 p-6 text-center space-y-4 shadow-sm hover:border-stone-900 hover:shadow-lg transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mx-auto">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-stone-950 uppercase">{item.name}</h3>
                    <p className="text-[11px] text-stone-500 font-light mt-1 md:h-12 flex items-center justify-center">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-dashed border-zinc-200">
                    <span className="text-[10px] text-stone-400 block font-mono">TARIF PAR PASS</span>
                    <span className="text-xl font-sans font-black text-stone-900">{item.price}</span>
                    <span className="text-[10px] text-stone-400 font-mono"> / ssn</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GearTeaser;
