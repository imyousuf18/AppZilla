import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaApple, FaGithub, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "wouter";

const Login = () => {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900/95 px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-3xl font-bold text-foreground">Appzila</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-primary-100/70">Sign in to your client dashboard</p>
        </div>
        
        <Card className="bg-primary-800/90 border-primary-700">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials below to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  className="bg-primary-900/50 border-primary-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-primary-900/50 border-primary-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-500 transition-all duration-300 flex items-center justify-center glow-effect"
                disabled={isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? "Signing in..." : "Sign in"} 
                </span>
                {!isLoading && <FaArrowRight className="ml-2 relative z-10" />}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-primary-800 px-2 text-primary-100/70">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button variant="outline" className="bg-primary-900/50 border-primary-700 hover:bg-primary-700">
                  <FaGoogle className="text-red-500" />
                </Button>
                <Button variant="outline" className="bg-primary-900/50 border-primary-700 hover:bg-primary-700">
                  <FaApple className="text-white" />
                </Button>
                <Button variant="outline" className="bg-primary-900/50 border-primary-700 hover:bg-primary-700">
                  <FaGithub className="text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            <p className="text-primary-100/70">
              Don't have an account?{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium">
                Contact us for a demo
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;