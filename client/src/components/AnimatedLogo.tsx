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
  
  // Size classes - increased size for more prominence
  const sizeClasses = {
    small: "text-3xl md:text-4xl",
    medium: "text-4xl md:text-5xl",
    large: "text-5xl md:text-6xl"
  };
  
  // Effect for continuous animation
  useEffect(() => {
    if (!interactive || isHovered) return;
    
    const animationInterval = setInterval(() => {
      setGradientPosition(prev => (prev + 1) % 100);
    }, 40); // Slightly faster base animation
    
    return () => clearInterval(animationInterval);
  }, [interactive, isHovered]);
  
  // Effect for hover animation
  useEffect(() => {
    if (!isHovered) return;
    
    const animationInterval = setInterval(() => {
      setGradientPosition(prev => (prev + 4) % 100);
    }, 20); // Even faster animation on hover for more dramatic effect
    
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
          bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 
          dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-500 dark:to-emerald-500
          text-transparent bg-clip-text transition-all duration-300 font-extrabold tracking-wider
          ${isHovered ? 'scale-110 transform' : ''}
        `}
      >
        ADTS
      </span>
      <div className="text-sm md:text-base font-normal mt-1 text-primary dark:text-blue-400 transition-colors">
        Tailoring Your IT Requirements
      </div>
    </div>
  );
}