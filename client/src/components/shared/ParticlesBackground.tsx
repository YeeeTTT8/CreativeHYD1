import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  type: 'circle' | 'square' | 'triangle' | 'line';
  delay: number;
}

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      // Check if dark mode is active by checking the html element for the dark class
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Initial check
    checkTheme();
    
    // Setup an observer to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const types: ('circle' | 'square' | 'triangle' | 'line')[] = ['circle', 'square', 'triangle', 'line'];
      
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * 360,
          type: types[Math.floor(Math.random() * types.length)],
          delay: Math.random() * 2
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  // Create grid lines
  const gridLines = [];
  const gridSize = 30;
  const gridColor = isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.07)";
  const gridOpacity = isDarkMode ? 0.2 : 0.15;
  
  for (let i = 1; i < gridSize; i++) {
    const position = `${(i / gridSize) * 100}%`;
    
    // Horizontal lines
    gridLines.push(
      <motion.line
        key={`h-${i}`}
        x1="0%"
        y1={position}
        x2="100%"
        y2={position}
        strokeWidth="0.5"
        stroke={gridColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridOpacity }}
        transition={{ duration: 1, delay: i * 0.05 }}
      />
    );
    
    // Vertical lines
    gridLines.push(
      <motion.line
        key={`v-${i}`}
        x1={position}
        y1="0%"
        x2={position}
        y2="100%"
        strokeWidth="0.5"
        stroke={gridColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridOpacity }}
        transition={{ duration: 1, delay: i * 0.05 }}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid backdrop */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-70">
        {gridLines}
      </svg>
      
      {/* Particles */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <radialGradient id="particle-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {particles.map((particle, index) => (
          <motion.g
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: particle.opacity,
              scale: 1,
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              rotate: [0, particle.rotation]
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{ 
              transformOrigin: 'center',
              filter: 'url(#glow)'
            }}
          >
            {particle.type === 'circle' && (
              <circle
                cx={`${particle.x}%`}
                cy={`${particle.y}%`}
                r={particle.size}
                fill="url(#particle-gradient)"
              />
            )}
            
            {particle.type === 'square' && (
              <rect
                x={`${particle.x - particle.size/2}%`}
                y={`${particle.y - particle.size/2}%`}
                width={`${particle.size * 2}px`}
                height={`${particle.size * 2}px`}
                fill="url(#particle-gradient)"
              />
            )}
            
            {particle.type === 'triangle' && (
              <polygon
                points={`
                  ${particle.x}% ${particle.y - particle.size}%,
                  ${particle.x - particle.size}% ${particle.y + particle.size}%,
                  ${particle.x + particle.size}% ${particle.y + particle.size}%
                `}
                fill="url(#particle-gradient)"
              />
            )}
            
            {particle.type === 'line' && (
              <line
                x1={`${particle.x - particle.size * 2}%`}
                y1={`${particle.y}%`}
                x2={`${particle.x + particle.size * 2}%`}
                y2={`${particle.y}%`}
                strokeWidth={particle.size / 2}
                stroke="rgba(59, 130, 246, 0.4)"
              />
            )}
          </motion.g>
        ))}
        
        {/* Large glow spheres */}
        <motion.circle
          cx="30%"
          cy="70%"
          r="100"
          fill="url(#particle-gradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
        />
        
        <motion.circle
          cx="70%"
          cy="30%"
          r="120"
          fill="url(#particle-gradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
      
      {/* Light streaks */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              opacity: 0.2
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: 1, 
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 5 + i,
              delay: i * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticlesBackground;