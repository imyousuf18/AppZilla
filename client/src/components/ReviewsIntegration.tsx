import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaGoogle, FaQuoteLeft, FaClipboard, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";
import { useIsMobile } from "@/hooks/use-mobile";

type ReviewPlatform = "trustpilot" | "clutch" | "google";

interface Review {
  id: string;
  platform: ReviewPlatform;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  projectType?: string;
}

interface ReviewsIntegrationProps {
  className?: string;
}

const ReviewsIntegration = ({ className = "" }: ReviewsIntegrationProps) => {
  const [activeTab, setActiveTab] = useState<ReviewPlatform>("trustpilot");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const itemsPerView = isMobile ? 1 : 3;
  
  const [averageRating, setAverageRating] = useState({
    trustpilot: 4.8,
    clutch: 4.9,
    google: 4.7
  });

  // Updated mockReviews to use the real app references
  const mockReviews: Record<ReviewPlatform, Review[]> = {
    trustpilot: [
      {
        id: "tp1",
        platform: "trustpilot",
        author: "Matthew Wilson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "Appzila transformed our Chicago metro platform with a cutting-edge redesign that dramatically improved user engagement. Their attention to detail and responsiveness throughout the project was exceptional.",
        date: "March 15, 2025",
        projectType: "OpenTable"
      },
      {
        id: "tp2",
        platform: "trustpilot",
        author: "Olivia Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        text: "Working with Appzila to enhance our mobile delivery platform was a game-changer. They implemented sophisticated logistics algorithms that reduced our average delivery times to under 30 minutes.",
        date: "February 28, 2025",
        projectType: "GoPuff"
      },
      {
        id: "tp3",
        platform: "trustpilot",
        author: "Ethan Roberts",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 4.5,
        text: "The sustainable grocery platform Appzila developed for us has revolutionized how we connect consumers with imperfect produce. Their innovative recommendation system has reduced food waste by 30%.",
        date: "January 10, 2025",
        projectType: "Misfits Market"
      },
      {
        id: "tp4",
        platform: "trustpilot",
        author: "Sophie Martinez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 5,
        text: "Appzila's transformation of Howrse from a browser game to a sophisticated mobile platform exceeded our expectations. They preserved the core gameplay mechanics while implementing new features.",
        date: "December 12, 2024",
        projectType: "Howrse"
      }
    ],
    clutch: [
      {
        id: "cl1",
        platform: "clutch",
        author: "Daniel Kim",
        rating: 5,
        text: "Knights of Pen & Paper 2 presented unique technical challenges that Appzila handled masterfully. Their custom rendering engine and procedural content generation systems allowed us to deliver a nostalgic RPG experience.",
        date: "March 5, 2025",
        projectType: "Knights of Pen & Paper 2"
      },
      {
        id: "cl2",
        platform: "clutch",
        author: "Jennifer Hyland",
        rating: 4.5,
        text: "Our restaurant partners have reported significant improvements since Appzila redesigned our booking platform. The streamlined interface and improved analytics dashboard have helped restaurants optimize their seating.",
        date: "February 12, 2025",
        projectType: "OpenTable"
      },
      {
        id: "cl3",
        platform: "clutch",
        author: "Thomas Wagner",
        rating: 5,
        text: "Appzila's implementation of our inventory management system has been transformative. Their solution maintains real-time accuracy across multiple fulfillment centers, resulting in a 98.5% order fulfillment rate.",
        date: "January 22, 2025",
        projectType: "GoPuff"
      },
      {
        id: "cl4",
        platform: "clutch",
        author: "Alexandra Chen",
        rating: 4.5,
        text: "The personalized recommendation engine Appzila built into our app has helped customers discover new produce and reduce food waste. This has had a dramatic impact on both customer retention and our mission of sustainability.",
        date: "December 18, 2024",
        projectType: "Misfits Market"
      }
    ],
    google: [
      {
        id: "g1",
        platform: "google",
        author: "Ryan Morris",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        rating: 5,
        text: "The advanced breeding algorithm Appzila developed for Howrse created a depth of gameplay that keeps our community engaged for months. Their technical innovations maintained the game's complexity on mobile devices.",
        date: "March 18, 2025",
        projectType: "Howrse"
      },
      {
        id: "g2",
        platform: "google",
        author: "Emily Nakamura",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4.5,
        text: "Knights of Pen & Paper 2 required a delicate balance between nostalgic pixel art and modern game features. Appzila perfectly captured this vision, delivering a game that resonates with both new players and longtime fans.",
        date: "February 20, 2025",
        projectType: "Knights of Pen & Paper 2"
      },
      {
        id: "g3",
        platform: "google",
        author: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        rating: 5,
        text: "Appzila's responsive design expertise made our restaurant discovery platform truly accessible on all devices. The Chicago metro section now loads significantly faster and has increased our mobile conversion rates by 42%.",
        date: "January 15, 2025",
        projectType: "OpenTable"
      },
      {
        id: "g4",
        platform: "google",
        author: "Sophia Chang",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        rating: 5,
        text: "The age verification system Appzila implemented for our alcohol delivery service is both secure and user-friendly. This balance has been critical to our success and regulatory compliance across multiple markets.",
        date: "December 5, 2024",
        projectType: "GoPuff"
      }
    ]
  };

  // Simulate fetching reviews from APIs
  useEffect(() => {
    const fetchReviews = async (platform: ReviewPlatform) => {
      setLoading(true);
      setCurrentIndex(0);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, this would fetch from the actual APIs
      setReviews(mockReviews[platform]);
      setLoading(false);
    };
    
    fetchReviews(activeTab);
  }, [activeTab]);
  
  // Auto-scroll the carousel
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      if (!isAnimating && reviews.length > itemsPerView) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loading, reviews, currentIndex, isAnimating]);

  // Helper for rendering star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  // Platform-specific styling and icons
  const platformConfig = {
    trustpilot: {
      icon: <SiTrustpilot className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      hoverBgColor: "hover:bg-green-500/20",
      activeBgColor: "bg-green-500/20",
      label: "Trustpilot"
    },
    clutch: {
      icon: <FaClipboard className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      hoverBgColor: "hover:bg-blue-500/20",
      activeBgColor: "bg-blue-500/20",
      label: "Clutch"
    },
    google: {
      icon: <FaGoogle className="h-5 w-5" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      hoverBgColor: "hover:bg-red-500/20",
      activeBgColor: "bg-red-500/20",
      label: "Google Reviews"
    }
  };
  
  const nextSlide = () => {
    if (isAnimating || reviews.length <= itemsPerView) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating || reviews.length <= itemsPerView) return;
    
    setIsAnimating(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - 1 < 0 ? reviews.length - 1 : prevIndex - 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Calculate the visible reviews with wrap-around
  const getVisibleReviews = () => {
    if (loading || reviews.length === 0) return [];
    if (reviews.length <= itemsPerView) return reviews;
    
    const visibleReviews = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <div className="flex flex-col space-y-6">
        {/* Platform tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(platformConfig) as ReviewPlatform[]).map((platform) => {
            const config = platformConfig[platform];
            return (
              <button
                key={platform}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  activeTab === platform
                  ? config.activeBgColor + " " + config.color
                  : config.bgColor + " hover:" + config.color + " " + config.hoverBgColor
                }`}
                onClick={() => setActiveTab(platform)}
              >
                <span className="w-6 h-6 flex items-center justify-center">{config.icon}</span>
                <span className="font-medium">{config.label}</span>
                <div className="flex items-center ml-1">
                  <span className="mr-1 font-semibold">{averageRating[platform]}</span>
                  <FaStar className={activeTab === platform ? "text-yellow-400" : "text-yellow-400/70"} />
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Reviews carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={carouselRef}>
            {loading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="bg-primary-800/50 rounded-xl p-5 border border-primary-700/30 animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-700/50"></div>
                      <div className="flex-1">
                        <div className="h-4 w-3/4 bg-primary-700/50 rounded"></div>
                        <div className="h-3 w-1/2 bg-primary-700/50 rounded mt-2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-primary-700/50 rounded"></div>
                      <div className="h-3 w-full bg-primary-700/50 rounded"></div>
                      <div className="h-3 w-3/4 bg-primary-700/50 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {getVisibleReviews().map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-primary-800/50 rounded-xl p-5 border border-primary-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-600/50 relative h-full"
                    >
                      <div className="absolute top-4 right-4">
                        {platformConfig[review.platform].icon}
                      </div>
                      <div className="flex items-start mb-4">
                        <div className="relative mr-4">
                          {review.avatar ? (
                            <img 
                              src={review.avatar} 
                              alt={review.author} 
                              className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
                              {review.author.charAt(0)}
                            </div>
                          )}
                          <FaQuoteLeft className="absolute -bottom-2 -left-2 text-purple-500 bg-primary-800 rounded-full p-1 w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold">{review.author}</h4>
                          <div className="flex items-center space-x-1 mb-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-primary-300">{review.date}</p>
                          {review.projectType && (
                            <div className="mt-1 text-xs px-2 py-1 bg-primary-700/50 rounded-full inline-block">
                              {review.projectType}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-primary-200 text-sm">{review.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          
          {/* Carousel controls - only show if there are more reviews than visible slots */}
          {!loading && reviews.length > itemsPerView && (
            <div className="flex justify-between w-full">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-800 border border-primary-700 shadow-lg flex items-center justify-center z-10 text-primary-100 hover:text-white"
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-primary-800 border border-primary-700 shadow-lg flex items-center justify-center z-10 text-primary-100 hover:text-white"
              >
                <FaChevronRight />
              </motion.button>
            </div>
          )}
          
          {/* Carousel indicators */}
          {!loading && reviews.length > itemsPerView && (
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-purple-600 w-4' : 'bg-primary-700 hover:bg-primary-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* "View All" button with platform-specific styling */}
        <motion.a
          href={`https://${activeTab === 'trustpilot' ? 'www.trustpilot.com/review/appzila.com' : 
                   activeTab === 'clutch' ? 'clutch.co/profile/appzila' : 
                   'g.page/r/appzila/review'}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`self-center px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 border ${
            platformConfig[activeTab].color + ' ' + platformConfig[activeTab].bgColor + ' border-' + (activeTab === 'trustpilot' ? 'green' : activeTab === 'clutch' ? 'blue' : 'red') + '-500/30'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">{platformConfig[activeTab].icon}</span>
          <span>View All {platformConfig[activeTab].label} Reviews</span>
        </motion.a>
      </div>
    </div>
  );
};

export default ReviewsIntegration;