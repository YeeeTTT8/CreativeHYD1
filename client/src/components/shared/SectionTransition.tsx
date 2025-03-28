import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Component for smooth transitions between sections
const SectionTransition = ({ 
  children,
  id,
  className = '',
  overlayEffect = true,
  parallaxStrength = 0.2,
  transitionColor = 'var(--primary)',
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  overlayEffect?: boolean;
  parallaxStrength?: number;
  transitionColor?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Create smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
  
  // Transform values for parallax effect
  const y = useTransform(smoothProgress, [0, 1], ["0%", `${parallaxStrength * 100}%`]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.6, 0.9], [0.1, 0.8, 1, 1]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1, 1]);
  
  // For overlay transition effect
  const clipPathProgress = useTransform(
    smoothProgress, 
    [0, 0.3], 
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );
  
  return (
    <motion.div 
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        scale,
        opacity,
      }}
    >
      {/* Background overlay that reveals as you scroll */}
      {overlayEffect && (
        <motion.div 
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ 
            background: `linear-gradient(to bottom, ${transitionColor}10, transparent)`,
            clipPath: clipPathProgress,
          }}
        />
      )}
      
      {/* Content with subtle parallax */}
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

// Component for creating scroll-triggered animations
export const ScrollAnimation = ({
  children,
  className = '',
  threshold = 0.1,
  animation = 'fade',
  direction = 'up',
  distance = 100,
  duration = 0.8,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'stagger';
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
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
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);
  
  // Get animation properties based on type and direction
  const getAnimationProps = () => {
    // Default is fade animation
    let initial: Record<string, any> = { opacity: 0 };
    let animate: Record<string, any> = { opacity: 1 };
    
    if (animation === 'slide' || animation === 'stagger') {
      switch (direction) {
        case 'up':
          initial = { ...initial, y: distance };
          animate = { ...animate, y: 0 };
          break;
        case 'down':
          initial = { ...initial, y: -distance };
          animate = { ...animate, y: 0 };
          break;
        case 'left':
          initial = { ...initial, x: -distance };
          animate = { ...animate, x: 0 };
          break;
        case 'right':
          initial = { ...initial, x: distance };
          animate = { ...animate, x: 0 };
          break;
      }
    }
    
    if (animation === 'scale') {
      initial = { ...initial, scale: 0.8 };
      animate = { ...animate, scale: 1 };
    }
    
    if (animation === 'rotate') {
      initial = { ...initial, rotate: direction === 'left' ? -15 : 15 };
      animate = { ...animate, rotate: 0 };
    }
    
    return { initial, animate };
  };
  
  const { initial, animate } = getAnimationProps();
  
  return (
    <motion.div
      ref={setRef}
      className={className}
      initial={initial}
      animate={isVisible ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;