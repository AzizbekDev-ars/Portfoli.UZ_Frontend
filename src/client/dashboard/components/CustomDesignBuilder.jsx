import React, { useState, Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

const Maxsus = lazy(() => import('../../../portfolio/templates/Maxsus'));

// Default or fallback mock data for previewing
const mockData = {
  firstName: "Pro",
  lastName: "Foydalanuvchi",
  aboutMe: "Bu shablon dizaynini siz o'zingiz xohlagan ranglar, shriftlar va shakllar yordamida sozlashingiz mumkin.",
  email: "pro@portfolio.uz",
  address: "Toshkent, O'zbekiston",
  contacts: [
    { type: 'GitHub', link: '#' },
    { type: 'Telegram', link: '#' },
    { type: 'LinkedIn', link: '#' }
  ],
  experiences: [
    { role: 'Senior Developer', company: 'Tech Corp', period: '2022 - Hozirgacha', description: 'Yangi texnologiyalarni amaliyotga tatbiq etish.' },
  ],
  projects: [
    { title: 'Amazing App', tech: 'React, Node.js', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop' },
    { title: 'Creative Site', tech: 'Vue, Laravel', image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=2070&auto=format&fit=crop' }
  ],
  certificates: [
    { title: 'Pro Certificate', issuer: 'Academy', date: '2023' }
  ]
};

const colors = [
  { name: 'Oltin (Default)', value: '#D4AF37' },
  { name: 'Siyohrang', value: '#8B5CF6' },
  { name: 'Yashil', value: '#10B981' },
  { name: 'Moviy', value: '#3B82F6' },
  { name: 'Qizil', value: '#EF4444' },
  { name: 'Pushti', value: '#EC4899' },
  { name: 'Oq', value: '#FFFFFF' },
];

const bgColors = [
  { name: 'Qora (Default)', value: '#0A0A0A' },
  { name: 'To\'q Ko\'k', value: '#0F172A' },
  { name: 'To\'q Kulrang', value: '#18181B' },
  { name: 'Oq (Light)', value: '#FDFDFD' },
];

const fonts = [
  { name: 'Serif (Klassik)', value: 'serif' },
  { name: 'Sans-Serif (Zamonaviy)', value: 'sans' },
  { name: 'Monospace (Dasturchi)', value: 'mono' },
];

const borders = [
  { name: '0px', value: '0px' },
  { name: '4px', value: '4px' },
  { name: '8px', value: '8px' },
  { name: '12px', value: '12px' },
];

const effects = [
  { name: 'Grid Torlari', value: 'grid' },
  { name: 'Zarrachalar (Particles)', value: 'particles' },
  { name: 'Toza (Clean)', value: 'none' }
];

const animations = [
  { name: 'Kiber Glitch', value: 'glitch' },
  { name: 'Sokin Pulse', value: 'pulse' },
  { name: 'Oddiy', value: 'none' }
];

const CustomDesignBuilder = ({ isOpen, onClose, onSave, initialSettings }) => {
  const [design, setDesign] = useState({
    primaryColor: '#00F0FF',
    backgroundColor: '#050505',
    textColor: '#FFFFFF',
    fontFamily: 'sans',
    borderRadius: '4px',
    effectType: 'grid',
    animationStyle: 'glitch'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (initialSettings) {
      setDesign(prev => ({ ...prev, ...initialSettings }));
    }
  }, [initialSettings]);

  // Handle Light/Dark text automatically based on background
  useEffect(() => {
    if (design.backgroundColor === '#FDFDFD') {
      setDesign(prev => ({ ...prev, textColor: '#1A1A1A' }));
    } else {
      setDesign(prev => ({ ...prev, textColor: '#E5E5E5' }));
    }
  }, [design.backgroundColor]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/auth/user', {
        selectedTemplate: 'special',
        customDesign: design
      });
      onSave(design);
      onClose();
    } catch (err) {
      alert("Xatolik: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  // Real data for preview
  const previewData = {
    ...mockData,
    firstName: user?.username || "Pro",
    lastName: "User",
    username: user?.username || "pro",
    avatar: user?.profileImage?.url || mockData.avatar,
    showAvatarOnPortfolio: user?.showAvatarOnPortfolio !== false,
    customDesign: design
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-white dark:bg-[#0B0F19] flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT PANEL - PREVIEW */}
        <div className="flex-1 h-full bg-slate-100 dark:bg-black/80 relative overflow-hidden flex items-center justify-center border-r border-slate-200 dark:border-white/10">
           {/* Responsive Iframe-like Container */}
           <div className="w-[90%] h-[90%] bg-white dark:bg-[#030712] rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-300 dark:border-white/10 relative" style={{ transform: 'translateZ(0)' }}>
             <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                {/* Maxsus requires isDark setting from theme context, but internally we'll let it use the theme or force its colors based on customDesign */}
                <div className="w-full h-full overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-hide">
                   <Maxsus data={previewData} onSendMessage={async () => ({success: true})} onDownloadCV={() => {}} forceCustomDesign={true} />
                </div>
             </Suspense>
           </div>
        </div>

        {/* RIGHT PANEL - BUILDER OPTIONS */}
        <div className="w-full md:w-[400px] h-full bg-white dark:bg-[#0B0F19] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-10">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
             <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tighter">Mahsus Dizayn</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">O'z didingizga moslang</p>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>

          {/* Options Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:hidden scrollbar-hide">
             
             {/* Primary Color */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                   Asosiy Rang
                </label>
                <div className="flex flex-wrap gap-3">
                   {colors.map(c => (
                     <button
                       key={c.value}
                       onClick={() => setDesign({...design, primaryColor: c.value})}
                       className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${design.primaryColor === c.value ? 'border-white ring-2 ring-indigo-500 scale-110 shadow-lg' : 'border-transparent'}`}
                       style={{ backgroundColor: c.value }}
                       title={c.name}
                     />
                   ))}
                   {/* Custom Color Input */}
                   <div className="relative w-10 h-10 rounded-full border border-dashed border-slate-400 overflow-hidden hover:scale-110 transition-transform">
                      <input 
                        type="color" 
                        value={design.primaryColor}
                        onChange={(e) => setDesign({...design, primaryColor: e.target.value})}
                        className="absolute inset-[-10px] w-20 h-20 cursor-pointer opacity-0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 rounded-full pointer-events-none"></div>
                   </div>
                </div>
             </div>

             {/* Background Color */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                   Orqa fon
                </label>
                <div className="grid grid-cols-2 gap-3">
                   {bgColors.map(c => (
                     <button
                       key={c.value}
                       onClick={() => setDesign({...design, backgroundColor: c.value})}
                       className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border-2 transition-all flex items-center gap-2
                         ${design.backgroundColor === c.value ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20'}
                       `}
                     >
                       <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: c.value }}></span>
                       {c.name}
                     </button>
                   ))}
                </div>
             </div>

             {/* Font Family */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                   Shrift Turi
                </label>
                <div className="flex flex-col gap-2">
                   {fonts.map(f => (
                     <button
                       key={f.value}
                       onClick={() => setDesign({...design, fontFamily: f.value})}
                       className={`px-4 py-3 rounded-xl text-left border-2 transition-all
                         ${design.fontFamily === f.value ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20'}
                       `}
                     >
                       <span className={`block font-${f.value} text-lg`}>Aa</span>
                       <span className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-70">{f.name}</span>
                     </button>
                   ))}
                </div>
             </div>

             {/* Border Radius */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
                   Chegaralar (Border)
                </label>
                <div className="flex bg-slate-100 dark:bg-black p-1 rounded-xl">
                   {borders.map(b => (
                     <button
                       key={b.value}
                       onClick={() => setDesign({...design, borderRadius: b.value})}
                       className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all
                         ${design.borderRadius === b.value ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                       `}
                     >
                       {b.name}
                     </button>
                   ))}
                </div>
             </div>
             
             {/* Effects */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-cyan-500 rounded-full"></span>
                   Orqa Fon Effekti
                </label>
                <div className="flex flex-col gap-2">
                   {effects.map(e => (
                     <button
                       key={e.value}
                       onClick={() => setDesign({...design, effectType: e.value})}
                       className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left border-2
                         ${design.effectType === e.value ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20'}
                       `}
                     >
                       {e.name}
                     </button>
                   ))}
                </div>
             </div>

             {/* Animations */}
             <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                   Animatsiya Uslubi
                </label>
                <div className="grid grid-cols-1 gap-2">
                   {animations.map(a => (
                     <button
                       key={a.value}
                       onClick={() => setDesign({...design, animationStyle: a.value})}
                       className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left border-2
                         ${design.animationStyle === a.value ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20'}
                       `}
                     >
                       {a.name}
                     </button>
                   ))}
                </div>
             </div>

          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0F19] flex gap-4">
             <button
               onClick={() => {
                 if (initialSettings) {
                   setDesign({...initialSettings});
                 }
                 onClose();
               }}
               className="flex-1 py-4 bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
             >
               Bekor Qilish
             </button>
             <button
               onClick={handleSave}
               disabled={isSaving}
               className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               {isSaving ? (
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               ) : (
                 <>
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   Saqlash
                 </>
               )}
             </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CustomDesignBuilder;
