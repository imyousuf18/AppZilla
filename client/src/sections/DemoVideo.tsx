import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlay, FaPause, FaExpand, FaMobileAlt, FaChartLine, FaRocket, FaCode, FaPalette, FaShieldAlt } from "react-icons/fa";

const DemoVideo = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const controls = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const processSteps = [
    {
      id: "discovery",
      title: "Discovery",
      icon: <FaChartLine className="text-purple-600" />,
      description: "We dive deep into understanding your business goals, target audience, and technical requirements.",
      color: "purple"
    },
    {
      id: "design",
      title: "UI/UX Design",
      icon: <FaPalette className="text-blue-500" />,
      description: "Our design team crafts intuitive, engaging interfaces that delight users and drive conversions.",
      color: "blue"
    },
    {
      id: "development",
      title: "Development",
      icon: <FaCode className="text-cyan-500" />,
      description: "We build robust, scalable applications using the latest technologies and best practices.",
      color: "cyan"
    },
    {
      id: "testing",
      title: "QA & Testing",
      icon: <FaShieldAlt className="text-green-500" />,
      description: "Rigorous testing across devices and scenarios ensures your app launches with confidence.",
      color: "green"
    },
    {
      id: "launch",
      title: "Launch & Scale",
      icon: <FaRocket className="text-red-500" />,
      description: "We handle deployment and provide ongoing support to ensure continuous growth and improvement.",
      color: "red"
    }
  ];

  useEffect(() => {
    // Auto-rotate through the process tabs
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [processSteps.length]);

  useEffect(() => {
    // Animate the active tab indicator
    controls.start({
      x: `${activeTab * 100}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    });
  }, [activeTab, controls]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (!videoOpen) {
        setVideoOpen(true);
        videoRef.current.play();
      } else {
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Parallax effect on scroll
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoOpen) {
      const element = e.currentTarget;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      element.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoOpen) {
      e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <section className="py-20 bg-primary-900 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.2),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See Our Process <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">in Action</span>
          </h2>
          <p className="text-primary-100/70 text-lg max-w-2xl mx-auto">
            Watch how we transform your ideas into exceptional digital experiences with our proven development methodology.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Video Player Section */}
          <motion.div
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-500 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Video or Thumbnail */}
              <div className="aspect-video bg-primary-800 relative">
                {!videoOpen ? (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="App development process"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        onClick={toggleVideo}
                        className="w-24 h-24 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition duration-300 group relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        aria-label="Play video"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-purple-500"></div>
                        <div className="absolute w-full h-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaPlay className="ml-2 text-3xl relative z-10" />
                        <div className="absolute w-36 h-36 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                      </motion.button>
                    </div>
                    
                    {/* Floating devices mockup */}
                    <div className="absolute bottom-6 right-6 flex items-end space-x-4">
                      <motion.div 
                        className="w-32 h-32 bg-white rounded-lg shadow-xl overflow-hidden border-4 border-white"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=240" 
                          alt="Mobile app screenshot" 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div 
                        className="w-24 h-48 bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white transform rotate-6"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1601784551106-bf51f612d69c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" 
                          alt="Mobile app UI" 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <>
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls={false}
                      onLoadedData={() => setVideoLoaded(true)}
                      onEnded={() => setVideoOpen(false)}
                      src="https://vod-progressive.akamaized.net/exp=1712021348~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4791%2F19%2F497544032%2F2286652278.mp4~hmac=e42f89ddaff7b1e6f0fbbb8e79da3e8cbe6c6c61f0f9e58ef8e78e9aa2d3cd80/vimeo-prod-skyfire-std-us/01/4791/19/497544032/2286652278.mp4"
                      poster="https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    >
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Custom Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                      <button 
                        onClick={toggleVideo}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                      >
                        {videoRef.current?.paused ? <FaPlay /> : <FaPause />}
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={handleFullscreen}
                          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                        >
                          <FaExpand />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Video Info */}
                {!videoOpen && (
                  <div className="absolute bottom-6 left-6 text-white text-left max-w-sm">
                    <h3 className="text-2xl font-bold mb-2">The Appzila Development Process</h3>
                    <p className="text-white/80">
                      From concept to launch: Our proven methodology for building exceptional apps
                    </p>
                  </div>
                )}
              </div>
              
              {/* Video progress bar */}
              {videoOpen && videoLoaded && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                    animate={{ 
                      width: videoRef.current?.ended ? "0%" : "100%" 
                    }}
                    initial={{ width: "0%" }}
                    transition={{ 
                      duration: videoRef.current?.duration || 0, 
                      ease: "linear" 
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Process Steps Section */}
          <motion.div
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-primary-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/5 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Development Process</h3>
              
              <div className="space-y-4 relative">
                {/* Animated progress bar */}
                <div className="absolute left-5 top-5 bottom-5 w-[2px] bg-primary-700/50">
                  <motion.div 
                    className="w-full bg-gradient-to-b from-purple-600 via-blue-500 to-cyan-400 rounded-full"
                    style={{ height: `${(activeTab + 1) * 100 / processSteps.length}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    className={`flex items-start relative p-3 rounded-lg transition-all duration-300 ${activeTab === index ? 'bg-primary-700/50' : 'hover:bg-primary-700/30'}`}
                    onClick={() => setActiveTab(index)}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className={`w-10 h-10 rounded-full ${activeTab === index ? 'bg-gradient-to-br from-purple-600 to-blue-500' : 'bg-primary-700'} flex items-center justify-center flex-shrink-0 z-10`}>
                      {step.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                      <p className="text-primary-100/70 text-sm">{step.description}</p>
                    </div>
                    
                    {activeTab === index && (
                      <motion.div 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-purple-600 to-blue-500 rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 text-white font-bold flex items-center justify-center glow-effect"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <FaMobileAlt className="mr-2 relative z-10" />
                <span className="relative z-10">Start Your Project</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;