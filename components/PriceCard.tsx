import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface PriceCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLoading: boolean;
  error: string | null;
}

export const PriceCard: React.FC<PriceCardProps> = ({ title, icon, children, isLoading, error }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-48 text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
