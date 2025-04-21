import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollow from "@/components/MouseFollow";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Portfolio from "@/sections/Portfolio";
import CaseStudy from "@/sections/CaseStudy";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import Blog from "@/sections/Blog";
import Contact from "@/sections/Contact";
import DemoVideo from "@/sections/DemoVideo";
import ReviewPlatforms from "@/sections/ReviewPlatforms";
import { useMediaQuery } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: Event) => {
      e.preventDefault();
      
      if (e.currentTarget instanceof HTMLAnchorElement) {
        const anchor = e.currentTarget;
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: (target as HTMLElement).offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {!isMobile && <MouseFollow />}
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <DemoVideo />
        <CaseStudy />
        <Testimonials />
        <ReviewPlatforms />
        <Pricing />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
