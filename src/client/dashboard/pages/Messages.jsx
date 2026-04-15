import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';

// Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const FilterIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const HeartOutline = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const HeartSolid = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-rose-500"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>;
const EnvelopeOpenIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" /></svg>;
const EnvelopeClosedIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const PhoneIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
const TgIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.358-3.076 13.064-3.197 13.565-.12.502-.48.621-.84.661-.36.04-.96-.44-1.44-.801-1.096-.806-3.805-2.535-4.887-3.238-.48-.321-.96-.962-.04-1.844 2.126-1.933 4.551-4.225 6.079-5.719.36-.36.04-.602-.28-.36l-7.79 5.305-2.88-.93c-.6-.2-.6-.6.12-.88 3.32-1.44 6.638-2.88 9.957-4.321.642-.282 1.282.161 1.208 1.066z"/></svg>;

// Dummy Messages Data
const initialMessages = [
  { 
    id: 1, 
    name: "Ali Valiyev", 
    email: "ali@gmail.com", 
    avatar: "https://ui-avatars.com/api/?name=Ali+Valiyev&background=6366f1&color=fff", 
    phone: "+998 90 123 45 67",
    telegram: "@alivaliyev",
    date: "2026-04-15T10:30:00", 
    isRead: false,
    isLiked: false,
    text: "Assalomu alaykum! Loyihangizni ko'rdim va menga juda yoqdi. O'zimning IT kompaniyam uchun shunaqa ko'rinishdagi to'liq web dastur qilib bera olasizmi? Agar iloji bo'lsa, narxlar va muddatlar bo'yicha ma'lumot bersangiz." 
  },
  { 
    id: 2, 
    name: "Nargiza Rustamova", 
    email: "nargiza@gmail.com", 
    avatar: "https://ui-avatars.com/api/?name=Nargiza+R&background=10b981&color=fff", 
    phone: "+998 93 987 65 43",
    telegram: "",
    date: "2026-04-14T16:45:00", 
    isRead: true,
    isLiked: true,
    text: "Portfolio bo'yicha hamkorlik taklifi bormidi deb o'yladim, sizning ishlaringiz dizayn tomondan juda yaxshi yechimga ega ekan. Bizning dizayn jamoaga Senior Frontend dasturchi kerak bo'lyapti. Resumeingizni yubora olasizmi?" 
  },
  { 
    id: 3, 
    name: "Sardor Ibrohimov", 
    email: "sardor@mail.ru", 
    avatar: "https://ui-avatars.com/api/?name=Sardor+I&background=f59e0b&color=fff", 
    phone: "",
    telegram: "@sardika_dev",
    date: "2026-04-12T09:15:00", 
    isRead: false,
    isLiked: false,
    text: "Salom! GitHub dagi ochiq kodli loyihangizga yordam bermoqchi edim, pull request yubordim. Uni ko'rib chiqishga vaqtingiz bo'lsa ajoyib bo'lar edi. Rahmat!" 
  },
  { 
    id: 4, 
    name: "Kamiljon", 
    email: "kamil@yahoo.com", 
    avatar: "https://ui-avatars.com/api/?name=Kamiljon&background=ef4444&color=fff", 
    phone: "+998 99 111 22 33",
    telegram: "",
    date: "2026-04-10T11:20:00", 
    isRead: true,
    isLiked: false,
    text: "Xizmatlar narxi haqida bilmoqchi edim, masalan bitta e-commerce loyiha qanchaga tushadi? Menda tayyor dizayn bor, faqat frontend va backend qismlari yozilishi kerak. Qo'ng'iroq qilib yuboring iltimos." 
  },
];

const Messages = () => {
  const { t } = useLang();
  
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState('');
  
  // Filter States
  const [sortDate, setSortDate] = useState('desc'); // desc, asc
  const [filterRead, setFilterRead] = useState('all'); // all, read, unread
  const [filterLiked, setFilterLiked] = useState('all'); // all, liked, unliked

  // Filtering Logic
  const processedMessages = useMemo(() => {
    let result = messages.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.text.toLowerCase().includes(search.toLowerCase())
    );

    if (filterRead === 'read') result = result.filter(m => m.isRead);
    if (filterRead === 'unread') result = result.filter(m => !m.isRead);

    if (filterLiked === 'liked') result = result.filter(m => m.isLiked);
    if (filterLiked === 'unliked') result = result.filter(m => !m.isLiked);

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDate === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [messages, search, sortDate, filterRead, filterLiked]);

  // Actions
  const toggleRead = (id) => setMessages(messages.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m));
  const toggleLike = (id) => setMessages(messages.map(m => m.id === id ? { ...m, isLiked: !m.isLiked } : m));
  const deleteMessage = (id) => setMessages(messages.filter(m => m.id !== id));

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
              key={msg.id} 
              className={`bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border ${!msg.isRead ? 'border-indigo-500/50 shadow-indigo-500/10 shadow-lg' : 'border-slate-200 dark:border-white/10 shadow-sm'} flex flex-col transition-all duration-300 relative group`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                
                {/* User Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover shadow-sm"/>
                    {!msg.isRead && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {msg.name}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                        {formatDate(msg.date)}
                      </span>
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{msg.email}</p>
                    
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
                    onClick={() => toggleRead(msg.id)}
                    title={msg.isRead ? "O'qilmagan qilish" : "O'qilgan deb belgilash"}
                    className={`p-2.5 rounded-xl transition-colors ${msg.isRead ? 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30'}`}
                  >
                    {msg.isRead ? <EnvelopeOpenIcon /> : <EnvelopeClosedIcon />}
                  </button>
                  <button 
                    onClick={() => toggleLike(msg.id)}
                    title="Yoqtirish"
                    className="p-2.5 rounded-xl transition-colors text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                  >
                    {msg.isLiked ? <HeartSolid /> : <HeartOutline />}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    title="O'chirish"
                    className="p-2.5 rounded-xl transition-colors text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="mt-5 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-white/[0.02] p-4 rounded-xl border border-slate-100 dark:border-white/5">
                {msg.text}
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
