import React from 'react';

export const GoldIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4" />
  </svg>
);

export const CurrencyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 19.125V4.875z" />
  </svg>
);

export const BuildingMaterialsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21v-16.5A2.25 2.25 0 016.75 2.25h10.5A2.25 2.25 0 0119.5 4.5V21m-15 0h15M6 6.75h.008v.008H6V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.25 6.75h.008v.008H8.25V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 11.25h.008v.008H6v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 15.75h.008v.008H6v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zM17.25 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15 6.75h.008v.008H15V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25-.375h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM17.25 11.25h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25-.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zM17.25 15.75h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15 15.75h.008v.008H15v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-2.25.375a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
