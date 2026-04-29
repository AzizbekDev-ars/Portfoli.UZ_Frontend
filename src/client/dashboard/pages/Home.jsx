import React from 'react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useLang } from '../../../contexts/LangContext';

// Icons...
const EyeIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UsersIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const MailIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const DownloadIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;

const unreadMessages = [
  { id: 1, name: "Ali Valiyev", email: "ali@gmail.com", avatar: "https://ui-avatars.com/api/?name=Ali+Valiyev&background=6366f1&color=fff", text: "Assalomu alaykum, loyihangiz menejeri bilan gaplashmoqchi edim..." },
  { id: 2, name: "Nargiza Rustamova", email: "nargiza@gmail.com", avatar: "https://ui-avatars.com/api/?name=Nargiza+R&background=10b981&color=fff", text: "Portfolio bo'yicha hamkorlik taklifi bormidi deb o'yladim, siz..." },
  { id: 3, name: "Sardor Ibrohimov", email: "sardor@gmail.com", avatar: "https://ui-avatars.com/api/?name=Sardor+I&background=f59e0b&color=fff", text: "Sizning ishingizda ajoyib imkoniyatni ko'rdim. Bizga sizdek dastu..." },
  { id: 4, name: "Kamiljon", email: "kamil@gmail.com", avatar: "https://ui-avatars.com/api/?name=Kamiljon&background=ef4444&color=fff", text: "Xizmatlar narxi haqida bilmoqchi edim, masalan bitta loyiha qancha..." },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-12"
    >
      {/* --- CARDS SECTION --- */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        
        <div 
          onDoubleClick={() => navigate('/dashboard/visitors')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
             <EyeIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.visits || 'Umumiy tashriflar'}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">12,483</p>
          </div>
        </div>

        <div 
          onDoubleClick={() => navigate('/dashboard/visitors')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
             <UsersIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.newVisitors || 'Yangi tashriflar'}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">4,209</p>
          </div>
        </div>

        <div 
          onDoubleClick={() => navigate('/dashboard/messages')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
             <MailIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.unread || "O'qilmagan xabarlar"}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">14</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
             <DownloadIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.cvDownloads || "CV yuklab olingan"}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">356</p>
          </div>
        </div>

      </div>

      {/* --- MAIN LAYOUT (Left and Right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: News/Video */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {t.dashboard?.home?.newsTitle || 'Yaratuvchilardan yangiliklar'}
          </h2>
          
          <div className="flex-1 w-full rounded-xl overflow-hidden shadow-lg mb-4 aspect-video bg-black relative">
            {/* Dummy embedded youtube iframe - standard dimensions handle responsively via aspect-video */}
            <iframe 
              className="w-full h-full absolute top-0 left-0"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.dashboard?.home?.newsSubtitle || 'Portfolio.uz 2.0 versiyasi haqida batafsil'}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {t.dashboard?.home?.newsText || "Yangi yangilanishda biz platformamiz tezligini 40% ga oshirdik. Yangi shablonlar va vizual chart analitikasi endi yanada qulay va informativ. Yuqoridagi videoda barchasi batfsil ko'rsatib o'tilgan. Fikr-mulohazalaringiz biz uchun doim qadrli!"}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Unread Messages */}
        <div className="lg:col-span-1 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {t.dashboard?.home?.newMsgs || 'Yangi xabarlar'}
            </h2>
            <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-full">
              {unreadMessages.length}
            </span>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-1">
            {unreadMessages.map((msg) => (
              <div key={msg.id} className="relative group p-4 bg-slate-50 dark:bg-[#111827]/40 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col">
                
                <div className="flex items-center gap-3 mb-2">
                  <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover shadow-sm"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{msg.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{msg.email}</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {msg.text}
                </p>

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 bg-white/90 dark:bg-[#0f172a]/95 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
                  <button onClick={() => navigate('/dashboard/messages')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all scale-95 group-hover:scale-100">
                    {t.dashboard?.home?.viewMsg || "Xabarni ko'rish"}
                  </button>
                </div>

              </div>
            ))}
          </div>

          <button onClick={() => navigate('/dashboard/messages')} className="mt-auto pt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex justify-center items-center w-full">
            {t.dashboard?.home?.allMsgs || "Barcha xabarlarga o'tish →"}
          </button>
        </div>

      </div>

    </motion.div>
  );
};

export default Home;
