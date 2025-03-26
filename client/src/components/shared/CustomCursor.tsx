import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const mouseMoveEvent = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Check if device has a mouse (non-touch device)
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    
    if (!hasCoarsePointer) {
      window.addEventListener("mousemove", mouseMoveEvent);
      
      // Add hover effect to cursor when hovering over interactive elements
      const hoverableElements = document.querySelectorAll(
        "a, button, .hover-target, input, textarea"
      );

      hoverableElements.forEach((element) => {
        element.addEventListener("mouseenter", () => setCursorHovered(true));
        element.addEventListener("mouseleave", () => setCursorHovered(false));
      });
    }

    return () => {
      if (!hasCoarsePointer) {
        window.removeEventListener("mousemove", mouseMoveEvent);
        
        const hoverableElements = document.querySelectorAll(
          "a, button, .hover-target, input, textarea"
        );
        
        hoverableElements.forEach((element) => {
          element.removeEventListener("mouseenter", () => setCursorHovered(true));
          element.removeEventListener("mouseleave", () => setCursorHovered(false));
        });
      }
    };
  }, []);

  // Check if device has a mouse (non-touch device)
  const hasCoarsePointer = typeof window !== 'undefined' 
    ? window.matchMedia("(pointer: coarse)").matches 
    : true;

  if (hasCoarsePointer) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary dark:bg-blue-400 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary dark:border-blue-400 rounded-full pointer-events-none z-[9998]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorHovered ? 1.5 : 1,
          backgroundColor: cursorHovered ? "rgba(0, 98, 255, 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 200,
          damping: 20,
        }}
      />
    </>
  );
};

export default CustomCursor;
