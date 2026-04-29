import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers = () => {
  // --- MOCK DATA ---
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Anvar Toshov', 
      username: 'anvar_uz',
      email: 'anvar@gmail.com', 
      createdAt: '2024-03-15', 
      isPro: true, 
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anvar',
      bio: 'Full-stack developer with 5 years of experience in React and Node.js.',
      contacts: [
        { platform: 'Telegram', link: '@anvar_dev' },
        { platform: 'GitHub', link: 'github.com/anvar' }
      ],
      stats: {
        visits: 1240,
        messages: 45,
        cvDownloads: 12,
        certificates: 8,
        projects: 15,
        experiences: 4
      },
      designs: {
        cv: 'Modern Dark',
        portfolio: 'Interactive 3D'
      }
    },
    { 
      id: 2, 
      name: 'Malika Ergasheva', 
      username: 'malika_designer',
      email: 'malika@mail.ru', 
      createdAt: '2024-04-01', 
      isPro: false, 
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Malika',
      bio: 'UI/UX Designer who loves creating beautiful interfaces.',
      contacts: [
        { platform: 'Instagram', link: '@malika_design' },
        { platform: 'Behance', link: 'behance.net/malika' }
      ],
      stats: {
        visits: 890,
        messages: 20,
        cvDownloads: 5,
        certificates: 3,
        projects: 10,
        experiences: 2
      },
      designs: {
        cv: 'Minimalist',
        portfolio: 'Creative Grid'
      }
    },
    { 
      id: 3, 
      name: 'Jasur Bek', 
      username: 'jasurbek_dev',
      email: 'jasur@info.uz', 
      createdAt: '2024-04-10', 
      isPro: false, 
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur',
      bio: 'Mobile application developer focusing on Flutter.',
      contacts: [
        { platform: 'LinkedIn', link: 'linkedin.com/in/jasur' }
      ],
      stats: {
        visits: 560,
        messages: 12,
        cvDownloads: 2,
        certificates: 5,
        projects: 7,
        experiences: 3
      },
      designs: {
        cv: 'Classic Professional',
        portfolio: 'Clean Slate'
      }
    },
    { 
      id: 4, 
      name: 'Sardor Rahim', 
      username: 'sardor_rahim',
      email: 'sardor@gmail.com', 
      createdAt: '2024-04-12', 
      isPro: true, 
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor',
      bio: 'Backend developer, Python & Django enthusiast.',
      contacts: [
        { platform: 'Telegram', link: '@sardor_dev' }
      ],
      stats: {
        visits: 2100,
        messages: 88,
        cvDownloads: 34,
        certificates: 12,
        projects: 22,
        experiences: 6
      },
      designs: {
        cv: 'Executive',
        portfolio: 'Bento Grid'
      }
    },
  ]);

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pro, free
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest
  const [selectedUser, setSelectedUser] = useState(null);

  // --- HANDLERS ---
  const togglePro = (userId, e) => {
    e.stopPropagation();
    setUsers(users.map(u => u.id === userId ? { ...u, isPro: !u.isPro } : u));
  };

  const deleteUser = (userId, e) => {
    e.stopPropagation();
    if(window.confirm('Haqiqatdan ham ushbu foydalanuvchini o\'chirmoqchimisiz?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const openPortfolio = (username, e) => {
    e.stopPropagation();
    alert(`${username} portfoliosiga o'tilmoqda...`);
  };

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedUsers = users
    .filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' ? true : (filterStatus === 'pro' ? u.isPro : !u.isPro);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-10"
    >
      {/* 1. HEADER & FILTERS */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="w-2 h-7 bg-rose-600 rounded-full shadow-lg shadow-rose-500/20"></span>
            Foydalanuvchilar Boshqaruvi
          </h1>
          <p className="text-slate-400 mt-1 font-medium text-sm">Barcha ro'yxatdan o'tgan foydalanuvchilarni boshqarish.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group flex-1 sm:flex-none">
            <input 
              type="text" 
              placeholder="Qidirish..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-11 text-sm focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none w-full sm:w-64 transition-all placeholder:text-slate-500 text-white"
            />
            <svg className="w-4 h-4 absolute left-4 top-3 text-slate-500 group-focus-within:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-rose-500 outline-none text-slate-300 cursor-pointer flex-1 sm:flex-none"
            >
              <option value="newest" className="bg-[#1a1f2e]">Yangi qo'shilganlar</option>
              <option value="oldest" className="bg-[#1a1f2e]">Eski qo'shilganlar</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-rose-500 outline-none text-slate-300 cursor-pointer flex-1 sm:flex-none"
            >
              <option value="all" className="bg-[#1a1f2e]">Barcha statuslar</option>
              <option value="pro" className="bg-[#1a1f2e]">Faqat Pro</option>
              <option value="free" className="bg-[#1a1f2e]">Faqat Free</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. USERS TABLE */}
      <div className="bg-[#1a1f2e]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rose-500/20">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-5">Foydalanuvchi</th>
                <th className="px-6 py-5">Email Manzili</th>
                <th className="px-6 py-5">Sana</th>
                <th className="px-6 py-5">Obuna</th>
                <th className="px-6 py-5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedUsers.map((user) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-white/[0.03] transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 group-hover:border-rose-500/50 transition-all duration-300">
                           <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100 group-hover:text-rose-400 transition-colors text-sm">{user.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">{user.email}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                       <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{user.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isPro ? (
                        <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-[9px] font-black border border-amber-500/20">PRO</span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-slate-500/10 text-slate-500 text-[9px] font-black border border-slate-500/20">FREE</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5 opacity-60 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={(e) => openPortfolio(user.username, e)}
                          className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => togglePro(user.id, e)}
                          className={`p-2 rounded-xl transition-all ${user.isPro ? 'bg-slate-500/10 text-slate-400 hover:bg-slate-500 hover:text-white' : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white'}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => deleteUser(user.id, e)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          {filteredAndSortedUsers.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600 border border-white/5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-500 font-bold">Ma'lumot topilmadi</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. USER DETAIL MODAL */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#1a1f2e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header decor */}
              <div className="h-32 bg-gradient-to-r from-rose-600/20 to-indigo-600/20 border-b border-white/5 relative">
                 <button 
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-xl transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-8 pb-10 -mt-12 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mb-8">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#1a1f2e] shadow-xl bg-[#1a1f2e]">
                     <img 
                      src={selectedUser.image} 
                      alt={selectedUser.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left pb-2">
                    <h3 className="text-3xl font-black text-white">{selectedUser.name}</h3>
                    <p className="text-rose-500 font-bold">@{selectedUser.username}</p>
                  </div>
                  <div className="pb-2">
                     {selectedUser.isPro ? (
                        <span className="px-4 py-1.5 rounded-lg bg-amber-500 text-white text-[10px] font-black shadow-lg shadow-amber-500/20">PRO ACCOUNT</span>
                      ) : (
                        <span className="px-4 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-[10px] font-black">FREE ACCOUNT</span>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 space-y-6">
                    <section>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Biografiya</h4>
                      <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                        {selectedUser.bio || 'Ma\'lumot kiritilmagan.'}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Kontaktlar</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.contacts.map((c, i) => (
                          <div key={i} className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[11px] font-bold text-slate-300">
                            <span className="text-rose-500 mr-1">{c.platform}:</span>
                            {c.link}
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                        <p className="text-[9px] text-indigo-400 font-black uppercase mb-1">Portfolio Dizayn</p>
                        <p className="text-white text-xs font-bold">{selectedUser.designs.portfolio}</p>
                      </div>
                      <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                        <p className="text-[9px] text-purple-400 font-black uppercase mb-1">CV Dizayn</p>
                        <p className="text-white text-xs font-bold">{selectedUser.designs.cv}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Statistika</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Tashriflar', value: selectedUser.stats.visits, color: 'blue' },
                        { label: 'Xabarlar', value: selectedUser.stats.messages, color: 'emerald' },
                        { label: 'CV Yuklash', value: selectedUser.stats.cvDownloads, color: 'rose' },
                        { label: 'Sertifikat', value: selectedUser.stats.certificates, color: 'amber' },
                        { label: 'Loyihalar', value: selectedUser.stats.projects, color: 'indigo' },
                        { label: 'Tajriba', value: selectedUser.stats.experiences, color: 'purple' },
                      ].map((stat, idx) => (
                        <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                          <p className="text-[9px] font-black text-slate-500 uppercase">{stat.label}</p>
                          <p className={`text-lg font-black text-white mt-0.5`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminUsers;
