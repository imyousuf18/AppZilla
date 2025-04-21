import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedParallax } from '@/hooks/useParallax';
import { Button } from '@/components/ui/button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type SlideContent = {
  title: string;
  description: string;
  image: string;
  foreground?: {
    image: string;
    position: { x: string; y: string };
  }[];
};

interface ParallaxSliderProps {
  slides: SlideContent[];
}

export const ParallaxSlider = ({ slides }: ParallaxSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { containerRef, position } = useAdvancedParallax(0.03);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[600px] relative overflow-hidden" ref={containerRef}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10"></div>
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.05
          }}
          transition={{ 
            duration: 1, 
            ease: "easeInOut"
          }}
          ref={(el) => (slideRefs.current[index] = el)}
        >
          {/* Background image with parallax effect */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              x: position.x * -1, // Inverse movement for background
              y: position.y * -1,
            }}
          />
          
          {/* Foreground elements with parallax */}
          {slide.foreground?.map((item, fIndex) => (
            <motion.img
              key={`${index}-${fIndex}`}
              src={item.image}
              className="absolute pointer-events-none z-20"
              style={{
                x: `calc(${item.position.x} + ${position.x * (fIndex + 1.5)}px)`,
                y: `calc(${item.position.y} + ${position.y * (fIndex + 1)}px)`,
              }}
              alt="Foreground element"
            />
          ))}
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="max-w-3xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 50
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-5xl font-black leading-tight mb-6 text-white">
                  {slide.title}
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  {slide.description}
                </p>
                <div className="flex space-x-4">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white px-8 py-6 h-auto"
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Start Your Project
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 h-auto"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow Controls */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center z-30 transition-all"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center z-30 transition-all"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};