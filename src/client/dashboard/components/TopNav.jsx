import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLang } from '../../../contexts/LangContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const MoonIcon = () => <svg className="w-5 h-5 cursor-pointer" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>;
const SunIcon = () => <svg className="w-5 h-5 cursor-pointer text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>;
const SearchIcon = () => <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const MenuIcon = () => <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

const TopNav = ({ onMenuClick }) => {
  const { isDark, setIsDark } = useTheme();
  const { lang, setLang, t } = useLang();
  const { user } = useAuth();
  
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  
  const keyMap = { dashboard: 'home', visitors: 'visitors', messages: 'messages', certificates: 'certificates', experiences: 'experiences', projects: 'projects', cv: 'cv', settings: 'settings' };
  const navKey = keyMap[pathName] || 'home';
  const pageTitle = t.dashboard.nav[navKey] || "Portfolio";

  return (
    <header className="h-16 md:h-20 bg-white/70 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 transition-colors duration-300">
      
      {/* Left: Menu & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <MenuIcon />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white capitalize tracking-tight line-clamp-1">
          {pageTitle}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-6">
        
        {/* Search - Hidden on Small Mobile */}
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-transparent focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <SearchIcon />
          <input 
            type="text" 
            placeholder={t.dashboard.nav.search}
            className="bg-transparent border-none outline-none ml-2 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 w-32 xl:w-48"
          />
        </div>

        {/* Theme Toggle */}
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Lang Switch */}
        <select
          value={lang} onChange={(e) => setLang(e.target.value)}
          className="bg-transparent border-none text-xs md:text-sm font-bold outline-none cursor-pointer text-slate-700 dark:text-slate-300 focus:ring-0 uppercase pr-4"
        >
          <option className="text-black" value="uz">UZ</option>
          <option className="text-black" value="ru">RU</option>
          <option className="text-black" value="en">EN</option>
        </select>

        {/* View Portfolio - Responsive Link */}
        <a 
          href={`/${user?.username || ''}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-[10px] md:text-sm rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          <span className="hidden xs:inline md:inline">Portfolioni ko'rish</span>
        </a>

        {/* User Profile */}
        <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-slate-200 dark:border-white/10">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-xs md:text-sm font-bold text-slate-800 dark:text-white">{user?.username || 'Admin'}</span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{user?.isPro ? 'Pro' : 'Free'}</span>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 p-0.5">
            <img 
              src={user?.profileImage?.url || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=6366f1&color=fff`} 
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
