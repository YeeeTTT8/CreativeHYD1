import { motion } from "framer-motion";
import ParticlesBackground from "../shared/ParticlesBackground";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen relative overflow-hidden flex items-center justify-center bg-light-bg dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Animated Background Particles */}
      <ParticlesBackground />
      
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold font-poppins mb-6 text-gray-900 dark:text-white leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary dark:text-blue-400">Creative</span>HYD
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Where imagination meets innovation, creating designs that captivate and inspire.
        </motion.p>
        
        <motion.a 
          href="#contact"
          className="inline-block bg-primary hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-full transform transition duration-300 hover:scale-105 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Create Together
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1
        }}
      >
        <svg 
          className="w-8 h-8 text-primary dark:text-blue-400" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
