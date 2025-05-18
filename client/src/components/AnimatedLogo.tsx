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
  
  // Effect for continuous breathing animation
  useEffect(() => {
    if (!interactive || isHovered) return;
    
    // Create a smoother, slower breathing effect
    const breath = () => {
      const time = Date.now() / 3000; // Slow cycle - takes about 3 seconds for one cycle
      const position = Math.sin(time) * 50 + 50; // Oscillate between 0 and 100
      setGradientPosition(position);
    };
    
    const animationInterval = setInterval(breath, 50);
    
    return () => clearInterval(animationInterval);
  }, [interactive, isHovered]);
  
  // Effect for hover animation - slightly faster breathing
  useEffect(() => {
    if (!isHovered) return;
    
    // Create a slightly faster breathing effect on hover
    const breath = () => {
      const time = Date.now() / 2000; // Faster cycle when hovered
      const position = Math.sin(time) * 50 + 50;
      setGradientPosition(position);
    };
    
    const animationInterval = setInterval(breath, 50);
    
    return () => clearInterval(animationInterval);
  }, [isHovered]);
  
  // Dynamic gradient styles
  const gradientStyle = {
    backgroundSize: '200% 200%',
    backgroundPosition: `${gradientPosition}% 0%`,
    transition: 'background-position 0.5s ease' // Smoother transition
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
          bg-gradient-to-r from-[#0000BD] via-[#00C3B9] to-[#00FF86]
          dark:bg-gradient-to-r dark:from-[#0000BD] dark:via-[#00C3B9] dark:to-[#00FF86]
          text-transparent bg-clip-text transition-all duration-700 font-extrabold tracking-wider
          ${isHovered ? 'scale-105 transform' : ''}
        `}
      >
        ADTS
      </span>
      <div className="text-sm md:text-base font-semibold mt-1 text-[#0066FF] dark:text-[#0066FF] transition-colors">
        Tailoring Your IT Requirements
      </div>
    </div>
  );
}