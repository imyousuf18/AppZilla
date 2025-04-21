import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
  isValid?: boolean;
}

interface InteractiveProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete?: () => void;
  showSidebar?: boolean;
  completedSteps?: string[];
  onStepComplete?: (stepId: string) => void;
}

const InteractiveProgressIndicator: React.FC<InteractiveProgressIndicatorProps> = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  showSidebar = true,
  completedSteps = [],
  onStepComplete,
}) => {
  const { toast } = useToast();
  const [stepHistory, setStepHistory] = useState<number[]>([0]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isMobile, setIsMobile] = useState(false);

  // Update when the window size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Add to history when step changes
  useEffect(() => {
    if (!stepHistory.includes(currentStep)) {
      setStepHistory([...stepHistory, currentStep]);
    }
  }, [currentStep]);

  const goToStep = (stepIndex: number) => {
    setDirection(stepIndex > currentStep ? 'forward' : 'backward');
    onStepChange(stepIndex);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      
      // If the current step has a validation function, check it
      const currentStepObj = steps[currentStep];
      if (currentStepObj.isValid === false) {
        toast({
          title: "Cannot Proceed",
          description: "Please complete the current step first.",
          variant: "destructive",
        });
        return;
      }
      
      // Mark the current step as completed if it's not already
      if (onStepComplete && !completedSteps.includes(currentStepObj.id)) {
        onStepComplete(currentStepObj.id);
      }
      
      setDirection('forward');
      onStepChange(nextStepIndex);
    } else if (onComplete) {
      // If this is the last step and has a validation function, check it
      const currentStepObj = steps[currentStep];
      if (currentStepObj.isValid === false) {
        toast({
          title: "Cannot Complete",
          description: "Please complete the current step first.",
          variant: "destructive",
        });
        return;
      }
      
      // Mark the last step as completed if it's not already
      if (onStepComplete && !completedSteps.includes(currentStepObj.id)) {
        onStepComplete(currentStepObj.id);
      }
      
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward');
      onStepChange(currentStep - 1);
    }
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  const isStepDisabled = (index: number) => {
    // Allow navigation to steps that are completed or adjacent to the latest completed step
    if (index === 0) return false; // First step is always enabled
    if (index <= Math.max(...completedSteps.map(id => steps.findIndex(step => step.id === id)) as number[]) + 1) {
      return false;
    }
    return true;
  };

  const calculateProgressPercentage = () => {
    if (steps.length === 0) return 0;
    return Math.round(((completedSteps.length) / steps.length) * 100);
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-primary-800 h-1 rounded-full overflow-hidden relative mb-6">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgressPercentage()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  };

  const renderMobileIndicator = () => {
    return (
      <div className="mb-6">
        {renderProgressBar()}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {calculateProgressPercentage()}% Complete
          </span>
        </div>
        <h3 className="text-lg font-bold mt-2">{steps[currentStep].title}</h3>
        {steps[currentStep].subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{steps[currentStep].subtitle}</p>
        )}
      </div>
    );
  };

  const renderDesktopSidebar = () => {
    return (
      <div className="hidden md:block md:w-64 lg:w-72 shrink-0 border-r border-primary-800 pr-6">
        <div className="mb-6">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Your Progress</h3>
            <span className="text-sm text-muted-foreground">
              {calculateProgressPercentage()}%
            </span>
          </div>
          {renderProgressBar()}
        </div>
        
        <div className="space-y-1">
          {steps.map((step, index) => {
            const isCompleted = isStepCompleted(step.id);
            const isCurrent = currentStep === index;
            const isDisabled = isStepDisabled(index);
            
            return (
              <button
                key={step.id}
                onClick={() => !isDisabled && goToStep(index)}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center p-3 rounded-md text-left transition-colors",
                  isCurrent && "bg-primary-800/60 text-primary-foreground font-medium",
                  isCompleted && !isCurrent && "text-primary-foreground/90",
                  !isCompleted && !isCurrent && "text-muted-foreground",
                  isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-800/40",
                )}
              >
                <div className="mr-3 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className={cn(
                      "h-5 w-5",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  {step.subtitle && (
                    <div className="text-xs opacity-70">{step.subtitle}</div>
                  )}
                </div>
                {!isDisabled && !isCurrent && (
                  <ChevronRight className="h-4 w-4 opacity-70" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ 
            opacity: 0, 
            x: direction === 'forward' ? 20 : -20 
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3 }
          }}
          exit={{ 
            opacity: 0, 
            x: direction === 'forward' ? -20 : 20,
            transition: { duration: 0.2 }
          }}
          className="flex-1 min-h-0"
        >
          {steps[currentStep].component}
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderNavigationButtons = () => {
    const isLastStep = currentStep === steps.length - 1;
    
    return (
      <div className="flex justify-between mt-8 pt-4 border-t border-primary-800">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button onClick={handleNext}>
          {isLastStep ? (
            <>
              Complete
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    );
  };

  return (
    <Card className="bg-primary-900/95 border-primary-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {showSidebar && !isMobile && renderDesktopSidebar()}
          
          <div className="flex-1">
            {isMobile && renderMobileIndicator()}
            {renderStepContent()}
            {renderNavigationButtons()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveProgressIndicator;

// Usage example component
export const MultiStepFormExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Example form state
  type FormData = {
    name: string;
    email: string;
    company: string;
    projectTitle: string;
    projectDescription: string;
    budget: string;
    timeline: string;
    requirements: string[];
  };
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    requirements: []
  });
  
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };
  
  const handleFormComplete = () => {
    toast({
      title: "Success!",
      description: "Your project details have been submitted successfully.",
    });
    
    // In a real app, you would submit the form data to your API here
    console.log("Form data:", formData);
  };
  
  // Define form steps
  const steps = [
    {
      id: 'client-info',
      title: 'Client Information',
      subtitle: 'Tell us about you and your company',
      isValid: formData.name.length > 0 && formData.email.length > 0,
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Client Information</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Company Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Your company name"
            />
          </div>
        </div>
      )
    },
    {
      id: 'project-basics',
      title: 'Project Basics',
      subtitle: 'Define your project scope',
      isValid: formData.projectTitle.length > 0,
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Project Basics</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Project Title</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              placeholder="Give your project a name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Project Description</label>
            <textarea
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800 min-h-[100px]"
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              placeholder="Describe your project in detail"
            />
          </div>
        </div>
      )
    },
    {
      id: 'budget-timeline',
      title: 'Budget & Timeline',
      subtitle: 'Set your financial and time constraints',
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Budget & Timeline</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Estimated Budget</label>
            <select
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
            >
              <option value="">Select a budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Expected Timeline</label>
            <select
              className="w-full p-2 rounded-md border border-primary-700 bg-primary-800"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
            >
              <option value="">Select a timeline</option>
              <option value="under-1m">Less than 1 month</option>
              <option value="1-3m">1-3 months</option>
              <option value="3-6m">3-6 months</option>
              <option value="6m-plus">6+ months</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'requirements',
      title: 'Project Requirements',
      subtitle: 'Define technical specifications',
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Project Requirements</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Required Features</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['User Authentication', 'Payment Processing', 'File Upload', 'Messaging', 'Real-time Updates', 
                  'Analytics Dashboard', 'Admin Panel', 'Mobile Responsive'].map((feature) => (
                  <label key={feature} className="flex items-center space-x-2 p-2 border border-primary-700 rounded-md">
                    <input
                      type="checkbox"
                      className="rounded-sm border-primary-700"
                      onChange={(e) => {
                        const currentReqs = [...formData.requirements];
                        if (e.target.checked) {
                          currentReqs.push(feature);
                        } else {
                          const index = currentReqs.indexOf(feature);
                          if (index > -1) {
                            currentReqs.splice(index, 1);
                          }
                        }
                        handleInputChange('requirements', currentReqs);
                      }}
                      checked={formData.requirements.includes(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'review',
      title: 'Review & Submit',
      subtitle: 'Confirm your project details',
      component: (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Review Your Project Details</h2>
          <p className="text-muted-foreground mb-6">Please review all information before submitting</p>
          
          <div className="space-y-4 divide-y divide-primary-800">
            <div className="pb-4">
              <h3 className="text-md font-medium mb-2">Client Information</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Name</dt>
                  <dd>{formData.name || "Not provided"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd>{formData.email || "Not provided"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Company</dt>
                  <dd>{formData.company || "Not provided"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="py-4">
              <h3 className="text-md font-medium mb-2">Project Details</h3>
              <dl className="grid grid-cols-1 gap-y-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Project Title</dt>
                  <dd>{formData.projectTitle || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Description</dt>
                  <dd className="whitespace-pre-line">{formData.projectDescription || "Not provided"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="py-4">
              <h3 className="text-md font-medium mb-2">Budget & Timeline</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Budget Range</dt>
                  <dd>{formData.budget ? {
                    'under-5k': 'Under $5,000',
                    '5k-10k': '$5,000 - $10,000',
                    '10k-25k': '$10,000 - $25,000',
                    '25k-50k': '$25,000 - $50,000',
                    '50k-plus': '$50,000+'
                  }[formData.budget] : "Not provided"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm text-muted-foreground">Expected Timeline</dt>
                  <dd>{formData.timeline ? {
                    'under-1m': 'Less than 1 month',
                    '1-3m': '1-3 months',
                    '3-6m': '3-6 months',
                    '6m-plus': '6+ months'
                  }[formData.timeline] : "Not provided"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="py-4">
              <h3 className="text-md font-medium mb-2">Required Features</h3>
              {formData.requirements.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map((feature) => (
                    <div key={feature} className="bg-primary-800 text-primary-100 text-sm rounded-full px-3 py-1">
                      {feature}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specific features selected</p>
              )}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <InteractiveProgressIndicator
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={handleFormComplete}
      completedSteps={completedSteps}
      onStepComplete={handleStepComplete}
    />
  );
};