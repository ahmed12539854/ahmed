import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-slate-800 mt-8 py-4 text-center text-slate-500 dark:text-slate-400 text-sm">
      <div className="container mx-auto px-4">
        <p>
          © {currentYear} مؤشر أسعار مصر. جميع الحقوق محفوظة.
        </p>
        <p className="mt-1">
          الأسعار مقدمة بناءً على بيانات من مصادر الويب وقد تختلف قليلاً عن الأسعار الفعلية.
        </p>
      </div>
    </footer>
  );
};
