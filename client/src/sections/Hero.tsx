import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/useParallax";
import { FaArrowRight, FaPlay, FaStar, FaRocket, FaChevronLeft, FaChevronRight, FaWindows, FaGoogle, FaAmazon, FaFilm, FaCar, FaMusic, FaPaypal, FaTv } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const clients = [
  {
    alt: "Netflix",
    icon: <FaFilm className="text-3xl" />
  },
  {
    alt: "HBO",
    icon: <FaTv className="text-3xl" />
  },
  {
    alt: "Microsoft",
    icon: <FaWindows className="text-3xl" />
  },
  {
    alt: "Google",
    icon: <FaGoogle className="text-3xl" />
  },
  {
    alt: "Amazon",
    icon: <FaAmazon className="text-3xl" />
  },
  {
    alt: "Uber",
    icon: <FaCar className="text-3xl" />
  },
  {
    alt: "Spotify",
    icon: <FaMusic className="text-3xl" />
  },
  {
    alt: "PayPal",
    icon: <FaPaypal className="text-3xl" />
  },
  {
    alt: "Disney",
    icon: <FaFilm className="text-3xl" />
  }
];

const Hero = () => {
  const { ref, mousePosition } = useParallax();
  const [currentLogo, setCurrentLogo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const logoDisplayCount = 5; // Number of logos to show at once
  
  // Auto-advance logos carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextLogoSet();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentLogo, isAnimating]);
  
  const getVisibleLogos = () => {
    const visibleLogos = [];
    for (let i = 0; i < logoDisplayCount; i++) {
      const index = (currentLogo + i) % clients.length;
      visibleLogos.push(clients[index]);
    }
    return visibleLogos;
  };
  
  const nextLogoSet = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentLogo(prevIndex => {
      const newIndex = prevIndex + 1 >= clients.length ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevLogoSet = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentLogo(prevIndex => {
      const newIndex = prevIndex - 1 < 0 ? clients.length - 1 : prevIndex - 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_25%,rgba(124,58,237,0.15),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
          <div className="flex flex-col justify-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transforming Ideas Into
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 block">
                Premium Digital Experiences
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-primary-100/80 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At Appzila, we craft elite mobile and web applications that propel businesses into the future. Your vision, our expertise.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-6 h-auto glow-effect relative overflow-hidden transition-all duration-300"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="mr-2 relative z-10">Start Your Project</span>
                <FaArrowRight className="relative z-10" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary-100/30 text-primary-100 hover:bg-primary-100/10 px-8 py-6 h-auto"
              >
                <FaPlay className="mr-2 text-cyan-500" />
                <span>Watch Demo</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative"
            >
              <p className="text-primary-100/60 text-sm mb-4">Trusted by industry leaders:</p>
              
              {/* Logo Carousel */}
              <div className="flex items-center">
                <div className="flex-1 overflow-hidden relative">
                  <div className="flex items-center justify-between py-2">
                    <AnimatePresence>
                      {getVisibleLogos().map((client, index) => (
                        <motion.div
                          key={`${currentLogo + index}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="text-primary-100 hover:text-white transition duration-300 mx-4"
                          title={client.alt}
                        >
                          {client.icon}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex space-x-2 ml-2">
                  <motion.button
                    onClick={prevLogoSet}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 h-6 rounded-full bg-primary-800/60 border border-primary-700/30 flex items-center justify-center text-primary-100/70 hover:text-white text-xs"
                  >
                    <FaChevronLeft className="text-xs" />
                  </motion.button>
                  <motion.button
                    onClick={nextLogoSet}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 h-6 rounded-full bg-primary-800/60 border border-primary-700/30 flex items-center justify-center text-primary-100/70 hover:text-white text-xs"
                  >
                    <FaChevronRight className="text-xs" />
                  </motion.button>
                </div>
              </div>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-2 space-x-1">
                {Array.from({ length: Math.ceil(clients.length / logoDisplayCount) }).map((_, index) => {
                  const startIndex = index * logoDisplayCount;
                  const isActive = currentLogo >= startIndex && 
                                 currentLogo < startIndex + logoDisplayCount;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentLogo(startIndex);
                          setTimeout(() => setIsAnimating(false), 500);
                        }
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-purple-600' : 'bg-primary-700/50 hover:bg-primary-600/50'
                      }`}
                      aria-label={`Go to logo set ${index + 1}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center" ref={ref}>
            <div className="relative w-full max-w-lg">
              <motion.div 
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{ 
                  x: mousePosition.x * 0.02,
                  y: mousePosition.y * 0.02,
                }}
                transition={{ type: "spring", damping: 50 }}
              />
              <motion.div 
                className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{ 
                  x: mousePosition.x * -0.02,
                  y: mousePosition.y * 0.02,
                }}
                transition={{ type: "spring", damping: 50 }}
              />
              <motion.div 
                className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{ 
                  x: mousePosition.x * 0.01,
                  y: mousePosition.y * -0.02,
                }}
                transition={{ type: "spring", damping: 50 }}
              />
              
              <div className="relative">
                <motion.div 
                  className="p-1 shadow-2xl rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    background: "linear-gradient(to right, #7C3AED, #3B82F6)",
                  }}
                >
                  <div className="bg-primary-800 rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" 
                      alt="App interface showcase" 
                      className="w-full h-auto"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">Award-Winning Apps</h3>
                      <p className="text-primary-100/70 text-sm">Creating intuitive interfaces and powerful functionality for elite clients worldwide.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-10 -right-10 p-1 shadow-xl rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 5
                  }}
                  style={{
                    background: "linear-gradient(to right, #7C3AED, #3B82F6)",
                  }}
                >
                  <div className="bg-primary-800 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                        <FaStar className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-white font-bold">4.9/5 Rating</p>
                        <p className="text-primary-100/70 text-xs">Based on 200+ reviews</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 p-1 shadow-xl rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 7
                  }}
                  style={{
                    background: "linear-gradient(to right, #7C3AED, #3B82F6)",
                  }}
                >
                  <div className="bg-primary-800 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <FaRocket className="text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-white font-bold">250+ Projects</p>
                        <p className="text-primary-100/70 text-xs">Delivered on time</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
