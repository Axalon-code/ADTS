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
    
    // Create a more prominent, slower breathing effect
    const breath = () => {
      const time = Date.now() / 2000; // Medium cycle - takes about 2 seconds for one cycle
      const position = Math.sin(time) * 50 + 50; // Oscillate between 0 and 100
      setGradientPosition(position);
    };
    
    const animationInterval = setInterval(breath, 30);
    
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
  
  // Breathing effect calculation - significantly increased amplitude for very noticeable effect
  const breathScale = isHovered ? 1.15 : 1 + Math.sin(gradientPosition * 0.0314) * 0.15;
  
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
        style={{
          ...gradientStyle,
          transform: `scale(${breathScale})` 
        }}
        className={`
          inline-flex items-center justify-center gap-3
          transition-all duration-700
        `}
      >
        <svg 
          width={size === 'small' ? '40' : size === 'medium' ? '50' : '60'} 
          height={size === 'small' ? '40' : size === 'medium' ? '50' : '60'} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="power-logo relative top-1"
        >
          <defs>
            <linearGradient id="powerLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0000BD" />
              <stop offset="50%" stopColor="#00C3B9" />
              <stop offset="100%" stopColor="#00FF86" />
            </linearGradient>
          </defs>
          <path 
            d="M12 3.5V10.5M7.5 4.5C5.9 5.4 4 7.6 4 10.9C4 16 8 18.5 12 18.5C16 18.5 20 16 20 10.9C20 7.6 18.1 5.4 16.5 4.5" 
            stroke="url(#powerLogoGradient)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
        </svg>
        <span className="bg-gradient-to-r from-[#0000BD] via-[#00C3B9] to-[#00FF86]
                         dark:bg-gradient-to-r dark:from-[#0000BD] dark:via-[#00C3B9] dark:to-[#00FF86]
                         text-transparent bg-clip-text font-extrabold tracking-wider">
          ADTS
        </span>
      </span>
      <div className="text-sm md:text-base font-semibold mt-1 text-[#0066FF] dark:text-[#0066FF] transition-colors">
        Tailoring Your IT Requirements
      </div>
    </div>
  );
}