import React, { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

export default function AnimatedLogo({ 
  className = "", 
  size = "medium", 
  interactive = true 
}: AnimatedLogoProps) {
  // State to track animation progress
  const [gradientPosition, setGradientPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl"
  };
  
  // Effect for continuous animation
  useEffect(() => {
    if (!interactive || isHovered) return;
    
    const animationInterval = setInterval(() => {
      setGradientPosition(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(animationInterval);
  }, [interactive, isHovered]);
  
  // Effect for hover animation
  useEffect(() => {
    if (!isHovered) return;
    
    const animationInterval = setInterval(() => {
      setGradientPosition(prev => (prev + 3) % 100);
    }, 30);
    
    return () => clearInterval(animationInterval);
  }, [isHovered]);
  
  // Dynamic gradient styles
  const gradientStyle = {
    backgroundSize: '200% 200%',
    backgroundPosition: `${gradientPosition}% 0%`,
    transition: 'background-position 0.2s ease'
  };
  
  return (
    <div 
      className={`font-bold ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <span 
        style={gradientStyle}
        className={`
          bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-400 
          dark:bg-gradient-to-r dark:from-blue-500 dark:via-blue-400 dark:to-emerald-300
          text-transparent bg-clip-text transition-all duration-300
          ${isHovered ? 'scale-105 transform' : ''}
        `}
      >
        ADTS
      </span>
      <div className={`text-sm md:text-base font-normal mt-1 ${isHovered ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} transition-colors`}>
        Tailoring Your IT Requirements
      </div>
    </div>
  );
}