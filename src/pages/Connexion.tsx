import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Mail, Lock, Sparkles, UserPlus, Info, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const Connexion: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  // Find routing returnUrl
  const returnUrl = searchParams.get('returnUrl') || '/';

  // Login parameters
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Loading animations
  const [loading, setLoading] = useState(false);

  // Quick Account Auto-login helpers
  const demoAccounts = [
    { email: 'demo@murmur.fr', pass: 'demo123', label: 'Adhérent Liberté (forfait actif)', style: 'sage' },
    { email: 'premium@murmur.fr', pass: 'premium123', label: 'Membre Club murmur. (Tout inclus)', style: 'gold' },
    { email: 'free@murmur.fr', pass: 'free123', label: 'Compte Libre / sans forfait', style: 'stone' }
  ];

  const handleQuickLogin = async (emailVal: string, passwordVal: string) => {
    setLoading(true);
    toast.loading('Authentification rapide en cours...', { id: 'connexion-toast' });
    
    try {
      const success = await login(emailVal, passwordVal);
      setLoading(false);
      toast.dismiss('connexion-toast');

      if (success) {
        toast.success('Bienvenue chez murmur. !');
        navigate(returnUrl);
      } else {
        toast.error('Identifiants incorrects.');
      }
    } catch (err) {
      setLoading(false);
      toast.dismiss('connexion-toast');
      toast.error('Erreur d’authentification.');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Veuillez remplir les informations requises.');
      return;
    }

    if (activeTab === 'signup' && !fullName) {
      toast.error('S’il vous plaît, indiquez votre nom complet.');
      return;
    }

    setLoading(true);
    toast.loading(activeTab === 'signin' ? 'Vérification de vos clés...' : 'Calcul de votre profil...', { id: 'connexion-form' });

    try {
      if (activeTab === 'signin') {
        const success = await login(email, password);
        setLoading(false);
        toast.dismiss('connexion-form');
        
        if (success) {
          toast.success('Prêt à grimper !');
          navigate(returnUrl);
        } else {
          toast.error('Compte inconnu. Essayez les raccourcis démo à droite.');
        }
      } else {
        // Sign up simulation
        // Create standard account with 'none' membership
        const success = await login('free@murmur.fr', 'free123'); // fallback in state simulation
        setLoading(false);
        toast.dismiss('connexion-form');
        
        if (success) {
          toast.success('Compte créé ! Bienvenue dans le club.');
          navigate(returnUrl);
        }
      }
    } catch (err) {
      setLoading(false);
      toast.dismiss('connexion-form');
      toast.error('Erreur lors de la soumission.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Interactive Login Forms Module (7 cols) */}
        <div className="lg:col-span-7 bg-cream-50 border border-stone-250/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Internal sub-tab buttons */}
          <div className="flex border-b border-stone-200/50 font-mono text-xs">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 pb-3 font-semibold border-b-2 transition-all uppercase tracking-wide text-center ${
                activeTab === 'signin'
                  ? 'border-terracotta-500 text-stone-950 font-bold'
                  : 'border-transparent text-stone-400 hover:text-stone-750'
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 pb-3 font-semibold border-b-2 transition-all uppercase tracking-wide text-center ${
                activeTab === 'signup'
                  ? 'border-terracotta-500 text-stone-950 font-bold'
                  : 'border-transparent text-stone-400 hover:text-stone-750'
              }`}
            >
              Créer un compte
            </button>
          </div>

          {/* Actual forms */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div className="text-center sm:text-left mb-4">
              <h2 className="font-sans text-2xl font-black uppercase text-stone-950 leading-tight">
                {activeTab === 'signin' ? 'Heureux de vous revoir' : 'Rejoindre murmur.'}
              </h2>
              <p className="text-xs font-light text-stone-500 mt-1">
                {activeTab === 'signin' 
                  ? 'Entrez vos identifiants ou utilisez notre panneau d’auto-login à droite.' 
                  : 'Devenez membre d\'un club d\'escalade de bloc d\'exception à Paris.'}
              </p>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none placeholder-stone-400 font-light"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={14} />
                <input
                  type="email"
                  required
                  placeholder="nom@murmur.fr"
                  className="w-full pl-9 pr-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none placeholder-stone-400 font-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={14} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none placeholder-stone-400 font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-stone-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-stone-300 h-3.5 w-3.5" />
                <span>Se souvenir de moi</span>
              </label>
              
              <button type="button" className="hover:text-stone-800 underline">
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit Action */}
            <Button
              type="submit"
              variant="terracotta"
              className="w-full py-3 mt-6 text-xs font-semibold"
              isLoading={loading}
              disabled={loading}
            >
              {activeTab === 'signin' ? 'Se connecter' : 'Valider l’inscription'}
            </Button>

          </form>

        </div>

        {/* Right Sandbox Auto-Login Helper (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cream-100/40 border border-[#F5EDD8] rounded-3xl p-6 space-y-5">
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#C4603E] font-bold block">
                Espace Sandbox MVP
              </span>
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                Identifiants de démonstration
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Afin de tester l’ensemble des fonctionnalités de réservation, de location de chaussons et d’accès aux vidéos d'entraînement murmur. sans saisir de vraie carte bancaire, cliquez sur un profil test-rapide ci-dessous :
              </p>
            </div>

            <div className="space-y-3">
              {demoAccounts.map((account) => {
                const badgeStyle = account.style === 'gold' ? 'gold' : account.style === 'sage' ? 'sage' : 'stone';
                return (
                  <button
                    key={account.email}
                    onClick={() => handleQuickLogin(account.email, account.pass)}
                    className="w-full p-3.5 rounded-xl border border-stone-250 border-stone-200 bg-cream-50 hover:bg-stone-50 hover:border-sage-500/40 text-left text-xs transition-colors flex flex-col justify-between items-start gap-1 cursor-pointer hover:scale-101 transform duration-200"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-stone-850 font-sans">{account.email}</span>
                      <Badge variant={badgeStyle as any}>
                        {badgeStyle === 'gold' ? 'VIP' : badgeStyle === 'sage' ? 'Actif' : 'Libre'}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-stone-450 text-stone-400 font-mono leading-none">
                      {account.label} (mot de passe : {account.pass})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick trust guarantee message */}
            <div className="bg-[#1A3328]/5 p-3 rounded-2xl border border-sage-500/10 text-[10px] leading-relaxed text-stone-605 font-mono text-stone-500">
              ✓ Les comptes sont virtuels et stockés de façon autonome locale (Cookie/LocalStorage), garantissant la protection de vos tests.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Connexion;
