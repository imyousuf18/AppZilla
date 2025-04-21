import { useRef, useState, useEffect } from 'react';

export const useParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { ref, mousePosition };
};

// Enhanced parallax for Revolution style slider
export const useAdvancedParallax = (sensitivity = 0.05) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Register elements that should be animated
  const registerElement = (element: HTMLElement | null) => {
    if (element && !elements.includes(element)) {
      setElements(prev => [...prev, element]);
    }
  };

  // Handle mouse move to create parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate position relative to center
    const centerX = width / 2;
    const centerY = height / 2;
    const x = (e.clientX - centerX) * sensitivity;
    const y = (e.clientY - centerY) * sensitivity;
    
    setPosition({ x, y });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sensitivity]);

  // Reset position when mouse leaves
  useEffect(() => {
    const handleMouseLeave = () => {
      // Smoothly animate back to center
      const duration = 800; // ms
      const start = position;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const newX = start.x * (1 - easeProgress);
        const newY = start.y * (1 - easeProgress);
        
        setPosition({ x: newX, y: newY });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position]);

  return {
    containerRef,
    position,
    registerElement
  };
};
