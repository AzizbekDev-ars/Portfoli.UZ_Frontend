import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import PaymentModal from '../components/PaymentModal';

// Icons
const SaveIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>;
const CameraIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const CrownIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.182.98l.643 5.433c0 .5-.6.85-1.045.545l-4.636-3.14a.563.563 0 00-.594 0l-4.636 3.14c-.445.305-1.045-.045-1.045-.545l.643-5.433a.563.563 0 00-.182-.98l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;

const initialSettingsData = {
  firstName: "Ali",
  lastName: "Valiyev",
  aboutMe: "Men 5 yillik tajribaga ega dasturchiman. React va Node.js ni yaxshi ko'raman va har doim yangi texnologiyalarni o'rganishga tayyorman.",
  username: "mr-fury",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  showAvatarOnPortfolio: true,
  address: "Toshkent shahri, Chilonzor tumani",
  availableTime: "09:00 - 18:00 (Dush-Jum)",
  contacts: [
    { id: 1, type: "Telegram", link: "@mrfury" },
    { id: 2, type: "Phone", link: "+998 90 123 45 67" },
    { id: 3, type: "LinkedIn", link: "linkedin.com/in/mrfury" },
    { id: 4, type: "GitHub", link: "github.com/mrfury" }
  ],
  passwords: {
    current: "",
    new: "",
    confirm: ""
  },
  selectedDesign: "Zamonaviy",
  designChangedCount: 0,
  isPro: false
};

const Settings = () => {
  const { t } = useLang();
  
  const [settings, setSettings] = useState(initialSettingsData);
  const [initialSettingsStr, setInitialSettingsStr] = useState(JSON.stringify(initialSettingsData));
  const [hasChanges, setHasChanges] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Load from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem("portfolioSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      // migrate missing fields
      if (parsed.isPro === undefined) parsed.isPro = false;
      if (parsed.designChangedCount === undefined) parsed.designChangedCount = 0;
      setSettings(parsed);
      setInitialSettingsStr(JSON.stringify(parsed));
    }
  }, []);

  // Check for changes whenever settings changes
  useEffect(() => {
    const currentStr = JSON.stringify(settings);
    setHasChanges(currentStr !== initialSettingsStr);
  }, [settings, initialSettingsStr]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ 
      ...prev, 
      passwords: { ...prev.passwords, [name]: value }
    }));
  };

  const handleToggleAvatarVisibility = () => {
    setSettings(prev => ({ ...prev, showAvatarOnPortfolio: !prev.showAvatarOnPortfolio }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleAvatarDelete = () => {
    setSettings(prev => ({ ...prev, avatar: null }));
  };

  // Contacts
  const addContact = () => {
    setSettings(prev => ({
      ...prev,
      contacts: [...prev.contacts, { id: Date.now(), type: "Telegram", link: "" }]
    }));
  };

  const updateContact = (id, field, value) => {
    setSettings(prev => ({
      ...prev,
      contacts: prev.contacts.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const deleteContact = (id) => {
    setSettings(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id)
    }));
  };

  const handleSave = () => {
    if (!hasChanges) return;
    
    let updatedSettings = { ...settings };
    const originalSettings = JSON.parse(initialSettingsStr);
    
    // If they changed the design, increment the count
    if (updatedSettings.selectedDesign !== originalSettings.selectedDesign) {
       updatedSettings.designChangedCount = (updatedSettings.designChangedCount || 0) + 1;
    }
    
    setSettings(updatedSettings);
    setInitialSettingsStr(JSON.stringify(updatedSettings));
    setHasChanges(false);
    localStorage.setItem("portfolioSettings", JSON.stringify(updatedSettings));
    window.dispatchEvent(new Event('portfolioSettingsUpdate'));
    alert("Sozlamalar muvaffaqiyatli saqlandi!");
  };

  const handleDesignSelect = (design) => {
    if (design === settings.selectedDesign) return;
    
    const originalSettings = JSON.parse(initialSettingsStr);
    // If they already changed the design at least once, and are not pro
    if (!settings.isPro && originalSettings.designChangedCount >= 1 && design !== originalSettings.selectedDesign) {
      setIsPaymentModalOpen(true);
      return;
    }
    
    setSettings(prev => ({ ...prev, selectedDesign: design }));
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    const upgraded = { ...settings, isPro: true };
    setSettings(upgraded);
    setInitialSettingsStr(JSON.stringify(upgraded));
    localStorage.setItem("portfolioSettings", JSON.stringify(upgraded));
    window.dispatchEvent(new Event('portfolioSettingsUpdate'));
    alert("Tabriklaymiz! Siz endi PRO tarifidasiz 🎉");
  };

  const handleCancelPro = () => {
    if (window.confirm("Haqiqatan ham PRO tarifingizni bekor qilmoqchimisiz?")) {
      const downgraded = { ...settings, isPro: false };
      setSettings(downgraded);
      setInitialSettingsStr(JSON.stringify(downgraded));
      localStorage.setItem("portfolioSettings", JSON.stringify(downgraded));
      window.dispatchEvent(new Event('portfolioSettingsUpdate'));
      alert("PRO tarifingiz bekor qilindi.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-24 flex flex-col"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 mt-2">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Sozlamalar
        </h1>

        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md
            ${hasChanges 
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:shadow-lg active:scale-95' 
              : 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
            }
          `}
        >
          <SaveIcon />
          <span>O'zgarishlarni saqlash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Settings */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* 1. PROFILE & USERNAME */}
          <div className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-3xl pointer-events-none"></div>
             
             <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Shaxsiy Ma'lumot va Profil</h2>
             
             <div className="flex flex-col sm:flex-row gap-8 items-start">
               {/* Avatar Area */}
               <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-black shadow-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    {settings.avatar ? (
                      <img src={settings.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                         <CameraIcon />
                      </div>
                    )}
                    
                    {/* Hover Overlay - Desktop only or touch friendly */}
                    <div className="absolute inset-0 bg-black/50 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                       <label className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black sm:bg-white/20 sm:text-white flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors shadow-lg">
                         <CameraIcon />
                         <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                       </label>
                       {settings.avatar && (
                         <button onClick={handleAvatarDelete} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white sm:bg-red-500/80 flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors shadow-lg">
                           <TrashIcon />
                         </button>
                       )}
                    </div>
                  </div>

                  {/* Toggle Show Avatar */}
                  <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="relative">
                      <input 
                         type="checkbox" 
                         className="sr-only" 
                         checked={settings.showAvatarOnPortfolio} 
                         onChange={handleToggleAvatarVisibility} 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${settings.showAvatarOnPortfolio ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.showAvatarOnPortfolio ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    Saytda ko'rsatish
                  </label>
               </div>

               {/* Username and Info Input Area */}
               <div className="flex-1 w-full flex flex-col gap-4 pt-2">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Ism</label>
                     <input 
                       type="text" 
                       name="firstName"
                       value={settings.firstName}
                       onChange={handleInputChange}
                       className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                       placeholder="Ismingiz"
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Familiya</label>
                     <input 
                       type="text" 
                       name="lastName"
                       value={settings.lastName}
                       onChange={handleInputChange}
                       className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                       placeholder="Familiyangiz"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Username</label>
                   <div className="relative flex items-stretch">
                     <div className="flex items-center px-4 bg-slate-100 dark:bg-white/5 border border-r-0 border-slate-200 dark:border-white/10 rounded-l-xl text-slate-500 font-semibold text-sm">
                       portfolio.uz/
                     </div>
                     <input 
                       type="text" 
                       name="username"
                       value={settings.username}
                       onChange={handleInputChange}
                       
                       className="flex-1 min-w-0 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-r-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm font-bold"
                       placeholder="username"
                     />
                   </div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                     Ushbu username dori shaxsiy domeningiz bo'lib xizmat qiladi.
                   </p>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">O'zim haqimda (Qisqacha)</label>
                    <textarea 
                      rows="3" 
                      name="aboutMe" 
                      value={settings.aboutMe} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none" 
                      placeholder="Kasbim va texnologiyalar haqida qisqacha ma'lumot (CV uchun)..."
                    ></textarea>
                 </div>

               </div>
             </div>
          </div>

          {/* 2. CONTACTS & ADDRESS */}
          <div className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             
             <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Aloqa Uchun Ma'lumotlar</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Manzil</label>
                 <input 
                   type="text" 
                   name="address"
                   value={settings.address}
                   onChange={handleInputChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="Masalan: Toshkent sh., Chilonzor"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Mavjud Bo'lish Vaqti</label>
                 <input 
                   type="text" 
                   name="availableTime"
                   value={settings.availableTime}
                   onChange={handleInputChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="Masalan: 09:00 - 18:00"
                 />
                 <p className="text-[10px] text-slate-500 mt-1">Saytingizga kirganlar qachon sizga bog'lanish qulayligini bilishi uchun.</p>
               </div>
             </div>

             <div className="border-t border-slate-200 dark:border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Ijtimoiy Tarmoq va Kontaktlar</label>
                  <button 
                    onClick={addContact}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors text-xs font-black"
                  >
                    <PlusIcon /> QO'SHISH
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {settings.contacts.map((contact, index) => (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        key={contact.id} 
                        className="flex items-center gap-2"
                      >
                         <select 
                           value={contact.type}
                           onChange={(e) => updateContact(contact.id, 'type', e.target.value)}
                           className="w-24 sm:w-1/4 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-2 sm:px-4 py-2 sm:py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-[10px] sm:text-sm appearance-none cursor-pointer shrink-0"
                         >
                           <option value="Telegram">Telegram</option>
                           <option value="Phone">Tel Raqam</option>
                           <option value="Email">Email</option>
                           <option value="LinkedIn">LinkedIn</option>
                           <option value="GitHub">GitHub</option>
                           <option value="YouTube">YouTube</option>
                           <option value="Facebook">Facebook</option>
                           <option value="Instagram">Instagram</option>
                           <option value="Website">Website</option>
                         </select>
                         
                         <div className="flex-1 flex gap-2">
                            <input 
                              type="text" 
                              value={contact.link}
                              onChange={(e) => updateContact(contact.id, 'link', e.target.value)}
                              placeholder={`${contact.type}...`}
                              className="flex-1 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-[10px] sm:text-sm min-w-0"
                            />
                            <button 
                              onClick={() => deleteContact(contact.id)}
                              className="w-9 h-9 sm:w-12 sm:h-12 shrink-0 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 border border-transparent rounded-xl flex items-center justify-center transition-colors"
                            >
                              <TrashIcon />
                            </button>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {settings.contacts.length === 0 && (
                    <div className="text-sm text-slate-500 py-4 text-center italic border border-dashed border-slate-300 dark:border-white/20 rounded-xl">
                      Hozircha kontaktlar qo'shilmagan.
                    </div>
                  )}
                </div>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar (Ad & Passwords) */}
        <div className="flex flex-col gap-8">
          
          {/* PRO PLAN ADVERTISEMENT */}
          {!settings.isPro ? (
            <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-[#1A1F2C] to-black dark:from-indigo-900/40 dark:to-black border border-indigo-500/20 shadow-xl shadow-indigo-900/20 group">
               {/* Decorative glows */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-700"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
                   <CrownIcon />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">PRO Ta'rifiga O'ting</h3>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">
                   Mijozlar tashrifini kuzating, CV ni aktivlashtiring va xohlagancha dizayn almashtiring.
                 </p>
                 
                 <button type="button" onClick={() => setIsPaymentModalOpen(true)} className="w-full py-3.5 rounded-xl bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                   Tarifni Yangilash ($3)
                 </button>
               </div>
            </div>
          ) : (
            <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/20 shadow-xl shadow-emerald-900/20 group">
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30">
                   <CrownIcon />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">Siz PRO Tarifidasiz 🎉</h3>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">
                   Barcha imkoniyatlar (Tashriflar, CV, dizaynlar) aktiv.
                 </p>
                 
                 <button type="button" onClick={handleCancelPro} className="w-full py-3.5 rounded-xl bg-red-500/10 text-red-500 font-black uppercase text-sm tracking-widest hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors">
                   Tarifni Bekor Qilish
                 </button>
               </div>
            </div>
          )}

          {/* PASSWORD CHANGE */}
          <div className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Xavfsizlik & Parol</h2>
             
             <form className="flex flex-col gap-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Joriy Parol</label>
                 <input 
                   type="password" 
                   name="current"
                   value={settings.passwords.current}
                   onChange={handlePasswordChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="••••••••"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Yangi Parol</label>
                 <input 
                   type="password" 
                   name="new"
                   value={settings.passwords.new}
                   onChange={handlePasswordChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="••••••••"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Yangi Parolni Tasdiqlash</label>
                 <input 
                   type="password" 
                   name="confirm"
                   value={settings.passwords.confirm}
                   onChange={handlePasswordChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="••••••••"
                 />
               </div>
               
               <p className="text-[11px] text-slate-500 leading-tight mt-2">
                 Parolni o'zgartirish uchun avval ishlatilayotgan parolingiz kiritilishi shart. O'zgartirmasangiz maydonlarni bo'sh qoldiring.
               </p>
             </form>
          </div>

        </div>
      </div>

      {/* 3. PORTFOLIO DESIGN SELECTION */}
      <div className="mt-8 bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Portfolio Dizaynini Tanlash</h2>
           {!settings.isPro && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold w-fit border border-amber-200 dark:border-amber-500/20">
               <CrownIcon /> Bepul 1 marta o'zgartirish mumkin
             </div>
           )}
         </div>
         <p className="text-sm text-slate-500 mb-6">O'zingizga yoqqan dizayn uslubini tanlang. Qolgan barcha ma'lumotlar avtomatik tarzda moslashadi.</p>
         
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {['Oddiy', 'Zamonaviy', 'Maxsus', 'Creative', 'Animatsion'].map((design) => (
              <div
                key={design}
                onClick={() => handleDesignSelect(design)}
                className={`cursor-pointer relative flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all min-h-[120px] sm:min-h-[180px] shadow-sm hover:shadow-md ${
                  settings.selectedDesign === design 
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' 
                    : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30'
                }`}
              >
                 {/* Card Decoration Element */}
                 <div className={`w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm ${settings.selectedDesign === design ? 'bg-indigo-500 text-white shadow-indigo-500/40' : 'bg-white dark:bg-black text-slate-400 border border-slate-200 dark:border-white/10'}`}>
                   <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                   </svg>
                 </div>

                 {settings.selectedDesign === design && (
                   <div className="absolute top-4 right-4 text-indigo-500 bg-white dark:bg-black rounded-full shadow-sm">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                   </div>
                 )}
                 <span className={`text-base font-black uppercase tracking-wider text-center ${
                   settings.selectedDesign === design 
                     ? 'text-indigo-600 dark:text-indigo-400' 
                     : 'text-slate-700 dark:text-slate-300'
                 }`}>
                   {design}
                 </span>
              </div>
            ))}
         </div>
      </div>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess} 
      />
    </motion.div>
  );
};

export default Settings;

