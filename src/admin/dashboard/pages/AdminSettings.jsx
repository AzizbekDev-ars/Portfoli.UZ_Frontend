import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const [balance, setBalance] = useState(13100000); // 13.1m UZS
  const [activeTab, setActiveTab] = useState('security'); // security, subscription, api, seo
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form States
  const [securityData, setSecurityData] = useState({ login: 'admin@portfolio.uz', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [subData, setSubData] = useState({ proPrice: 50000, freeProjectsLimit: 3, freeCertLimit: 2 });
  const [apiData, setApiData] = useState({ cloudinaryUrl: 'cloudinary://...', ipapiKey: 'pk_test_...', smtpHost: 'smtp.mail.ru', smtpPort: 465, smtpEmail: 'info@portfolio.uz', smtpPassword: '' });
  const [seoData, setSeoData] = useState({ siteName: 'Portfolio.uz', metaDesc: "Yaratuvchilar uchun eng zo'r portfolio platformasi", telegramUrl: 'https://t.me/portfolio_uz', bannerActive: true, bannerText: "Navro'z munosabati bilan PRO obunaga 50% chegirma!" });
  const [maintenance, setMaintenance] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === 'security' && securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
      alert('Yangi parollar mos kelmadi!');
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg("Ma'lumotlar muvaffaqiyatli saqlandi!");
      
      if (activeTab === 'security') {
        setSecurityData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      }

      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'security', label: 'Xavfsizlik', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'subscription', label: 'Obuna & Limitlar', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'api', label: 'API & SMTP', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'seo', label: 'SEO & Banner', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 md:space-y-8 pb-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-rose-500 rounded-full"></span>
            Sozlamalar
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Platforma parametrlarini boshqarish.</p>
        </div>
      </div>

      {/* 1. BALANCE CARD */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <p className="text-slate-400 text-sm font-medium">Asosiy Hisob Balansi</p>
            <h2 className="text-3xl font-black text-white mt-1 tracking-tight">{balance.toLocaleString()} <span className="text-sm font-normal text-slate-500">UZS</span></h2>
          </div>
          <button className="w-full md:w-max bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10 backdrop-blur-md">
            Yechib olish (Withdraw)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* 2. TABS SIDEBAR (Horizontal scroll on mobile) */}
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-4 md:px-5 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-lg shadow-rose-500/5' 
                    : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Maintenance Mode (Desktop only in sidebar) */}
          <div className="hidden lg:block mt-8 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" /></svg>
               Xizmat holati
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Maintenance Mode</span>
              <button 
                onClick={() => setMaintenance(!maintenance)}
                className={`w-10 h-5 rounded-full relative transition-colors ${maintenance ? 'bg-red-500' : 'bg-slate-700'}`}
              >
                <motion.span 
                  animate={{ left: maintenance ? '1.25rem' : '0.25rem' }}
                  className="absolute top-1 w-3 h-3 bg-white rounded-full"
                ></motion.span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. SETTINGS CONTENT */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden min-h-[400px]">
            <form onSubmit={handleSave} className="flex flex-col h-full">
              
              <div className="flex-1 p-5 md:p-8 space-y-8">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">Xavfsizlik Sozlamalari</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Login (Email)</label>
                          <input type="text" value={securityData.login} onChange={e => setSecurityData({...securityData, login: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none transition-all" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Joriy parol</label>
                            <input type="password" value={securityData.currentPassword} onChange={e => setSecurityData({...securityData, currentPassword: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Yangi parol</label>
                            <input type="password" value={securityData.newPassword} onChange={e => setSecurityData({...securityData, newPassword: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Parolni tasdiqlang</label>
                            <input type="password" value={securityData.confirmPassword} onChange={e => setSecurityData({...securityData, confirmPassword: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'subscription' && (
                    <motion.div key="subscription" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-lg font-bold text-white">Tariflar va Limitlar</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">PRO Obuna narxi (UZS/oy)</label>
                          <div className="relative">
                            <input type="number" value={subData.proPrice} onChange={e => setSubData({...subData, proPrice: Number(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                            <span className="absolute right-4 top-3 text-slate-500 font-bold">UZS</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Free: Loyihalar limiti</label>
                          <input type="number" value={subData.freeProjectsLimit} onChange={e => setSubData({...subData, freeProjectsLimit: Number(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Free: Sertifikatlar limiti</label>
                          <input type="number" value={subData.freeCertLimit} onChange={e => setSubData({...subData, freeCertLimit: Number(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'api' && (
                    <motion.div key="api" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white">Integratsiyalar</h2>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Cloudinary URL</label>
                          <input type="text" value={apiData.cloudinaryUrl} onChange={e => setApiData({...apiData, cloudinaryUrl: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none font-mono text-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">IPAPI Key</label>
                          <input type="password" value={apiData.ipapiKey} onChange={e => setApiData({...apiData, ipapiKey: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-4 pt-6 border-t border-white/5">
                        <h3 className="font-bold text-white">SMTP (Email)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Host</label>
                            <input type="text" value={apiData.smtpHost} onChange={e => setApiData({...apiData, smtpHost: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-2 px-3 text-white outline-none text-sm" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Port</label>
                            <input type="number" value={apiData.smtpPort} onChange={e => setApiData({...apiData, smtpPort: Number(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl py-2 px-3 text-white outline-none text-sm" />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                            <input type="email" value={apiData.smtpEmail} onChange={e => setApiData({...apiData, smtpEmail: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-2 px-3 text-white outline-none text-sm" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Parol</label>
                            <input type="password" value={apiData.smtpPassword} onChange={e => setApiData({...apiData, smtpPassword: e.target.value})} placeholder="********" className="w-full bg-black/30 border border-white/10 rounded-xl py-2 px-3 text-white outline-none text-sm" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'seo' && (
                    <motion.div key="seo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-lg font-bold text-white">SEO & Global</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Sayt nomi</label>
                          <input type="text" value={seoData.siteName} onChange={e => setSeoData({...seoData, siteName: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Meta Tavsif</label>
                          <textarea value={seoData.metaDesc} onChange={e => setSeoData({...seoData, metaDesc: e.target.value})} rows="3" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-rose-500 outline-none resize-none"></textarea>
                        </div>
                        
                        <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-indigo-400">Global Banner</h3>
                            <button type="button" onClick={() => setSeoData({...seoData, bannerActive: !seoData.bannerActive})} className={`w-12 h-6 rounded-full relative transition-colors ${seoData.bannerActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                              <motion.span animate={{ left: seoData.bannerActive ? '1.75rem' : '0.25rem' }} className="absolute top-1 w-4 h-4 bg-white rounded-full"></motion.span>
                            </button>
                          </div>
                          <input type="text" disabled={!seoData.bannerActive} value={seoData.bannerText} onChange={e => setSeoData({...seoData, bannerText: e.target.value})} placeholder="Banner matni..." className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none disabled:opacity-30" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* SAVE BUTTON */}
              <div className="p-6 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="min-h-[20px]">
                  <AnimatePresence>
                    {successMsg && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {successMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button type="submit" disabled={isSaving} className="w-full sm:w-max px-8 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2">
                  {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
