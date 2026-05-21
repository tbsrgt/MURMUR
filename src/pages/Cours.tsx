import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { formatDateFrench, formatShortDateFrench } from '../utils/formatDate';
import { cn } from '../utils/cn';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { Star, Clock, User2, MapPin, Check, Download, AlertCircle, Info, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export const Cours: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, addBooking, bookings } = useAuth();

  // Loading skeleton state
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Tous');
  const [selectedDay, setSelectedDay] = useState<string>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'date' | 'dispo'>('date');

  // Booking Modal States
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'checkout' | 'success'>('checkout');

  // Load delay simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms feel smooth & premium
    return () => clearTimeout(timer);
  }, []);

  // Pre-configured instructors information (French)
  const instructors = [
    {
      name: 'Sophie B.',
      discipline: 'Yoga, Pilates, Yin Yoga',
      bio: 'Pratiquante d\'Ashtanga en Inde puis certifiée RYT 500h. Sophie allie fluidité respiratoire et postures d\'étirement profond pour harmoniser le corps des grimpeurs.',
      rating: 4.9,
      letter: 'S'
    },
    {
      name: 'Marc T.',
      discipline: 'Technique d’Escalade, Force des Doigts',
      bio: 'Ex-compétiteur de haut niveau du circuit national de bloc. Passionné de biomécanique, Marc décompose chaque placement de pied pour maximiser l\'équilibre.',
      rating: 4.8,
      letter: 'M'
    },
    {
      name: 'Léa R.',
      discipline: 'Atelier Mental, Core Training & Pilates',
      bio: 'Spécialiste de la préparation mentale et de la prévention des blessures. Léa étudie la gestion de la peur du vol et aide l\'élève à dépasser son appréhension.',
      rating: 5.0,
      letter: 'L'
    }
  ];

  const disciplines = ['Tous', 'Escalade', 'Yoga', 'Pilates', 'Atelier'];
  const daysOfWeek = [
    { key: 'Tous', label: 'Tous' },
    { key: 'Mon', label: 'Lun' },
    { key: 'Tue', label: 'Mar' },
    { key: 'Wed', label: 'Mer' },
    { key: 'Thu', label: 'Jeu' },
    { key: 'Fri', label: 'Ven' },
    { key: 'Sat', label: 'Sam' },
    { key: 'Sun', label: 'Dim' }
  ];
  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'];

  // Helper to map English short dates for filter comparison
  const getDayShortFromDateString = (dateStr: string): string => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const mapping = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return mapping[dayIndex];
  };

  // Filtered courses selector
  const filteredCourses = courses.filter((course) => {
    // 1. Discipline validation
    if (selectedDiscipline !== 'Tous' && course.discipline.toLowerCase() !== selectedDiscipline.toLowerCase()) {
      return false;
    }
    // 2. Day validation
    if (selectedDay !== 'Tous') {
      const dayShort = getDayShortFromDateString(course.date);
      if (dayShort !== selectedDay) return false;
    }
    // 3. Level validation
    if (selectedLevel !== 'Tous' && course.level !== selectedLevel) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(`${a.date}T${a.time.replace('h', ':')}`).getTime() - new Date(`${b.date}T${b.time.replace('h', ':')}`).getTime();
    } else {
      // Sort by availability (taken / maxspots) ascending (more spots left first)
      const aLeft = a.spotsMax - a.spotsTaken;
      const bLeft = b.spotsMax - b.spotsTaken;
      return bLeft - aLeft;
    }
  });

  const getDisciplineDetails = (dis: string) => {
    switch (dis) {
      case 'yoga':
        return { label: 'Yoga flow', style: 'purple' as const };
      case 'pilates':
        return { label: 'Pilates', style: 'cream' as const };
      case 'escalade':
        return { label: 'Escalade', style: 'sage' as const };
      default:
        return { label: 'Atelier spécial', style: 'terracotta' as const };
    }
  };

  const handleOpenBooking = (course: any) => {
    setSelectedCourse(course);
    setBookingStep('checkout');
    setIsBookingModalOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous authentifier au préalable.');
      setIsBookingModalOpen(false);
      navigate('/connexion?returnUrl=/cours');
      return;
    }

    if (!selectedCourse) return;

    const membership = user?.membership || 'none';
    const isSpecialAtelier = selectedCourse.discipline === 'atelier';
    const needPayment = membership === 'none' || isSpecialAtelier;

    if (needPayment) {
      toast.loading('Simulation de transaction sécurisée...', { id: 'cours-pay' });
      
      setTimeout(() => {
        toast.dismiss('cours-pay');
        executeBooking();
      }, 1500);
    } else {
      executeBooking();
    }
  };

  const executeBooking = () => {
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
      toast.success('Emplacement validé avec succès !');
    } else {
      toast.error('Vous êtes déjà inscrit à ce cours collectif.');
      setIsBookingModalOpen(false);
    }
  };

  const downloadICSFile = () => {
    if (!selectedCourse) return;
    const summary = `murmur. - ${selectedCourse.title}`;
    const description = `Séance collective de ${selectedCourse.discipline} dirigée par ${selectedCourse.instructorName}`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${summary}\nDESCRIPTION:${description}\nDTSTART:${selectedCourse.date.replace(/-/g, '')}T183000Z\nEND:${selectedCourse.date.replace(/-/g, '')}T193000Z\nEND:VEVENT\nEND:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `murmur-${selectedCourse.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Calendrier synchronisé (.ics)');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. HEADER SECTION */}
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-sage-500 bg-sage-100/50 px-3.5 py-1.5 rounded-full">
          Professeurs & Ateliers
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-900 mt-4">
          Cours & Activités
        </h1>
        <p className="text-sm font-light text-stone-500 mt-2 max-w-2xl leading-relaxed">
          Affinez vos respirations et polissez votre technique. Dévers propose des séances adaptées de yoga pour grimpeurs, de pilates postural et de cliniques exclusives dirigées par des mentors chevronnés.
        </p>
      </div>

      {/* 2. STICKY FILTER BAR */}
      <div className="sticky top-20 z-20 bg-cream-50/90 backdrop-blur-md border border-stone-200/50 rounded-2xl p-4 sm:p-5 mb-10 shadow-sm flex flex-col gap-4">
        
        {/* Header line */}
        <div className="flex items-center space-x-2 pb-3 border-b border-stone-200/40 text-stone-700 font-mono text-xs">
          <Filter size={14} className="text-sage-500" />
          <span>Filtres de recherche</span>
        </div>

        {/* Filters Group Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Discipline tabs filter */}
          <div className="lg:col-span-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">Discipline</span>
            <div className="flex flex-wrap gap-1.5">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    selectedDiscipline === d
                      ? "bg-sage-700 text-cream-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/50"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Level list filter */}
          <div className="lg:col-span-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">Niveau de Pratique</span>
            <div className="flex flex-wrap gap-1.5">
              {levels.slice(0, 4).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    selectedLevel === lvl
                      ? "bg-sage-700 text-cream-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/50"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Day list filter -- scrollable row style */}
          <div className="lg:col-span-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">Jour de la Semaine</span>
            <div className="flex flex-wrap gap-1.5">
              {daysOfWeek.map((day) => (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={cn(
                    "px-2.5 py-1.5 text-xs rounded-lg transition-all font-medium font-mono",
                    selectedDay === day.key
                      ? "bg-terracotta-500 text-cream-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/50"
                  )}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Sort Bar */}
        <div className="flex items-center justify-between border-t border-stone-200/40 pt-3 text-xs w-full">
          <span className="text-[#1A3328] font-mono">
            {filteredCourses.length} cours correspondants
          </span>
          
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-stone-400 text-[10px] uppercase">Ranger par :</span>
            <button
              onClick={() => setSortBy('date')}
              className={cn("px-2 py-0.5 rounded transition-all", sortBy === 'date' ? "text-sage-900 underline font-semibold" : "text-stone-400")}
            >
              Chronologie
            </button>
            <span>|</span>
            <button
              onClick={() => setSortBy('dispo')}
              className={cn("px-2 py-0.5 rounded transition-all", sortBy === 'dispo' ? "text-sage-900 underline font-semibold" : "text-stone-400")}
            >
              Places restantes
            </button>
          </div>
        </div>

      </div>

      {/* 3. PRIMARY CONTENT GRID (2 Column Cards, 1 Column Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Class Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-cream-50 border border-stone-200/50 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Info size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-stone-900">Aucun cours trouvé</h3>
                <p className="text-xs text-stone-500 font-light mt-1 max-w-xs mx-auto">
                  Nous n’avons trouvé aucune planification correspondant à vos filtres sur nos créneaux actuels. Essayez d\'élargir votre recherche.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDiscipline('Tous');
                  setSelectedDay('Tous');
                  setSelectedLevel('Tous');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCourses.map((course) => {
                const discInfo = getDisciplineDetails(course.discipline);
                const spotsRemaining = course.spotsMax - course.spotsTaken;
                const percentage = (course.spotsTaken / course.spotsMax) * 100;
                const isFull = spotsRemaining <= 0;
                const isUserBooked = bookings.some(b => b.courseId === course.id && b.status !== 'cancelled');

                return (
                  <div
                    key={course.id}
                    className="bg-cream-50 rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
                  >
                    
                    {/* Header line */}
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant={discInfo.style}>{discInfo.label}</Badge>
                      <Badge variant="stone">{course.level}</Badge>
                    </div>

                    {/* Instructor & Title */}
                    <div className="space-y-3 mb-4">
                      <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-sage-700 transition-colors line-clamp-2 h-14">
                        {course.title}
                      </h3>

                      <div className="flex items-center space-x-2 text-xs text-stone-500 font-light">
                        <div className="h-6 w-6 rounded-full bg-sage-500 text-cream-50 font-bold text-[10px] flex items-center justify-center">
                          {course.instructorAvatar}
                        </div>
                        <span>Dirigé par {course.instructorName}</span>
                      </div>
                    </div>

                    {/* Timeline Data */}
                    <div className="pt-3 border-t border-dashed border-stone-200 text-xs text-stone-600 font-mono space-y-3 mb-4">
                      <div className="flex items-center">
                        <Clock size={12} className="text-stone-400 mr-2" />
                        <span>
                          {formatDateFrench(course.date)} · <b className="text-[#1A3328] font-normal">{course.time}</b> ({course.duration} min)
                        </span>
                      </div>

                      {/* Spots indicator */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-stone-400">Places dispo</span>
                          <span className={cn(isFull ? "text-red-500" : "text-sage-700", "font-semibold")}>
                            {isFull ? 'Complet' : `${spotsRemaining} / ${course.spotsMax}`}
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all duration-300", isFull ? "bg-red-400" : "bg-sage-500")}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Purchase info or subscription inclusion */}
                    <div className="flex justify-between items-center pt-2 mt-auto">
                      <div>
                        {course.inclusAbonnement ? (
                          <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                            Inclus abonnement
                          </span>
                        ) : (
                          <div className="flex items-baseline font-mono text-xs">
                            <span className="font-serif text-md font-bold text-stone-900">{course.price} €</span>
                            <span className="text-[10px] text-stone-400"> / séance</span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant={isUserBooked ? "secondary" : isFull ? "ghost" : "primary"}
                        onClick={() => handleOpenBooking(course)}
                        disabled={isFull && !isUserBooked}
                        size="sm"
                      >
                        {isUserBooked ? 'Réservé ✓' : isFull ? 'Complet (liste d’attente)' : 'Réserver'}
                      </Button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Mentors (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-cream-100/40 border border-cream-200/50 rounded-2xl p-6 space-y-6">
            <h2 className="font-serif text-xl font-semibold text-stone-900 pb-2 border-b border-stone-200/50">
              Nos Mentors & Instructeurs
            </h2>

            <div className="space-y-6">
              {instructors.map((inst, idx) => (
                <div key={idx} className="space-y-2 last:border-none border-b border-stone-200/30 pb-4 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-sage-500 text-cream-50 font-bold text-xs flex items-center justify-center shadow-inner">
                        {inst.letter}
                      </div>
                      <h3 className="font-serif text-sm font-semibold text-stone-900">
                        {inst.name}
                      </h3>
                    </div>
                    
                    {/* Mock rating stars */}
                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                      <Star size={11} className="fill-amber-500 mr-0.5" />
                      <span>{inst.rating}</span>
                    </div>
                  </div>

                  <p className="text-[10px] uppercase font-mono tracking-wider text-sage-700 font-semibold leading-none">
                    {inst.discipline}
                  </p>
                  
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {inst.bio}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Location badge */}
            <div className="bg-cream-200/40 rounded-xl p-4 border border-cream-200 text-xs text-stone-600 space-y-2">
              <span className="font-semibold block text-[#1a3328] font-serif">Salle Paris 11ème</span>
              <p className="font-light">Tous nos cours collectifs se déroulent dans nos studios intérieurs ou de façon éphémère sur notre terrasse forestière.</p>
            </div>

          </div>
        </div>

      </div>

      {/* 4. BOOKING MODAL */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={bookingStep === 'success' ? "Votre place vous attend !" : "Réservations — Étape finale"}
      >
        {selectedCourse && (
          <div className="space-y-6">
            
            {bookingStep === 'checkout' ? (
              <>
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
                    Animateur : <b>{selectedCourse.instructorName}</b> · Le {formatDateFrench(selectedCourse.date)} à <b>{selectedCourse.time}</b> ({selectedCourse.duration} min)
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Calcul des crédits de réservation
                  </h5>

                  {!isAuthenticated ? (
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-800 flex items-start space-x-2">
                      <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                      <span>
                        Vous n’êtes pas connecté. Pour valider votre participation, veuillez continuer vers l’espace de connexion. Le système mémorisera votre choix.
                      </span>
                    </div>
                  ) : (
                    <>
                      {user?.membership === 'none' || selectedCourse.discipline === 'atelier' ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm p-4 bg-stone-100 rounded-xl border border-stone-200">
                            <div>
                              <p className="font-semibold text-stone-800">Séance drop-in (unitaire)</p>
                              <p className="text-[11px] text-stone-400 font-light">Matériel louable séparément</p>
                            </div>
                            <span className="font-serif font-bold text-lg text-sage-900">
                              {selectedCourse.price} €
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-stone-400 font-mono text-center">
                            En confirmant, vous autorisez la transaction bancaire de simulée ({selectedCourse.price}€).
                          </p>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 text-xs text-emerald-800 flex items-start space-x-2">
                          <Check size={14} className="mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Réservation incluse (Forfait validé)</p>
                            <p className="mt-0.5 font-light">
                              Grâce à votre pass mensuel <b>« {user?.membership} »</b>, ce cours est entièrement gratuit.
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

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
                    onClick={handleConfirmReservation}
                  >
                    {!isAuthenticated ? "Se connecter" : "Valider l’inscription (Simulation)"}
                  </Button>
                </div>
              </>
            ) : (
              /* Success Flow */
              <div className="text-center space-y-6 py-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check size={32} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-xl font-semibold text-stone-900">
                    C’est réservé !
                  </h4>
                  <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
                    Votre billet virtuel a été envoyé à {user?.email}. Retrouvez l’historique dans votre espace de profil.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={downloadICSFile}
                  >
                    <Download size={14} className="mr-2" />
                    <span>Synchroniser mon calendrier</span>
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

export default Cours;
