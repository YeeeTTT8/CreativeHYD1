import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Simple fade-in component for sections
const FadeInSection = ({
  id,
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.section
      id={id}
      className={className}
      initial={getInitialPosition()}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }
      }}
      viewport={{ once: true, margin: "-100px 0px" }}
    >
      {children}
    </motion.section>
  );
};

// Staggered container component
export const StaggerContainer = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'div' | 'section' | 'ul' | 'ol' | 'li';
}) => {
  const Component = motion[as];
  
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren: staggerDelay,
          }
        }
      }}
    >
      {children}
    </Component>
  );
};

// Item for stagger container
export const StaggerItem = ({
  children,
  className = '',
  direction = 'up',
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}) => {
  const getPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...getPosition() },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;