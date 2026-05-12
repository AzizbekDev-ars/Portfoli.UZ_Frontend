import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ badge, title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="text-center w-full max-w-3xl mx-auto space-y-4"
  >
     <div className="inline-flex px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
        {badge}
     </div>
     <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
        {title}
     </h2>
  </motion.div>
);

const Problem = ({ t }) => {
  return (
    <section className="py-24 bg-white dark:bg-[#121826]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t.problem.badge} title={t.problem.title} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {t.problem.problems.map((p, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/10 hover:shadow-xl hover:shadow-red-500/5 transition-all"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6 text-xl shadow-inner">✗</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{p.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }} 
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-64 h-64 bg-white/20 rounded-full blur-[64px] mix-blend-overlay"
          ></motion.div>
          
          <h3 className="text-2xl sm:text-3xl font-bold max-w-3xl mx-auto leading-relaxed relative z-10">"{t.problem.solution}"</h3>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
