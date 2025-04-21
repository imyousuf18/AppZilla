import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { FaMobileAlt, FaDesktop, FaPaintBrush, FaRobot, FaCubes, FaCloud } from "react-icons/fa";

const servicesList = [
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: <FaMobileAlt className="text-4xl text-purple-600" />,
    description: "Native and cross-platform mobile applications with outstanding UI/UX experiences.",
    features: ["iOS & Android Apps", "Cross-Platform Development", "App Store Optimization", "Maintenance & Support"],
    link: "/services/mobile-app-development"
  },
  {
    id: "web-dev",
    title: "Web App Development",
    icon: <FaDesktop className="text-4xl text-blue-500" />,
    description: "Scalable web applications with responsive designs and powerful backend infrastructures.",
    features: ["Progressive Web Apps", "E-commerce Solutions", "Enterprise Platforms", "API Development"],
    link: "/services/web-app-development"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: <FaPaintBrush className="text-4xl text-pink-500" />,
    description: "User-centered design processes that create intuitive and engaging digital experiences.",
    features: ["Interface Design", "User Experience Research", "Interaction Design", "Prototyping"],
    link: "/services/ui-ux-design"
  },
  {
    id: "ai",
    title: "AI Solutions",
    icon: <FaRobot className="text-4xl text-green-500" />,
    description: "Artificial intelligence integration to make your applications smarter and more effective.",
    features: ["Machine Learning", "Predictive Analytics", "Natural Language Processing", "Computer Vision"],
    link: "/services/ai-solutions"
  },
  {
    id: "blockchain",
    title: "Blockchain Applications",
    icon: <FaCubes className="text-4xl text-orange-500" />,
    description: "Secure and transparent blockchain implementations for modern business needs.",
    features: ["Smart Contracts", "Cryptocurrency Development", "Decentralized Apps", "Blockchain Consulting"],
    link: "/services/blockchain-applications"
  },
  {
    id: "saas",
    title: "SaaS Development",
    icon: <FaCloud className="text-4xl text-cyan-500" />,
    description: "Cloud-based software solutions with subscription models for recurring revenue.",
    features: ["Multi-tenant Architecture", "Subscription Management", "Cloud Infrastructure", "Scalable Solutions"],
    link: "/services/saas-development"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-primary-900 text-primary-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto">
            End-to-end digital solutions crafted to transform your ideas into market-leading products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <Card key={service.id} className="bg-primary-800 border-primary-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/30">
              <CardHeader className="pb-4">
                <div className="mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-primary-100/70 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-purple-600 mr-3"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={service.link}>
                  <Button className="w-full bg-primary-700 hover:bg-primary-600 transition-colors duration-300">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-primary-800 border border-primary-700 rounded-2xl mt-20 p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your idea into reality?</h2>
          <p className="text-primary-100/80 max-w-2xl mx-auto mb-8">
            Our expert team is ready to help you build the digital solution you need to achieve your goals.
          </p>
          <Link href="/contact">
            <Button className="bg-purple-600 hover:bg-purple-500 text-lg px-8 py-6 h-auto">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;