import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FiZap, FiSmartphone, FiMonitor, FiSend, FiDownload, FiEdit3, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AppSandbox = () => {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<string>("ecommerce");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [activeDevice, setActiveDevice] = useState<"mobile" | "desktop">("desktop");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeFeedbackTab, setActiveFeedbackTab] = useState<string>("bugs");
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  
  // Check for URL fragment to determine which tab to show
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === "bugs" || hash === "usability" || hash === "suggestions") {
      setActiveFeedbackTab(hash);
      // Scroll to feedback section
      setTimeout(() => {
        const feedbackSection = document.getElementById("feedbackTabs");
        if (feedbackSection) {
          feedbackSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  // Simulated test flow steps
  const testSteps = [
    { id: 1, name: "Login screen", description: "Test user authentication flow" },
    { id: 2, name: "Product browsing", description: "Test category and product navigation" },
    { id: 3, name: "Cart functionality", description: "Test adding and removing products" },
    { id: 4, name: "Checkout flow", description: "Test payment processing and order confirmation" }
  ];

  // Simulate app loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  // Submit feedback
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback. Our team will review it shortly.",
    });
    setNotes("");
  };

  // Start a test session
  const startTestSession = () => {
    setIsRecording(true);
    toast({
      title: "Test session started",
      description: "We're now recording your interactions with the app.",
    });
  };

  // End a test session
  const endTestSession = () => {
    setIsRecording(false);
    
    // Simulate generating test results
    const newResults = [
      { id: 1, element: "Login Button", status: "passed", message: "Renders correctly and triggers authentication flow" },
      { id: 2, element: "Product List", status: "passed", message: "Loads products and allows filtering" },
      { id: 3, element: "Add to Cart", status: "warning", message: "Button sometimes unresponsive on mobile" },
      { id: 4, element: "Checkout Form", status: "failed", message: "Address validation not working correctly" }
    ];
    
    setTestResults(newResults);
    
    toast({
      title: "Test session completed",
      description: "Test results have been generated. See the report below.",
    });
  };

  // Change app version
  const handleAppChange = (appId: string) => {
    setIsLoading(true);
    setSelectedApp(appId);
    setCurrentStep(1);
    setTestResults([]);
  };

  // Navigate through test steps
  const goToNextStep = () => {
    if (currentStep < testSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      endTestSession();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              App Testing & QA <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Sandbox</span>
            </h1>
            <p className="text-xl text-primary-100/70 max-w-3xl mx-auto">
              Test and provide feedback on our interactive app prototypes. Help us improve user experience before deployment.
            </p>
          </div>
          
          <div className="bg-primary-800 rounded-xl p-6 mb-8 border border-primary-700">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Prototype</CardTitle>
                    <CardDescription>Choose an app to test</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button 
                        variant={selectedApp === "ecommerce" ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => handleAppChange("ecommerce")}
                      >
                        <FiSmartphone className="mr-2" /> E-Commerce App
                      </Button>
                      <Button 
                        variant={selectedApp === "fitness" ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => handleAppChange("fitness")}
                      >
                        <FiSmartphone className="mr-2" /> Fitness Tracker
                      </Button>
                      <Button 
                        variant={selectedApp === "banking" ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => handleAppChange("banking")}
                      >
                        <FiSmartphone className="mr-2" /> Banking Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Device & Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>View Mode</span>
                      <div className="flex border rounded-lg overflow-hidden">
                        <Button 
                          variant={activeDevice === "desktop" ? "default" : "ghost"} 
                          size="sm"
                          onClick={() => setActiveDevice("desktop")}
                        >
                          <FiMonitor size={16} />
                        </Button>
                        <Button 
                          variant={activeDevice === "mobile" ? "default" : "ghost"} 
                          size="sm"
                          onClick={() => setActiveDevice("mobile")}
                        >
                          <FiSmartphone size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Dark Mode</span>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Animation Speed</span>
                        <span>1.0x</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>
                
                {isRecording ? (
                  <Card className="border-red-500">
                    <CardHeader>
                      <CardTitle className="text-red-500">Recording Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Current step: {currentStep} of {testSteps.length}</p>
                      <p className="font-medium">{testSteps[currentStep-1]?.name}</p>
                      <p className="text-sm text-primary-100/70">{testSteps[currentStep-1]?.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <div className="flex space-x-2 w-full">
                        <Button variant="outline" onClick={goToPrevStep} disabled={currentStep === 1} className="flex-1">
                          Previous
                        </Button>
                        <Button onClick={goToNextStep} className="flex-1">
                          {currentStep === testSteps.length ? "Finish" : "Next"}
                        </Button>
                      </div>
                      <Button variant="destructive" onClick={endTestSession} className="w-full">
                        End Session
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={startTestSession} className="w-full">
                        <FiZap className="mr-2" /> Start Test Session
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="lg:w-3/4">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {selectedApp === "ecommerce" && "E-Commerce App"}
                        {selectedApp === "fitness" && "Fitness Tracker"}
                        {selectedApp === "banking" && "Banking Portal"}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FiEdit3 size={14} className="mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <FiDownload size={14} className="mr-1" /> Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`border border-primary-700 rounded-lg ${activeDevice === "mobile" ? "w-80 mx-auto" : "w-full"} overflow-hidden h-[500px]`}>
                      {isLoading ? (
                        <div className="h-full flex items-center justify-center bg-primary-900/50 animate-pulse">
                          <div className="space-y-6 w-3/4">
                            <div className="h-4 bg-primary-700 rounded w-3/4"></div>
                            <div className="h-4 bg-primary-700 rounded"></div>
                            <div className="h-4 bg-primary-700 rounded w-4/5"></div>
                            <div className="h-10 bg-primary-700 rounded"></div>
                            <div className="h-32 bg-primary-700 rounded"></div>
                          </div>
                        </div>
                      ) : (
                        <div className={`h-full ${darkMode ? "bg-primary-900" : "bg-white"} ${darkMode ? "text-white" : "text-black"} overflow-auto`}>
                          <div className="p-4">
                            {selectedApp === "ecommerce" && (
                              <div className="space-y-4">
                                <div className="text-center mb-6">
                                  <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>ShopEasy</h2>
                                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Premium Shopping Experience</p>
                                </div>
                                
                                {currentStep === 1 && (
                                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                      <Input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formFields.email}
                                        onChange={handleFormChange}
                                        className={`${darkMode ? "bg-primary-800 border-primary-700" : "bg-gray-100 border-gray-300"}`}
                                      />
                                    </div>
                                    <div>
                                      <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formFields.password}
                                        onChange={handleFormChange}
                                        className={`${darkMode ? "bg-primary-800 border-primary-700" : "bg-gray-100 border-gray-300"}`}
                                      />
                                    </div>
                                    <Button className="w-full">Login</Button>
                                    <div className="text-center">
                                      <a href="#" className="text-sm text-blue-500">Forgot password?</a>
                                      <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
                                      </p>
                                    </div>
                                  </form>
                                )}
                                
                                {currentStep === 2 && (
                                  <div className="space-y-4">
                                    <div className={`p-2 rounded-lg ${darkMode ? "bg-primary-800" : "bg-gray-100"}`}>
                                      <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className={`${darkMode ? "bg-primary-700 border-primary-600" : "bg-white border-gray-200"}`}
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                      {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div
                                          key={item}
                                          className={`rounded-lg p-2 border ${darkMode ? "border-primary-700 bg-primary-800" : "border-gray-200 bg-white"}`}
                                        >
                                          <div className={`aspect-square rounded-md mb-2 ${darkMode ? "bg-primary-700" : "bg-gray-200"}`}></div>
                                          <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-black"}`}>Product {item}</p>
                                          <p className="text-xs text-blue-500">$99.99</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {currentStep === 3 && (
                                  <div className="space-y-4">
                                    <h3 className={`text-xl font-medium ${darkMode ? "text-white" : "text-slate-800"}`}>Your Cart</h3>
                                    
                                    {[1, 2, 3].map((item) => (
                                      <div
                                        key={item}
                                        className={`flex space-x-3 p-3 rounded-lg ${darkMode ? "bg-primary-800" : "bg-gray-100"}`}
                                      >
                                        <div className={`w-16 h-16 rounded ${darkMode ? "bg-primary-700" : "bg-gray-200"}`}></div>
                                        <div className="flex-1">
                                          <div className="flex justify-between">
                                            <p className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>Product {item}</p>
                                            <p className="text-blue-500">$99.99</p>
                                          </div>
                                          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Quantity: 1</p>
                                          <div className="flex space-x-2 mt-2">
                                            <Button variant="outline" size="sm">+</Button>
                                            <Button variant="outline" size="sm">−</Button>
                                            <Button variant="destructive" size="sm">Remove</Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    <div className={`p-3 rounded-lg ${darkMode ? "bg-primary-800" : "bg-gray-100"}`}>
                                      <div className="flex justify-between mb-1">
                                        <span>Subtotal</span>
                                        <span>$299.97</span>
                                      </div>
                                      <div className="flex justify-between mb-1">
                                        <span>Shipping</span>
                                        <span>$9.99</span>
                                      </div>
                                      <div className="flex justify-between font-bold pt-2 border-t border-gray-700">
                                        <span>Total</span>
                                        <span>$309.96</span>
                                      </div>
                                    </div>
                                    
                                    <Button className="w-full">Proceed to Checkout</Button>
                                  </div>
                                )}
                                
                                {currentStep === 4 && (
                                  <div className="space-y-4">
                                    <h3 className={`text-xl font-medium ${darkMode ? "text-white" : "text-slate-800"}`}>Checkout</h3>
                                    
                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-primary-800" : "bg-gray-100"}`}>
                                      <h4 className="font-medium mb-3">Shipping Information</h4>
                                      <form className="space-y-3">
                                        <Input
                                          placeholder="Full Name"
                                          name="username"
                                          value={formFields.username}
                                          onChange={handleFormChange}
                                          className={`${darkMode ? "bg-primary-700 border-primary-600" : "bg-white border-gray-200"}`}
                                        />
                                        <Input
                                          placeholder="Address"
                                          name="address"
                                          value={formFields.address}
                                          onChange={handleFormChange}
                                          className={`${darkMode ? "bg-primary-700 border-primary-600" : "bg-white border-gray-200"}`}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                          <Input
                                            placeholder="City"
                                            className={`${darkMode ? "bg-primary-700 border-primary-600" : "bg-white border-gray-200"}`}
                                          />
                                          <Input
                                            placeholder="ZIP Code"
                                            className={`${darkMode ? "bg-primary-700 border-primary-600" : "bg-white border-gray-200"}`}
                                          />
                                        </div>
                                      </form>
                                    </div>
                                    
                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-primary-800" : "bg-gray-100"}`}>
                                      <h4 className="font-medium mb-3">Payment Method</h4>
                                      <div className="space-y-2">
                                        <div className={`p-3 rounded border ${darkMode ? "border-primary-600 bg-primary-700" : "border-gray-300 bg-white"} flex items-center justify-between`}>
                                          <span>Credit Card</span>
                                          <div className="w-10 h-6 bg-blue-500 rounded"></div>
                                        </div>
                                        <div className={`p-3 rounded border ${darkMode ? "border-primary-700" : "border-gray-200"} flex items-center justify-between`}>
                                          <span>PayPal</span>
                                          <div className="w-10 h-6 bg-indigo-500 rounded"></div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <Button className="w-full">Complete Order</Button>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {selectedApp === "fitness" && (
                              <div className="text-center py-12">
                                <h3 className="text-xl mb-2">Fitness Tracker App</h3>
                                <p className="text-sm mb-4">This prototype is coming soon</p>
                                <Button>Request Early Access</Button>
                              </div>
                            )}
                            
                            {selectedApp === "banking" && (
                              <div className="text-center py-12">
                                <h3 className="text-xl mb-2">Banking Portal App</h3>
                                <p className="text-sm mb-4">This prototype is coming soon</p>
                                <Button>Request Early Access</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {testResults.length > 0 && (
            <div className="bg-primary-800 rounded-xl p-6 mb-8 border border-primary-700">
              <h2 className="text-2xl font-bold mb-4">Test Results</h2>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div 
                    key={result.id} 
                    className={`p-4 rounded-lg border ${
                      result.status === "passed" 
                        ? "border-green-500/50 bg-green-500/10" 
                        : result.status === "warning"
                          ? "border-yellow-500/50 bg-yellow-500/10"
                          : "border-red-500/50 bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {result.status === "passed" ? (
                          <FiCheckCircle className="text-green-500" />
                        ) : result.status === "warning" ? (
                          <FiCheckCircle className="text-yellow-500" />
                        ) : (
                          <FiXCircle className="text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{result.element}</h3>
                        <p className="text-sm text-primary-100/70">{result.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-4" onClick={() => { setTestResults([]); }}>
                Clear Results
              </Button>
            </div>
          )}
          
          <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
            <h2 className="text-2xl font-bold mb-4">Provide Feedback</h2>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <Tabs value={activeFeedbackTab} onValueChange={setActiveFeedbackTab} id="feedbackTabs">
                <TabsList className="mb-4">
                  <TabsTrigger value="bugs" id="bugs">Report Bugs</TabsTrigger>
                  <TabsTrigger value="usability">Usability Issues</TabsTrigger>
                  <TabsTrigger value="suggestions" id="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bugs" className="space-y-4">
                  <p className="text-primary-100/70">
                    Report any bugs or errors you encountered while testing the application.
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="bug-notes" className="text-sm font-medium">Describe the issue</label>
                    <Textarea 
                      id="bug-notes" 
                      placeholder="Please provide steps to reproduce the issue..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="file" id="screenshot" className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("screenshot")?.click()}>
                      Add Screenshot
                    </Button>
                    <span className="text-xs text-primary-100/70">No file selected</span>
                  </div>
                </TabsContent>
                
                <TabsContent value="usability" className="space-y-4">
                  <p className="text-primary-100/70">
                    Share your thoughts on the app's ease of use and user experience.
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="usability-notes" className="text-sm font-medium">Describe any usability issues</label>
                    <Textarea 
                      id="usability-notes" 
                      placeholder="What was difficult to use or understand?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="suggestions" className="space-y-4">
                  <p className="text-primary-100/70">
                    Suggest new features or improvements to existing functionality.
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="suggestion-notes" className="text-sm font-medium">Your suggestions</label>
                    <Textarea 
                      id="suggestion-notes" 
                      placeholder="What would make this app better?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end">
                <Button type="submit">
                  <FiSend className="mr-2" /> Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppSandbox;