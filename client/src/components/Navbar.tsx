import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
      scrolled ? "bg-primary-900/80 border-primary-700/50" : "bg-transparent border-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground transition-colors duration-300">Appzila</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-primary-100 hover:text-white font-medium transition duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-primary-100 hover:text-white font-medium transition duration-300"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="hidden md:flex w-10 h-10 rounded-full bg-primary-800/80 items-center justify-center text-primary-100 hover:text-white transition duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            <Link href="/auth">
              <button className="hidden md:block bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 rounded-lg px-4 py-2 font-medium text-sm">
                Log In
              </button>
            </Link>
            
            <Button
              className="gradient-border transition-all duration-300 glow-effect"
              variant="outline"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="font-medium text-sm">Get a Quote</span>
            </Button>
            
            <button 
              className="md:hidden text-white" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-800 pb-4 px-4 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link 
                    key={link.label}
                    href={link.href} 
                    className="text-primary-100 hover:text-white font-medium py-2 transition duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a 
                    key={link.label}
                    href={link.href} 
                    className="text-primary-100 hover:text-white font-medium py-2 transition duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Link href="/auth" className="text-purple-600 font-medium py-2 transition duration-300">Log In</Link>
              <a href="#" className="flex items-center justify-between" onClick={(e) => {
                e.preventDefault();
                toggleTheme();
                setMobileMenuOpen(false);
              }}>
                <span className="text-primary-100">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                <div className="relative w-11 h-6 bg-primary-700 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-600/20">
                  <div className={`absolute inset-y-0 ${theme === 'dark' ? 'left-0' : 'right-0'} flex items-center px-1 transition-all duration-300`}>
                    <div className="w-5 h-5 bg-white rounded-full transition flex items-center justify-center">
                      {theme === 'dark' ? <FaSun size={10} className="text-primary-900" /> : <FaMoon size={10} className="text-primary-900" />}
                    </div>
                  </div>
                </div>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
