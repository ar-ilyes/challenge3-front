import { useState } from 'react';
import PromptForm from './components/PromptForm';
import ResultView from './components/ResultView';
import ThemeToggle from './components/ThemeToggle';
import Loading from './components/Loading';
import { enhanceStandard } from './services/api';
import type { EnhanceResponse } from './types';
import { motion } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EnhanceResponse | null>(null);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await enhanceStandard({ prompt });
      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred. Please try again.'
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">AI-Driven Standard Enhancement System</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
          </motion.div>

          {isLoading && (
            <div className="mt-8">
              <Loading />
            </div>
          )}

          {error && (
            <motion.div 
              className="mt-8 p-4 bg-error-50 border border-error-500 text-error-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{error}</p>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResultView result={result} />
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AI-Driven Standard Enhancement System</p>
        </div>
      </footer>
    </div>
  );
};

export default App;