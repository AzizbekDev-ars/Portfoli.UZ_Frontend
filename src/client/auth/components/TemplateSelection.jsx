import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../services/api';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';

// Lazy load templates for preview
const Zamonaviy = lazy(() => import('../../../portfolio/templates/Zamonaviy'));
const Oddiy = lazy(() => import('../../../portfolio/templates/Oddiy'));
const Maxsus = lazy(() => import('../../../portfolio/templates/Maxsus'));
const Creative = lazy(() => import('../../../portfolio/templates/Creative'));
const Animatsion = lazy(() => import('../../../portfolio/templates/Animatsion'));

const templates = [
  { id: 'oddiy', name: 'Oddiy', description: 'Minimalistik va toza dizayn', image: '/templates/oddiy.png', component: Oddiy },
  { id: 'zamonaviy', name: 'Zamonaviy', description: 'Texnologik va qorong\'u rejim', image: '/templates/zamonaviy.png', component: Zamonaviy },
  { id: 'maxsus', name: 'Maxsus', description: 'Premium va oqlangan uslub', image: '/templates/maxsus.png', component: Maxsus },
  { id: 'creative', name: 'Creative', description: 'Badiiy va yorqin ranglar', image: '/templates/creative.png', component: Creative },
  { id: 'animatsion', name: 'Animatsion', description: 'Dinamik va interaktiv', image: '/templates/animatsion.png', component: Animatsion }
];

const mockData = {
  firstName: "Azizbek",
  lastName: "Sotimboyev",
  aboutMe: "Full-stack dasturchi va UI/UX dizayner. Zamonaviy texnologiyalar yordamida yuqori sifatli veb-ilovalar yarataman. Portfolio.uz platformasi asoschisiman.",
  email: "azizbek@portfolio.uz",
  address: "Urganch, Xorazm",
  contacts: [
    { type: 'GitHub', link: '#' },
    { type: 'Telegram', link: '#' },
    { type: 'LinkedIn', link: '#' }
  ],
  experiences: [
    { role: 'Senior Full Stack Developer', company: 'Portfolio.uz', period: '2022 - Hozirgacha', description: 'Platforma arxitekturasini yaratish va jamoani boshqarish.' },
    { role: 'UI/UX Designer', company: 'Freelance', period: '2020 - 2022', description: 'Foydalanuvchilarga qulay va chiroyli interfeyslar dizayni.' }
  ],
  projects: [
    { title: 'E-Commerce Platform', description: 'Murakkab savdo tizimi va to\'lov tizimlari integratsiyasi.', tech: 'React, Node.js, MongoDB', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop' },
    { title: 'AI Chat App', description: 'Sun\'iy intellekt yordamida ishlaydigan aqlli chat ilovasi.', tech: 'OpenAI, Next.js, Socket.io', image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=2070&auto=format&fit=crop' }
  ],
  certificates: [
    { title: 'Advanced React Patterns', issuer: 'Frontend Masters', date: '2023' },
    { title: 'Cloud Architecture', issuer: 'AWS', date: '2022' }
  ],
  showAvatarOnPortfolio: true,
  avatar: ""
};

const TemplateSelection = ({ onComplete }) => {
  const { isDark, setIsDark } = useTheme();
  const { user, setUser } = useAuth();
  const [selected, setSelected] = useState('zamonaviy');
  const [loading, setLoading] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  // Lock scroll when modal is open
  React.useEffect(() => {
    if (showFullPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showFullPreview]);

  const handleSelect = async () => {
    setLoading(true);
    try {
      await api.put('/auth/user', { selectedTemplate: selected });
      // Update global user context with new template selection
      setUser({ ...user, selectedTemplate: selected });
      onComplete();
    } catch (err) {
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const SelectedComponent = templates.find(t => t.id === selected)?.component;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 overflow-hidden">
      
      {/* IMMERSIVE BACKGROUND PREVIEW */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 transition-all duration-1000 transform scale-110 blur-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
             <Suspense fallback={<div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />}>
                <div className="pointer-events-none select-none origin-top transform scale-[0.6] sm:scale-[0.4] md:scale-[0.3]">
                  {SelectedComponent && <SelectedComponent data={mockData} onSendMessage={() => {}} onDownloadCV={() => {}} />}
                </div>
             </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center">
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
            O'z uslubingizni <span className="text-indigo-600">tanlang</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-2xl mx-auto">
            Portfoliongiz qanday ko'rinishini belgilang. Har bir dizayn o'ziga xos va to'liq responsive.
          </p>
        </motion.div>

        {/* HORIZONTAL CARD SCROLL/GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 w-full">
          {templates.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelected(t.id)}
              className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 bg-white dark:bg-[#151B28] ${
                selected === t.id 
                  ? 'border-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.3)] scale-105' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              {/* Image Preview */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${t.name}&background=6366f1&color=fff&size=512`; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${selected === t.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`} />
                
                {/* Selection Badge */}
                {selected === t.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-black text-xl uppercase tracking-tighter mb-1">{t.name}</h3>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Preview Action */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(t.id);
                  setShowFullPreview(true);
                }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  To'liq ko'rish
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM ACTION */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelect}
            disabled={loading}
            className="group relative px-16 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(79,70,229,0.4)] hover:shadow-indigo-500/60 transition-all disabled:opacity-50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              {loading ? (
                <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Dashboardga kirish</span>
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          
          <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
            Hali ham qaror qabul qila olmayapsizmi? Muammo yo'q!
          </p>
        </div>
      </div>

      {/* FULL SCREEN MODAL PREVIEW */}
      <AnimatePresence>
        {showFullPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#0B0F19] flex flex-col"
          >
            {/* Modal Header */}
            <div className="h-20 border-b border-slate-200 dark:border-white/10 px-8 flex items-center justify-between bg-white dark:bg-[#0B0F19] sticky top-0 z-[110] shadow-sm">
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setShowFullPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-600 dark:text-slate-300 font-bold text-sm"
                 >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <span>Orqaga</span>
                 </button>
                 <div className="w-px h-8 bg-slate-200 dark:border-white/10 mx-2" />
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Dizayn: {templates.find(t => t.id === selected)?.name}</h4>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Jonli namuna ko'rinishi</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-600 dark:text-yellow-400"
                  title={isDark ? "Light mode" : "Dark mode"}
                 >
                    {isDark ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    )}
                 </button>
                 <button 
                  onClick={handleSelect}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                 >
                    Shuni tanlash va yakunlash
                 </button>
                 <button 
                  onClick={() => setShowFullPreview(false)}
                  className="p-3 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors text-slate-400 hover:text-red-500"
                 >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
            </div>

            {/* Modal Content - Live Iframe-like area */}
            <div className="flex-1 overflow-auto bg-slate-100 dark:bg-black/50 p-4 md:p-12 relative z-[100]">
               <div className="max-w-7xl mx-auto w-full bg-white dark:bg-[#030712] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden min-h-screen relative">
                  <Suspense fallback={<div className="h-screen flex items-center justify-center"><span className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>}>
                    {SelectedComponent && <SelectedComponent data={mockData} onSendMessage={() => {}} onDownloadCV={() => {}} />}
                  </Suspense>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-500/5 dark:bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default TemplateSelection;
