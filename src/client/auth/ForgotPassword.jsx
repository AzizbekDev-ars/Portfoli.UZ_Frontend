import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import api from '../../services/api';

const ForgotPassword = () => {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.post('/auth/forgot-password', { email });
      setStatus({ type: 'success', message: res.data.message });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const t = {
    uz: { title: "Parolni tiklash", desc: "Emailingizni kiriting va biz sizga tiklash havolasini yuboramiz.", label: "Email manzilingiz", btn: "Yuborish", back: "Loginga qaytish" },
    ru: { title: "Восстановление пароля", desc: "Введите свой адрес электронной почты, и мы отправим вам ссылку для восстановления.", label: "Ваш Email", btn: "Отправить", back: "Назад к логину" },
    en: { title: "Reset Password", desc: "Enter your email and we'll send you a reset link.", label: "Your Email", btn: "Send Link", back: "Back to login" }
  }[lang] || { title: "Reset Password", desc: "Enter your email and we'll send you a reset link.", label: "Your Email", btn: "Send Link", back: "Back to login" };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-6 transition-colors duration-500">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full bg-white dark:bg-white/5 p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 dark:text-white">{t.title}</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">{t.desc}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold dark:text-slate-300">{t.label}</label>
            <input
              type="email" required
              className="mt-1 w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50"
          >
            {loading ? "..." : t.btn}
          </button>
        </form>

        {status.message && (
          <p className={`mt-4 text-center text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {status.message}
          </p>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline">
            {t.back}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
