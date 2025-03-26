import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { testimonials } from "../../data/testimonials";

const Testimonials = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold font-poppins mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Client <span className="text-primary dark:text-blue-400">Testimonials</span>
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
            Hear what our clients have to say about working with us
          </motion.p>
        </div>

        <motion.div
          className="testimonial-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="testimonial-track" style={{ width: "200%" }}>
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={index}
                className="p-4 w-full md:w-1/2 lg:w-1/3"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400">
                      {Array(5).fill(0).map((_, i) => (
                        <i key={i} className={`fas ${i < testimonial.rating ? 'fa-star' : i === Math.floor(testimonial.rating) && testimonial.rating % 1 > 0 ? 'fa-star-half-alt' : 'fa-star text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-primary"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
