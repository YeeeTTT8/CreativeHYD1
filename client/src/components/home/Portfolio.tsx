import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { portfolioItems } from "../../data/portfolio";

const Portfolio = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProjects = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleOpenProject = (project: any) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold font-poppins mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-primary dark:text-blue-400">Portfolio</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Showcasing our creative works and successful projects
          </motion.p>
        </div>

        {/* Portfolio Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("animation")}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === "animation"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Animation
          </button>
          <button
            onClick={() => setFilter("branding")}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === "branding"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Branding
          </button>
          <button
            onClick={() => setFilter("ui-ux")}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === "ui-ux"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            UI/UX
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === "video"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Video
          </button>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {filteredProjects.map((item, index) => (
              <motion.div
                key={index}
                className="group portfolio-item"
                variants={itemVariants}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-300">{item.tags}</p>
                    <button
                      onClick={() => handleOpenProject(item)}
                      className="mt-4 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-full inline-flex items-center"
                    >
                      View Project <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12">
          <motion.a
            href="#"
            className="inline-block bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full transition duration-300"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold dark:text-white">{selectedProject?.title}</DialogTitle>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject?.tags.split(', ').map((tag: string, index: number) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </DialogHeader>
          
          {selectedProject && (
            <>
              <div className="mb-8">
                <img 
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">Client</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.client}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">Timeline</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.timeline}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">Services</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedProject.tags}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 dark:text-white">The Challenge</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProject.challenge}
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Our Approach</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedProject.approach}
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 dark:text-white">The Results</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedProject.results}
                </p>
              </div>
              
              <DialogFooter className="flex justify-between items-center border-t dark:border-gray-700 pt-6">
                <a href="#" className="text-primary dark:text-blue-400 hover:underline">Previous Project</a>
                <a href="#" className="text-primary dark:text-blue-400 hover:underline">Next Project</a>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
