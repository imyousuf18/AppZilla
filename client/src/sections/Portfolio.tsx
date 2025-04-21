import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { FaLink, FaGooglePlay, FaApple, FaExternalLinkAlt } from "react-icons/fa";

const Portfolio = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
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
    <section id="portfolio" className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(124,58,237,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Portfolio</span>
          </h2>
          <p className="text-primary-100/70">
            Explore our collection of successful projects that have helped businesses transform their digital presence.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolio.map((item, index) => (
            <motion.div 
              key={index}
              className="group rounded-xl overflow-hidden bg-primary-800 border border-primary-700 shadow-xl"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden h-60 bg-primary-700/50 flex items-center justify-center p-4">
                {item.screenshot ? (
                  <img 
                    src={item.screenshot} 
                    alt={`${item.title} screenshot`} 
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-primary-800/80 p-5 h-32 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className={`${item.categoryColor} ${item.categoryTextColor} px-3 py-1 rounded-full text-xs font-medium`}>
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 text-white">{item.title}</h3>
                  <p className="text-primary-100/70 text-sm">{item.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-primary-100/70">Client:</span>
                      <span className="text-sm font-medium">{item.client}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {item.websiteUrl && (
                      <a 
                        href={item.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs bg-purple-600/20 text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <FaLink className="text-xs" />
                        <span>Website</span>
                      </a>
                    )}
                    
                    {item.appLink && (
                      <a 
                        href={item.appLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center space-x-1 text-xs bg-green-600/20 text-green-400 hover:text-green-300 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <FaGooglePlay className="text-xs" />
                        <span>Google Play</span>
                      </a>
                    )}
                    
                    {item.appStoreLink && (
                      <a 
                        href={item.appStoreLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center space-x-1 text-xs bg-blue-600/20 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <FaApple className="text-xs" />
                        <span>App Store</span>
                      </a>
                    )}
                  </div>
                  
                  <a 
                    href={item.websiteUrl || item.appLink || "#"} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-center text-sm px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 rounded-lg transition-colors"
                  >
                    <span className="flex items-center justify-center space-x-1">
                      <span>View Case Study</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.a 
            href="/portfolio" 
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 rounded-lg relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(124, 58, 237, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: "0 0 15px rgba(124, 58, 237, 0.4)"
            }}
          >
            <span>View All Projects</span>
            <FaExternalLinkAlt className="text-xs ml-2" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
