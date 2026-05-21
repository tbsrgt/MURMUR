import { MembershipPlan } from '../types';

export const plans: MembershipPlan[] = [
  {
    id: 'decouverte',
    name: 'Pass Séance',
    price: '18 €',
    priceNum: 18,
    period: 'séance',
    description: 'Une entrée libre sans engagement pour grimper dans nos secteurs de dalles et de dévers marbrés.',
    features: [
      'Accès libre illimité sur la journée à tous les blocs d’escalade',
      'Accès libre à l’espace de musculation & Pan Güllich',
      'Accès aux douches chaudes et au sauna scandinave traditionnel',
      'Location de chaussons en option (+5€ Scarpa/La Sportiva)',
      'Accès gratuit au réseau Wi-Fi haut débit et espace café'
    ]
  },
  {
    id: 'regulier',
    name: 'Abonnement Liberté',
    price: '65 €',
    priceNum: 65,
    period: 'mois',
    description: 'Accès illimité pour les grimpeurs réguliers. Sans engagement de durée, résiliable en un clic.',
    features: [
      'Accès illimité 7j/7 de 7h00 à 23h00 à tous nos secteurs de bloc',
      'Accès prioritaire à notre espace d’entraînement technique & Kilter Board',
      'Location de chaussons techniques incluse (2 fois par mois)',
      'Accès complet au sauna traditionnel illimité',
      '10% de réduction sur tout le Corner Shop & notre Barista Bar',
      'Badge d’accès numérique NFC instantané sur votre smartphone'
    ],
    badge: 'Recommandé'
  },
  {
    id: 'communaute',
    name: 'Club murmur.',
    price: '690 €',
    priceNum: 690,
    period: 'an',
    description: 'La formule ultime pour les passionnés. Le meilleur tarif lisé à l’année pour vivre murmur. à fond.',
    features: [
      'Accès total 365 jours / an avec badge physique RFID personnalisé',
      'Location de matériel (chaussons Scarpa, magnésie liquide) 100% gratuite et illimitée',
      '2 Entrées d’invités gratuites offertes par mois pour initier vos proches',
      'Cours collectifs de perfectionnement technique & physique illimités',
      'Accès VIP aux sessions d’ouverture privées et événements communautaires',
      'Bilan d’évaluation biométrique trimestriel avec un coach diplômé',
      'Accès en avance de 24h aux reset hebdomadaires de blocs (cotations exclusives)'
    ],
    badge: 'Meilleur Tarif'
  }
];
