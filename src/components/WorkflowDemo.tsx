import { motion } from 'framer-motion';
import { Zap, Database, Bot } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export const WorkflowDemo = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 p-4 bg-[#0D0D0D] rounded-xl overflow-hidden w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
    >
      <motion.div
        variants={item}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#222] hover:border-purple-500/50 hover:bg-[#151515] transition-colors duration-300"
      >
        <div className="bg-purple-500/10 p-2 rounded-lg">
          <Zap className="w-6 h-6 text-purple-500" />
        </div>
        <div className="text-gray-400 text-sm sm:text-base">
          New contact form submission
        </div>
      </motion.div>

      <motion.div
        variants={item}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#222] hover:border-purple-500/50 hover:bg-[#151515] transition-colors duration-300"
      >
        <div className="bg-purple-500/10 p-2 rounded-lg">
          <Database className="w-6 h-6 text-purple-500" />
        </div>
        <div className="text-gray-400 text-sm sm:text-base">
          Add data to Airtable
        </div>
      </motion.div>

      <motion.div
        variants={item}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="flex items-center space-x-3 p-3 bg-[#111] rounded-lg border border-[#222] hover:border-purple-500/50 hover:bg-[#151515] transition-colors duration-300"
      >
        <div className="bg-purple-500/10 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-purple-500" />
        </div>
        <div className="text-gray-400 text-sm sm:text-base">
          Write personalised message
        </div>
      </motion.div>
    </motion.div>
  );
};