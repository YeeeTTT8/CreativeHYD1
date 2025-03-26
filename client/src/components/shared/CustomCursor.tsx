import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorClicked, setCursorClicked] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'link'>('default');

  useEffect(() => {
    const mouseMoveEvent = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDownEvent = () => setCursorClicked(true);
    const mouseUpEvent = () => setCursorClicked(false);

    // Check if device has a mouse (non-touch device)
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    
    if (!hasCoarsePointer) {
      window.addEventListener("mousemove", mouseMoveEvent);
      window.addEventListener("mousedown", mouseDownEvent);
      window.addEventListener("mouseup", mouseUpEvent);
      
      // Add hover effect to cursor when hovering over interactive elements
      const hoverableElements = document.querySelectorAll(
        "a, button, .hover-target, [role='button']"
      );

      const textElements = document.querySelectorAll(
        "input, textarea, [contenteditable='true']"
      );

      const handleMouseEnter = (element: Element) => {
        setCursorHovered(true);
        if (Array.from(textElements).some(el => el === element)) {
          setCursorType('text');
        } else {
          setCursorType('link');
        }
      };

      const handleMouseLeave = () => {
        setCursorHovered(false);
        setCursorType('default');
      };

      hoverableElements.forEach((element) => {
        element.addEventListener("mouseenter", () => handleMouseEnter(element));
        element.addEventListener("mouseleave", handleMouseLeave);
      });

      textElements.forEach((element) => {
        element.addEventListener("mouseenter", () => handleMouseEnter(element));
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    return () => {
      if (!hasCoarsePointer) {
        window.removeEventListener("mousemove", mouseMoveEvent);
        window.removeEventListener("mousedown", mouseDownEvent);
        window.removeEventListener("mouseup", mouseUpEvent);
        
        const hoverableElements = document.querySelectorAll(
          "a, button, .hover-target, [role='button']"
        );
        
        const textElements = document.querySelectorAll(
          "input, textarea, [contenteditable='true']"
        );
        
        const handleMouseEnter = (element: Element) => {
          setCursorHovered(true);
          if (Array.from(textElements).some(el => el === element)) {
            setCursorType('text');
          } else {
            setCursorType('link');
          }
        };

        const handleMouseLeave = () => {
          setCursorHovered(false);
          setCursorType('default');
        };
        
        hoverableElements.forEach((element) => {
          element.removeEventListener("mouseenter", () => handleMouseEnter(element));
          element.removeEventListener("mouseleave", handleMouseLeave);
        });

        textElements.forEach((element) => {
          element.removeEventListener("mouseenter", () => handleMouseEnter(element));
          element.removeEventListener("mouseleave", handleMouseLeave);
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
      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorClicked ? 0.5 : 1,
        }}
        transition={{
          x: { type: "spring", mass: 0.1, stiffness: 1000, damping: 30 },
          y: { type: "spring", mass: 0.1, stiffness: 1000, damping: 30 },
          scale: { type: "spring", stiffness: 700, damping: 30 },
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-400 pointer-events-none z-[9998] opacity-80"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorHovered ? (cursorType === 'link' ? 1.8 : (cursorType === 'text' ? 0.5 : 1)) : 1,
          opacity: cursorHovered ? (cursorType === 'text' ? 0 : 1) : 1,
          borderWidth: cursorClicked ? "2px" : "1px",
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 150,
          damping: 15,
        }}
      />

      {/* Laser tracer effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] opacity-10"
        style={{
          height: 1,
          width: '100vw',
          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)',
          translateY: "-50%",
        }}
        animate={{
          y: mousePosition.y,
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          y: { type: "spring", mass: 0.1, stiffness: 200, damping: 20 },
          opacity: { duration: 2, repeat: Infinity },
        }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] opacity-10"
        style={{
          width: 1, 
          height: '100vh',
          background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)',
          translateX: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          x: { type: "spring", mass: 0.1, stiffness: 200, damping: 20 },
          opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        }}
      />

      {/* Custom cursor for links */}
      {cursorHovered && cursorType === 'link' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 1,
            opacity: 1,
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            mass: 0.4,
            stiffness: 200,
            damping: 20,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Subtle glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full bg-blue-400 opacity-10 blur-xl"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          width: 70,
          height: 70,
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 120,
          damping: 20,
        }}
      />
    </>
  );
};

export default CustomCursor;
