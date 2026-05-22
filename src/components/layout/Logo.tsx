import React from 'react';
import customLogo from '../../assets/images/murmur_logo-1.svg';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <img
      src={customLogo}
      alt="murmur. Bouldering Club logo"
      className={className}
    />
  );
};

export default Logo;
