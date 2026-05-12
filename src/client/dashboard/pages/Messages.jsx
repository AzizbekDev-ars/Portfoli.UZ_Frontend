import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import api from '../../../services/api';

// Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const FilterIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.819c0-.54.384-1.006.917-1.096A48.328 48.328 0 0112 3z" /></svg>;
const EnvelopeClosedIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75-9.75-6.75" /></svg>;
const EnvelopeOpenIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const HeartOutline = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const HeartSolid = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-rose-500"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.772 0 3.195.945 3.93 2.107C12.175 3.945 13.598 3 15.37 3c2.786 0 5.25 2.322 5.25 5.25 0 3.925-2.438 7.111-4.73 9.271a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>;
const PhoneIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
const TgIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>;

const Messages = () => {
  const { t } = useLang();
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Filter States
  const [sortDate, setSortDate] = useState('desc'); // desc, asc
  const [filterRead, setFilterRead] = useState('all'); // all, read, unread
  const [filterLiked, setFilterLiked] = useState('all'); // all, liked, unliked

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/message');
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering Logic
  const processedMessages = useMemo(() => {
    let result = messages.filter(m => 
      m.sendername?.toLowerCase().includes(search.toLowerCase()) || 
      m.contactlink?.toLowerCase().includes(search.toLowerCase()) ||
      m.messagetext?.toLowerCase().includes(search.toLowerCase())
    );

    if (filterRead === 'read') result = result.filter(m => m.read);
    if (filterRead === 'unread') result = result.filter(m => !m.read);

    if (filterLiked === 'liked') result = result.filter(m => m.isLiked);
    if (filterLiked === 'unliked') result = result.filter(m => !m.isLiked);

    result.sort((a, b) => {
      const dateA = new Date(a.sendtime).getTime();
      const dateB = new Date(b.sendtime).getTime();
      return sortDate === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [messages, search, sortDate, filterRead, filterLiked]);

  // Actions
  const toggleRead = async (id) => {
    const msg = messages.find(m => m._id === id);
    try {
      const res = await api.put(`/message/${id}`, { read: !msg.read });
      setMessages(messages.map(m => m._id === id ? res.data : m));
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const toggleLike = (id) => setMessages(messages.map(m => m._id === id ? { ...m, isLiked: !m.isLiked } : m));

  const deleteMessage = async (id) => {
    if(window.confirm("Rostdan ham ushbu xabarni o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/message/${id}`);
        setMessages(messages.filter(m => m._id !== id));
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  const formatDate = (ds) => {
    const d = new Date(ds);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6 pb-12"
    >
      {/* Header & Filters */}
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 p-2 rounded-xl">
              <EnvelopeClosedIcon />
            </span>
            Xabarlar
          </h2>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Ism, email yoki matn bo'yicha qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/5 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <FilterIcon /> Filtrlar:
          </div>

          <select 
            value={sortDate} onChange={(e) => setSortDate(e.target.value)}
            className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500 cursor-pointer"
          >
            <option className="text-slate-900" value="desc">Eng yangilari</option>
            <option className="text-slate-900" value="asc">Eng eskilar</option>
          </select>

          <select 
            value={filterRead} onChange={(e) => setFilterRead(e.target.value)}
            className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500 cursor-pointer"
          >
            <option className="text-slate-900" value="all">Barcha xabarlar</option>
            <option className="text-slate-900" value="unread">O'qilmagan</option>
            <option className="text-slate-900" value="read">O'qilgan</option>
          </select>

          <select 
            value={filterLiked} onChange={(e) => setFilterLiked(e.target.value)}
            className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500 cursor-pointer"
          >
            <option className="text-slate-900" value="all">Barchasi (Like)</option>
            <option className="text-slate-900" value="liked">Yoqtirilganlar</option>
            <option className="text-slate-900" value="unliked">Yoqtirilmaganlar</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <AnimatePresence>
          {processedMessages.length > 0 ? processedMessages.map(msg => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              key={msg._id} 
              className={`bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border ${!msg.read ? 'border-indigo-500/50 shadow-indigo-500/10 shadow-lg' : 'border-slate-200 dark:border-white/10 shadow-sm'} flex flex-col transition-all duration-300 relative group`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                
                {/* User Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={`https://ui-avatars.com/api/?name=${msg.sendername}&background=6366f1&color=fff`} alt={msg.sendername} className="w-12 h-12 rounded-full object-cover shadow-sm"/>
                    {!msg.read && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {msg.sendername}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                        {formatDate(msg.sendtime)}
                      </span>
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{msg.contactlink}</p>
                    
                    {/* Contacts */}
                    <div className="flex flex-wrap gap-3 mt-2">
                      {msg.phone && (
                        <a href={`tel:${msg.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <PhoneIcon /> {msg.phone}
                        </a>
                      )}
                      {msg.telegram && (
                        <a href={`https://t.me/${msg.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#0088cc] dark:hover:text-[#0088cc] transition-colors">
                          <TgIcon /> {msg.telegram}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:ml-auto">
                  <button 
                    onClick={() => toggleRead(msg._id)}
                    title={msg.read ? "O'qilmagan qilish" : "O'qilgan deb belgilash"}
                    className={`p-2.5 rounded-xl transition-colors ${msg.read ? 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30'}`}
                  >
                    {msg.read ? <EnvelopeOpenIcon /> : <EnvelopeClosedIcon />}
                  </button>
                  <button 
                    onClick={() => toggleLike(msg._id)}
                    title="Yoqtirish"
                    className="p-2.5 rounded-xl transition-colors text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                  >
                    {msg.isLiked ? <HeartSolid /> : <HeartOutline />}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    title="O'chirish"
                    className="p-2.5 rounded-xl transition-colors text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="mt-5 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-white/[0.02] p-4 rounded-xl border border-slate-100 dark:border-white/5">
                {msg.messagetext}
              </div>

            </motion.div>
          )) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 text-slate-500 dark:text-slate-400"
            >
              Mos keluvchi xabarlar topilmadi.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default Messages;
