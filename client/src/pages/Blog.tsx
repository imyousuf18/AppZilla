import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "wouter";
import Footer from "@/components/Footer";

const Blog = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-primary-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_75%,rgba(124,58,237,0.1),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Appzila <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Blog</span>
              </h1>
              <p className="text-primary-100/70">
                Stay updated with the latest trends, technologies, and best practices in app development.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  className="bg-primary-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-primary-700/30 shadow-xl h-full flex flex-col"
                  variants={fadeInUp}
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`${post.categoryBg} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-primary-100/60 text-xs">
                        <FaCalendarAlt className="mr-1" /> 
                        <span>{post.date}</span>
                      </div>
                      
                      {post.authorName && (
                        <div className="flex items-center text-primary-100/60 text-xs">
                          <FaUser className="mr-1" />
                          <span>{post.authorName}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-purple-400 transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-primary-100/70 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                    
                    {post.relatedCaseStudy ? (
                      <div className="text-xs text-primary-100/50 mb-3">
                        Related to: 
                        <Link to={`/portfolio/${post.relatedCaseStudy.toLowerCase().replace(/\s+/g, '-')}`} className="ml-1 text-purple-400 hover:text-purple-300 transition-colors">
                          {post.relatedCaseStudy} Case Study
                        </Link>
                      </div>
                    ) : null}
                    
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="flex items-center text-purple-600 hover:text-purple-400 font-medium transition-colors mt-auto"
                    >
                      <span>Read More</span>
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;