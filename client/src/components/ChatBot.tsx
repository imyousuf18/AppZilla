import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaCommentDots, FaPaperPlane } from "react-icons/fa";

interface Message {
  isBot: boolean;
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { isBot: true, text: "Hi there! I'm AppzilaBot, your AI assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = [
    "Thanks for your message! How can I assist you with your app development needs?",
    "I'd be happy to help with that. Could you provide more details?",
    "That's an interesting project! Our team has experience with similar applications.",
    "I'll pass your inquiry to our development team. Would you like to schedule a consultation?",
    "Great question! Our expertise in that area is quite extensive."
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    setMessages([...messages, { isBot: false, text: inputValue }]);
    setInputValue("");

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { isBot: true, text: randomResponse }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-primary-800 rounded-xl shadow-2xl w-80 overflow-hidden mb-4"
          >
            <div className="bg-primary-900 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3">
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold">AppzilaBot</h3>
                  <p className="text-xs text-primary-100/70">AI Assistant</p>
                </div>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-primary-100 hover:text-white transition duration-300"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start mb-4 ${!message.isBot && "justify-end"}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex-shrink-0 flex items-center justify-center mr-2">
                      <FaRobot className="text-white text-xs" />
                    </div>
                  )}
                  <div className={`${
                    message.isBot 
                      ? "bg-primary-900 rounded-lg p-3 max-w-[80%]" 
                      : "bg-purple-600 bg-opacity-20 rounded-lg p-3 max-w-[80%]"
                  }`}>
                    <p className={`text-sm ${message.isBot ? "text-primary-100" : "text-primary-100"}`}>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-primary-900 border-t border-primary-700">
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..." 
                  className="w-full bg-primary-800 border border-primary-700 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300"
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-500 transition duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-500 transition duration-300"
        style={{ 
          boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
        }}
      >
        {isOpen ? <FaTimes className="text-2xl" /> : <FaCommentDots className="text-2xl" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
