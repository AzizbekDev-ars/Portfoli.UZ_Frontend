import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import api from '../../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setStatus({ type: 'error', message: lang === 'uz' ? "Parollar mos kelmadi" : "Пароли не совпадают" });
    }

    setLoading(true);
    try {
      const res = await api.put(`/auth/reset-password/${token}`, { password });
      setStatus({ type: 'success', message: res.data.message });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const t = {
    uz: { title: "Yangi parol", desc: "Yangi parolingizni kiriting.", label: "Yangi parol", label2: "Parolni tasdiqlang", btn: "O'zgartirish", success: "Muvaffaqiyatli! Login sahifasiga yo'naltirilmoqda..." },
    ru: { title: "Новый пароль", desc: "Введите ваш новый пароль.", label: "Новый пароль", label2: "Подтвердите пароль", btn: "Изменить", success: "Успешно! Перенаправление на страницу входа..." },
    en: { title: "New Password", desc: "Enter your new password.", label: "New Password", label2: "Confirm Password", btn: "Change Password", success: "Success! Redirecting to login..." }
  }[lang] || { title: "New Password", desc: "Enter your new password.", label: "New Password", label2: "Confirm Password", btn: "Change Password", success: "Success! Redirecting to login..." };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-6 transition-colors duration-500">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white dark:bg-white/5 p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 dark:text-white">{t.title}</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">{t.desc}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold dark:text-slate-300">{t.label}</label>
            <input
              type="password" required
              className="mt-1 w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold dark:text-slate-300">{t.label2}</label>
            <input
              type="password" required
              className="mt-1 w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
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
            {status.type === 'success' ? t.success : status.message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
