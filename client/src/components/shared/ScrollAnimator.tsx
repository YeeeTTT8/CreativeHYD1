import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Main ScrollAnimator component (simplified)
const ScrollAnimator = ({ 
  children, 
  className = '', 
  delay = 0,
  distance = 50,
  direction = 'up',
}: { 
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  
  // Set initial and animate properties based on direction
  const getDirectionProps = () => {
    switch (direction) {
      case 'up':
        return { 
          initial: { y: distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'down':
        return { 
          initial: { y: -distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'left':
        return { 
          initial: { x: -distance, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      case 'right':
        return { 
          initial: { x: distance, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      default:
        return { 
          initial: { y: distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
    }
  };
  
  const { initial, animate } = getDirectionProps();
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Text reveal component (simplified)
export const TextReveal = ({ 
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);
  
  return (
    <motion.div
      ref={setRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Scroll progress indicator for the page
export const ScrollProgress = ({
  color = 'var(--primary)',
  height = 4,
}: {
  color?: string;
  height?: number;
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left z-50"
      style={{
        scaleX,
        backgroundColor: color,
        height,
      }}
    />
  );
};

export default ScrollAnimator;