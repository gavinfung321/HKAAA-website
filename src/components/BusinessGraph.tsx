import { motion } from 'framer-motion';

export const BusinessGraph = () => {
  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 2, ease: 'easeInOut' },
    },
    hover: {
      pathLength: [0, 1],
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="relative h-60 w-full bg-[#0D0D0D] rounded-xl p-4 overflow-hidden"
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="absolute top-4 right-6 text-purple-300 font-medium bg-[#0b010d] px-2 py-1 rounded-full text-sm">
        +30%
      </div>
      <svg className="w-full h-full" viewBox="0 0 300 100">
        <motion.path
          variants={pathVariants}
          d="M0 80 Q75 30, 150 60 T300 20"
          fill="none"
          stroke="#A855F7"
          strokeWidth="2"
        />
        <motion.path
          variants={pathVariants}
          d="M0 60 Q75 90, 150 40 T300 70"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeOpacity="0.2"
        />
      </svg>
    </motion.div>
  );
};