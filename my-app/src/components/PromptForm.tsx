import { useState } from 'react';
import { motion } from 'framer-motion';

interface PromptFormProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const PromptForm = ({ onSubmit, isLoading }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };


  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Standard Enhancement Request</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700 dark:text-gray-300 mb-2">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the standard or issue you need guidance on..."
            className="input h-32 resize-none"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="btn-primary flex items-center gap-2"
            disabled={!prompt.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Enhance Standard
              </>
            )}
          </motion.button>
        </div>
      </form>

      
    </div>
  );
};

export default PromptForm;