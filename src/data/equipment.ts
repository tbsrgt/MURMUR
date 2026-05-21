import { Equipment } from '../types';

export const equipmentList: Equipment[] = [
  {
    id: 'shoes',
    name: 'Chaussons d\'escalade',
    pricePerSession: 5,
    pricePerMonthMember: 0, // special rules apply: Inclus 2x (Régulier) / Illimité (Communauté)
    description: 'Modèles premium de la marque La Sportiva & Scarpa. Tailles 35-47 disponibles. Désinfectés et séchés à l\'ozone après chaque usage.',
    icon: 'Footprints',
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47']
  },
  {
    id: 'harness',
    name: 'Baudrier confort',
    pricePerSession: 3,
    pricePerMonthMember: 2,
    description: 'Baudriers ergonomiques Petzl rembourrés avec boucles de serrage rapides pour une sécurité optimale. Tailles XS à XL.',
    icon: 'ShieldAlert',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'chalk_bag',
    name: 'Sac à magnésie',
    pricePerSession: 2,
    pricePerMonthMember: 1,
    description: 'Petit sac à magnésie avec ceinturon réglable, intérieur doublé polaire pour une répartition uniforme.',
    icon: 'Briefcase',
    sizes: ['Taille Unique']
  },
  {
    id: 'chalk_powder',
    name: 'Magnésie biologique liquide/poudre',
    pricePerSession: 2,
    pricePerMonthMember: 0,
    description: 'Une magnésie végétale pure, éco-responsable, sans additifs pour préserver l\'air intérieur de notre salle et votre peau.',
    icon: 'Sparkles',
    sizes: ['100g Poudre', '50ml Liquide']
  },
  {
    id: 'full_kit',
    name: 'Kit complet Dévers',
    pricePerSession: 8,
    pricePerMonthMember: 5,
    description: 'L\'essentiel en pack : chaussons d\'escalade sélectionnés pour votre niveau, baudrier Petzl confort, et sac à magnésie biologique.',
    icon: 'Package',
    sizes: ['Kit Standard']
  }
];
