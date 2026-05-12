import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import { useAuth } from '../../../contexts/AuthContext';
import PaymentModal from '../components/PaymentModal';
import api from '../../../services/api';

// Icons
const SaveIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CameraIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const CrownIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LinkIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>;

const Settings = () => {
  const { t } = useLang();
  const { setUser } = useAuth();
  
  const [settings, setSettings] = useState({
    username: "",
    bio: "",
    location: "",
    phone: "",
    jobTitle: "",
    selectedTemplate: "modern",
    isPro: false,
    github: "",
    linkedin: "",
    telegram: "",
    instagram: "",
    twitter: "",
    website: "",
    passwords: { current: "", new: "", confirm: "" },
    avatar: "",
    showAvatarOnPortfolio: true
  });
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/me');
      const user = res.data;
      setSettings({
        username: user.username || "",
        avatar: user.profileImage?.url || "",
        showAvatarOnPortfolio: user.profileData?.showAvatarOnPortfolio ?? true,
        bio: user.profileData?.bio || "",
        location: user.profileData?.location || "",
        phone: user.profileData?.phone || "",
        jobTitle: user.profileData?.jobTitle || "",
        selectedTemplate: user.selectedTemplate || "modern",
        isPro: user.isPro || false,
        github: user.socialLinks?.github || "",
        linkedin: user.socialLinks?.linkedin || "",
        telegram: user.socialLinks?.telegram || "",
        instagram: user.socialLinks?.instagram || "",
        twitter: user.socialLinks?.twitter || "",
        website: user.socialLinks?.website || "",
        passwords: { current: "", new: "", confirm: "" }
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ 
      ...prev, 
      passwords: { ...prev.passwords, [name]: value }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const updateData = {
        username: settings.username,
        selectedTemplate: settings.selectedTemplate,
        profileData: {
          bio: settings.bio,
          location: settings.location,
          phone: settings.phone,
          jobTitle: settings.jobTitle,
          showAvatarOnPortfolio: settings.showAvatarOnPortfolio
        },
        socialLinks: {
          github: settings.github,
          linkedin: settings.linkedin,
          telegram: settings.telegram,
          instagram: settings.instagram,
          twitter: settings.twitter,
          website: settings.website,
        }
      };

      if (settings.passwords.new) {
        if (settings.passwords.new !== settings.passwords.confirm) {
          alert("Yangi parollar mos kelmadi!");
          return;
        }
        updateData.password = settings.passwords.new;
      }

      const res = await api.put('/auth/user', updateData);
      setUser(res.data); // Global user state-ni yangilash
      setHasChanges(false);
      alert("Sozlamalar muvaffaqiyatli saqlandi!");
    } catch (err) {
      alert("Xatolik: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDesignSelect = (designLabel) => {
    const designMap = {
      'Oddiy': 'minimal',
      'Zamonaviy': 'modern',
      'Maxsus': 'special',
      'Creative': 'creative',
      'Animatsion': 'animated'
    };
    setSettings(prev => ({ ...prev, selectedTemplate: designMap[designLabel] || designLabel.toLowerCase() }));
    setHasChanges(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const res = await api.put('/auth/user', { isPro: true });
      setUser(res.data);
      setSettings(prev => ({ ...prev, isPro: true }));
      setIsPaymentModalOpen(false);
      alert("Tabriklaymiz! Siz endi PRO tarifidasiz 🎉");
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const handleCancelPro = async () => {
    if (window.confirm("Haqiqatan ham PRO tarifingizni bekor qilmoqchimisiz?")) {
      try {
        const res = await api.put('/auth/user', { isPro: false });
        setUser(res.data);
        setSettings(prev => ({ ...prev, isPro: false }));
        alert("PRO tarifingiz bekor qilindi.");
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await api.put('/auth/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSettings(prev => ({ ...prev, avatar: res.data.avatar }));
      
      // Global state-ni yangilash (TopNav va h.k. uchun)
      const userRes = await api.get('/auth/me');
      setUser(userRes.data);
      
      alert("Avatar muvaffaqiyatli yangilandi!");
    } catch (err) {
      alert("Avatar yuklashda xatolik: " + err.message);
    }
  };

  const handleAvatarDelete = async () => {
    if (window.confirm("Avatarni o'chirmoqchimisiz?")) {
      try {
        await api.delete('/auth/user/avatar');
        setSettings(prev => ({ ...prev, avatar: "" }));
        
        // Global state-ni yangilash
        const userRes = await api.get('/auth/me');
        setUser(userRes.data);
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  const handleToggleAvatarVisibility = () => {
    setSettings(prev => ({ ...prev, showAvatarOnPortfolio: !prev.showAvatarOnPortfolio }));
    setHasChanges(true);
  };

  if (loading) return <div className="h-96 flex items-center justify-center font-black text-xl uppercase tracking-widest text-slate-400">Yuklanmoqda...</div>;

  const currentPortfolioUrl = `${window.location.origin}/${settings.username}`;

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
                    
                    {/* Hover Overlay */}
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
                     <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Username</label>
                     <input 
                       type="text" 
                       name="username"
                       value={settings.username}
                       onChange={handleInputChange}
                       className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm font-bold"
                       placeholder="username"
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mutaxassislik</label>
                     <input 
                       type="text" 
                       name="jobTitle"
                       value={settings.jobTitle}
                       onChange={handleInputChange}
                       className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                       placeholder="Masalan: Fullstack Developer"
                     />
                   </div>
                 </div>

                 {/* Portfolio Link Preview */}
                 <div className="mt-1 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                       <LinkIcon />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sizning Portfolio Manzilingiz:</span>
                    </div>
                    <a 
                      href={currentPortfolioUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-indigo-500 hover:underline break-all"
                    >
                      {currentPortfolioUrl}
                    </a>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Men haqimda</label>
                    <textarea 
                      rows="3" 
                      name="bio" 
                      value={settings.bio} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none" 
                      placeholder="Kasbingiz va tajribangiz haqida..."
                    ></textarea>
                 </div>

               </div>
             </div>
          </div>

          {/* 2. CONTACTS & ADDRESS */}
          <div className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             
             <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Aloqa & Ijtimoiy Tarmoqlar</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Manzil</label>
                 <input 
                   type="text" 
                   name="location"
                   value={settings.location}
                   onChange={handleInputChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="Masalan: Toshkent, O'zbekiston"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Tel Raqam</label>
                 <input 
                   type="text" 
                   name="phone"
                   value={settings.phone}
                   onChange={handleInputChange}
                   className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                   placeholder="+998 90 123 45 67"
                 />
               </div>
             </div>

             <div className="border-t border-slate-200 dark:border-white/10 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['github', 'linkedin', 'telegram', 'instagram', 'twitter', 'website'].map((link) => (
                    <div key={link}>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">{link}</label>
                      <input 
                        type="text" 
                        name={link}
                        value={settings[link]}
                        onChange={handleInputChange}
                        placeholder={`${link} linki...`}
                        className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                      />
                    </div>
                  ))}
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
            {['Oddiy', 'Zamonaviy', 'Maxsus', 'Creative', 'Animatsion'].map((design) => {
              const designMap = { 'Oddiy': 'minimal', 'Zamonaviy': 'modern', 'Maxsus': 'special', 'Creative': 'creative', 'Animatsion': 'animated' };
              const designId = designMap[design];
              const isActive = settings.selectedTemplate === designId;
              
              return (
                <div
                  key={design}
                  onClick={() => handleDesignSelect(design)}
                  className={`cursor-pointer relative flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all min-h-[120px] sm:min-h-[180px] shadow-sm hover:shadow-md ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' 
                      : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30'
                  }`}
                >
                   {/* Card Decoration Element */}
                   <div className={`w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm ${isActive ? 'bg-indigo-500 text-white shadow-indigo-500/40' : 'bg-white dark:bg-black text-slate-400 border border-slate-200 dark:border-white/10'}`}>
                     <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                     </svg>
                   </div>

                   {isActive && (
                     <div className="absolute top-4 right-4 text-indigo-500 bg-white dark:bg-black rounded-full shadow-sm">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                     </div>
                   )}
                   <span className={`text-base font-black uppercase tracking-wider text-center ${
                     isActive 
                       ? 'text-indigo-600 dark:text-indigo-400' 
                       : 'text-slate-700 dark:text-slate-300'
                   }`}>
                     {design}
                   </span>
                </div>
              );
            })}
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
