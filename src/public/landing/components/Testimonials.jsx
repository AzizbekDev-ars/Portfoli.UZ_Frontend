import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './Problem';

const Testimonials = ({ t }) => {
  return (
    <section className="py-24 bg-indigo-50/50 dark:bg-indigo-900/5 border-y border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader badge={t.testimonials.badge} title={t.testimonials.title} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {t.testimonials.items.map((tItem, idx) => (
             <motion.div 
               key={idx} 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.15 }}
               whileHover={{ y: -5 }}
               className="p-8 pb-10 rounded-3xl bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-white/5 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative"
             >
               <div className="text-6xl text-indigo-100 dark:text-indigo-900/30 font-serif leading-none absolute top-4 right-6 pointer-events-none">"</div>
               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex justify-center items-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                    {tItem.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{tItem.name}</h4>
                    <p className="text-sm font-semibold text-indigo-500">{tItem.role}</p>
                  </div>
               </div>
               <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic relative z-10">"{tItem.text}"</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
