import React, { useState } from 'react';
import Hero from '../components/sections/Hero';
import StatsBar from '../components/sections/StatsBar';
import Philosophie from '../components/sections/Philosophie';
import CoursesPreview from '../components/sections/CoursesPreview';
import PlansPreview from '../components/sections/PlansPreview';
import GearTeaser from '../components/sections/GearTeaser';
import VideosTeaser from '../components/sections/VideosTeaser';
import TestimonialsGrid from '../components/sections/TestimonialsGrid';
import Newsletter from '../components/sections/Newsletter';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { formatDateFrench } from '../utils/formatDate';
import { Calendar, Check, Download, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, addBooking, bookings } = useAuth();
  
  // Booking modal states
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'checkout' | 'success'>('checkout');

  const openBookingModal = (course: any) => {
    setSelectedCourse(course);
    setBookingStep('checkout');
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous de d\'abord vous connecter.');
      setIsBookingModalOpen(false);
      navigate('/connexion?returnUrl=/');
      return;
    }

    if (!selectedCourse) return;

    // Check if they need credit
    const membership = user?.membership || 'none';
    const isSpecialAtelier = selectedCourse.discipline === 'atelier';
    const needPayment = membership === 'none' || isSpecialAtelier;

    if (needPayment) {
      // Simulate drop-in session pay flow
      setBookingStep('checkout'); // remain on checkout view to load
      toast.loading('Simulation de paiement en cours...', { id: 'booking-pay' });
      
      setTimeout(() => {
        toast.dismiss('booking-pay');
        executeBookingState();
      }, 1500);
    } else {
      executeBookingState();
    }
  };

  const executeBookingState = () => {
    const success = addBooking({
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      discipline: selectedCourse.discipline,
      instructorName: selectedCourse.instructorName,
      date: selectedCourse.date,
      time: selectedCourse.time
    });

    if (success) {
      setBookingStep('success');
      toast.success('Séance réservée de manière sécurisée !');
    } else {
      toast.error('Séance déjà réservée ou indisponible.');
      setIsBookingModalOpen(false);
    }
  };

  const downloadICSFile = () => {
    if (!selectedCourse) return;
    
    // Simulate downloading an .ics file dynamically
    const summary = `murmur. - ${selectedCourse.title}`;
    const description = `Cours de ${selectedCourse.discipline} avec ${selectedCourse.instructorName}`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${summary}\nDESCRIPTION:${description}\nDTSTART:${selectedCourse.date.replace(/-/g, '')}T183000Z\nEND:${selectedCourse.date.replace(/-/g, '')}T193000Z\nEND:VEVENT\nEND:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'murmur-sessions.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Fichier .ics téléchargé. Prêt à être ajouté à votre agenda !');
  };

  return (
    <div id="home_page_root">
      
      {/* 1. HERO BANNER */}
      <Hero />

      {/* 2. STATS STATISTIQUE */}
      <StatsBar />

      {/* 3. PHILOSOPHIE PARAGRAPHE */}
      <Philosophie />

      {/* 4. COURSES SLIDES CAROUSEL */}
      <CoursesPreview onOpenBookingModal={openBookingModal} />

      {/* 5. MEMBERSHIP PRICING CARDS */}
      <PlansPreview />

      {/* 6. EQUIPMENT RENTAL ROW */}
      <GearTeaser />

      {/* 7. RECENT VIDEO RECORDINGS PREVIEW */}
      <VideosTeaser />

      {/* 8. TESTIMONIALS CARDS */}
      <TestimonialsGrid />

      {/* 9. NEWSLETTER BOX */}
      <Newsletter />

      {/* 10. REUSABLE BOOKING MODAL */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={bookingStep === 'success' ? "Réservation confirmée !" : "Finaliser ma réservation"}
      >
        {selectedCourse && (
          <div className="space-y-6">
            
            {bookingStep === 'checkout' ? (
              <>
                {/* Course Quick Summary Header */}
                <div className="bg-stone-100/50 rounded-2xl p-4 border border-stone-200/50">
                  <Badge variant={
                    selectedCourse.discipline === 'yoga' ? 'purple' :
                    selectedCourse.discipline === 'escalade' ? 'sage' :
                    selectedCourse.discipline === 'pilates' ? 'cream' : 'terracotta'
                  }>
                    {selectedCourse.discipline}
                  </Badge>
                  <h4 className="font-serif text-lg font-semibold text-stone-900 mt-2">
                    {selectedCourse.title}
                  </h4>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    Le {formatDateFrench(selectedCourse.date)} à <b>{selectedCourse.time}</b> ({selectedCourse.duration} min)
                  </p>
                  <p className="text-xs text-stone-500 font-light mt-1 font-mono">
                    Instructeur : {selectedCourse.instructorName}
                  </p>
                </div>

                {/* Multi-tier Billing Check */}
                <div className="space-y-4 pt-1">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Mode de tarification
                  </h5>

                  {!isAuthenticated ? (
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-800 flex items-start space-x-2">
                      <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                      <span>
                        Vous n’êtes pas connecté. Pour valider l’inscription, vous serez redirigé vers l’espace de connexion.
                      </span>
                    </div>
                  ) : (
                    <>
                      {user?.membership === 'none' || selectedCourse.discipline === 'atelier' ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm p-3 bg-stone-100 rounded-xl">
                            <div>
                              <p className="font-semibold text-stone-800">Tarif unique (séance unique)</p>
                              <p className="text-xs text-stone-400 font-light">Matériel de grimpe non inclus</p>
                            </div>
                            <span className="font-serif font-bold text-lg text-sage-900">
                              {selectedCourse.price} €
                            </span>
                          </div>
                          
                          {/* Payment Form Simulation Indicator */}
                          <p className="text-[10px] text-stone-400 font-mono text-center">
                            En confirmant, vous acceptez le débit de {selectedCourse.price}€ (Simulation de transaction).
                          </p>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-800 flex items-start space-x-2">
                          <Check size={14} className="mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Réservation incluse avec votre forfait</p>
                            <p className="mt-0.5 font-light">
                              Votre formule <b>« {user?.membership} »</b> vous donne accès librement à tous nos cours de yoga, pilates et escalade libre. Solde restant : illimité.
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-stone-200">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="terracotta"
                    className="flex-1"
                    onClick={handleConfirmBooking}
                  >
                    {!isAuthenticated ? "Se connecter & Réserver" : "Confirmer l’inscription"}
                  </Button>
                </div>
              </>
            ) : (
              // Booking Step Success State
              <div className="text-center space-y-6 py-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check size={32} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-xl font-semibold text-stone-900">
                    C’est noté. Vous y êtes !
                  </h4>
                  <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
                    Un email de confirmation contenant votre code d’armoire et d’accès vous a été simulé. Nous nous réjouissons d’ores et déjà de vous accueillir pour votre cours.
                  </p>
                </div>

                <div className="bg-stone-100/50 rounded-2xl p-4 border border-stone-200/50 text-left max-w-sm mx-auto space-y-2 text-xs text-stone-600">
                  <p className="font-semibold text-center text-[#1a3328] mb-1">Rappels pratiques</p>
                  <p>✓ Présentez-vous 10-15 minutes avant le début de la séance.</p>
                  <p>✓ Prévoyez une gourde d’eau et une tenue souple.</p>
                  <p>✓ Les chaussons propres s’adaptent au pied nu ou fines chaussettes.</p>
                </div>

                {/* Calendar additions buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={downloadICSFile}
                  >
                    <Download size={14} className="mr-2" />
                    <span>Ajouter à l’agenda (.ics)</span>
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 text-xs"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    <span>Fermer</span>
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}
      </Modal>

    </div>
  );
};

export default Home;
