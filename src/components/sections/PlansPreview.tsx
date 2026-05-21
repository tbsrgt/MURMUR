import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { plans } from '../../data/plans';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export const PlansPreview: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-600 bg-orange-100 px-4 py-1.5 rounded-full font-bold">
            ABONNEMENTS ACCÈS LIBRE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-stone-950 uppercase mt-4 tracking-tight leading-none">
            REJOIGNEZ LE murmur. CLUB
          </h2>
          <p className="text-sm font-light text-stone-500 mt-2">
            Des formules conçues pour s’adapter à votre rythme de grimpe. Du pass à la séance pour les séances ponctuelles à l’adhésion annuelle illimitée pour les athlètes engagés.
          </p>
        </div>

        {/* 3 Grid Plans Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isRec = plan.badge === 'Recommandé';
            return (
              <div
                key={plan.id}
                className={`relative bg-neutral-50 rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'border-stone-900 ring-2 ring-stone-950/5 shadow-xl scale-[1.03] z-10'
                    : 'border-zinc-200 shadow-sm hover:border-stone-400'
                }`}
              >
                {/* Highlight Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <Badge variant={isRec ? "terracotta" : "gold"}>
                      <span className="flex items-center space-x-1 font-mono uppercase text-[9px] font-bold">
                        {isRec && <Star size={10} className="mr-1 fill-white" />}
                        {plan.badge}
                      </span>
                    </Badge>
                  </div>
                )}

                {/* Info block */}
                <div>
                  <h3 className="font-sans text-xl font-black text-stone-950 uppercase mb-2 mr-16">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-normal mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Pricing row */}
                  <div className="flex items-baseline mb-6 border-b border-zinc-200 pb-6">
                    <span className="text-4xl sm:text-5xl font-sans font-black text-stone-950">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono text-stone-500 ml-2">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Feature checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-stone-700 leading-normal">
                        <Check size={14} className="text-orange-600 flex-shrink-0 mr-2.5 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action */}
                <Link to="/abonnements" className="block w-full">
                  <Button
                    variant={isRec ? "terracotta" : "outline"}
                    className="w-full text-center py-3.5 rounded-xl uppercase tracking-wider font-bold text-xs"
                    size="md"
                  >
                    Choisir ce forfait
                  </Button>
                </Link>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlansPreview;
