import { motion } from "framer-motion";
import ReviewsIntegration from "@/components/ReviewsIntegration";
import { SiTrustpilot } from "react-icons/si";
import { FaGoogle, FaChevronRight, FaClipboard } from "react-icons/fa";

const ReviewPlatforms = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="review-platforms">
      {/* Background elements */}
      <div className="absolute -top-40 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See What Clients <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Are Saying</span>
          </h2>
          <p className="text-primary-100/70 text-lg max-w-2xl mx-auto">
            Discover what our clients have to say about our app development services across leading review platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            <div className="flex items-center bg-primary-800/30 rounded-full px-6 py-3 text-lg">
              <span className="text-green-500 mr-2"><SiTrustpilot size={24} /></span>
              <span className="font-semibold text-xl">4.8/5</span>
              <span className="mx-2 text-primary-300">|</span>
              <span className="text-primary-200">342 reviews</span>
            </div>
            <div className="flex items-center bg-primary-800/30 rounded-full px-6 py-3 text-lg">
              <span className="text-blue-500 mr-2"><FaClipboard size={22} /></span>
              <span className="font-semibold text-xl">4.9/5</span>
              <span className="mx-2 text-primary-300">|</span>
              <span className="text-primary-200">128 reviews</span>
            </div>
            <div className="flex items-center bg-primary-800/30 rounded-full px-6 py-3 text-lg">
              <span className="text-red-500 mr-2"><FaGoogle size={22} /></span>
              <span className="font-semibold text-xl">4.7/5</span>
              <span className="mx-2 text-primary-300">|</span>
              <span className="text-primary-200">215 reviews</span>
            </div>
          </div>
        </motion.div>
        
        <ReviewsIntegration className="mb-16" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-primary-100/80 text-lg max-w-2xl mx-auto mb-8">
            Want to share your experience working with Appzila? Leave us a review on your preferred platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.trustpilot.com/review/appzila.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-green-500/10 text-green-500 rounded-lg border border-green-500/30 hover:bg-green-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiTrustpilot size={22} className="mr-2" />
              <span>Review on Trustpilot</span>
              <FaChevronRight className="ml-2" size={12} />
            </motion.a>
            
            <motion.a
              href="https://clutch.co/profile/appzila"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaClipboard size={20} className="mr-2" />
              <span>Review on Clutch</span>
              <FaChevronRight className="ml-2" size={12} />
            </motion.a>
            
            <motion.a
              href="https://g.page/r/appzila/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-red-500/10 text-red-500 rounded-lg border border-red-500/30 hover:bg-red-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGoogle size={20} className="mr-2" />
              <span>Review on Google</span>
              <FaChevronRight className="ml-2" size={12} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewPlatforms;