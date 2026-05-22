import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Clock, Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-900 text-cream-100/90 pt-16 pb-12 border-t border-sage-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1 - Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Logo className="h-[18px] sm:h-[20px] md:h-[22px] lg:h-[25px] xl:h-[28px] w-auto text-white hover:text-stone-300 transition-colors" />
          </div>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            Club d’escalade de bloc haut de gamme, espace d’entraînement technique et barista bar de spécialité au cœur de Paris 11. Conçu pour le mouvement et la performance physique.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-stone-800 rounded-full hover:bg-terracotta-500 hover:text-white transition-all text-stone-300"
              aria-label="Suivre sur Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://strava.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-stone-800 rounded-full text-xs font-semibold uppercase hover:bg-terracotta-500 hover:text-white transition-all text-stone-300"
            >
              Strava
            </a>
          </div>
        </div>

        {/* Column 2 - Useful links */}
        <div>
          <h4 className="font-serif text-lg font-medium text-cream-100 mb-4 tracking-wide border-b border-sage-800 pb-2">
            Notre Univers
          </h4>
          <ul className="space-y-2.5 text-xs text-cream-100/70">
            <li>
              <Link to="/cours" className="hover:text-terracotta-300 transition-colors">Cours & Activités</Link>
            </li>
            <li>
              <Link to="/abonnements" className="hover:text-terracotta-300 transition-colors">Tarifs & Forfaits</Link>
            </li>
            <li>
              <Link to="/location" className="hover:text-terracotta-300 transition-colors">Boutique & Location</Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-terracotta-300 transition-colors">Vidéothèque Premium</Link>
            </li>
            <li>
              <Link to="/essai" className="hover:text-terracotta-300 transition-colors">Réserver un essai gratuit</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Practical info */}
        <div>
          <h4 className="font-serif text-lg font-medium text-cream-100 mb-4 tracking-wide border-b border-sage-800 pb-2">
            Pratique
          </h4>
          <ul className="space-y-3 text-xs text-cream-100/70">
            <li className="flex items-start space-x-2">
              <MapPin size={14} className="text-terracotta-100 mt-0.5" />
              <span>
                18 Rue de la Glacière-Fictive,<br />
                75011 Paris, France
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock size={14} className="text-terracotta-100 mt-0.5" />
              <span>
                7j/7: 09h00 - 23h30
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact / Newsletter Teaser */}
        <div>
          <h4 className="font-serif text-lg font-medium text-cream-100 mb-4 tracking-wide border-b border-sage-800 pb-2">
            Le Sanctuaire
          </h4>
          <p className="text-xs text-cream-100/70 leading-relaxed mb-4">
            Besoin d’un diagnostic ou des questions sur nos abonnements collectifs ? N’hésitez pas à nous écrire.
          </p>
          <a
            href="mailto:contact@murmur.fr"
            className="inline-block text-xs font-semibold bg-terracotta-500 text-white px-4 py-2 rounded-xl hover:bg-terracotta-700 transition-colors uppercase tracking-wider text-center w-full"
          >
            CONTACT@MURMUR.FR
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800 my-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500">
        <div>
          &copy; {new Date().getFullYear()} murmur. Bouldering Club Paris. Tous droits réservés.
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#legal" className="hover:text-cream-100 transition-colors">Mentions Légales</a>
          <a href="#cgu" className="hover:text-cream-100 transition-colors font-light">CGU & Confidentialité</a>
        </div>
        <div className="flex items-center space-x-1 mt-3 sm:mt-0 bg-sage-800 px-3 py-1 rounded-full text-cream-100">
          <span>Fait avec</span>
          <Heart size={10} className="text-red-400 fill-red-400 mx-0.5" />
          <span>et de la magnésie</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
