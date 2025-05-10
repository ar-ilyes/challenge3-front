import { useState } from 'react';
import type { Document } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentViewerProps {
  document: Document;
}

const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [activePage, setActivePage] = useState(0);

  const handlePageChange = (index: number) => {
    setActivePage(index);
  };

  // Helper function to render different content types
  const renderContent = (content: Record<string, any>) => {
    return Object.entries(content).map(([key, value]) => {
      // If value is an array of strings
      if (Array.isArray(value) && typeof value[0] === 'string') {
        return (
          <div key={key} className="mb-4">
            <h4 className="text-gray-700 dark:text-gray-300 capitalize mb-2">
              {key.replace(/_/g, ' ')}
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              {value.map((item, i) => (
                <li key={i} className="text-gray-800 dark:text-gray-200">{item}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      // If value is an array of objects
      else if (Array.isArray(value) && typeof value[0] === 'object') {
        return (
          <div key={key} className="mb-4">
            <h4 className="text-gray-700 dark:text-gray-300 capitalize mb-2">
              {key.replace(/_/g, ' ')}
            </h4>
            <div className="space-y-3">
              {value.map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  {Object.entries(item).map(([subKey, subValue]) => (
                    <div key={subKey} className="mb-2">
                      <span className="font-medium capitalize">{subKey.replace(/_/g, ' ')}: </span>
                      <span>{subValue as string}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      // If value is an object
      else if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mb-4">
            <h4 className="text-gray-700 dark:text-gray-300 capitalize mb-2">
              {key.replace(/_/g, ' ')}
            </h4>
            <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              {renderContent(value)}
            </div>
          </div>
        );
      }
      
      // If value is a string or number
      else {
        return (
          <div key={key} className="mb-4">
            <h4 className="text-gray-700 dark:text-gray-300 capitalize mb-2">
              {key.replace(/_/g, ' ')}
            </h4>
            <p className="text-gray-800 dark:text-gray-200">{value as string}</p>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar with page links */}
      <div className="md:w-64 bg-gray-50 dark:bg-gray-800/50 p-4 border-b md:border-r md:border-b-0 border-gray-200 dark:border-gray-700 shrink-0">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Pages</h3>
        <nav className="space-y-1">
          {document.pages.map((page, index) => (
            <button
              key={index}
              className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                activePage === index
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handlePageChange(index)}
            >
              {page.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {document.pages[activePage].title}
            </h2>
            {renderContent(document.pages[activePage].content)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DocumentViewer;