import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCheck, FaAward, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const itemsPerView = isMobile ? 1 : 3;
  
  const getVisibleTestimonials = () => {
    if (testimonials.length <= itemsPerView) return testimonials;
    
    const visibleItems = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };
  
  const nextSlide = () => {
    if (isAnimating || testimonials.length <= itemsPerView) return;
    
    setIsAnimating(true);
    setCurrentSlide(prevIndex => {
      const newIndex = prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating || testimonials.length <= itemsPerView) return;
    
    setIsAnimating(true);
    setCurrentSlide(prevIndex => {
      const newIndex = prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && testimonials.length > itemsPerView) {
        nextSlide();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);
  
  // Helper for rendering star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-purple-600" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-purple-600" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-500/30" />);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_75%_25%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Clients Say</span>
          </h2>
          <p className="text-primary-100/70">
            Hear from businesses that have experienced the Appzila difference and achieved remarkable results.
          </p>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden" ref={carouselRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="sync">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div 
                    key={`${currentSlide}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary-800 rounded-xl p-6 relative h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute -top-4 -right-4 text-6xl text-purple-600/20">"</div>
                    <div className="mb-6">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-primary-100/90 mb-6 relative z-10">{testimonial.text}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-primary-100/70 text-sm">{testimonial.position}, {testimonial.company}</p>
                        {testimonial.appReference && (
                          <div className="mt-1 text-xs px-2 py-1 bg-primary-700/50 rounded-full inline-block">
                            {testimonial.appReference}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Carousel Navigation */}
          {testimonials.length > itemsPerView && (
            <>
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-800 border border-primary-700 shadow-lg flex items-center justify-center z-10 text-primary-100 hover:text-white"
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-primary-800 border border-primary-700 shadow-lg flex items-center justify-center z-10 text-primary-100 hover:text-white"
              >
                <FaChevronRight />
              </motion.button>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentSlide(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-purple-600 w-4' : 'bg-primary-700 hover:bg-primary-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-primary-800 rounded-xl p-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-600/10 text-purple-600 mb-4">
                  <FaAward className="mr-2" />
                  <span className="text-sm font-medium">Trusted Excellence</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your digital presence?</h3>
                <p className="text-primary-100/70 mb-6">Join our growing list of satisfied clients and experience the Appzila difference for your business.</p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-500 text-white"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <span>Request a Free Consultation</span>
                  <FaChevronRight className="ml-2" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-purple-600" />
                  </div>
                  <p className="font-medium">4.9/5 average client satisfaction</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-purple-600" />
                  </div>
                  <p className="font-medium">98% on-time project delivery</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-purple-600" />
                  </div>
                  <p className="font-medium">24/7 dedicated support team</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
