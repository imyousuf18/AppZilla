import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const pricingPackages = [
  {
    name: "Essential Package",
    description: "Perfect for small businesses or specific features and functionality needs.",
    price: 2999,
    icon: "lightbulb",
    color: "green",
    textColor: "text-green-500",
    bgColor: "bg-green-500/10",
    features: [
      "Single platform app (web or mobile)",
      "UI/UX design (up to 5 screens)",
      "Basic functionality development",
      "Essential testing",
      "14 days post-launch support"
    ],
    popular: false
  },
  {
    name: "Startup Package",
    description: "Perfect for new ventures looking to establish their digital presence.",
    price: 8999,
    icon: "rocket",
    color: "blue",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    features: [
      "Custom mobile or web app",
      "UI/UX design (up to 10 screens)",
      "Core functionality development",
      "Basic testing and QA",
      "30 days post-launch support"
    ],
    popular: false
  },
  {
    name: "Growth Package",
    description: "Designed for established businesses looking to scale their digital capabilities.",
    price: 24999,
    icon: "chart-line",
    color: "purple",
    textColor: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: [
      "Advanced mobile and web app",
      "Premium UI/UX design (unlimited screens)",
      "Advanced features and integrations",
      "Comprehensive testing and QA",
      "90 days post-launch support",
      "Performance optimization"
    ],
    popular: true
  },
  {
    name: "Enterprise Solutions",
    description: "Comprehensive solutions for large organizations with complex requirements.",
    price: null,
    icon: "building",
    color: "cyan",
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    features: [
      "Custom enterprise-grade solutions",
      "End-to-end project management",
      "AI and blockchain capabilities",
      "Advanced security implementations",
      "Dedicated account management",
      "12 months premium support"
    ],
    popular: false
  }
];

const Pricing = () => {
  const [screens, setScreens] = useState(20);
  const [months, setMonths] = useState(3);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [projectType, setProjectType] = useState("Mobile App");

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

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Calculate estimated price range based on calculator inputs
  const getEstimatedPrice = () => {
    let basePrice = projectType === "Mobile App" ? 15000 : 12000;
    let screenFactor = screens * 150;
    let timeFactor = months * 1000;
    let featureFactor = selectedFeatures.length * 1500;
    
    let minPrice = basePrice + screenFactor + featureFactor;
    let maxPrice = minPrice + timeFactor;
    
    return {
      min: Math.round(minPrice / 100) * 100,
      max: Math.round(maxPrice / 100) * 100
    };
  };

  const estimatedPrice = getEstimatedPrice();

  return (
    <section id="pricing" className="py-20 bg-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Flexible <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Pricing</span> Options
          </h2>
          <p className="text-primary-100/70">
            Transparent pricing tailored to your business needs, with no hidden costs or surprises.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pricingPackages.map((pkg, index) => (
            <motion.div 
              key={index}
              className={`${
                pkg.popular ? 'bg-gradient-to-b from-purple-600/20 to-blue-500/20' : 'bg-primary-900'
              } rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 relative`}
              variants={fadeInUp}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-purple-600 text-white px-4 py-1 text-sm font-medium transform rotate-45 translate-x-[30%] translate-y-[170%]">
                    Popular
                  </div>
                </div>
              )}
              <div className="p-8">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${pkg.bgColor} ${pkg.textColor} mb-4`}>
                  <i className={`fas fa-${pkg.icon}`}></i>
                  <span className="text-sm font-medium">{pkg.name.split(' ')[0]}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-primary-100/70 mb-6">{pkg.description}</p>
                <div className="mb-6">
                  {pkg.price ? (
                    <>
                      <span className="text-4xl font-bold">${pkg.price.toLocaleString()}</span>
                      <span className="text-primary-100/70">/ project</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Custom Pricing</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className={`fas fa-check ${pkg.textColor} mr-3`}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={pkg.popular ? "default" : "outline"}
                  className={`w-full ${
                    pkg.popular 
                      ? `bg-purple-600 hover:bg-purple-500 text-white` 
                      : `border-${pkg.color}-500 ${pkg.textColor} hover:bg-${pkg.color}-500 hover:text-white`
                  }`}
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {pkg.price ? "Get Started" : "Contact Sales"}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 p-8 bg-primary-900 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Need a Custom Solution?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-primary-100/70 mb-4">Use our interactive project calculator to get an estimated quote based on your specific requirements.</p>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select 
                    className="w-full bg-primary-800 border border-primary-700 rounded-lg px-4 py-3 text-primary-100"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }}
                  >
                    <option style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }} value="Mobile App">Mobile App</option>
                    <option style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }} value="Web Application">Web Application</option>
                    <option style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }} value="SaaS Platform">SaaS Platform</option>
                    <option style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }} value="AI Solution">AI Solution</option>
                    <option style={{ backgroundColor: 'var(--primary-800)', color: 'var(--primary-100)' }} value="Blockchain Application">Blockchain Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Screens/Features: {screens}</label>
                  <Slider
                    defaultValue={[20]}
                    min={5}
                    max={50}
                    step={1}
                    onValueChange={(value) => setScreens(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-primary-100/70">
                    <span>5</span>
                    <span>20</span>
                    <span>50+</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline (months): {months}</label>
                  <Slider
                    defaultValue={[3]}
                    min={1}
                    max={12}
                    step={1}
                    onValueChange={(value) => setMonths(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-primary-100/70">
                    <span>1</span>
                    <span>3</span>
                    <span>12+</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {["UI/UX Design", "API Integration", "Analytics", "Payment Processing"].map((feature, i) => (
                    <label key={i} className="flex items-center space-x-2 bg-primary-800 px-4 py-2 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="accent-purple-600 w-4 h-4" 
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-primary-800 p-8 rounded-xl">
              <h4 className="text-xl font-bold mb-4">Your Estimated Quote</h4>
              <div className="mb-6">
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  ${estimatedPrice.min.toLocaleString()} - ${estimatedPrice.max.toLocaleString()}
                </span>
              </div>
              <p className="text-primary-100/70 mb-4">This is an estimated range based on your selections. Contact us for a detailed quote.</p>
              <div className="flex flex-col space-y-2">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Request Detailed Quote
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-primary-100 hover:text-white"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
