import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = ({ t }) => {
  return (
    <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-bold shadow-sm backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Beta 1.0 Release
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white"
      >
        {t.hero.title} <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          {t.hero.title_highlight}
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl text-lg sm:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto"
      >
        <Link to="/register" className="px-8 py-4 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:-translate-y-1 transition-all duration-300 text-center">
          {t.hero.btn_start}
        </Link>
        <a href="#demo" className="px-8 py-4 rounded-full font-bold text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 text-center">
          {t.hero.btn_demo}
        </a>
      </motion.div>
      
      <motion.div 
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-4xl mt-16 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-2xl bg-white/50 dark:bg-[#121826]/50 backdrop-blur-xl p-2 sm:p-4 hover:shadow-indigo-500/10 transition-shadow"
      >
        <div className="w-full aspect-[16/9] rounded-xl bg-slate-100 dark:bg-[#0B0F19] overflow-hidden flex flex-col border border-slate-200/50 dark:border-white/5 relative">
           <div className="h-10 border-b border-slate-200 dark:border-white/5 flex items-center px-4 gap-2 bg-white dark:bg-[#151C2C]">
              <div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-amber-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           
           {/* Abstract Layout Animation */}
           <div className="flex-1 p-6 sm:p-8 flex gap-6 z-10">
              <div className="w-1/3 space-y-4">
                 <motion.div animate={{ scale: [0.95, 1, 0.95] }} transition={{ repeat: Infinity, duration: 4 }} className="w-24 h-24 rounded-full bg-indigo-200 dark:bg-indigo-900/50 mx-auto shadow-inner"></motion.div>
                 <div className="h-4 bg-slate-300 dark:bg-slate-700/50 rounded-full w-3/4 mx-auto mt-6"></div>
                 <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
                 <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6 mx-auto"></div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl bg-gradient-to-br from-indigo-100 to-white dark:from-slate-800 dark:to-slate-800/20 h-32"></motion.div>
                 <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl bg-gradient-to-br from-purple-100 to-white dark:from-slate-800 dark:to-slate-800/20 h-32"></motion.div>
                 <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl bg-slate-200/50 dark:bg-slate-800/30 h-32"></motion.div>
                 <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl bg-slate-200/50 dark:bg-slate-800/30 h-32"></motion.div>
              </div>
           </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
