import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioItems } from '@/data/portfolio';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const { ref, controls, containerVariants, itemVariants } = useStaggeredAnimation(
    portfolioItems.length,
    0.1,
    0.2
  );

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our creative works, showcasing our expertise in editing and cinematography across various projects.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={index} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface PortfolioItemProps {
  item: {
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
  };
  variants: any;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, variants }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation based on mouse position
    // We divide by 25 to reduce the rotation effect
    const rotateY = (mouseX - centerX) / 25;
    const rotateX = (centerY - mouseY) / 25;
    
    // Calculate highlight position
    const x = ((mouseX - rect.left) / rect.width) * 100;
    const y = ((mouseY - rect.top) / rect.height) * 100;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 h-[400px] group cursor-pointer"
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${item.image})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 transition-opacity duration-300" />
      
      {/* Dynamic highlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255, 255, 255, 0.8), transparent 50%)`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="inline-block px-3 py-1 text-xs bg-primary text-white rounded-full mb-3 opacity-90">
          {item.category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-200 text-sm mb-4 opacity-0 transform translate-y-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 opacity-0 transform translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {item.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-800/60 text-gray-300 rounded">
              {tech}
            </span>
          ))}
        </div>
        
        {/* View Project Button - Only appears on hover */}
        <div className="mt-4 opacity-0 transform translate-y-10 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
          <button className="px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-md text-sm transition-colors duration-300">
            View Project
          </button>
        </div>
      </div>
      
      {/* Film frame borders for cinematography/editing theme */}
      <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none">
        {/* Corner marks to simulate film frame */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
};

export default Portfolio;