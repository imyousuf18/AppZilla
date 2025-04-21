import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { FaApple, FaAndroid, FaReact, FaCode, FaDesktop, FaRocket, FaCogs, FaHeadset, FaPaintBrush } from "react-icons/fa";

const MobileAppDevelopment = () => {
  return (
    <div className="min-h-screen bg-primary-900 text-primary-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600">
              Mobile App Development
            </h1>
            <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto">
              Creating powerful, intuitive mobile experiences that users love and businesses depend on
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Transform Your Business with Custom Mobile Applications</h2>
            <p className="text-primary-100/80 mb-6">
              At Appzila, we build premium mobile applications that combine stunning design with flawless functionality. 
              Our expert development team delivers apps that engage users, drive business goals, and stand out in 
              crowded app marketplaces.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <FaApple className="text-xl mr-2" />
                <span>iOS Development</span>
              </div>
              <div className="flex items-center">
                <FaAndroid className="text-xl mr-2" />
                <span>Android Development</span>
              </div>
              <div className="flex items-center">
                <FaReact className="text-xl mr-2" />
                <span>Cross-Platform Apps</span>
              </div>
            </div>
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-500 text-base">
                Start Your Mobile Project
              </Button>
            </Link>
          </div>
          <div className="bg-primary-800 border border-primary-700 rounded-xl p-6 lg:p-10 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl opacity-30 blur-xl"></div>
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-64 h-[500px] bg-black rounded-[36px] border-4 border-primary-700 p-2 relative">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-primary-800 rounded-full"></div>
                  <div className="w-full h-full bg-primary-800 rounded-[28px] flex flex-col overflow-hidden">
                    <div className="h-14 bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                      <div className="text-white font-medium">Appzila Demo</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                        <FaRocket className="text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Your App</div>
                        <div className="text-xs text-primary-100/60">Premium Mobile Experience</div>
                      </div>
                      <div className="w-full h-px bg-primary-700"></div>
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="aspect-square bg-primary-700 rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-14 border-t border-primary-700 flex justify-around items-center px-4">
                      <div className="w-10 h-1 bg-primary-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mobile Development Process</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              We follow a proven methodology to ensure high-quality, efficient app development from concept to launch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaDesktop className="text-3xl text-purple-600" />,
                title: "Discovery & Planning",
                description: "We analyze your requirements, target audience, and business goals to create a detailed app blueprint."
              },
              {
                icon: <FaPaintBrush className="text-3xl text-blue-500" />,
                title: "UI/UX Design",
                description: "Our designers create intuitive interfaces and seamless user experiences tailored to your brand."
              },
              {
                icon: <FaCode className="text-3xl text-green-500" />,
                title: "Development",
                description: "Our engineers build your app using cutting-edge technologies and best development practices."
              },
              {
                icon: <FaRocket className="text-3xl text-orange-500" />,
                title: "Testing & Launch",
                description: "Rigorous quality assurance followed by deployment to app stores and ongoing support."
              }
            ].map((step, idx) => (
              <Card key={idx} className="bg-primary-800 border-primary-700">
                <CardContent className="pt-6">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-primary-100/70">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              We leverage the latest mobile development technologies to build feature-rich, high-performance applications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Swift", color: "from-orange-500 to-red-500" },
              { name: "Kotlin", color: "from-purple-500 to-blue-500" },
              { name: "React Native", color: "from-blue-500 to-cyan-500" },
              { name: "Flutter", color: "from-cyan-500 to-blue-500" },
              { name: "Firebase", color: "from-yellow-500 to-orange-500" },
              { name: "AWS", color: "from-blue-500 to-purple-500" }
            ].map((tech, idx) => (
              <div 
                key={idx} 
                className="aspect-square flex items-center justify-center rounded-lg border border-primary-700 p-4 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-10`}></div>
                <div className="font-medium text-center">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Features */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Mobile App Services</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              From initial concept to post-launch support, we provide comprehensive mobile application services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaCode />,
                title: "Custom App Development",
                description: "Bespoke mobile applications built to your exact specifications with scalable architecture."
              },
              {
                icon: <FaReact />,
                title: "Cross-Platform Development",
                description: "Cost-effective solutions that work seamlessly across iOS and Android platforms."
              },
              {
                icon: <FaCogs />,
                title: "App Optimization",
                description: "Performance enhancements and optimizations to make your app faster and more efficient."
              },
              {
                icon: <FaHeadset />,
                title: "Ongoing Maintenance",
                description: "Continuous support, updates, and improvements to keep your app running flawlessly."
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary-800 border border-primary-700 flex items-center justify-center text-purple-500">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-primary-100/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 border border-primary-700 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Mobile App?</h2>
          <p className="text-primary-100/80 max-w-2xl mx-auto mb-8">
            Contact our team today to discuss your mobile app requirements and get a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-500 text-lg px-8 py-6 h-auto">
                Start Your Project
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDevelopment;