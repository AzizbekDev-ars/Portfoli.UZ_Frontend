import React from 'react';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B0F19] p-6 text-center">
      <div className="w-24 h-24 bg-indigo-500/10 text-indigo-500 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
        Texnik Ishlar Olib Borilmoqda
      </h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg font-medium leading-relaxed">
        Platformamiz yanada yaxshi ishlashi uchun vaqtinchalik texnik xizmat ko'rsatish jarayonidamiz. Tez orada qaytamiz!
      </p>
      <div className="mt-12 flex gap-4">
         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-75"></div>
         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default Maintenance;
