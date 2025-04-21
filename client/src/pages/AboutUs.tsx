import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaArrowLeft } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-primary-100/70 hover:text-purple-600 mb-8">
          <FaArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              Appzila is a premier app development company dedicated to creating exceptional digital experiences that transform businesses and delight users.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We believe that technology should enhance human experiences, not complicate them. Our mission is to build applications that are not only functional and robust but also intuitive and delightful to use.
            </p>
            
            <h2>Our Story</h2>
            <p>
              Founded in 2018 by a team of tech enthusiasts with a shared vision, Appzila has grown from a small startup to an industry leader in app development. Our journey began with a simple idea: that great software should be both powerful and accessible.
            </p>
            <p>
              Over the years, we've expanded our team, refined our processes, and worked with clients across diverse industries. Throughout this growth, we've maintained our commitment to quality, innovation, and user-centric design.
            </p>
            
            <h2>Our Approach</h2>
            <p>
              At Appzila, we follow a collaborative and transparent development process:
            </p>
            <ul>
              <li><strong>Discovery:</strong> We dive deep to understand your business goals, target audience, and technical requirements.</li>
              <li><strong>Design:</strong> Our designers create intuitive interfaces that engage users and strengthen your brand.</li>
              <li><strong>Development:</strong> We build robust applications using cutting-edge technologies and best practices.</li>
              <li><strong>Testing:</strong> Rigorous quality assurance ensures your app works flawlessly across all devices and scenarios.</li>
              <li><strong>Launch:</strong> We provide comprehensive support to ensure a smooth deployment.</li>
              <li><strong>Growth:</strong> Our relationship doesn't end at launch; we offer ongoing support to help your app evolve and succeed.</li>
            </ul>
            
            <h2>Our Values</h2>
            <p>
              Everything we do is guided by our core values:
            </p>
            <ul>
              <li><strong>Excellence:</strong> We never settle for "good enough" and consistently push for better.</li>
              <li><strong>Innovation:</strong> We embrace new technologies and approaches to solve complex problems.</li>
              <li><strong>Integrity:</strong> We are honest, transparent, and ethical in all our dealings.</li>
              <li><strong>Collaboration:</strong> We believe the best results come from working closely with our clients and each other.</li>
              <li><strong>User Focus:</strong> We place users at the center of our design and development process.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;