import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Check, Calendar, Clock, Smile, Sparkles, Compass, Download, CheckCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export const Essai: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, addBooking } = useAuth();

  // Selected parameters for free session
  const [selectedFocus, setSelectedFocus] = useState<string>('scaling');
  const [selectedSlot, setSelectedSlot] = useState<string>('tomorrow');
  
  // Custom contact form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const focusTracks = [
    {
      id: 'scaling',
      title: 'Initiation & Placement (Bloc Escalade)',
      duration: '75 min',
      description: 'Pour s’initier en douceur aux bases de la grimpe de bloc, apprendre à chuter en sécurité et réussir vos premiers passages d’équilibre sans forcer sur les bras.',
      instructor: 'Marc T.',
      badge: 'Idéal Débutants',
      badgeStyle: 'sage' as const
    },
    {
      id: 'yoga',
      title: 'Flow & Souplesse Spécial Grimpeur',
      duration: '60 min',
      description: 'Ouverture des hanches, renforcement de la gaine abdominale et respiration active pour accroître son amplitude de mouvement en paroi.',
      instructor: 'Sophie B.',
      badge: 'Mobilité active',
      badgeStyle: 'purple' as const
    },
    {
      id: 'mental',
      title: 'Respiration & Clarté Mentale',
      duration: '60 min',
      description: 'Une séance mêlant postures douces sur tapis et techniques de pranayama pour canaliser l’anxiété de hauteur et augmenter sa concentration.',
      instructor: 'Léa R.',
      badge: 'Calme & Focus',
      badgeStyle: 'cream' as const
    }
  ];

  const slots = [
    { id: 'tomorrow', label: 'Demain soir — 18h30 à 19h45' },
    { id: 'saturday', label: 'Samedi matin — 10h00 à 11h15' },
    { id: 'sunday', label: 'Dimanche après-midi — 15h00 à 16h15' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone) {
      toast.error('Veuillez renseigner tous les champs obligatoires.');
      return;
    }
    if (!agreedTerms) {
      toast.error('Veuillez accepter notre charte de sérénité.');
      return;
    }

    setLoading(true);
    toast.loading('Réservation de votre créneau d’essai gratuit...', { id: 'essai-toast' });

    // Simulate database booking addition
    setTimeout(() => {
      setLoading(false);
      toast.dismiss('essai-toast');

      // Add to user bookings if logged in, otherwise let success display
      const activeTrack = focusTracks.find(f => f.id === selectedFocus);
      const activeSlot = slots.find(s => s.id === selectedSlot);

      if (isAuthenticated && activeTrack && activeSlot) {
        addBooking({
          courseId: 'free-trial-' + Math.random().toString(36).substr(2, 5),
          courseTitle: `ESSAI : ${activeTrack.title}`,
          discipline: activeTrack.id === 'scaling' ? 'escalade' : activeTrack.id === 'yoga' ? 'yoga' : 'atelier',
          instructorName: activeTrack.instructor,
          date: new Date().toISOString().split('T')[0], // today
          time: activeSlot.label.split(' — ')[1] || '18h30'
        });
      }

      setIsSuccessModalOpen(true);
      toast.success('Séance d’essai planifiée ! À très vite.');
    }, 1500);
  };

  const downloadICSFile = () => {
    const activeTrack = focusTracks.find(f => f.id === selectedFocus);
    const activeSlot = slots.find(s => s.id === selectedSlot);
    if (!activeTrack || !activeSlot) return;

    const summary = `murmur. - ${activeTrack.title}`;
    const description = `Séance d’essai offerte au club murmur. Paris 11e avec ${activeTrack.instructor}`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${summary}\nDESCRIPTION:${description}\nDTSTART:20260522T183000Z\nEND:20260522T194500Z\nEND:VEVENT\nEND:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'murmur-essai-offert.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Fichier de calendrier sync (.ics) téléchargé.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 2-Column layout structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Informative Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase bg-terracotta-100 text-terracotta-900 border border-terracotta-200 px-3 py-1.5 rounded-full font-bold">
              Séance d’essai gratuite
            </span>
            <h1 className="text-4xl sm:text-5xl font-sans font-black text-stone-950 uppercase leading-snug tracking-tight">
              DÉCOUVREZ L'INTENSITÉ EN PAROI.
            </h1>
            <p className="text-sm font-light text-stone-605 leading-relaxed">
              Pour vous faire une idée précise de notre salle d'escalade, de l'espace d'entraînement et de notre espresso bar de spécialité, nous vous offrons votre première séance d'essai. Sans engagement.
            </p>
          </div>

          {/* Checklist of value propositions */}
          <div className="space-y-4 bg-cream-50 border border-stone-200/40 p-6 rounded-2xl">
            <h3 className="font-serif font-semibold text-stone-900 text-md">Votre séance d’essai comprend :</h3>
            
            <ul className="space-y-3 text-xs text-stone-605 text-stone-600 leading-normal">
              <li className="flex items-start">
                <Check size={14} className="text-orange-600 flex-shrink-0 mr-2.5 mt-0.5" />
                <span>Chaussons d’escalade d'élite et magnésie liquide fournis sans frais à votre arrivée.</span>
              </li>
              <li className="flex items-start">
                <Check size={14} className="text-orange-600 flex-shrink-0 mr-2.5 mt-0.5" />
                <span>Accès complet aux secteurs de bloc, zones de force athlétique et sauna traditionnel après votre grimpe.</span>
              </li>
              <li className="flex items-start">
                <Check size={14} className="text-orange-600 flex-shrink-0 mr-2.5 mt-0.5" />
                <span>Un expresso d'extraction artisanale offert à notre barista bar.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Form column (7 cols) */}
        <div className="lg:col-span-7 bg-cream-50 border border-stone-250/50 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* FOCUS OPTION SELECTOR */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-200/40 pb-2">
                1. Choisissez votre atelier d’accueil
              </h3>

              <div className="space-y-3">
                {focusTracks.map((track) => {
                  const isSel = selectedFocus === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => setSelectedFocus(track.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-left space-y-2 relative ${
                        isSel 
                          ? 'border-sage-600 bg-sage-50/20' 
                          : 'border-stone-200 hover:border-stone-300 bg-cream-50/50'
                      }`}
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`h-4 w-4 rounded-full border border-stone-300 flex items-center justify-center ${isSel && 'bg-sage-600 border-transparent text-cream-50'}`}>
                            {isSel && <div className="h-1.5 w-1.5 rounded-full bg-cream-50" />}
                          </span>
                          <span className="font-serif font-bold text-sm text-stone-900">{track.title}</span>
                        </div>
                        <Badge variant={track.badgeStyle}>{track.badge}</Badge>
                      </div>

                      <p className="text-xs text-stone-500 font-light leading-relaxed">{track.description}</p>
                      <p className="text-[10px] font-mono text-stone-400">
                        Durée : {track.duration} · Coach d’accompagnement : <b>{track.instructor}</b>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SELECTION OF TIME SLOT */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-200/40 pb-2">
                2. Choisissez votre créneau horaire
              </h3>

              <div className="flex flex-col gap-2">
                {slots.map((sl) => {
                  const isSelSlot = selectedSlot === sl.id;
                  return (
                    <button
                      key={sl.id}
                      type="button"
                      onClick={() => setSelectedSlot(sl.id)}
                      className={`px-4 py-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                        isSelSlot 
                          ? 'border-terracotta-500 bg-terracotta-50/10 text-stone-900 font-semibold' 
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      <span>{sl.label}</span>
                      {isSelSlot && <span className="text-xs text-terracotta-500">✓ Choisi</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* IDENTITY INPUT FORM */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-200/40 pb-2">
                3. Vos coordonnées de contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone- block mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jean"
                    className="w-full px-4 py-2.5 bg-cream-50 border border-stone-250 border-stone-200 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone- block mb-1">Nom de famille</label>
                  <input
                    type="text"
                    placeholder="Dupont"
                    className="w-full px-4 py-2.5 bg-cream-50 border border-stone-255 border-stone-200 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone- block mb-1">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jean.dupont@gmail.com"
                    className="w-full px-4 py-2.5 bg-cream-50 border border-stone-255 border-stone-200 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone- block mb-1">Téléphone mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 ..."
                    className="w-full px-4 py-2.5 bg-cream-50 border border-stone-255 border-stone-200 rounded-xl text-stone-800 text-xs focus:ring-2 focus:ring-sage-500 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start space-x-2 text-[10px] text-stone-500 leading-relaxed font-mono cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded text-sage-600 focus:ring-sage-500 h-4.5 w-4.5 mt-0.5"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                  />
                  <span>
                    J’accepte de recevoir mon bon par email pour un expresso gratuit et d’être accueilli dans le respect du règlement murmur. *
                  </span>
                </label>
              </div>

            </div>

            {/* Call to action */}
            <div className="pt-4 border-t border-stone-200">
              <Button
                type="submit"
                variant="terracotta"
                className="w-full py-4 font-semibold text-xs"
                isLoading={loading}
              >
                Confirmer l’inscription gratuite
              </Button>
            </div>

          </form>
        </div>

      </div>

      {/* SUCCESS MODAL REUSABLE */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Créneau réservé !"
      >
        <div className="text-center space-y-6 py-4">
          <div className="h-16 w-16 bg-cream-100 text-sage-900 border border-sage-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle size={32} className="text-sage-500" />
          </div>

          <div className="space-y-2">
            <h4 className="font-sans text-xl font-black uppercase text-stone-900">
              Bienvenue chez murmur., {firstName} !
            </h4>
            <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
              Votre bon d’essai gratuit a été validé et envoyé à l’adresse électronique <b>{email}</b>. Vous y trouverez votre code d’accès temporaire au tripode d’entrée.
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 border border-zinc-200 text-left max-w-sm mx-auto space-y-2 text-[11px] text-stone-600 leading-relaxed font-mono">
            <p className="font-bold text-stone-900 uppercase text-center">Consignes et rappels</p>
            <p>✓ Nous fournissons gracieusement les chaussons techniques Scarpa sur place.</p>
            <p>✓ Présentez-vous 10-15 minutes à l’avance pour le barista espresso d'accueil.</p>
            <p>✓ Accès libre complet aux dalles, surplombs, vestiaires et sauna traditionnel.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex-grow text-xs"
              onClick={downloadICSFile}
            >
              <Download size={14} className="mr-2" />
              <span>Télécharger mon Calendar (.ics)</span>
            </Button>
            <Button
              variant="primary"
              className="px-6 text-xs"
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/');
              }}
            >
              Fermer
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Essai;
