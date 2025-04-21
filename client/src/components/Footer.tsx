import { Link } from "wouter";
import { useTheme } from "./ThemeProvider";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGithub, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { scrollToElement } from "../lib/utils";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const services = [
    { name: "Mobile App Development", href: "#" },
    { name: "Web App Development", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "AI Solutions", href: "#" },
    { name: "Blockchain Applications", href: "#" },
    { name: "SaaS Development", href: "#" },
  ];
  
  const company = [
    { name: "About Us", href: "/about-us" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#contact" },
  ];
  
  const legal = [
    { name: "Terms of Service", href: "/legal/terms-of-service" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
    { name: "GDPR Compliance", href: "/legal/gdpr" },
    { name: "Security", href: "/legal/security" },
  ];
  
  const socialLinks = [
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaGithub />, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-primary-900 pt-16 pb-8 border-t border-primary-700/50 relative">
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg transition duration-300 z-50 group"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl group-hover:animate-bounce" />
        </button>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground transition-colors duration-300">Appzila</span>
            </Link>
            <p className="text-primary-100/70 mb-6">
              Transforming ideas into exceptional digital experiences with cutting-edge technology and innovative design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-primary-100/70 hover:text-purple-600 transition duration-300 text-xl"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-primary-100/70 hover:text-purple-600 transition duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  {item.href.startsWith('/') ? (
                    <Link 
                      href={item.href}
                      className="text-primary-100/70 hover:text-purple-600 transition duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a 
                      href={item.href} 
                      className="text-primary-100/70 hover:text-purple-600 transition duration-300"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="text-primary-100/70 hover:text-purple-600 transition duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-100/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Appzila. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-primary-100/50 text-sm">Dark Mode</span>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="sr-only peer" 
                />
                <div className="relative w-11 h-6 bg-primary-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-600/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
