import React from 'react';
import type { GroundingChunk } from '../services/priceService';

interface SourcesProps {
  sources: GroundingChunk[];
}

export const Sources: React.FC<SourcesProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          المصادر
        </h3>
        <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300">
          {sources.map((source, index) => (
            <li key={index} className="truncate">
              <a 
                href={source.web.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                title={source.web.title || source.web.uri}
              >
                {source.web.title || source.web.uri}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
