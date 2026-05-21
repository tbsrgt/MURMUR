import React from 'react';
import { testimonials } from '../../data/testimonials';
import Badge from '../ui/Badge';

export const TestimonialsGrid: React.FC = () => {
  return (
    <section className="py-20 bg-stone-100/30 border-b border-stone-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-sage-500 font-semibold">Témoignages authentiques</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 mt-2">
            La voix de notre communauté
          </h2>
          <p className="text-xs font-light text-stone-400 mt-1">
            Découvrez comment nos membres adaptent le concept Dévers à leur quotidien parisien.
          </p>
        </div>

        {/* Staggered grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {testimonials.map((test, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={test.id}
                className={`bg-cream-50 rounded-2xl border border-stone-200/40 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow ${
                  isEven ? 'lg:translate-y-3' : 'lg:-translate-y-3'
                }`}
              >
                {/* Quote Quote Marks decoration */}
                <span className="text-5xl font-serif text-terracotta-300 font-bold block h-4 select-none opacity-50">
                  «
                </span>

                <p className="text-xs text-stone-600 leading-relaxed font-light italic">
                  {test.text}
                </p>

                {/* Writer Identity Row */}
                <div className="flex items-center space-x-3 pt-3 border-t border-dashed border-stone-200/50">
                  <div className="h-9 w-9 rounded-full bg-sage-500 text-cream-50 flex items-center justify-center font-bold text-sm">
                    {test.avatarLetter}
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-semibold text-stone-900 leading-none">
                      {test.name}
                    </h4>
                    <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wide text-sage-700/80 font-mono">
                      {test.membership}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsGrid;
