import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './Problem';

const Features = ({ t }) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t.features.badge} title={t.features.title} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {t.features.items.map((f, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-8 rounded-3xl bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-white/5 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-indigo-500/10 hover:border-indigo-100 dark:hover:border-indigo-500/30"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="font-black text-xl">{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
