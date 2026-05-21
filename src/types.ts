export type MembershipType = 'none' | 'découverte' | 'régulier' | 'communauté';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  membership: MembershipType;
  joinedDate: string;
}

export interface Booking {
  courseId: string;
  courseTitle: string;
  discipline: string;
  instructorName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'waiting' | 'cancelled';
}

export interface Rental {
  id: string;
  name: string;
  pricePerSession: number;
  pricePerMonthMember: number;
  size: string;
  date: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  favorites: string[]; // video IDs
  bookings: Booking[];
  rentals: Rental[];
}

export interface Course {
  id: string;
  title: string;
  discipline: 'escalade' | 'yoga' | 'pilates' | 'atelier';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  instructorName: string;
  instructorAvatar: string;
  date: string;
  time: string;
  duration: number; // in mins
  spotsTaken: number;
  spotsMax: number;
  price: number;
  inclusAbonnement: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  type: 'Technique' | 'Échauffement' | 'Récupération' | 'Yoga' | 'Force' | 'Mental';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  premium: boolean;
  views: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  period: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface Equipment {
  id: string;
  name: string;
  pricePerSession: number;
  pricePerMonthMember: number;
  description: string;
  icon: string; // Lucide icon name
  sizes?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  membership: string;
  text: string;
  avatarLetter: string;
}
