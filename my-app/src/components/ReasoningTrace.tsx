import { useState } from 'react';
import type { ReasoningTrace as ReasoningTraceType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ReasoningTraceProps {
  reasoning: ReasoningTraceType;
}

const ReasoningTrace = ({ reasoning }: ReasoningTraceProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    uiria: true,
    fcia: false,
    spia: false,
    arda: false,
    stsa: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function to convert section key to readable title
  const getSectionTitle = (key: string) => {
    const titles: Record<string, string> = {
      uiria: 'User Intent Recognition & Initial Analysis',
      fcia: 'Financial Compliance Issue Analysis',
      spia: 'Shariah Principle Integration Analysis',
      arda: 'Accounting Rule Development Analysis',
      stsa: 'Standard Text Synthesis Analysis',
    };
    return titles[key] || key.toUpperCase();
  };

  // Render different types of content
  const renderContent = (content: any, indent = 0) => {
    if (!content) return null;

    // If it's an array
    if (Array.isArray(content)) {
      return (
        <div className="mt-2 space-y-2">
          {content.map((item, index) => (
            <div key={index} className={`${indent > 0 ? 'ml-4' : ''}`}>
              {typeof item === 'object' ? (
                renderContent(item, indent + 1)
              ) : (
                <div className="text-gray-800 dark:text-gray-200 py-1">
                  {item}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // If it's an object
    if (typeof content === 'object') {
      return (
        <div className={`mt-2 ${indent > 0 ? 'pl-4' : ''}`}>
          {Object.entries(content).map(([key, value]) => {
            // Special handling for object with clause, issue, justification
            if (key === 'issue' || key === 'justification') {
              return (
                <div key={key} className="mt-2">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 mt-1">
                    {value as string}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={key} className="mt-3">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}:
                </div>
                {typeof value === 'object' ? (
                  renderContent(value, indent + 1)
                ) : (
                  <div className="text-gray-800 dark:text-gray-200 mt-1">
                    {value as string}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    
    // If it's a primitive
    return <div>{String(content)}</div>;
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Object.keys(reasoning).map((key) => (
        <div key={key} className="p-6">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => toggleSection(key)}
            aria-expanded={expandedSections[key]}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getSectionTitle(key)}
            </h3>
            <svg
              className={`w-5 h-5 transition-transform ${
                expandedSections[key] ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          
          <AnimatePresence>
            {expandedSections[key] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  {renderContent((reasoning as any)[key])}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ReasoningTrace;