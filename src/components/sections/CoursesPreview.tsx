import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, User2, Users } from 'lucide-react';
import { courses } from '../../data/courses';
import { useAuth } from '../../context/AuthContext';
import { formatDateFrench } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

interface CoursesPreviewProps {
  onOpenBookingModal?: (course: any) => void;
}

export const CoursesPreview: React.FC<CoursesPreviewProps> = ({ onOpenBookingModal }) => {
  const navigate = useNavigate();
  const { isAuthenticated, addBooking, bookings } = useAuth();

  // Get next 5 courses starting from today
  const previewCourses = courses.slice(0, 5);

  const getDisciplineBadges = (discipline: string) => {
    switch (discipline) {
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

  const handleBooking = (course: typeof courses[0]) => {
    if (onOpenBookingModal) {
      onOpenBookingModal(course);
      return;
    }

    // Fallback simple booking flow
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour réserver un cours.');
      navigate(`/connexion?returnUrl=cours`);
      return;
    }

    const alreadyBooked = bookings.some(b => b.courseId === course.id && b.status !== 'cancelled');
    if (alreadyBooked) {
      toast.success('Vous avez déjà réservé ce cours ! Retrouvez-le sur votre profil.');
      return;
    }

    const success = addBooking({
      courseId: course.id,
      courseTitle: course.title,
      discipline: course.discipline,
      instructorName: course.instructorName,
      date: course.date,
      time: course.time
    });

    if (success) {
      toast.success(`Séance "${course.title}" réservée avec succès !`);
    } else {
      toast.error('Erreur lors de la réservation.');
    }
  };

  return (
    <section className="py-20 bg-stone-100/30 border-b border-stone-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sage-500 block mb-2">Planification</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">Prochains cours collectifs</h2>
            <p className="text-sm font-light text-stone-500 mt-1">Rejoignez une session et apprenez à grimper en pleine présence.</p>
          </div>
          <Link
            to="/cours"
            className="group inline-flex items-center space-x-1.5 text-sm font-medium text-sage-700 hover:text-sage-900 transition-colors py-1"
          >
            <span>Voir tous les cours de la quinzaine</span>
            <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Horizontal scroll card list */}
        <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
          {previewCourses.map((course) => {
            const discInfo = getDisciplineBadges(course.discipline);
            const spotsRemaining = course.spotsMax - course.spotsTaken;
            const percentageFull = (course.spotsTaken / course.spotsMax) * 100;
            const isFull = spotsRemaining <= 0;
            const isUserBooked = bookings.some(b => b.courseId === course.id && b.status !== 'cancelled');

            return (
              <div
                key={course.id}
                className="flex-shrink-0 w-80 bg-cream-50 rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group relative"
              >
                
                {/* Upper Tag Row */}
                <div className="flex justify-between items-center mb-4">
                  <Badge variant={discInfo.style}>{discInfo.label}</Badge>
                  <span className="text-xs font-mono text-stone-400">
                    {course.duration} min
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-sage-700 transition-colors line-clamp-2 h-14">
                    {course.title}
                  </h3>

                  {/* Instructor circle details */}
                  <div className="flex items-center space-x-2 text-xs text-stone-500">
                    <div className="h-6 w-6 rounded-full bg-sage-500 text-cream-50 flex items-center justify-center font-bold text-[10px]">
                      {course.instructorAvatar}
                    </div>
                    <span>Avec {course.instructorName}</span>
                  </div>
                </div>

                {/* Planning Details */}
                <div className="border-t border-dashed border-stone-200 pt-3 space-y-2 text-xs text-stone-600 mb-4 font-mono">
                  <div className="flex items-center">
                    <Clock size={12} className="text-stone-400 mr-2" />
                    <span>{formatDateFrench(course.date)} · <b className="text-[#1A3328] font-normal">{course.time}</b></span>
                  </div>
                  
                  {/* Spots indicator */}
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="flex items-center text-stone-400">
                        <Users size={11} className="mr-1" />
                        Disponibilité
                      </span>
                      <span className={cn(isFull ? "text-red-500" : "text-sage-700", "font-semibold")}>
                        {isFull ? 'Complet' : `${spotsRemaining} / ${course.spotsMax} places`}
                      </span>
                    </div>

                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isFull ? "bg-red-400" : "bg-sage-500"
                        )}
                        style={{ width: `${percentageFull}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Trigger Button */}
                <Button
                  onClick={() => handleBooking(course)}
                  variant={isUserBooked ? "secondary" : isFull ? "ghost" : "primary"}
                  disabled={isFull && !isUserBooked}
                  className="w-full"
                  size="sm"
                >
                  {isUserBooked ? 'Réservé ✓' : isFull ? 'Liste d\'attente' : 'Réserver'}
                </Button>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default CoursesPreview;
