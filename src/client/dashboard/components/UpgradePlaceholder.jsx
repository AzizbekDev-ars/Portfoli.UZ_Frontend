import React from 'react';

const UpgradePlaceholder = ({ onUpgradeClick, title, description }) => {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl bg-slate-50 dark:bg-[#0b0f19]">
      <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-inner text-4xl">
        👑
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md font-medium">
        {description}
      </p>
      <button 
        onClick={onUpgradeClick}
         className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all text-sm uppercase tracking-wider"
      >
        Tarifni Yangilash (PRO)
      </button>
    </div>
  );
};

export default UpgradePlaceholder;
