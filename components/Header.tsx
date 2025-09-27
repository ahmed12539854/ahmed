import React from 'react';
import { ThemeToggleButton } from './ThemeToggleButton';

interface HeaderProps {
  lastUpdated: Date | null;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, isRefreshing }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md relative">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
          مؤشر أسعار مصر
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          أحدث الأسعار للذهب والعملات ومواد البناء
        </p>
        {lastUpdated && (
          <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-2 space-x-reverse">
            {isRefreshing && (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>
              آخر تحديث: {lastUpdated.toLocaleTimeString('ar-EG')}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
