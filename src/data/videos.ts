import { Video } from '../types';

export const videos: Video[] = [
  // FREE VIDEOS (6)
  {
    id: 'v1',
    title: 'Introduction à l\'Escalade de Bloc moderne',
    description: 'Apprenez les règles de sécurité fondamentales en salle de bloc, comment chuter en toute sécurité pour éviter les blessures, et comment lire vos premiers tracés de couleur.',
    duration: '08:45',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Débutant',
    premium: false,
    views: 1240
  },
  {
    id: 'v2',
    title: 'Comment bien choisir et ajuster ses chaussons',
    description: 'Choisir la bonne cambrure, le bon niveau de rigidité et la taille idéale. La différence de sensation entre le cuir et le synthétique décryptée pour vos futures ascensions.',
    duration: '06:12',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Débutant',
    premium: false,
    views: 890
  },
  {
    id: 'v3',
    title: 'Échauffement complet des doigts en 5 minutes',
    description: 'Une routine express indispensable avant d\'attaquer votre séance de grimpe pour lubrifier les articulations et chauffer les tendons des poulies sans matériel.',
    duration: '05:30',
    instructor: 'Léa R.',
    type: 'Échauffement',
    level: 'Débutant',
    premium: false,
    views: 2310
  },
  {
    id: 'v4',
    title: 'Détente douce du dos après l\'effort',
    description: 'Soulagez les tensions accumulées dans les trapèzes, les lombaires et le grand dorsal après une session intense. Des postures simples de yoga restauratif accessibles à tous.',
    duration: '09:15',
    instructor: 'Sophie B.',
    type: 'Récupération',
    level: 'Tous niveaux',
    premium: false,
    views: 1105
  },
  {
    id: 'v5',
    title: 'Bases de la Cohérence Cardiaque pour le grimpeur',
    description: 'Découvrez la respiration rythmée pour réguler votre système nerveux, calmer le rythme cardiaque avant un passage difficile, et maîtriser l\'afflux soudain d\'adrénaline.',
    duration: '07:40',
    instructor: 'Sophie B.',
    type: 'Mental',
    level: 'Tous niveaux',
    premium: false,
    views: 540
  },
  {
    id: 'v6',
    title: 'Échauffement articulaire général au sol',
    description: 'Activez l\'ensemble du corps (épaules, hanches, genoux et poignets) pour préparer le système cardio-respiratoire avant vos premières tractions ou placements de blocs.',
    duration: '08:00',
    instructor: 'Léa R.',
    type: 'Échauffement',
    level: 'Tous niveaux',
    premium: false,
    views: 1420
  },

  // PREMIUM VIDEOS (14)
  {
    id: 'v7',
    title: 'Technique de Dalle avancée : Adhérence et Flexibilité',
    description: 'Maîtrisez la poussée sur micro-prises de pieds invisibles. Apprenez à faire confiance à la friction de la gomme des chaussons et à transférer sereinement votre centre de gravité.',
    duration: '14:20',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Avancé',
    premium: true,
    views: 420
  },
  {
    id: 'v8',
    title: 'Enchaîner son premier 6b : Clés et Stratégies',
    description: 'Analyse d\'une voie en 6b. Comment trouver les repos partiels cachés, optimiser les placements de pieds en drapeau (flagging), et économiser vos bras dans les passages déversants.',
    duration: '18:50',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Intermédiaire',
    premium: true,
    views: 730
  },
  {
    id: 'v9',
    title: 'Flow Yoga Récupération Post-Grimpe',
    description: 'Un enchaînement fluide conçu spécifiquement pour ouvrir la cage thoracique, étirer les fléchisseurs des doigts, ouvrir les hanches et accélérer la régénération musculaire globale.',
    duration: '22:15',
    instructor: 'Sophie B.',
    type: 'Yoga',
    level: 'Tous niveaux',
    premium: true,
    views: 512
  },
  {
    id: 'v10',
    title: 'Force des baguettes : Entraînement 4 semaines',
    description: 'Programme structuré sur hangboard et poutre d\'entraînement. Exercices de suspension passive/active, sécurité des prises en tendu vs arqué pour renforcer vos doigts en profondeur.',
    duration: '15:10',
    instructor: 'Marc T.',
    type: 'Force',
    level: 'Avancé',
    premium: true,
    views: 340
  },
  {
    id: 'v11',
    title: 'Gainage spécifique escalade : Transfert de force',
    description: 'Renforcement abdominal dynamique. Comment connecter la force du haut du corps avec vos pieds posés sur les volumes extérieurs pour ne pas laisser vos hanches s\'affaisser.',
    duration: '12:35',
    instructor: 'Léa R.',
    type: 'Force',
    level: 'Intermédiaire',
    premium: true,
    views: 650
  },
  {
    id: 'v12',
    title: 'La Peur du Vol : reprogrammer son esprit',
    description: 'Exercices pas à pas pour accepter la chute en toute sérénité. Apprenez à respirer à la limite de votre zone de confort et à faire confiance au système d\'assurage dynamique.',
    duration: '11:45',
    instructor: 'Léa R.',
    type: 'Mental',
    level: 'Tous niveaux',
    premium: true,
    views: 890
  },
  {
    id: 'v13',
    title: 'Ouverture des hanches pour les renvoyés et lolos',
    description: 'Des hanches souples permettent de coller son corps au mur. Apprenez des asanas de yoga ciblés pour améliorer la rotation externe de la hanche et la pose de talons hauts.',
    duration: '16:40',
    instructor: 'Sophie B.',
    type: 'Yoga',
    level: 'Intermédiaire',
    premium: true,
    views: 450
  },
  {
    id: 'v14',
    title: 'Technique dynamique : Le jeté sans appréhension',
    description: 'Démystifiez les mouvements coordonnés et les lancers dynamiques. Comment générer l\'élan depuis vos cuisses pour propulser précisément vos mains vers la prise cible.',
    duration: '13:10',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Avancé',
    premium: true,
    views: 298
  },
  {
    id: 'v15',
    title: 'Gestion de l\'effort et de l\'acide lactique (bouteilles)',
    description: 'Maîtriser la grimpe relâchée. Comment agiter les mains (shaking) pour vider l\'acide lactique, alterner phases explosives et de repos, et augmenter votre rando cardio.',
    duration: '14:55',
    instructor: 'Léa R.',
    type: 'Technique',
    level: 'Intermédiaire',
    premium: true,
    views: 512
  },
  {
    id: 'v16',
    title: 'Flow mental : Entrer dans l\'état de Grâce créative',
    description: 'La grimpe est une méditation en mouvement. Méthodes pour focaliser l\'attention visuelle uniquement sur la ligne, inhiber le bavardage intellectuel interne et libérer l\'instinct corporel.',
    duration: '11:20',
    instructor: 'Sophie B.',
    type: 'Mental',
    level: 'Tous niveaux',
    premium: true,
    views: 310
  },
  {
    id: 'v17',
    title: 'Ménager et renforcer ses coiffes des rotateurs',
    description: 'Exercices préventifs avec bandes de résistance pour stabiliser vos épaules et prévenir le syndrome du "grimpeur bossu" ou les tendinites d\'impact.',
    duration: '10:15',
    instructor: 'Léa R.',
    type: 'Récupération',
    level: 'Tous niveaux',
    premium: true,
    views: 418
  },
  {
    id: 'v18',
    title: 'Mobilité de cheville et transferts de charge ras-du-sol',
    description: 'Un guide exclusif sur le travail des chevilles pour acquérir une flexion extrême en dalle, permettant des appuis stables même en l\'absence de prises évidentes.',
    duration: '13:40',
    instructor: 'Marc T.',
    type: 'Technique',
    level: 'Intermédiaire',
    premium: true,
    views: 275
  },
  {
    id: 'v19',
    title: 'Yoga Vinyasa Énergétique intensif',
    description: 'Une pratique rythmée et exigeante pour développer l\'endurance cardiovasculaire, la force des épaules et la stabilisation globale des articulations à gaine.',
    duration: '25:30',
    instructor: 'Sophie B.',
    type: 'Yoga',
    level: 'Avancé',
    premium: true,
    views: 380
  },
  {
    id: 'v20',
    title: 'Atelier de compression et tenue de plats',
    description: 'Comment pincer des volumes sphériques lisses en utilisant la compression des deux bras. Techniques d\'engagement thoracique pour "coller" à la paroi.',
    duration: '16:05',
    instructor: 'Léa R.',
    type: 'Technique',
    level: 'Avancé',
    premium: true,
    views: 319
  }
];
