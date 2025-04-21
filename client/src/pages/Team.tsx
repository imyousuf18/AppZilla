import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaArrowLeft, FaMedium, FaHackerNews, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex founded Appzila with a vision to create exceptional digital experiences. With over 15 years in the tech industry, he leads the company's strategic direction.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Sarah Chen",
    role: "Chief Design Officer",
    bio: "Sarah leads our design team, ensuring every product we create is not just functional but beautiful and intuitive. Her background in cognitive psychology gives her unique insights into user behavior.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "Michael oversees all technical aspects of Appzila. With expertise in various programming languages and architectures, he ensures our development processes are efficient and innovative.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Emma Wilson",
    role: "Lead Developer",
    bio: "Emma specializes in creating robust, scalable applications. Her attention to detail and commitment to clean code has been instrumental in many of our successful projects.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "David Park",
    role: "Marketing Director",
    bio: "David brings a wealth of experience in digital marketing. He develops and implements strategies that help our clients' apps stand out in competitive markets.",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Olivia Martinez",
    role: "Project Manager",
    bio: "Olivia ensures our projects run smoothly from concept to launch. Her organizational skills and client-focused approach guarantee we deliver on time and exceed expectations.",
    image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    social: {
      linkedin: "#"
    }
  }
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-primary-100/70 hover:text-purple-600 mb-8">
          <FaArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-primary-100/70 mb-12 max-w-3xl">
            Meet the talented individuals who make Appzila special. Our diverse team brings together expertise from various fields to deliver exceptional results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-primary-800/50 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-500 font-medium mb-4">{member.role}</p>
                  <p className="text-primary-100/70 mb-6">{member.bio}</p>
                  
                  <div className="flex space-x-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-primary-100/70 hover:text-purple-500 transition duration-300">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-primary-100/70 hover:text-blue-400 transition duration-300">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-primary-100/70 hover:text-primary-100 transition duration-300">
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;