import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowRight, FaLightbulb, FaCodeBranch, FaChartLine, FaMobileAlt, FaShoppingCart, FaHeadset } from "react-icons/fa";

// Case study data
const caseStudies = [
  {
    id: "fintech",
    name: "FinanceApp",
    title: "From Concept to Success Story",
    summary: "We transformed a startup's MVP into a market-leading application, increasing user engagement by 300% and securing Series A funding.",
    challenge: "A fintech startup had an MVP with poor user experience and scalability issues, preventing market traction.",
    solution: "Complete redesign with a scalable architecture, intuitive UX, and advanced AI-driven features for personalized financial insights.",
    results: "300% increase in user engagement, 90% user retention, and successful securing of $4.5M in Series A funding.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    appName: "FinanceApp Dashboard",
    color: "purple"
  },
  {
    id: "ecommerce",
    name: "ShopElite",
    title: "Boosting E-commerce Performance",
    summary: "We rebuilt a struggling e-commerce platform, resulting in a 215% increase in conversions and 40% decrease in cart abandonment.",
    challenge: "An established retailer was struggling with an outdated e-commerce platform that had high cart abandonment and poor mobile experience.",
    solution: "Fully responsive rebuild with streamlined checkout, personalized recommendations, and seamless inventory management.",
    results: "215% increase in conversion rates, 40% decrease in cart abandonment, and 3x increase in mobile purchases.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    appName: "ShopElite Platform",
    color: "blue"
  },
  {
    id: "healthcare",
    name: "HealthTrack Pro",
    title: "Revolutionizing Patient Care",
    summary: "Our telemedicine solution helped a healthcare provider reach 5x more patients while reducing operational costs by 35%.",
    challenge: "A healthcare provider needed to expand reach during the pandemic while maintaining quality of care and reducing operational costs.",
    solution: "Secure telemedicine platform with integrated EHR, automated scheduling, and AI-powered triage system.",
    results: "500% increase in patient reach, 35% reduction in operational costs, and 98% patient satisfaction rating.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    appName: "HealthTrack Pro Portal",
    color: "green"
  }
];

const CaseStudy = () => {
  const [activeTab, setActiveTab] = useState("fintech");

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6 } 
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  // Helper function to get icon by case study
  const getIcon = (caseStudyId: string) => {
    switch (caseStudyId) {
      case "fintech":
        return <FaChartLine />;
      case "ecommerce": 
        return <FaShoppingCart />;
      case "healthcare":
        return <FaHeadset />;
      default:
        return <FaMobileAlt />;
    }
  };

  // Helper function to get color class by case study color
  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-purple-600/20",
          text: "text-purple-600",
          gradient: "from-purple-600 to-blue-500"
        };
      case "blue":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-500",
          gradient: "from-blue-500 to-cyan-400"
        };
      case "green":
        return {
          bg: "bg-green-600/20",
          text: "text-green-600",
          gradient: "from-green-600 to-teal-500"
        };
      default:
        return {
          bg: "bg-purple-600/20",
          text: "text-purple-600",
          gradient: "from-purple-600 to-blue-500"
        };
    }
  };

  const activeCase = caseStudies.find(cs => cs.id === activeTab) || caseStudies[0];
  const colors = getColorClass(activeCase.color);

  return (
    <section className="py-20 bg-primary-800 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Success Stories</span>
          </h2>
          <p className="text-primary-100/70">
            Discover how we've helped businesses transform and achieve remarkable results.
          </p>
        </motion.div>
        
        <div className="mb-12">
          <Tabs defaultValue="fintech" onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center w-full max-w-2xl mx-auto bg-primary-900 p-1">
              {caseStudies.map((study) => (
                <TabsTrigger 
                  key={study.id}
                  value={study.id}
                  className="flex-1 data-[state=active]:bg-primary-800 data-[state=active]:text-primary-100 text-primary-100/70"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">{getIcon(study.id)}</span>
                    <span>{study.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {caseStudies.map((study) => (
              <TabsContent key={study.id} value={study.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInLeft}
                    key={`content-${study.id}`}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      {study.title.split(' ').slice(0, -2).join(' ')}{' '}
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${getColorClass(study.color).gradient}`}>
                        {study.title.split(' ').slice(-2).join(' ')}
                      </span>
                    </h2>
                    <p className="text-primary-100/70 mb-8">
                      {study.summary}
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <motion.div 
                        className="flex items-start"
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${getColorClass(study.color).bg} flex items-center justify-center mt-1 mr-4 flex-shrink-0`}>
                          <FaLightbulb className={getColorClass(study.color).text} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">The Challenge</h3>
                          <p className="text-primary-100/70">{study.challenge}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${getColorClass(study.color).bg} flex items-center justify-center mt-1 mr-4 flex-shrink-0`}>
                          <FaCodeBranch className={getColorClass(study.color).text} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">Our Solution</h3>
                          <p className="text-primary-100/70">{study.solution}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        variants={fadeInUp}
                        transition={{ delay: 0.3 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${getColorClass(study.color).bg} flex items-center justify-center mt-1 mr-4 flex-shrink-0`}>
                          <FaChartLine className={getColorClass(study.color).text} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">The Results</h3>
                          <p className="text-primary-100/70">{study.results}</p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.a 
                      href="#" 
                      className={`inline-flex items-center ${getColorClass(study.color).text} hover:opacity-80 transition duration-300 font-medium`}
                      variants={fadeInUp}
                      transition={{ delay: 0.4 }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Read the full case study</span>
                      <FaArrowRight className="ml-2" />
                    </motion.a>
                  </motion.div>
                  
                  <motion.div
                    className="relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInRight}
                    key={`image-${study.id}`}
                  >
                    <div className="relative z-10">
                      <div className="p-1 rounded-xl shadow-xl" style={{
                        background: `linear-gradient(to right, ${
                          study.color === 'purple' ? '#7C3AED, #3B82F6' : 
                          study.color === 'blue' ? '#3B82F6, #06B6D4' : 
                          '#10B981, #0D9488'
                        })`
                      }}>
                        <div className="bg-primary-900 rounded-xl overflow-hidden">
                          <div className="bg-primary-700 p-4 flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="flex-1 text-center text-sm text-primary-100/70">{study.appName}</div>
                          </div>
                          <img 
                            src={study.image} 
                            alt={`${study.name} application screenshot`} 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="absolute top-1/2 -right-16 transform -translate-y-1/2 hidden lg:block"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <div className="relative">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: study.color === 'purple' ? 'rgba(124, 58, 237, 0.9)' : 
                                            study.color === 'blue' ? 'rgba(59, 130, 246, 0.9)' : 
                                            'rgba(16, 185, 129, 0.9)'
                          }}
                        >
                          <FaArrowRight className="text-white" />
                        </div>
                        <div 
                          className="w-12 h-12 rounded-full absolute -top-2 -left-2 animate-ping"
                          style={{
                            backgroundColor: study.color === 'purple' ? 'rgba(124, 58, 237, 0.3)' : 
                                            study.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 
                                            'rgba(16, 185, 129, 0.3)'
                          }}
                        ></div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
