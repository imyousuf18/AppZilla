import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Award, 
  ThumbsUp, 
  Star, 
  Rocket, 
  BookOpen, 
  Settings, 
  Bell, 
  User, 
  Users,
  MessageSquare, 
  Check, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import confetti from 'canvas-confetti';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

const GamifiedOnboarding: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [showAchievementDialog, setShowAchievementDialog] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Onboarding steps
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your company info, logo, and team details',
      icon: <User className="h-5 w-5" />,
      points: 10,
      completed: false
    },
    {
      id: 'project',
      title: 'Create Your First Project',
      description: 'Define your project scope, timeline and requirements',
      icon: <Rocket className="h-5 w-5" />,
      points: 15,
      completed: false
    },
    {
      id: 'team',
      title: 'Add Team Members',
      description: 'Invite your team to collaborate on your projects',
      icon: <Users className="h-5 w-5" />,
      points: 10,
      completed: false
    },
    {
      id: 'notifications',
      title: 'Set Up Notifications',
      description: 'Configure how you want to receive updates',
      icon: <Bell className="h-5 w-5" />,
      points: 5,
      completed: false
    },
    {
      id: 'settings',
      title: 'Customize Dashboard',
      description: 'Set your preferences and customize your experience',
      icon: <Settings className="h-5 w-5" />,
      points: 10,
      completed: false
    },
    {
      id: 'feedback',
      title: 'Leave Initial Feedback',
      description: 'Share your thoughts about the onboarding process',
      icon: <MessageSquare className="h-5 w-5" />,
      points: 20,
      completed: false
    },
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_login',
      title: 'First Steps',
      description: 'Log in to your dashboard for the first time',
      icon: <BookOpen className="h-5 w-5" />,
      unlocked: true
    },
    {
      id: 'profile_complete',
      title: 'Identity Established',
      description: 'Complete your company profile with all details',
      icon: <User className="h-5 w-5" />,
      unlocked: false
    },
    {
      id: 'first_project',
      title: 'Project Pioneer',
      description: 'Create your first project in the system',
      icon: <Rocket className="h-5 w-5" />,
      unlocked: false
    },
    {
      id: 'team_builder',
      title: 'Team Builder',
      description: 'Add at least 3 team members to your workspace',
      icon: <Users className="h-5 w-5" />,
      unlocked: false,
      progress: 0,
      total: 3
    },
    {
      id: 'feedback_provider',
      title: 'Valuable Insights',
      description: 'Provide feedback to help us improve',
      icon: <MessageSquare className="h-5 w-5" />,
      unlocked: false
    },
    {
      id: 'customization_expert',
      title: 'Customization Expert',
      description: 'Personalize your dashboard with a custom theme',
      icon: <Settings className="h-5 w-5" />,
      unlocked: false
    },
    {
      id: 'onboarding_complete',
      title: 'Onboarding Champion',
      description: 'Complete all onboarding steps',
      icon: <Award className="h-5 w-5" />,
      unlocked: false,
      progress: 0,
      total: 6
    },
  ]);

  // Show the intro dialog on first render
  useEffect(() => {
    setTimeout(() => {
      setShowIntroDialog(true);
    }, 1000);
    
    // Simulating a completed step (First Login achievement)
    const achievementsCopy = [...achievements];
    const firstLoginAchievement = achievementsCopy.find(a => a.id === 'first_login');
    if (firstLoginAchievement) {
      firstLoginAchievement.unlocked = true;
    }
    setAchievements(achievementsCopy);
    
    // Update progress
    calculateProgress();
  }, []);

  // Calculate progress
  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.completed).length;
    const totalSteps = steps.length;
    const newProgress = Math.round((completedSteps / totalSteps) * 100);
    setProgress(newProgress);
    
    // Update onboarding_complete achievement progress
    const achievementsCopy = [...achievements];
    const onboardingAchievement = achievementsCopy.find(a => a.id === 'onboarding_complete');
    if (onboardingAchievement) {
      onboardingAchievement.progress = completedSteps;
    }
    setAchievements(achievementsCopy);
  };

  // Complete a step
  const completeStep = (stepId: string) => {
    const stepsCopy = [...steps];
    const stepIndex = stepsCopy.findIndex(step => step.id === stepId);
    
    if (stepIndex !== -1 && !stepsCopy[stepIndex].completed) {
      // Update step
      stepsCopy[stepIndex].completed = true;
      setSteps(stepsCopy);
      
      // Award points
      const pointsEarned = stepsCopy[stepIndex].points;
      setUserPoints(prev => prev + pointsEarned);
      
      // Show toast
      toast({
        title: "Step Completed!",
        description: `You earned ${pointsEarned} points for completing "${stepsCopy[stepIndex].title}"`,
      });
      
      // Check for achievements
      checkAchievements(stepId);
      
      // Update progress
      calculateProgress();
      
      // Maybe level up
      checkLevelUp();
      
      // If all steps completed, trigger confetti
      if (stepsCopy.every(step => step.completed)) {
        setTimeout(() => {
          triggerConfetti();
        }, 500);
      }
    }
  };

  // Check for achievements based on completed step
  const checkAchievements = (stepId: string) => {
    const achievementsCopy = [...achievements];
    
    // Map steps to related achievements
    const achievementMap: Record<string, string> = {
      'profile': 'profile_complete',
      'project': 'first_project',
      'team': 'team_builder',
      'feedback': 'feedback_provider',
      'settings': 'customization_expert'
    };
    
    // Check if completing this step unlocks an achievement
    if (achievementMap[stepId]) {
      const achievementId = achievementMap[stepId];
      const achievementIndex = achievementsCopy.findIndex(a => a.id === achievementId);
      
      if (achievementIndex !== -1 && !achievementsCopy[achievementIndex].unlocked) {
        achievementsCopy[achievementIndex].unlocked = true;
        setAchievements(achievementsCopy);
        
        // Show achievement dialog
        setCurrentAchievement(achievementsCopy[achievementIndex]);
        setShowAchievementDialog(true);
        
        // Award bonus points for achievement
        setUserPoints(prev => prev + 25);
      }
    }
    
    // Check if all steps are completed for "Onboarding Champion" achievement
    if (steps.filter(step => step.completed).length + 1 === steps.length) { // +1 for the current step
      const championIndex = achievementsCopy.findIndex(a => a.id === 'onboarding_complete');
      
      if (championIndex !== -1 && !achievementsCopy[championIndex].unlocked) {
        achievementsCopy[championIndex].unlocked = true;
        achievementsCopy[championIndex].progress = steps.length;
        setAchievements(achievementsCopy);
        
        // Show this achievement after the first one (if there is one)
        setTimeout(() => {
          setCurrentAchievement(achievementsCopy[championIndex]);
          setShowAchievementDialog(true);
          
          // Award big bonus points
          setUserPoints(prev => prev + 50);
        }, currentAchievement ? 2000 : 0);
      }
    }
  };

  // Check if user should level up
  const checkLevelUp = () => {
    const pointsForNextLevel = userLevel * 50;
    if (userPoints >= pointsForNextLevel) {
      setUserLevel(prev => prev + 1);
      triggerConfetti();
      
      toast({
        title: "Level Up!",
        description: `You've reached level ${userLevel + 1}! Keep up the great work!`,
      });
    }
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>Complete these steps to get started</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{progress}% Complete</div>
              <div className="text-sm text-muted-foreground">Level {userLevel}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="bg-primary-800 mr-2">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                <span>{userPoints} Points</span>
              </Badge>
              
              <Badge variant="outline" className="bg-primary-800">
                <Award className="h-3 w-3 mr-1 text-purple-400" />
                <span>{achievements.filter(a => a.unlocked).length}/{achievements.length} Achievements</span>
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {userPoints}/{userLevel * 50} points to next level
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Steps List */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Follow these steps to set up your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${step.completed ? 'bg-primary-800/30 border-primary-700' : 'bg-primary-900/50 border-primary-800'} relative overflow-hidden`}
              >
                {step.completed && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white p-1 transform translate-x-1/4 -translate-y-1/4 rotate-45">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100/10 text-green-500' : 'bg-primary-800 text-primary-100'}`}>
                    {step.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-muted-foreground">
                      <Zap className="h-3 w-3 inline mr-1 text-yellow-400" />
                      {step.points} pts
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant={step.completed ? "outline" : "default"}
                      disabled={step.completed}
                      onClick={() => completeStep(step.id)}
                    >
                      {step.completed ? 'Completed' : 'Complete'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-primary-800/30 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Completing all steps will unlock the <span className="font-medium">Onboarding Champion</span> achievement
          </div>
          
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => {
              // In a real app, you'd skip onboarding here
              toast({
                title: "Onboarding Skipped",
                description: "You can always complete these steps later from your profile.",
              });
            }}
          >
            Skip Onboarding
          </Button>
        </CardFooter>
      </Card>
      
      {/* Achievements Card */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Earn badges by completing specific actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border ${achievement.unlocked ? 'bg-primary-800/30 border-primary-700' : 'bg-primary-900/50 border-primary-800 opacity-70'}`}
              >
                <div className="flex space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-purple-100/10 text-purple-400' : 'bg-primary-800 text-primary-500'}`}>
                    {achievement.icon}
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{achievement.progress}/{achievement.total}</span>
                          {achievement.unlocked && <span className="text-green-500">Completed</span>}
                        </div>
                        <Progress 
                          value={(achievement.progress / (achievement.total || 1)) * 100} 
                          className="h-1" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Intro Dialog */}
      <Dialog open={showIntroDialog} onOpenChange={setShowIntroDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Appzila Client Dashboard!</DialogTitle>
            <DialogDescription>
              Complete your onboarding to make the most of your dashboard experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <ThumbsUp className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-medium">Earn Points</h4>
                  <p className="text-sm text-muted-foreground">Complete tasks to earn points and level up</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium">Unlock Achievements</h4>
                  <p className="text-sm text-muted-foreground">Get badges for reaching milestones</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">Track Your Progress</h4>
                  <p className="text-sm text-muted-foreground">See how far you've come and what's next</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full"
              onClick={() => setShowIntroDialog(false)}
            >
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Achievement Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Achievement Unlocked!</DialogTitle>
          </DialogHeader>
          
          {currentAchievement && (
            <div className="py-6 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20 
                }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary-800 flex items-center justify-center">
                  {currentAchievement.icon}
                </div>
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">{currentAchievement.title}</h3>
              <p className="text-muted-foreground">{currentAchievement.description}</p>
              
              <div className="mt-4 p-2 bg-primary-800/30 rounded-md inline-block">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>+25 bonus points awarded!</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              className="w-full"
              onClick={() => {
                setShowAchievementDialog(false);
                // Trigger confetti when closing the achievement dialog
                triggerConfetti();
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamifiedOnboarding;

// This component is no longer needed as we're importing Users from lucide-react