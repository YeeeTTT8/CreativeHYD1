import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold font-poppins mb-4 text-gray-900 dark:text-white"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            About <span className="text-primary dark:text-blue-400">CreativeHYD</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
          >
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Creative team working" 
                className="w-full h-full object-cover"
              />
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full opacity-30 floating"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary rounded-full opacity-30 floating-slow"></div>
            </div>
          </motion.div>
          
          <motion.div
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={3}
          >
            <h3 className="text-2xl font-montserrat font-semibold mb-6 text-gray-900 dark:text-white">
              Bringing Ideas to Life Since 2015
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              CreativeHYD is a passionate collective of designers, animators, and digital storytellers. We believe in the transformative power of creative design to elevate brands and captivate audiences.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Our mission is to craft immersive digital experiences that blend artistic vision with strategic thinking, delivering solutions that stand out in today's fast-paced digital landscape.
            </p>
            <div className="flex flex-wrap gap-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <i className="fas fa-lightbulb text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">150+</h4>
                  <p className="text-gray-600 dark:text-gray-400">Projects</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <i className="fas fa-users text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">98%</h4>
                  <p className="text-gray-600 dark:text-gray-400">Client Satisfaction</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <i className="fas fa-trophy text-primary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">20+</h4>
                  <p className="text-gray-600 dark:text-gray-400">Awards</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
