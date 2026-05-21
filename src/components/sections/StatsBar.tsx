import React, { useState, useEffect } from 'react';

export const StatsBar: React.FC = () => {
  const [bouldersCount, setBouldersCount] = useState(130);

  useEffect(() => {
    // Soft increment loading animation
    const timer = setTimeout(() => {
      setBouldersCount(150);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '1100m²', label: 'Espace Escalade & Training' },
    { value: `${bouldersCount}+`, label: 'Voies Renouvelées par semaine' },
    { value: '7j/7', label: 'Accès 07h00 - 23h00' },
    { value: 'KILTER', label: 'Board 45° LED Connectée' }
  ];

  return (
    <section className="bg-stone-900 text-white py-8 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="space-y-1 group border-r border-stone-800 last:border-none p-2 transform transition-transform md:hover:scale-[1.02]"
            >
              <div className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-orange-500 uppercase tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
