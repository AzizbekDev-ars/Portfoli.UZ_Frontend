import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLang } from '../../../contexts/LangContext';
import { useLocation } from 'react-router-dom';

const MoonIcon = () => <svg className="w-5 h-5 cursor-pointer" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>;
const SunIcon = () => <svg className="w-5 h-5 cursor-pointer text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>;
const SearchIcon = () => <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const SettingsOutline = () => <svg className="w-6 h-6 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const TopNav = () => {
  const { isDark, setIsDark } = useTheme();
  const { lang, setLang, t } = useLang();
  
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  
  const keyMap = { dashboard: 'home', visitors: 'visitors', messages: 'messages', certificates: 'certificates', experiences: 'experiences', projects: 'projects', cv: 'cv', settings: 'settings' };
  const navKey = keyMap[pathName] || 'home';
  const pageTitle = t.dashboard.nav[navKey] || "Portfolio";

  return (
    <header className="h-20 bg-white/70 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      
      {/* Page Title */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white capitalize tracking-tight">
          {pageTitle}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-transparent focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <SearchIcon />
          <input 
            type="text" 
            placeholder={t.dashboard.nav.search}
            className="bg-transparent border-none outline-none ml-2 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 w-48"
          />
        </div>

        {/* Theme Toggle */}
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Lang Switch */}
        <select
          value={lang} onChange={(e) => setLang(e.target.value)}
          className="bg-transparent border-none text-sm font-bold outline-none cursor-pointer text-slate-700 dark:text-slate-300 focus:ring-0 uppercase"
        >
          <option className="text-black" value="uz">UZ</option>
          <option className="text-black" value="ru">RU</option>
          <option className="text-black" value="en">EN</option>
        </select>

        {/* Settings Icon */}
        <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <SettingsOutline />
        </button>

        {/* View Portfolio */}
        <a 
          href="/mr-fury" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          Portfolioni ko'rish
        </a>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-white/10">
           {/* Existing User Info... */}
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-slate-800 dark:text-white">Admin Client</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Pro Plan</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 p-0.5">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+Client&background=6366f1&color=fff" 
              alt="User" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopNav;
