import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickQuestions = [
  "How accurate is the health test?",
  "What is metabolic age?",
  "How do I unlock the full report?",
  "Is my data secure?",
  "What foods are best for heart health?"
];

const botResponses: Record<string, string> = {
  "how accurate is the health test": "Our health assessment uses scientifically validated algorithms based on body metrics and lifestyle factors. While it provides valuable insights, it's not a replacement for professional medical advice. For the most accurate results, ensure all measurements are precise.",
  
  "what is metabolic age": "Metabolic age compares your body's metabolism to the average for your actual age. If your metabolic age is lower than your chronological age, it means your body is functioning better than average. A higher metabolic age suggests there's room for improvement through lifestyle changes.",
  
  "how do i unlock the full report": "After completing the health test, you'll see a preview of your results. To unlock the complete detailed report including metabolic age, body fat percentage, health recommendations, and personalized nutrition plans, you can upgrade for just ₹199. Click the 'Unlock Full Report' button to proceed.",
  
  "is my data secure": "Yes, absolutely! We take your privacy seriously. Your health data is encrypted and stored securely. We never share your personal information with third parties. All data is processed on secure servers and complies with data protection regulations.",
  
  "what foods are best for heart health": "The best foods for heart health include fatty fish (salmon, mackerel), oats, walnuts, blueberries, spinach, and dark chocolate. These foods are rich in omega-3 fatty acids, fiber, and antioxidants that support cardiovascular health. Visit our 'Best Foods' page for a complete guide!",
  
  "how long does the test take": "The health assessment takes just 2-3 minutes to complete. You'll need to enter basic information like age, gender, height, weight, waist size, activity level, sleep hours, and smoking status. The results are generated instantly!",
  
  "can i retake the test": "Yes, you can retake the test as many times as you'd like! It's actually recommended to retake it periodically to track your health progress over time, especially after making lifestyle changes.",
  
  "what payment methods do you accept": "We accept all major payment methods including UPI, debit cards, credit cards, and digital wallets. The payment process is quick, secure, and encrypted to protect your financial information.",
  
  "do i need to create an account": "No account creation is required! You can take the health test immediately and get your results. However, creating an account (optional) allows you to save your results and track your health progress over time.",
  
  "what is included in the full report": "The full report includes: Body Health Score (0-100), Metabolic Age, Body Fat Percentage, BMI analysis, detailed health issues breakdown, personalized recommendations, nutrition plans, exercise suggestions, personalized diet plan, and a downloadable PDF report for your records.",
  
  "diet plan": "After unlocking your full health report, you can access a personalized diet plan tailored to your health goals! The plan includes daily meal schedules, calorie targets, macro breakdowns, and specific food recommendations to help you achieve optimal health.",
  
  "default": "Thank you for your question! I'm here to help with information about our health assessment, metabolic age, nutrition advice, diet plans, and how to use our platform. You can also reach our support team for more detailed assistance. What would you like to know more about?"
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your HealthScore AI assistant. I can help answer questions about our health assessment, nutrition, and more. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && normalizedMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for keywords
    if (normalizedMessage.includes('price') || normalizedMessage.includes('cost') || normalizedMessage.includes('₹')) {
      return "The full detailed health report is available for just ₹49. This includes your complete health analysis, metabolic age, body fat percentage, personalized recommendations, and a downloadable PDF report.";
    }
    
    if (normalizedMessage.includes('food') || normalizedMessage.includes('nutrition') || normalizedMessage.includes('diet')) {
      return "Great question about nutrition! We have a comprehensive guide on the best foods for different organs. Check out our 'Best Foods' page to discover which foods support your heart, brain, eyes, liver, kidneys, and more!";
    }
    
    if (normalizedMessage.includes('health score') || normalizedMessage.includes('score')) {
      return "Your Body Health Score is a comprehensive metric (0-100) that evaluates your overall health based on multiple factors including BMI, waist-to-height ratio, activity level, sleep quality, and lifestyle habits. Higher scores indicate better health!";
    }
    
    if (normalizedMessage.includes('start') || normalizedMessage.includes('begin') || normalizedMessage.includes('test')) {
      return "Ready to check your health score? Click the 'Start Test' button at the top of the page or scroll down to the health assessment form. It takes just 2 minutes and you'll get instant results!";
    }
    
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">HealthScore AI Assistant</h3>
                  <p className="text-xs text-blue-100">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                        : 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}