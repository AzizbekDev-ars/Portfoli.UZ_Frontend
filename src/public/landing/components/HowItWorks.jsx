import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './Problem';

const HowItWorks = ({ t }) => {
  return (
    <section className="py-24 bg-white dark:bg-[#121826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader badge={t.howItWorks.badge} title={t.howItWorks.title} />
        
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 mt-24 max-w-5xl mx-auto">
          {t.howItWorks.steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="flex-1 flex flex-col items-center text-center relative w-full group"
            >
              {idx !== 2 && (
                <div className="hidden md:block absolute top-[48px] left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-indigo-200 to-transparent dark:from-indigo-900/50"></div>
              )}
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl shadow-indigo-500/20 mb-8 relative z-10 mx-auto group-hover:scale-110 transition-transform duration-500">
                 <div className="w-full h-full rounded-full bg-white dark:bg-[#151C2C] flex items-center justify-center text-3xl font-black text-indigo-600 dark:text-indigo-400 group-hover:bg-transparent group-hover:text-white transition-colors duration-500">
                   {idx + 1}
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
