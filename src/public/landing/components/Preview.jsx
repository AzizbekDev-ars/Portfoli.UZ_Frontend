import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './Problem';

const Preview = ({ t }) => {
  return (
    <section id="demo" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <SectionHeader badge={t.preview.badge} title={t.preview.title} />
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[...Array(3)].map((_, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="rounded-3xl overflow-hidden bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-white/5 shadow-lg shadow-slate-200/50 dark:shadow-none group cursor-pointer"
               >
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 p-4 pt-6 overflow-hidden relative">
                     <div className="w-full h-full bg-white dark:bg-[#0B0F19] rounded-t-xl shadow-lg border-t border-x border-slate-200 dark:border-white/10 transition-transform duration-700 ease-out group-hover:-translate-y-6">
                        <div className="h-4 border-b border-slate-100 dark:border-white/5 flex gap-1 px-2 items-center bg-slate-50 dark:bg-[#121826]">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        </div>
                        <div className="p-4 space-y-3">
                           <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full"></div>
                           <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                           <div className="w-3/4 h-2 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
                        </div>
                        <div className="px-4 mt-2 grid grid-cols-2 gap-2">
                           <div className="h-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-md"></div>
                           <div className="h-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-md"></div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Preview;
