import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { FaCalendarAlt, FaUser, FaTags, FaChevronLeft, FaShare, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const BlogPost = () => {
  const [, params] = useRoute("/blog/:id");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundPost = blogPosts.find(p => p.id === params.id);
      if (foundPost) {
        setPost(foundPost);
        setLoading(false);
      } else {
        setError("Blog post not found");
        setLoading(false);
      }
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-primary-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-primary-100/70 mb-6">
              Sorry, we couldn't find the blog post you're looking for.
            </p>
            <Link to="/blog">
              <Button variant="outline">
                <FaChevronLeft className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-primary-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/blog" className="inline-flex items-center text-primary-100/70 hover:text-primary-100 mb-8">
            <FaChevronLeft className="mr-2" />
            Back to Blog
          </Link>
          
          <article className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <span className={`${post.categoryBg} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-4 text-white">{post.title}</h1>
                </div>
              </div>
              
              <div className="mb-8 flex flex-wrap gap-4 items-center text-sm text-primary-100/70">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{post.date}</span>
                </div>
                
                {post.authorName && (
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.authorName}</span>
                    {post.authorRole && <span className="ml-1 text-primary-100/40">({post.authorRole})</span>}
                  </div>
                )}
                
                <div className="flex items-center">
                  <FaTags className="mr-2" />
                  <span>{post.category}</span>
                </div>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <p className="text-xl leading-relaxed mb-6">{post.content}</p>
                
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod, nisi non efficitur gravida, mauris tortor volutpat nisi, nec interdum tellus ipsum a dolor. Nulla facilisi. Praesent consectetur urna vel tellus fermentum, id consequat enim dapibus. Aliquam erat volutpat. Sed auctor efficitur eros, non vulputate mi placerat at.
                </p>
                
                <h2>Key Considerations</h2>
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris eget risus vel urna lacinia rhoncus non at neque. Integer sagittis luctus felis, eu fringilla tortor malesuada at. Quisque aliquet ante nec purus aliquam, id iaculis ex vestibulum.
                </p>
                
                <ul>
                  <li>Prioritize user experience and interface design</li>
                  <li>Implement robust security measures</li>
                  <li>Optimize for performance and scalability</li>
                  <li>Consider cross-platform compatibility</li>
                  <li>Plan for long-term maintenance and updates</li>
                </ul>
                
                <blockquote>
                  "The best mobile applications blend intuitive design with powerful functionality, creating experiences that users return to again and again."
                </blockquote>
                
                <h2>Conclusion</h2>
                <p>
                  Developing successful mobile applications requires a comprehensive approach that considers both technical implementation and user experience. By following industry best practices and working with experienced developers, businesses can create applications that stand out in today's competitive marketplace.
                </p>
              </div>
              
              <div className="border-t border-primary-700 pt-6 mb-12">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mr-4 mb-4">
                    <span className="block text-sm text-primary-100/70 mb-2">Share this article:</span>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <FaFacebookF size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white">
                        <FaTwitter size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        <FaLinkedinIn size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {post.relatedCaseStudy && (
                    <div>
                      <span className="block text-sm text-primary-100/70 mb-2">Related Case Study:</span>
                      <Link 
                        to={`/portfolio/${post.relatedCaseStudy.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center text-purple-500 hover:text-purple-400"
                      >
                        <span>{post.relatedCaseStudy}</span>
                        <FaShare className="ml-2" size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <div 
                      key={relatedPost.id}
                      className="bg-primary-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-primary-700/30 shadow-xl h-full flex flex-col"
                    >
                      <div className="relative overflow-hidden h-40">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`${relatedPost.categoryBg} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-purple-400 transition-colors">
                          <Link to={`/blog/${relatedPost.id}`}>
                            {relatedPost.title}
                          </Link>
                        </h3>
                        
                        <p className="text-primary-100/70 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                        
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          className="flex items-center text-purple-600 hover:text-purple-400 text-sm font-medium transition-colors mt-auto"
                        >
                          <span>Read More</span>
                          <FaChevronLeft className="ml-2 rotate-180" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;