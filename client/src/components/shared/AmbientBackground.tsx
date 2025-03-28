import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const points = useRef<Point[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isDark = useRef(document.documentElement.classList.contains('dark'));
  const [isVisible, setIsVisible] = useState(true);

  const generatePoints = (width: number, height: number) => {
    const newPoints: Point[] = [];
    const pointCount = Math.floor((width * height) / 15000); // Adjust density here
    
    for (let i = 0; i < pointCount; i++) {
      newPoints.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        // Colors based on theme
        color: isDark.current ? 
          `rgba(${180 + Math.random() * 75}, ${180 + Math.random() * 75}, ${255}, 0.8)` : 
          `rgba(${30 + Math.random() * 50}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, 0.7)`,
        alpha: 0.1 + Math.random() * 0.4
      });
    }
    
    return newPoints;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw points
    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];
      
      // Update position
      point.x += point.vx;
      point.y += point.vy;
      
      // Bounce off edges
      if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
      if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      
      // Mouse interaction - points move away from mouse
      const dx = mousePosition.x - point.x;
      const dy = mousePosition.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (150 - distance) / 1500;
        point.vx -= Math.cos(angle) * force;
        point.vy -= Math.sin(angle) * force;
        
        // Limit velocity
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > 2) {
          point.vx = (point.vx / speed) * 2;
          point.vy = (point.vy / speed) * 2;
        }
      }
      
      // Draw point
      ctx.globalAlpha = point.alpha;
      ctx.fillStyle = point.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Connect nearby points with lines
      for (let j = i + 1; j < points.current.length; j++) {
        const otherPoint = points.current[j];
        const dx = point.x - otherPoint.x;
        const dy = point.y - otherPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = isDark.current 
            ? `rgba(150, 150, 255, ${0.15 * (1 - distance / 100)})` 
            : `rgba(50, 100, 200, ${0.1 * (1 - distance / 100)})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(otherPoint.x, otherPoint.y);
          ctx.stroke();
        }
      }
    }
    
    // Continue animation loop
    animationFrameId.current = requestAnimationFrame(drawCanvas);
  };

  // Initialize canvas and points
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      points.current = generatePoints(canvas.width, canvas.height);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleThemeChange = () => {
      isDark.current = document.documentElement.classList.contains('dark');
      // Regenerate points with new theme colors
      if (canvas) {
        points.current = generatePoints(canvas.width, canvas.height);
      }
    };
    
    // Setup
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(drawCanvas);
    
    // Check for konami code for easter egg
    let konamiIndex = 0;
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Easter egg activated!
          triggerEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const triggerEasterEgg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a burst of particles
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const burstPoints: Point[] = [];
    const burstCount = 100;
    
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      
      burstPoints.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 5,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        alpha: 0.8 + Math.random() * 0.2
      });
    }
    
    // Temporarily hide the existing points and show burst
    const originalPoints = points.current;
    points.current = burstPoints;
    
    // Animate burst
    let frames = 0;
    const burstAnimation = () => {
      drawCanvas();
      frames++;
      
      if (frames < 120) { // 2 seconds at 60fps
        requestAnimationFrame(burstAnimation);
      } else {
        // Restore original points
        points.current = originalPoints;
      }
    };
    
    burstAnimation();
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isVisible ? 0.5 : 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default AmbientBackground;