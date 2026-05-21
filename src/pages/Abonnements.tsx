import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { plans } from '../data/plans';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Check, X, ShieldCheck, ChevronDown, CreditCard, HelpCircle, Mail, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const Abonnements: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUserMembership } = useAuth();

  // Multi-step subscription modal states
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states for non-authenticated custom path
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // Payment mock state
  const [paymentCard, setPaymentCard] = useState('4532 •••• •••• 9811');
  const [isProcessing, setIsProcessing] = useState(false);

  // FAQ Accordion open keys
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleOpenSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleStep1Next = () => {
    if (isAuthenticated) {
      setCurrentStep(3); // skip credentials step if already logged in!
    } else {
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      toast.error('Veuillez remplir vos informations.');
      return;
    }
    // Simulate register or guest capture
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    toast.loading('Validation de votre abonnement auprès de notre banque...', { id: 'abonnement-charge' });

    setTimeout(() => {
      setIsProcessing(false);
      toast.dismiss('abonnement-charge');
      
      // Update state
      if (isAuthenticated && selectedPlan) {
        updateUserMembership(selectedPlan.id);
      }
      
      setCurrentStep(4);
      toast.success(`Votre formule murmur. « ${selectedPlan?.name} » est maintenant active !`);
    }, 2000);
  };

  // Compare Grid rows
  const comparisonRows = [
    { feature: 'Accès libre à la salle', dec: '1 entrée', reg: 'Illimité', com: 'Illimité' },
    { feature: 'Cours collectifs inclus', dec: 'Non inclus (18€/cours)', reg: '4 cours / mois', com: 'Illimité' },
    { feature: 'Location de chaussons', dec: '5€ / séance', reg: 'Inclus (2x / mois)', com: 'Illimité et Gratuit' },
    { feature: 'Location baudrier & sac', dec: '5€ / séance', reg: 'Tarif réduit', com: 'Illimité et Gratuit' },
    { feature: 'Vidéothèque premium', dec: 'Non inclus', reg: 'Inclus', com: 'Inclus' },
    { feature: 'Réduction Café & Boutique', dec: 'Tarif public', reg: '-10%', com: '-10% + Offres' },
    { feature: 'Événements privés membres', dec: 'X', reg: 'Sur invitation', com: 'Entrée prioritaire libre' },
    { feature: 'Bilan coaching mensuel', dec: 'X', reg: 'X', com: 'Inclus (1 session / mois)' },
  ];

  // FAQs
  const faqItems = [
    {
      q: 'Y a-t-il une durée d’engagement minimum ?',
      a: 'La formule Régulier est disponible sans aucun engagement de durée. Vous pouvez suspendre ou résilier l’abonnement en un clic de souris directement depuis votre Espace Membre avant le début de votre prochain cycle de facturation. La formule Communauté est un abonnement annuel réglé en une seule fois.'
    },
    {
      q: 'La location de matériel est-elle toujours incluse ?',
      a: 'Pour la formule Découverte, le matériel est en option (chaussons 5€, baudrier 3€). Pour la formule Régulier, la location des chaussons d’escalade est offerte 2 fois par mois civil. Pour la formule Communauté, tout le matériel est inclus de manière 100% illimitée et gratuite à chaque passage.'
    },
    {
      q: 'Puis-je faire une pause dans mon abonnement si je pars en vacances ?',
      a: 'Absolument. Si vous avez la formule Régulier, vous pouvez geler votre abonnement depuis votre profil pour une durée de 1 à 3 mois sans frais. Les prélèvements sont alors suspendus et réactivés automatiquement à votre retour.'
    },
    {
      q: 'Puis-je partager mon pass ou inviter un ami ?',
      a: 'Les abonnements murmur. sont nominatifs pour des raisons d’assurances corporelles. Toutefois, les membres de la formule Club murmur. disposent de 2 « pass invités » offerts par mois pour faire découvrir l’espace et l’escalade à la personne de leur choix.'
    },
    {
      q: 'Le sauna et les douches sont-ils vraiment libres d’accès ?',
      a: 'Oui. Les douches, vestiaires individuels biométriques, casiers chauffants, et notre sauna suédois traditionnel en bois brut de cèdre sont inclus sans supplément pour l’ensemble de nos formules d’entrée (y compris drop-in à 18€).'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-600 bg-orange-100 px-4 py-1.5 rounded-full font-bold">
          RÉGLEMENT ET TARIFS
        </span>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-stone-950 uppercase mt-5 tracking-tight leading-none">
          ABONNEMENTS & PASSES
        </h1>
        <p className="text-sm font-light text-stone-600 mt-2 max-w-xl mx-auto leading-relaxed">
          Aucun frais d'inscription caché. Tous nos forfaits et passes vous ouvrent instantanément l'intégralité du club murmur. ainsi que le sauna suédois traditionnel.
        </p>
      </div>

      {/* 2. THE THREE PLAN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((plan) => {
          const isRec = plan.badge === 'Recommandé';
          const isCom = plan.badge === 'Meilleure Offre';
          return (
            <div
              key={plan.id}
              className={`relative bg-cream-50 rounded-3xl border p-8 flex flex-col justify-between transition-all duration-350 ${
                isRec
                  ? 'border-sage-500 ring-2 ring-sage-100 shadow-xl scale-102 z-10'
                  : 'border-stone-200 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <Badge variant={isRec ? "sage" : "gold"}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="font-serif text-2xl font-semibold text-stone-950 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-stone-400 font-light mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline mb-6 border-b border-stone-200/50 pb-6">
                  <span className="text-4xl sm:text-5xl font-serif font-semibold text-stone-900">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-stone-400 ml-2">/ {plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-stone-600 leading-normal">
                      <Check size={14} className="text-sage-500 flex-shrink-0 mr-2.5 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe CTA Button */}
              <Button
                variant={isRec ? "primary" : isCom ? "terracotta" : "outline"}
                className="w-full text-center"
                onClick={() => handleOpenSubscribe(plan)}
              >
                Choisir cette formule
              </Button>
            </div>
          );
        })}
      </div>

      {/* 3. COMPARATIVE HYBRID TABLE */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
            Comparatif détaillé des privilèges
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Chaque détail a été ajusté pour s’harmoniser avec la vie active parisienne.
          </p>
        </div>

        <div className="overflow-x-auto border border-stone-250/50 rounded-2xl bg-cream-50 shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100 text-[#1a3328] font-serif border-b border-stone-200">
                <th className="p-4 font-normal font-bold">Privilèges & Avantages</th>
                <th className="p-4 font-normal">Pass Séance</th>
                <th className="p-4 font-bold text-stone-900">Abonnement Liberté</th>
                <th className="p-4 font-normal">Club murmur.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/40 text-stone-600 font-light">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-medium text-stone-800">{row.feature}</td>
                  <td className="p-4">{row.dec}</td>
                  <td className="p-4 font-normal text-sage-900 bg-sage-500/5">{row.reg}</td>
                  <td className="p-4">{row.com}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. FAQ ACCORDION */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="text-center mb-10">
          <HelpCircle size={28} className="text-[#C4603E] mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
            Questions fréquentes
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Des réponses directes et sincères pour éclairer votre parcours.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-cream-50 border border-stone-200/50 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-serif font-medium text-stone-900 hover:text-sage-700 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} className={`text-stone-400 transition-transform duration-300 ${isOpen && 'rotate-180 text-sage-700'}`} />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-500 leading-relaxed font-light border-t border-stone-200/20">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. MULTI-STEP SUBSCRIPTION MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          currentStep === 4 ? "Félicitations !" : `Adhésion à la formule : ${selectedPlan?.name}`
        }
      >
        {selectedPlan && (
          <div className="space-y-6">
            
            {/* Step indicators dots */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4].map((step) => {
                const isActive = currentStep === step;
                const isPassed = currentStep > step;
                return (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-terracotta-500' : isPassed ? 'w-4 bg-sage-500' : 'w-2 bg-stone-250 bg-stone-200'
                    }`}
                  />
                );
              })}
            </div>

            {/* STEP 1: PLAN RECAP */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="bg-sage-900 text-cream-50 rounded-2xl p-5 border border-sage-700">
                  <span className="text-[10px] font-mono uppercase text-terracotta-300 tracking-wider">Aperçu du Pass</span>
                  <h4 className="font-serif text-xl font-bold mt-1 text-cream-100">{selectedPlan.name}</h4>
                  <p className="text-xs text-stone-300 font-light mt-1">{selectedPlan.description}</p>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-sage-800">
                    <span className="text-xs text-stone-300 font-mono">Mensualité ou prix unitaire :</span>
                    <span className="font-serif text-2xl font-bold text-terracotta-300">{selectedPlan.price}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-600 font-light">
                  <p className="font-semibold text-stone-800">Le pass comprend d’office :</p>
                  <p className="flex items-center">✓ Accès complet à notre sauna suédois éco-certifié.</p>
                  <p className="flex items-center">✓ Accès à notre café d’altitude climatisé de Paris 11e.</p>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-stone-200">
                  <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>Fermer</Button>
                  <Button variant="terracotta" className="flex-1" onClick={handleStep1Next}>
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONAL GUEST INFORMATION (if not logged in) */}
            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-800 space-y-2">
                  <p className="font-semibold">Vous n’êtes pas connecté.</p>
                  <p className="font-light">
                    Pour mémoriser vos données d’escalade et votre accès adhérent, veuillez renseigner l’identité ci-dessous, ou connectez-vous directement sur l’onglet Connexion.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">Prénom & Nom</label>
                    <input
                      type="text"
                      required
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">Adresse Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jean.dupont@gmail.com"
                      className="w-full px-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-stone-200">
                  <Button variant="ghost" className="flex-1" onClick={() => setCurrentStep(1)}>Précédent</Button>
                  <Button type="submit" variant="primary" className="flex-1">Poursuivre</Button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT MOCKUP WITH LOADING */}
            {currentStep === 3 && (
              <form onSubmit={handleStep3Submit} className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200/50 font-mono text-xs">
                    <span className="text-stone-400">Total à débiter :</span>
                    <span className="font-serif text-lg font-bold text-sage-900">{selectedPlan.price}</span>
                  </div>

                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500">Coordonnées Bancaires</h4>
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={16} />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs font-mono"
                        placeholder="Numéro de Carte de crédit"
                        value={paymentCard}
                        onChange={(e) => setPaymentCard(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono">
                      <input
                        type="text"
                        required
                        maxLength={5}
                        className="w-full px-3 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs text-center"
                        placeholder="MM / YY"
                        defaultValue="06 / 29"
                      />
                      <input
                        type="password"
                        required
                        maxLength={3}
                        className="w-full px-3 py-2.5 bg-cream-50 border border-stone-300 rounded-xl text-stone-800 text-xs text-center"
                        placeholder="CVC"
                        defaultValue="921"
                      />
                    </div>
                  </div>

                  <div className="bg-stone-100 rounded-xl p-3 border border-stone-200 text-[10px] text-stone-500 flex items-start space-x-2 leading-relaxed">
                    <ShieldCheck size={16} className="text-sage-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Débit sécurisé simulé par clé SSL. Vous disposez de la faculté de résilier, modifier ou suspendre votre abonnement Régulier à tout moment d’un simple clic depuis votre Espace Profil.
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-stone-200">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    disabled={isProcessing}
                    onClick={() => setCurrentStep(isAuthenticated ? 1 : 2)}
                  >
                    Précédent
                  </Button>
                  <Button
                    type="submit"
                    variant="terracotta"
                    className="flex-1"
                    isLoading={isProcessing}
                  >
                    Valider mon abonnement
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS */}
            {currentStep === 4 && (
              <div className="text-center space-y-6 py-4">
                <div className="h-16 w-16 bg-cream-100 text-sage-900 border border-sage-500 rounded-full flex items-center justify-center mx-auto shadow-sm animate-soft-pulse">
                  <Sparkles size={28} className="text-sage-500" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-xl font-black uppercase text-stone-950">
                    BIENVENUE AU murmur. CLUB !
                  </h4>
                  <p className="text-xs text-stone-600 font-normal max-w-sm mx-auto leading-relaxed">
                    Votre pass <b>« {selectedPlan.name} »</b> est désormais actif. Si vous étiez déjà membre authentifié, votre niveau de profil a été mis à jour instantanément. Votre badge d’accès numérique NFC est maintenant activé sur votre profil.
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-zinc-200 text-left max-w-sm mx-auto space-y-2 text-[11px] text-stone-600 leading-relaxed font-mono">
                  <p className="font-bold text-center text-stone-900 uppercase">CE QUE VOUS DÉBLOQUEZ DÈS MAINTENANT :</p>
                  <p>• Accès libre illimité 7j/7 à la salle de bloc et au sauna traditionnel.</p>
                  <p>• L'intégralité des modules de formation de la vidéothèque murmur.</p>
                  <p>• 10% de réduction automatique sur le Barista bar et le Shop.</p>
                </div>

                <Button
                  variant="primary"
                  className="w-full text-xs"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/profil'); // take them to checkout and profile
                  }}
                >
                  Accéder à mon Espace Profil
                </Button>
              </div>
            )}

          </div>
        )}
      </Modal>

    </div>
  );
};

export default Abonnements;
