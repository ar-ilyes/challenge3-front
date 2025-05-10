import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface ChangeSummaryProps {
  summary: string;
}

const ChangeSummary = ({ summary }: ChangeSummaryProps) => {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Change Summary
      </h2>
      
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>
          {summary}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ChangeSummary;