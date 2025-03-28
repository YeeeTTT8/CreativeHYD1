import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ScrollProgress } from '@/components/shared/ScrollAnimator';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface AnimatedLayoutProps {
  children: ReactNode;
  showScrollProgress?: boolean;
  progressColor?: string;
}

const AnimatedLayout = ({ 
  children, 
  showScrollProgress = true,
  progressColor = 'var(--primary)'
}: AnimatedLayoutProps) => {
  const [location] = useLocation();
  const [isReady, setIsReady] = useState(false);
  
  // Wait for component to mount before showing animations
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  if (!isReady) return null;
  
  return (
    <>
      {showScrollProgress && (
        <ScrollProgress color={progressColor} />
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="relative w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// Individual section transition component
interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const SectionTransition = ({ 
  children, 
  id, 
  className = '',
  delay = 0,
}: SectionTransitionProps) => {
  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Staggered child elements
interface StaggerElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const StaggerElement = ({ 
  children, 
  className = '',
  delay = 0,
  distance = 20,
  direction = 'up', 
}: StaggerElementProps) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  
  const initialPosition = directionMap[direction];
  
  const elementVariants = {
    initial: {
      opacity: 0,
      ...initialPosition,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  return (
    <motion.div
      variants={elementVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;