import { useInView } from 'react-intersection-observer';
import { useAnimation, Variants } from 'framer-motion';
import { useEffect } from 'react';

interface ScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  variants?: Variants;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }
}: ScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return { ref, controls, variants, inView };
};
