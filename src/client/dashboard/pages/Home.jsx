import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../../contexts/LangContext';
import api from '../../../services/api';

// Icons
const EyeIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UsersIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const MailIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const DownloadIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;

const Home = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [stats, setStats] = useState({ visits: 0, unique: 0, messages: 0, cvDownloads: 0 });
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllNews, setShowAllNews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [msgsRes, visitorsRes, newsRes] = await Promise.all([
          api.get('/message'),
          api.get('/visitor'),
          api.get('/auth/announcements')
        ]);
        
        const msgs = msgsRes.data || [];
        const unread = msgs.filter(m => !m.read);
        setUnreadMessages(unread.slice(0, 4));
        
        const visitorData = visitorsRes.data || {};
        setAnnouncements(newsRes.data || []);
        
        setStats({
          visits: visitorData.totalVisits || 0,
          unique: visitorData.uniqueVisitors || 0,
          messages: msgs.length,
          cvDownloads: visitorData.totalCVDownloads || 0 
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const latestNews = announcements[0];

  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Multi-language labels for modified cards
  const curL = t.dashboard?.home || {};

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
          onClick={() => navigate('/dashboard/visitors')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
             <EyeIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.visits || 'Umumiy tashriflar'}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{stats.visits}</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/dashboard/visitors')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
             <UsersIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{curL.totalVisitors}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{stats.unique}</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/dashboard/messages')}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer select-none"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
             <MailIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{curL.allMessages}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{stats.messages}</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
             <DownloadIcon />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{t.dashboard?.home?.cvDownloads || "CV yuklab olingan"}</p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{stats.cvDownloads}</p>
          </div>
        </div>

      </div>

      {/* --- MAIN LAYOUT (Left and Right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: News/Video */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {t.dashboard?.home?.newsTitle || 'Yaratuvchilardan yangiliklar'}
            </h2>
            {announcements.length > 1 && (
              <button 
                onClick={() => setShowAllNews(true)}
                className="text-xs font-bold px-3 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
              >
                {t.dashboard?.home?.allNews || "Barcha yangiliklar"}
              </button>
            )}
          </div>
          
          {latestNews ? (
            <>
              <div className="flex-1 w-full rounded-xl overflow-hidden shadow-lg mb-4 aspect-video bg-black relative">
                {getYoutubeEmbed(latestNews.youtubeUrl) ? (
                  <iframe 
                    className="w-full h-full absolute top-0 left-0"
                    src={`https://www.youtube.com/embed/${getYoutubeEmbed(latestNews.youtubeUrl)}`}
                    title={latestNews.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">{t.dashboard.common.noData}</div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{latestNews.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {latestNews.description}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500 gap-4">
               <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
               </div>
               <p className="font-medium">{t.dashboard.common.noData}</p>
            </div>
          )}
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
              <div key={msg._id} className="relative group p-4 bg-slate-50 dark:bg-[#111827]/40 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col">
                
                <div className="flex items-center gap-3 mb-2">
                  <img src={`https://ui-avatars.com/api/?name=${msg.sendername}&background=6366f1&color=fff`} alt={msg.sendername} className="w-10 h-10 rounded-full object-cover shadow-sm"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{msg.sendername}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{msg.contactlink}</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {msg.messagetext}
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

      {/* --- ALL NEWS MODAL --- */}
      <AnimatePresence>
        {showAllNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllNews(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {t.dashboard?.home?.allNews || "Barcha yangiliklar"}
                </h2>
                <button 
                  onClick={() => setShowAllNews(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-rose-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {announcements.map((news) => (
                  <div key={news._id} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100 dark:border-white/5 last:border-0">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
                      {getYoutubeEmbed(news.youtubeUrl) ? (
                        <iframe 
                          className="w-full h-full absolute top-0 left-0"
                          src={`https://www.youtube.com/embed/${getYoutubeEmbed(news.youtubeUrl)}`}
                          title={news.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">Video mavjud emas</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{news.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap line-clamp-6">
                        {news.description}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-4">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </motion.div>
  );
};

export default Home;
