import { useState } from 'react';
import type { EnhanceResponse } from '../types';
import DocumentViewer from './DocumentViewer';
import ChangeSummary from './ChangeSummary';
import ReasoningTrace from './ReasoningTrace';
import { motion } from 'framer-motion';

interface ResultViewProps {
  result: EnhanceResponse;
}

const ResultView = ({ result }: ResultViewProps) => {
  const [activeTab, setActiveTab] = useState<'document' | 'summary' | 'reasoning'>('document');
  
  const tabs = [
    { id: 'document', label: 'Document' },
    { id: 'summary', label: 'Change Summary' },
    { id: 'reasoning', label: 'Reasoning Trace' },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`
                py-3 px-4 text-sm font-medium transition-colors relative
                ${activeTab === tab.id 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  layoutId="activeTabIndicator"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-0">
        <div className={activeTab === 'document' ? 'block' : 'hidden'}>
          <DocumentViewer document={result.document} />
        </div>
        <div className={activeTab === 'summary' ? 'block' : 'hidden'}>
          <ChangeSummary summary={result.change_summary} />
        </div>
        <div className={activeTab === 'reasoning' ? 'block' : 'hidden'}>
          <ReasoningTrace reasoning={result.reasoning_trace} />
        </div>
      </div>
    </div>
  );
};

export default ResultView;