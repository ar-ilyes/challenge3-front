import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-20 h-20 mb-4">
        <motion.div
          className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Enhancing Standard</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Processing your request through multi-agent system...
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;