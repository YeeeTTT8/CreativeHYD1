import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const ParticlesBackground = () => {
  const particles = [
    { x: "10%", y: "10%", size: 80, delay: 0 },
    { x: "20%", y: "30%", size: 120, delay: 1 },
    { x: "70%", y: "90%", size: 100, delay: 2 },
    { x: "80%", y: "20%", size: 70, delay: 0.5 },
    { x: "40%", y: "60%", size: 110, delay: 1.5 },
    { x: "90%", y: "30%", size: 90, delay: 0.2 },
  ];

  return (
    <svg className="absolute top-0 left-0 w-full h-full">
      {particles.map((particle, index) => (
        <motion.circle
          key={index}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          className="fill-blue-200/20 dark:fill-blue-900/20"
          animate={{
            y: ['-20px', '20px', '-20px'],
          }}
          transition={{
            duration: 6,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
};

export default ParticlesBackground;
