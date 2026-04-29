import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHome = () => {
  // --- MOCK DATA ---
  const [stats, setStats] = useState({
    totalUsers: 1248,
    proUsers: 342,
    totalVisits: 45600,
    uniqueVisitors: 12300,
    totalRevenue: 15400000,
    totalExpenses: 2300000
  });

  // Generate more users for pagination testing
  const [users, setUsers] = useState([
    { id: 1, name: 'Anvar Toshov', email: 'anvar@gmail.com', date: '2024-03-15', isPro: true, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anvar' },
    { id: 2, name: 'Malika Ergasheva', email: 'malika@mail.ru', date: '2024-04-01', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Malika' },
    { id: 3, name: 'Jasur Bek', email: 'jasur@info.uz', date: '2024-04-10', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur' },
    { id: 4, name: 'Sardor Rahim', email: 'sardor@gmail.com', date: '2024-04-12', isPro: true, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor' },
    { id: 5, name: 'Zilola Ganiyeva', email: 'zilola@gmail.com', date: '2024-04-15', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zilola' },
    { id: 6, name: 'Bobur Mirzo', email: 'bobur@mail.uz', date: '2024-04-16', isPro: true, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bobur' },
    { id: 7, name: 'Nigora Ali', email: 'nigora@info.com', date: '2024-04-18', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nigora' },
    { id: 8, name: 'Farrux Xon', email: 'farrux@gmail.com', date: '2024-04-20', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farrux' },
    { id: 9, name: 'Shahnoza J.', email: 'shaxnoza@test.uz', date: '2024-04-21', isPro: true, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shax' },
    { id: 10, name: 'Otabek M.', email: 'otabek@gmail.com', date: '2024-04-22', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ota' },
    { id: 11, name: 'Dilnoza K.', email: 'dil@mail.ru', date: '2024-04-23', isPro: true, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dil' },
    { id: 12, name: 'Rustam S.', email: 'rustam@gmail.com', date: '2024-04-24', isPro: false, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rus' },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Yangi Portfolio Shabloni!', description: 'Bizda yangi interaktiv dizayn qo\'shildi. Ko\'rib chiqing!', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ]);

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [newsForm, setNewsForm] = useState({ title: '', description: '', youtubeUrl: '' });
  const [showNewsModal, setShowNewsModal] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- HANDLERS ---
  const togglePro = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isPro: !u.isPro } : u));
  };

  const deleteUser = (userId) => {
    if(window.confirm('Haqiqatdan ham ushbu foydalanuvchini o\'chirmoqchimisiz?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if(!newsForm.title || !newsForm.youtubeUrl) return;
    const newId = announcements.length + 1;
    setAnnouncements([{ id: newId, ...newsForm }, ...announcements]);
    setNewsForm({ title: '', description: '', youtubeUrl: '' });
    setShowNewsModal(false);
  };

  // Filter Logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' ? true : (userFilter === 'pro' ? u.isPro : !u.isPro);
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const getYoutubeEmbed = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 md:space-y-8 pb-10"
    >
      {/* 1. STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Umumiy Foydalanuvchilar', value: stats.totalUsers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'blue' },
          { label: 'Pro Obunachilar', value: stats.proUsers, icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', color: 'amber' },
          { label: 'Umumiy Tashriflar', value: stats.totalVisits.toLocaleString(), icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'emerald' },
          { label: 'Sayt Tashrifchilari', value: stats.uniqueVisitors.toLocaleString(), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'indigo' },
          { label: 'Umumiy Summa (In)', value: stats.totalRevenue.toLocaleString() + ' UZS', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'rose' },
          { label: 'Harajatlar (Out)', value: stats.totalExpenses.toLocaleString() + ' UZS', icon: 'M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0', color: 'orange' },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 md:gap-5 shadow-xl"
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 bg-${card.color}-500/20 text-${card.color}-500`}>
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="text-[11px] md:text-sm font-medium text-slate-400 truncate">{card.label}</h3>
              <p className="text-lg md:text-xl font-bold text-white mt-1 truncate">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. USER LIST SECTION */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col">
            <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-rose-500 rounded-full"></span>
                Foydalanuvchilar
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <div className="relative flex-1 sm:flex-none">
                  <input 
                    type="text" 
                    placeholder="Qidirish..." 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-sm focus:ring-rose-500 focus:border-rose-500 w-full sm:w-48 lg:w-64"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select 
                  value={userFilter}
                  onChange={(e) => { setUserFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:ring-rose-500 outline-none"
                >
                  <option value="all">Barchasi</option>
                  <option value="pro">Pro</option>
                  <option value="free">Free</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Sana</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="wait">
                    {currentUsers.map((user) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.image} alt={user.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 bg-white/5" />
                            <span className="font-medium text-xs md:text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs md:text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs md:text-sm">{user.date}</td>
                        <td className="px-6 py-4">
                          {user.isPro ? (
                            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-amber-500/10 text-amber-500 text-[9px] md:text-[10px] font-bold border border-amber-500/20">PRO</span>
                          ) : (
                            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-slate-500/10 text-slate-400 text-[9px] md:text-[10px] font-bold border border-slate-500/20">FREE</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 md:gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => togglePro(user.id)}
                              className={`p-1.5 md:p-2 rounded-lg transition-colors ${user.isPro ? 'text-slate-400 hover:bg-slate-500/10' : 'text-amber-500 hover:bg-amber-500/10'}`}
                            >
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="p-1.5 md:p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-12 text-center text-slate-500">Foydalanuvchi topilmadi.</div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-white/10 flex items-center justify-center gap-4">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs md:text-sm font-medium">Sahifa {currentPage} / {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. ANNOUNCEMENTS SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold">E'lonlar</h2>
            <button 
              onClick={() => setShowNewsModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-[10px] md:text-xs font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Qo'shish
            </button>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-auto pr-2 custom-scrollbar">
            {announcements.map((news) => (
              <motion.div 
                key={news.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="aspect-video relative bg-black">
                  {getYoutubeEmbed(news.youtubeUrl) ? (
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYoutubeEmbed(news.youtubeUrl)}`}
                      title={news.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">Video format noto'g'ri</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-sm md:text-base group-hover:text-rose-500 transition-colors">{news.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-2 line-clamp-2">{news.description}</p>
                  <a 
                    href={news.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    YouTube'da ko'rish
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
            {announcements.length === 0 && (
              <div className="text-center py-8 text-slate-500">Hozircha e'lonlar yo'q.</div>
            )}
          </div>
        </div>
      </div>

      {/* --- ADD NEWS MODAL --- */}
      <AnimatePresence>
        {showNewsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewsModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#161B22] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-red-500 rounded-full"></span>
                  E'lon qo'shish
                </h2>
                <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Sarlavha</label>
                  <input 
                    type="text" required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="E'lon sarlavhasi..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Tavsif</label>
                  <textarea 
                    value={newsForm.description}
                    onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                    placeholder="Batafsil ma'lumot..."
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-rose-500 focus:border-rose-500 outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">YouTube URL</label>
                  <input 
                    type="text" required
                    value={newsForm.youtubeUrl}
                    onChange={(e) => setNewsForm({ ...newsForm, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-rose-500 focus:border-rose-500 outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20 mt-2"
                >
                  Chop etish
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );

};

export default AdminHome;
