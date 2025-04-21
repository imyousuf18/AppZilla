import { motion } from "framer-motion";
import { services } from "@/data/services";

const ServicesSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Expertise</span>
          </h2>
          <p className="text-primary-100/70">
            Crafting exceptional digital products with cutting-edge technology and innovative design solutions for forward-thinking businesses.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="group hover:scale-105 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="p-[1px] rounded-xl overflow-hidden" style={{
                background: "linear-gradient(to right, #7C3AED, #3B82F6)"
              }}>
                <div className="bg-primary-900 p-6 rounded-xl h-full">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mb-6 group-hover:animate-pulse">
                    <i className={`fas ${service.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-primary-100/70 mb-4">{service.description}</p>
                  <a href="#" className="flex items-center text-purple-600 font-medium">
                    <span>Learn more</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
