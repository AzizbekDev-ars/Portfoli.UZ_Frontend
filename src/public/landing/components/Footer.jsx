import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 py-10 text-center text-slate-500 dark:text-slate-400 font-medium">
       <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Portfolio.uz. Yaratuvchilarga muhabbat bilan.</p>
       </div>
    </footer>
  );
};

export default Footer;
