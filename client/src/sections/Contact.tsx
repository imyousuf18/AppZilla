import { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "General Inquiry",
    budget: "$10,000 - $25,000",
    message: "",
    privacy: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const locationInfo = [
    {
      icon: "map-marker-alt",
      title: "Our Locations",
      details: ["New York • San Francisco • London • Singapore • Pakistan"]
    },
    {
      icon: "envelope",
      title: "Email Us",
      details: ["contact@appzila.com", "support@appzila.com"]
    },
    {
      icon: "phone-alt",
      title: "Call Us",
      details: ["+1 (888) 123-4567", "Mon-Fri, 9am-6pm EST"]
    }
  ];

  const socialLinks = [
    { icon: "linkedin-in", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "instagram", href: "#" },
    { icon: "github", href: "#" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
    }
    
    if (!formData.privacy) {
      newErrors.privacy = "You must agree to the Privacy Policy";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacy: checked }));
    
    if (errors.privacy && checked) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.privacy;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Construct email body
      const emailSubject = `${formData.inquiry} from ${formData.name}`;
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Inquiry Type: ${formData.inquiry}
Budget Range: ${formData.budget}

Message:
${formData.message}
      `;
      
      // Create mailto link
      const mailtoLink = `mailto:contact@appzila.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Email Client Opened",
        description: "Your email client has been opened with your message details.",
        variant: "default"
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        inquiry: "General Inquiry",
        budget: "$10,000 - $25,000",
        message: "",
        privacy: false
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error opening your email client. Please try again or email us directly at contact@appzila.com",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Next Big Thing</span>
            </h2>
            <p className="text-primary-100/70 mb-8">
              Have a project in mind? Contact us to discuss how we can bring your vision to life with our expert development team.
            </p>
            
            <div className="space-y-8 mb-8">
              {locationInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <i className={`fas fa-${info.icon} text-purple-600`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-primary-100/70">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-primary-100 hover:bg-purple-600 hover:text-white transition duration-300"
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="bg-primary-900 rounded-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Your name" 
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium mb-2">Inquiry Type</label>
                    <Select 
                      value={formData.inquiry} 
                      onValueChange={(value) => handleSelectChange("inquiry", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Project Consultation">Project Consultation</SelectItem>
                        <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                        <SelectItem value="Support Request">Support Request</SelectItem>
                        <SelectItem value="Career Information">Career Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">Budget Range</label>
                    <Select 
                      value={formData.budget} 
                      onValueChange={(value) => handleSelectChange("budget", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                        <SelectItem value="$50,000 - $100,000">$50,000 - $100,000</SelectItem>
                        <SelectItem value="$100,000+">$100,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={4} 
                      placeholder="Tell us about your project"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="privacy" 
                      checked={formData.privacy}
                      onCheckedChange={handleCheckboxChange}
                      className={errors.privacy ? "border-red-500" : ""}
                    />
                    <label htmlFor="privacy" className="ml-2 text-sm text-primary-100/70">
                      I agree to the <Link href="/legal/privacy-policy" className="text-purple-600">Privacy Policy</Link> and <Link href="/legal/terms-of-service" className="text-purple-600">Terms of Service</Link>
                    </label>
                  </div>
                  {errors.privacy && <p className="text-red-500 text-xs">{errors.privacy}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg py-4 h-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message
                        <i className="fas fa-paper-plane ml-2"></i>
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
