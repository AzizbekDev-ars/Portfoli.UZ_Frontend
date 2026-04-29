import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLang } from '../../../contexts/LangContext';

const MoonIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>;
const SunIcon = () => <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>;

const Navbar = ({ t }) => {
  const { isDark, setIsDark } = useTheme();
  const { lang, setLang } = useLang();

  if (!t) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 bg-white/70 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Portfolio<span className="text-indigo-600 dark:text-indigo-500">.uz</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <select
            value={lang} onChange={(e) => setLang(e.target.value)}
            className="bg-transparent border-none text-sm font-semibold outline-none cursor-pointer dark:text-slate-300 focus:ring-0"
          >
            <option className="text-black" value="uz">UZ</option>
            <option className="text-black" value="ru">RU</option>
            <option className="text-black" value="en">EN</option>
          </select>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/login" className="hidden xs:inline-flex px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border border-slate-300 dark:border-white/10 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5">
            {t.nav.login}
          </Link>
          <Link to="/register" className="hidden sm:inline-flex px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 hover:shadow-lg hover:shadow-white/20">
            {t.nav.register}
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
