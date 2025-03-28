import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Animation variants for page transitions
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Component for smooth transitions between pages
interface PageTransitionProps {
  children: ReactNode;
  transitionKey?: string; // Used to trigger transitions
}

const PageTransition = ({ children, transitionKey }: PageTransitionProps) => {
  return (
    <motion.div
      key={transitionKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;