import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Setup hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, select, textarea, label"
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        width: isHovering ? "60px" : "40px",
        height: isHovering ? "60px" : "40px",
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.5,
      }}
      style={{
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        position: "fixed",
      }}
    />
  );
};

export default MouseFollow;
