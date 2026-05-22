import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate brief API call latency
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      toast.success('Bienvenue dans la communauté Dévers !');
    }, 1200);
  };

  return (
    <section className="py-20 bg-sage-100/40 relative overflow-hidden border-b border-stone-200/20">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-sage-900 uppercase font-semibold bg-cream-100/80 px-4 py-1.5 rounded-full">
            Correspondance intimiste
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-medium">
            Rejoins la communauté Dévers
          </h2>
          <p className="text-sm font-light text-stone-600 max-w-xl mx-auto leading-relaxed">
            Laissez battre le pouls de la salle chez vous. Recevez tous les quinze jours nos écrits calmes sur l’art du placement, nos recettes de lattes botaniques et nos billets d’inspiration.
          </p>
        </div>

        {isSubscribed ? (
          <div className="max-w-md mx-auto p-6 bg-cream-50/70 border border-sage-300/30 rounded-3xl flex flex-col items-center space-y-3">
            <CheckCircle2 size={36} className="text-sage-700 animate-bounce" />
            <h4 className="font-serif text-lg font-medium text-stone-900">Merci de votre confiance</h4>
            <p className="text-xs text-stone-500 font-light">
              Votre adresse ({email}) a bien été ajoutée à notre liste d’inscriptions. Préparez-vous à recevoir un peu de calme dans votre boîte de réception.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="flex-grow px-5 py-3.5 bg-cream-50/90 hover:bg-cream-50 focus:bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 placeholder-stone-400 font-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="w-full sm:w-auto px-6 py-3.5"
              >
                <Send size={14} className="mr-2" />
                <span>S’abonner</span>
              </Button>
            </div>
            
            <p className="text-[10px] text-stone-500 font-mono tracking-wide">
              Pas de spam. Juste de l’escalade, du calme et du café.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
export default Newsletter;
