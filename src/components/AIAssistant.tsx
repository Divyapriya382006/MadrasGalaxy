import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  preferences: any;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ preferences }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Greetings, young Padawan! I am C-3PO, your protocol droid for Chennai exploration. How may I assist you in your galactic food and adventure journey?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Food-related responses
    if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
      const foodResponses = [
        "Ah, seeking sustenance! Based on your preferences, I recommend exploring Adyar for authentic South Indian cuisine. The Force is strong with their filter coffee!",
        "For a culinary adventure, T. Nagar offers excellent street food. May I suggest trying the legendary Jigarthanda? It's more refreshing than a cool breeze on Tatooine!",
        "If you seek fine dining, Nungambakkam has restaurants worthy of the Galactic Senate. Peshawri serves royal North Indian cuisine that would impress even Emperor Palpatine!",
        "The food courts in Express Avenue Mall offer variety from across the galaxy. Perfect for when you can't decide between the light and dark sides of cuisine!"
      ];
      return foodResponses[Math.floor(Math.random() * foodResponses.length)];
    }
    
    // Beach-related responses
    if (message.includes('beach') || message.includes('sea') || message.includes('ocean')) {
      const beachResponses = [
        "Marina Beach stretches like the endless dunes of Jakku! Perfect for watching the twin suns set over the Bay of Bengal.",
        "Edward Elliot's Beach in Besant Nagar is as peaceful as the Jedi Temple gardens. Ideal for meditation and reflection.",
        "For adventure, try Muttukadu Beach! Water sports there are more thrilling than podracing on Boonta Eve!",
        "Kovalam Beach offers serenity away from the crowds - like finding a hidden rebel base!"
      ];
      return beachResponses[Math.floor(Math.random() * beachResponses.length)];
    }
    
    // Shopping-related responses
    if (message.includes('shop') || message.includes('mall') || message.includes('buy')) {
      const shoppingResponses = [
        "Phoenix Marketcity is the Death Star of shopping - massive and has everything! Their IMAX theater rivals the holoprojectors on Coruscant.",
        "T. Nagar's Ranganathan Street is like the bustling markets of Mos Eisley - chaotic but you'll find treasures!",
        "For electronics, Ritchie Street is your Tatooine junkyard - every droid part and gadget you could imagine!",
        "Express Avenue Mall combines shopping with entertainment, like a well-balanced Force user!"
      ];
      return shoppingResponses[Math.floor(Math.random() * shoppingResponses.length)];
    }
    
    // Temple-related responses
    if (message.includes('temple') || message.includes('spiritual') || message.includes('pray')) {
      const templeResponses = [
        "Kapaleeswarar Temple in Mylapore is ancient and powerful, like the first Jedi Temple. The Force flows strongly there!",
        "ISKCON Temple offers peace and Krishna consciousness - perfect for finding your inner Jedi balance.",
        "Vadapalani Andavar Temple is known for healing powers. Even more effective than bacta tanks!",
        "The temples of Chennai hold wisdom older than Master Yoda. Each visit brings you closer to understanding the Force."
      ];
      return templeResponses[Math.floor(Math.random() * templeResponses.length)];
    }
    
    // Weather-related responses
    if (message.includes('weather') || message.includes('hot') || message.includes('rain')) {
      const weatherResponses = [
        "Chennai's weather can be as unpredictable as the Force itself! Always carry water - hydration is key to surviving the twin suns.",
        "During monsoon season, the rains bring life like the Force brings balance. Perfect time for indoor adventures!",
        "The heat here rivals Tatooine's twin suns! Seek shelter in air-conditioned malls and cafes, young Padawan.",
        "Check the weather widget above for real-time galactic atmospheric conditions!"
      ];
      return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
    }
    
    // General responses
    const generalResponses = [
      "Fascinating question! As a protocol droid fluent in over 6 million forms of communication, I'm here to help with your Chennai exploration.",
      "The odds of having a perfect day in Chennai are approximately 3,720 to 1! But with the Force as your guide, anything is possible.",
      "I suggest consulting the quiz results to align your journey with your preferences. The Force works in mysterious ways!",
      "Chennai offers adventures for every type of galactic traveler. What specific experience calls to you through the Force?",
      "Remember, young Padawan: 'Do or do not, there is no try' - especially when it comes to trying Chennai's amazing food!",
      "The Force is strong in Chennai! Whether you seek food, adventure, or spiritual enlightenment, this city has it all."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
        style={{
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)',
          animation: 'pulse 2s infinite'
        }}
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-600 animate-pulse" />
        </div>
      </button>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 rounded-lg shadow-2xl w-full max-w-md h-96 flex flex-col border border-yellow-400/30">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-yellow-400/30">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-8 h-8 text-yellow-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-bold">C-3PO Assistant</h3>
                  <p className="text-blue-200 text-xs">Protocol Droid • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? 'bg-blue-600' : 'bg-yellow-400'}`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-900" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-200 border border-yellow-400/20'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-900" />
                    </div>
                    <div className="bg-gray-800 border border-yellow-400/20 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-yellow-400/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask C-3PO about Chennai..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-gray-900 p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;