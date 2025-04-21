import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { FaDesktop, FaCode, FaServer, FaDatabase, FaChartLine, FaMobile, FaShieldAlt, FaCloud } from "react-icons/fa";

const WebAppDevelopment = () => {
  return (
    <div className="min-h-screen bg-primary-900 text-primary-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
              Web App Development
            </h1>
            <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto">
              Building scalable, responsive web applications that power your business and delight your users
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Custom Web Applications for Modern Businesses</h2>
            <p className="text-primary-100/80 mb-6">
              Appzila creates powerful web applications that combine elegant design, intuitive user experience, and robust 
              backend architecture. Our solutions are built to scale with your business and adapt to changing technologies.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <FaDesktop className="text-xl mr-2" />
                <span>Frontend Development</span>
              </div>
              <div className="flex items-center">
                <FaServer className="text-xl mr-2" />
                <span>Backend Systems</span>
              </div>
              <div className="flex items-center">
                <FaDatabase className="text-xl mr-2" />
                <span>Database Architecture</span>
              </div>
            </div>
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-500 text-base">
                Start Your Web Project
              </Button>
            </Link>
          </div>
          <div className="bg-primary-800 border border-primary-700 rounded-xl p-6 lg:p-10 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl opacity-30 blur-xl"></div>
            <div className="relative">
              <div className="w-full aspect-[16/10] bg-primary-900 rounded-lg border border-primary-700 overflow-hidden shadow-lg">
                <div className="h-8 bg-primary-800 border-b border-primary-700 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto pr-16 text-xs text-primary-100/60">Appzila Web Solution</div>
                </div>
                <div className="p-4">
                  <div className="h-8 w-full bg-primary-800 rounded-full mb-4"></div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="h-24 bg-primary-800 rounded-lg col-span-1"></div>
                    <div className="h-24 bg-primary-800 rounded-lg col-span-1"></div>
                    <div className="h-24 bg-primary-800 rounded-lg col-span-1"></div>
                    <div className="h-24 bg-primary-800 rounded-lg col-span-1"></div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg mb-4 flex items-center justify-center shadow-lg">
                    <div className="text-white font-bold">Your Web Application</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-16 bg-primary-800 rounded-lg col-span-2"></div>
                    <div className="h-16 bg-primary-800 rounded-lg col-span-1"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <div className="w-16 h-16 bg-primary-800 border border-primary-700 rounded-full flex items-center justify-center">
                  <FaDesktop className="text-xl text-blue-500" />
                </div>
                <div className="w-16 h-16 bg-primary-800 border border-primary-700 rounded-full flex items-center justify-center">
                  <FaServer className="text-xl text-cyan-500" />
                </div>
                <div className="w-16 h-16 bg-primary-800 border border-primary-700 rounded-full flex items-center justify-center">
                  <FaDatabase className="text-xl text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Web App Types */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Web Applications We Build</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              From enterprise platforms to customer-facing applications, we deliver web solutions for diverse business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaChartLine className="text-3xl text-blue-500" />,
                title: "Enterprise Platforms",
                description: "Custom business systems, dashboards, and internal tools that streamline operations and boost productivity."
              },
              {
                icon: <FaDesktop className="text-3xl text-cyan-500" />,
                title: "Customer Portals",
                description: "Secure, intuitive interfaces for customer account management, services, and support access."
              },
              {
                icon: <FaShoppingCart className="text-3xl text-blue-500" />,
                title: "E-commerce Solutions",
                description: "High-performance online stores with seamless checkout processes and powerful backend management."
              },
              {
                icon: <FaMobile className="text-3xl text-cyan-500" />,
                title: "Progressive Web Apps",
                description: "Web applications that deliver mobile-app experiences with offline capabilities and fast loading."
              },
              {
                icon: <FaCloud className="text-3xl text-blue-500" />,
                title: "SaaS Platforms",
                description: "Scalable, multi-tenant cloud software solutions with subscription management and user onboarding."
              },
              {
                icon: <FaDatabase className="text-3xl text-cyan-500" />,
                title: "Data-Driven Applications",
                description: "Interactive data visualization and analytics platforms that transform complex information into actionable insights."
              }
            ].map((type, idx) => (
              <Card key={idx} className="bg-primary-800 border-primary-700">
                <CardContent className="pt-6">
                  <div className="mb-4">{type.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{type.title}</h3>
                  <p className="text-primary-100/70">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              We use cutting-edge technologies to build robust, scalable, and maintainable web applications
            </p>
          </div>
          
          <div className="bg-primary-800 border border-primary-700 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4 text-blue-400">Frontend</h3>
                <ul className="space-y-3">
                  {["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"].map((tech, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-cyan-400">Backend</h3>
                <ul className="space-y-3">
                  {["Node.js", "Express", "Django", "ASP.NET Core", "Laravel"].map((tech, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-blue-400">Database & Infrastructure</h3>
                <ul className="space-y-3">
                  {["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes"].map((tech, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Sets Our Web Apps Apart</h2>
            <p className="text-primary-100/80 max-w-3xl mx-auto">
              Key features and advantages of choosing Appzila for your web application development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Security-First Development",
                description: "Robust security practices integrated throughout the development lifecycle to protect sensitive data."
              },
              {
                icon: <FaMobile />,
                title: "Responsive by Design",
                description: "Applications that work flawlessly across all devices, from desktops to smartphones."
              },
              {
                icon: <FaChartLine />,
                title: "Scalable Architecture",
                description: "Built to handle growth, with systems that can scale from hundreds to millions of users."
              },
              {
                icon: <FaCode />,
                title: "Clean, Maintainable Code",
                description: "Well-structured code following best practices for long-term maintenance and evolution."
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary-800 border border-primary-700 flex items-center justify-center text-blue-500">
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
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Web Presence?</h2>
          <p className="text-primary-100/80 max-w-2xl mx-auto mb-8">
            Contact our web development experts today to discuss your project requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-500 text-lg px-8 py-6 h-auto">
                Request a Consultation
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                Explore Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define missing icon
const FaShoppingCart = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 576 512" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
    </svg>
  );
};

export default WebAppDevelopment;