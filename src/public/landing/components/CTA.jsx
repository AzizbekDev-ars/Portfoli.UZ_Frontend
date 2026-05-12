import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = ({ t }) => {
  return (
    <section className="py-24 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-[3rem] p-12 sm:p-20 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10 leading-tight">{t.cta.title}</h2>
        <Link to="/register" className="relative z-10 inline-block px-10 py-5 rounded-full font-bold text-indigo-600 bg-white hover:bg-slate-50 shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
          {t.cta.btn}
        </Link>
      </motion.div>
    </section>
  );
};

export default CTA;
