import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeader } from './Problem';

const CheckIcon = () => <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>;

const Pricing = ({ t }) => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         <SectionHeader badge={t.pricing.badge} title={t.pricing.title} />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            
            {/* FREE TIER */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#151C2C] border border-slate-200 dark:border-white/10 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
               <h3 className="text-2xl font-bold dark:text-white">{t.pricing.free.title}</h3>
               <div className="my-6">
                  <span className="text-5xl font-black dark:text-white">{t.pricing.free.price}</span>
               </div>
               <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">{t.pricing.free.desc}</p>
               <ul className="space-y-4 mb-10 w-full text-left">
                  {t.pricing.free.features.map((ft, i) => (
                     <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 font-medium">
                       <div className="mt-0.5"><CheckIcon /></div> {ft}
                     </li>
                  ))}
               </ul>
               <Link to="/register" className="w-full py-4 rounded-full font-bold bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors mt-auto">
                  {t.pricing.free.btn}
               </Link>
            </motion.div>

            {/* PRO TIER */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="p-8 sm:p-10 rounded-3xl bg-[#121826] dark:bg-gradient-to-br dark:from-indigo-900/40 dark:to-purple-900/20 text-white border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 flex flex-col items-center text-center relative overflow-hidden"
            >
               <div className="absolute top-0 w-full py-1 bg-indigo-500 text-xs font-black tracking-widest text-white uppercase">Popular</div>
               <h3 className="text-2xl font-bold mt-4">{t.pricing.pro.title}</h3>
               <div className="my-6">
                  <span className="text-5xl font-black">{t.pricing.pro.price}</span>
               </div>
               <p className="text-slate-300 mb-8 font-medium">{t.pricing.pro.desc}</p>
               <ul className="space-y-4 mb-10 w-full text-left">
                  {t.pricing.pro.features.map((ft, i) => (
                     <li key={i} className="flex gap-3 text-slate-200 font-medium">
                       <div className="mt-0.5"><CheckIcon /></div> {ft}
                     </li>
                  ))}
               </ul>
               <Link to="/register" className="w-full py-4 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-600/30 transition-all duration-300 mt-auto transform hover:-translate-y-1">
                  {t.pricing.pro.btn}
               </Link>
            </motion.div>

         </div>
      </div>
    </section>
  );
};

export default Pricing;
