import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import api from '../../API/axios';

const MoonIcon = () => <svg className="w-5 h-5 cursor-pointer" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>;
const SunIcon = () => <svg className="w-5 h-5 cursor-pointer text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>;

const AdminLogin = () => {
  const { lang, setLang } = useLang();
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Loading...');
    
    // FAKE LOGIN FALLBACK FOR ADMIN
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('TokenFSPAdmin', 'fake-jwt-token-admin-abc123');
      setStatus('Success: Super Admin tizimiga kirdingiz!');
      setTimeout(() => navigate('/admin/dashboard'), 500);
      return;
    }

    try {
      const res = await api.apiClient.post('/admin/auth/login', { email, password });
      setStatus('Success: ' + (res.data?.message || 'Logged in!'));
      if(res.data?.token) {
        localStorage.setItem('TokenFSPAdmin', res.data.token);
        setTimeout(() => navigate('/admin/dashboard'), 500);
      }
    } catch (err) {
      setStatus('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 font-sans text-slate-800 dark:text-slate-200 flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-rose-500 selection:text-white">
      
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <select
          value={lang} onChange={(e) => setLang(e.target.value)}
          className="bg-transparent border-none text-sm font-semibold outline-none cursor-pointer dark:text-slate-300 focus:ring-0"
        >
          <option className="text-black" value="uz">UZ</option>
          <option className="text-black" value="ru">RU</option>
          <option className="text-black" value="en">EN</option>
        </select>
        <button onClick={() => setIsDark(!isDark)} className="p-2 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* GRADIENT MESH BACKGROUND (Red/Rose for Admin) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/20 dark:bg-rose-600/10 blur-[120px]"></div>
         <div className="absolute bottom-[0%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/20 dark:bg-red-600/10 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 bg-white/80 dark:bg-white/5 backdrop-blur-3xl p-10 rounded-3xl border border-rose-200 dark:border-rose-500/30 shadow-2xl"
      >
        <div>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-900/30 mb-4">
            <svg className="h-8 w-8 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Super Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email" required
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm transition-all"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password" required
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm transition-all"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all hover:shadow-lg shadow-rose-500/30"
            >
              Sign in to Admin
            </button>
          </div>
          {status && <p className="text-sm text-center text-rose-500">{status}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
