import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
import { Link, useLocation } from "wouter";
import { FaSun, FaMoon, FaBell, FaComments, FaCheck, FaClock, FaCode, FaPaintBrush, FaMobileAlt, FaVrCardboard, FaBug, FaLightbulb, FaDownload, FaCalendarAlt, FaBook, FaPalette, FaChartLine, FaGamepad, FaTasks, FaSignOutAlt, FaRocket } from "react-icons/fa";
import PerformanceMetricsDashboard from "@/components/PerformanceMetricsDashboard";
import GamifiedOnboarding from "@/components/GamifiedOnboarding";
import InteractiveProgressIndicator, { MultiStepFormExample } from "@/components/InteractiveProgressIndicator";
import ColorThemeGenerator from "@/components/ColorThemeGenerator";

// Mock data for demonstration
const projects = [
  {
    id: 1,
    name: "E-commerce Mobile App",
    progress: 75,
    status: "In Progress",
    dueDate: "2025-04-15",
    lastUpdate: "2025-03-22",
    description: "A premium e-commerce application with advanced AI product recommendations.",
    milestones: [
      { name: "Design Phase", complete: true },
      { name: "Frontend Development", complete: true },
      { name: "Backend Integration", complete: false },
      { name: "QA & Testing", complete: false },
      { name: "Deployment", complete: false }
    ]
  },
  {
    id: 2,
    name: "Financial Dashboard Web App",
    progress: 90,
    status: "QA Testing",
    dueDate: "2025-04-02",
    lastUpdate: "2025-03-24",
    description: "An enterprise financial analytics dashboard with real-time data visualization.",
    milestones: [
      { name: "Design Phase", complete: true },
      { name: "Frontend Development", complete: true },
      { name: "Backend Integration", complete: true },
      { name: "QA & Testing", complete: false },
      { name: "Deployment", complete: false }
    ]
  },
  {
    id: 3,
    name: "Healthcare Patient Portal",
    progress: 30,
    status: "Design Phase",
    dueDate: "2025-05-20",
    lastUpdate: "2025-03-20",
    description: "A secure patient management portal with telemedicine capabilities.",
    milestones: [
      { name: "Requirements Gathering", complete: true },
      { name: "Design Phase", complete: false },
      { name: "Frontend Development", complete: false },
      { name: "Backend Integration", complete: false },
      { name: "QA & Testing", complete: false }
    ]
  }
];

const notifications = [
  {
    id: 1,
    title: "E-commerce Mobile App",
    message: "Backend API integration completed",
    date: "2025-03-22",
    read: false
  },
  {
    id: 2,
    title: "Financial Dashboard Web App",
    message: "QA testing started - Please review initial findings",
    date: "2025-03-24",
    read: false
  },
  {
    id: 3,
    title: "System Notification",
    message: "Your weekly project summary is ready to view",
    date: "2025-03-25",
    read: true
  }
];

const invoices = [
  {
    id: "INV-2025-001",
    project: "E-commerce Mobile App",
    amount: 12750,
    date: "2025-03-15",
    status: "Paid"
  },
  {
    id: "INV-2025-002",
    project: "Financial Dashboard Web App",
    amount: 8500,
    date: "2025-03-20",
    status: "Pending"
  },
  {
    id: "INV-2025-003",
    project: "Healthcare Patient Portal",
    amount: 4999,
    date: "2025-03-25",
    status: "Pending"
  }
];

const DashboardHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account",
        });
        navigate("/");
      }
    });
  };
  
  return (
    <div className="bg-primary-800 border-b border-primary-700 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground transition-colors duration-300">Appzila</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-primary-100 hover:text-white transition duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            
            <div className="relative">
              <button 
                className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-primary-100 hover:text-white transition duration-300"
                onClick={() => alert("Notifications opened")}
              >
                <FaBell />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-primary-100 hover:text-red-500 transition duration-300"
              aria-label="Log out"
              title="Log out"
              disabled={logoutMutation.isPending}
            >
              <FaSignOutAlt />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.username ? user.username.substring(0, 2).toUpperCase() : 'CL'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{user?.fullName || user?.username || 'Client'}</p>
                <p className="text-xs text-primary-100/70">{user?.company || 'Premium Client'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activeProject, setActiveProject] = useState(projects.length > 0 ? projects[0] : null);
  const [hasProjects, setHasProjects] = useState(projects.length > 0);
  const [hasInvoices, setHasInvoices] = useState(invoices.length > 0);
  
  // For testing empty states - only in development
  const toggleProjectsVisibility = () => {
    if (process.env.NODE_ENV === 'development') {
      setHasProjects(!hasProjects);
    }
  };
  
  const toggleInvoicesVisibility = () => {
    if (process.env.NODE_ENV === 'development') {
      setHasInvoices(!hasInvoices);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 text-primary-100 font-sans antialiased">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Client Dashboard</h1>
            <p className="text-primary-100/60 mt-1">Welcome back, {user?.fullName || user?.username || 'Client'}</p>
            {/* Development mode toggle for empty states */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                onClick={toggleProjectsVisibility}
                className="text-xs text-primary-100/40 mt-1 hover:text-primary-100/70"
              >
                [Toggle Empty State]
              </button>
            )}
          </div>
          <Button className="bg-purple-600 hover:bg-purple-500" onClick={() => alert("Support chat opened")}>
            <FaComments className="mr-2" />
            <span>Contact Support</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="projects" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="sandbox">Testing Sandbox</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="metrics"><FaChartLine className="mr-2" />Metrics</TabsTrigger>
                <TabsTrigger value="onboarding"><FaGamepad className="mr-2" />Onboarding</TabsTrigger>
                <TabsTrigger value="theme"><FaPalette className="mr-2" />Theme</TabsTrigger>
                <TabsTrigger value="progress"><FaTasks className="mr-2" />Forms</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects" className="space-y-6">
                {hasProjects ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <Card 
                          key={project.id} 
                          className={`bg-primary-800 border-primary-700 cursor-pointer transition-all duration-300 ${
                            activeProject && activeProject.id === project.id ? "ring-2 ring-purple-600" : ""
                          }`}
                          onClick={() => setActiveProject(project)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{project.name}</CardTitle>
                              <div className={`px-2 py-1 text-xs rounded-full ${
                                project.status === "In Progress" ? "bg-blue-900/40 text-blue-400" :
                                project.status === "QA Testing" ? "bg-purple-900/40 text-purple-400" :
                                "bg-cyan-900/40 text-cyan-400"
                              }`}>
                                {project.status}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-primary-100/70">Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                              <div className="flex justify-between text-xs text-primary-100/60 pt-2">
                                <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                                <span>Updated: {new Date(project.lastUpdate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {activeProject && (
                      <Card className="bg-primary-800 border-primary-700">
                        <CardHeader>
                          <CardTitle>{activeProject.name}</CardTitle>
                          <CardDescription>{activeProject.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Project Milestones</h3>
                            <div className="space-y-3">
                              {activeProject.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex items-center">
                                  <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                                    milestone.complete ? "bg-green-600/20 text-green-500" : "bg-primary-700 text-primary-400"
                                  }`}>
                                    {milestone.complete ? (
                                      <FaCheck className="text-xs" />
                                    ) : (
                                      <FaClock className="text-xs" />
                                    )}
                                  </div>
                                  <span className={milestone.complete ? "line-through opacity-70" : ""}>
                                    {milestone.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Project Timeline</h3>
                            <div className="relative">
                              <div className="absolute top-0 bottom-0 left-5 ml-px w-0.5 bg-primary-700"></div>
                              <div className="space-y-6 relative">
                                <div className="flex">
                                  <div className="flex-shrink-0 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center z-10">
                                      <FaCheck className="text-purple-600" />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">Kickoff Meeting</div>
                                    <div className="text-xs text-primary-100/60">2025-03-05</div>
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="flex-shrink-0 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center z-10">
                                      <FaPaintBrush className="text-blue-600" />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">Design Approval</div>
                                    <div className="text-xs text-primary-100/60">2025-03-15</div>
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="flex-shrink-0 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center z-10">
                                      <FaCode className="text-primary-300" />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">Development Complete</div>
                                    <div className="text-xs text-primary-100/60">2025-04-10 (Projected)</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => alert("Assets downloaded")}>Download Assets</Button>
                          <Button className="bg-purple-600 hover:bg-purple-500" onClick={() => alert("Meeting scheduled")}>Schedule Meeting</Button>
                        </CardFooter>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card className="bg-primary-800 border-primary-700">
                    <CardHeader>
                      <CardTitle>Welcome to Your Dashboard</CardTitle>
                      <CardDescription>Let's get started with your first project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center py-12">
                      <div className="mx-auto w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                        <FaRocket className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-xl font-medium">No Projects Yet</h3>
                      <p className="text-primary-100/70 max-w-md mx-auto">
                        Get started by creating your first project or explore our onboarding process to learn how to make the most of your dashboard.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button 
                          onClick={() => alert("New project form would open")}
                          className="bg-purple-600 hover:bg-purple-500"
                        >
                          <FaRocket className="mr-2 h-4 w-4" />
                          Create New Project
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => document.querySelector('[data-value="onboarding"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                        >
                          <FaGamepad className="mr-2" />
                          Start Onboarding
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="sandbox" className="space-y-6">
                <Card className="bg-primary-800 border-primary-700">
                  <CardHeader>
                    <CardTitle>App Testing Sandbox</CardTitle>
                    <CardDescription>Test your application in development with the interactive QA environment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-primary-900 p-6 rounded-lg border border-primary-700">
                      <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-800 rounded-full mb-4">
                          <FaMobileAlt className="text-2xl text-purple-600" />
                        </div>
                        <h3 className="text-xl font-medium mb-2 text-primary-100">Interactive App Prototype</h3>
                        <p className="text-primary-100 mb-6">Experience and test your application in development</p>
                        <Link href="/app-sandbox">
                          <Button className="bg-purple-600 hover:bg-purple-500">
                            <FaVrCardboard className="mr-2" />
                            Launch Prototype
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-primary-900 border-primary-700">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Bug Reporting</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-primary-100/70 text-sm mb-4">Report issues directly from the prototype environment</p>
                          <Link href="/app-sandbox#bugs">
                            <Button variant="outline" className="w-full">
                              <FaBug className="mr-2" />
                              Submit Bug Report
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary-900 border-primary-700">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Feature Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-primary-100/70 text-sm mb-4">Suggest new features or improvements to your app</p>
                          <Link href="/app-sandbox#suggestions">
                            <Button variant="outline" className="w-full">
                              <FaLightbulb className="mr-2" />
                              Submit Request
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invoices" className="space-y-6">
                <Card className="bg-primary-800 border-primary-700">
                  <CardHeader>
                    <CardTitle>Invoices & Billing</CardTitle>
                    <CardDescription>Manage your payments and billing information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Invoices toggle for development mode */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mb-4">
                        <button
                          onClick={toggleInvoicesVisibility}
                          className="text-xs text-primary-100/40 hover:text-primary-100/70"
                        >
                          [Toggle Invoices Empty State]
                        </button>
                      </div>
                    )}
                    {hasInvoices ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-primary-700">
                              <th className="text-left py-3 px-4 font-medium">Invoice ID</th>
                              <th className="text-left py-3 px-4 font-medium">Project</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Amount</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-left py-3 px-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoices.map((invoice) => (
                              <tr key={invoice.id} className="border-b border-primary-700">
                                <td className="py-3 px-4">{invoice.id}</td>
                                <td className="py-3 px-4">{invoice.project}</td>
                                <td className="py-3 px-4">{new Date(invoice.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">${invoice.amount.toLocaleString()}</td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    invoice.status === "Paid" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"
                                  }`}>
                                    {invoice.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm" className="h-8" onClick={() => alert(`Invoice ${invoice.id} downloaded`)}>
                                    <FaDownload className="mr-1" /> PDF
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
                          <FaCalendarAlt className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-medium">No Invoices Yet</h3>
                        <p className="text-primary-100/70 max-w-md mx-auto mt-2 mb-6">
                          Invoices will appear here once your projects have billable milestones.
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => document.querySelector('[data-value="projects"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                        >
                          View Your Projects
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-6">
                <PerformanceMetricsDashboard />
              </TabsContent>
              
              <TabsContent value="onboarding" className="space-y-6">
                <GamifiedOnboarding />
              </TabsContent>
              
              <TabsContent value="theme" className="space-y-6">
                <ColorThemeGenerator />
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-6">
                <MultiStepFormExample />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.read ? "border-primary-700 bg-primary-800" : "border-purple-700/50 bg-primary-800/80"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                        )}
                      </div>
                      <p className="text-primary-100/70 text-sm my-1">{notification.message}</p>
                      <p className="text-xs text-primary-100/50">{new Date(notification.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-center" onClick={() => alert("Viewing all notifications")}>
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-primary-800 border-primary-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Live chat initiated")}>
                  <FaComments className="mr-2 text-purple-600" />
                  <span>Live Chat Support</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Call scheduling opened")}>
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span>Schedule a Call</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Documentation opened")}>
                  <FaBook className="mr-2 text-cyan-500" />
                  <span>Documentation</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;