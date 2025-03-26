import { motion } from "framer-motion";
import ParticlesBackground from "../shared/ParticlesBackground";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="h-screen relative overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-black transition-colors duration-500"
    >
      {/* Animated Background Particles */}
      <ParticlesBackground />

      {/* Spotlight effect that follows cursor */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle 20vw at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 98, 255, 0.15), transparent)`,
          transition: "background 0.1s ease",
        }}
      ></div>

      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold font-poppins mb-4 text-gray-900 dark:text-white leading-tight"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Creative
            </span>
            <span className="ml-2">HYD</span>
          </motion.h1>

          <motion.div
            className="h-1 w-24 bg-blue-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Where <span className="text-blue-600 dark:text-blue-400">imagination</span> meets{" "}
          <span className="text-blue-600 dark:text-blue-400">innovation</span>, creating futuristic
          designs that captivate and inspire the digital landscape.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-gray-900 dark:text-white bg-transparent rounded-full border border-blue-500 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Let's Create Together</span>
            <motion.span
              className="absolute inset-0 bg-blue-600 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#portfolio"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-blue-600 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Our Work</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
      >
        <svg
          className="w-8 h-8 text-blue-400"
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
