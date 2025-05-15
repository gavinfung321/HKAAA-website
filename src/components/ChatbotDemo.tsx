import { motion } from 'framer-motion';
import { Bot, Send } from 'lucide-react';

const messages = [
  {
    text: "Summarize this report",
    isUser: true
  },
  {
    text: "Sure, here's a summary:\nThe Q4 2023 financial report shows a 32% increase in revenue. Key highlights include ...",
    isBot: true
  }
];

export const ChatbotDemo = () => {
  return (
    <div className="p-4 bg-[#0D0D0D] rounded-xl flex flex-col h-[300px] overflow-hidden">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="text-gray-400 font-medium">Olivia Bennett</div>
      </div>
     
      <div className="flex-1 overflow-hidden">
        <motion.div
          className="space-y-4 h-[100px] pt-2"
          initial={{ y: 0 }}
          whileHover={{ y: -40 }}
          transition={{ duration: 0.5 }}
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}
            >
              {message.isBot && (
                <div className="bg-purple-900/30 p-2 rounded-lg">
                  <Bot className="w-6 h-6 text-purple-500" />
                </div>
              )}
              <div className={`rounded-lg p-3 max-w-[80%] ${
                message.isUser
                  ? 'bg-purple-500/10 text-purple-100'
                  : 'bg-[#111] text-gray-400'
              }`}>
                {message.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 relative"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full bg-[#111] border border-[#222] rounded-lg py-2 px-4 pr-10 text-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-400 transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};