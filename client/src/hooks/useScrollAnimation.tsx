import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  variants?: Variants;
  delay?: number;
}

export const useScrollAnimation = ({
  threshold = 0.2,
  triggerOnce = true,
  rootMargin = "0px",
  delay = 0,
  variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
}: ScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, delay);
    } else {
      controls.start('hidden');
    }
  }, [controls, inView, delay]);

  return {
    ref,
    controls,
    variants,
    inView
  };
};

// Staggered animations for list items
export const useStaggeredAnimation = (
  itemCount: number, 
  staggerDelay: number = 0.1,
  baseDelay: number = 0
) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return {
    ref,
    controls,
    containerVariants,
    itemVariants
  };
};

// Text reveal animation
export const useTextRevealAnimation = () => {
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });
  
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: 1
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  useEffect(() => {
    if (inView && !isComplete) {
      controls.start('visible').then(() => {
        setIsComplete(true);
      });
    }
  }, [controls, inView, isComplete]);
  
  const splitText = (text: string) => {
    return (
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="inline-block"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index + '-' + char}
            variants={letterVariants}
            className="inline-block"
            style={{
              transformOrigin: 'bottom',
              display: char === ' ' ? 'inline' : 'inline-block'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };
  
  return {
    splitText,
    isComplete,
    inView
  };
};

// Page transition animation
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeInOut" 
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: "easeInOut" 
    }
  }
};