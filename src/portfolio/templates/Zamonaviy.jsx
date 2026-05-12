import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, 
  Mail, 
  Globe, 
  Download, 
  Terminal, 
  Cpu, 
  Zap, 
  Shield, 
  Activity, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Box,
  Code,
  Clock
} from 'lucide-react';

// Custom Brand Icons
const Github = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-60.86 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Bog'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Bog'lanish", name: "Ismingiz", email: "Email manzilingiz", msg: "Xabaringiz", send: "Yuborish", success: "Yuborildi!", error: "Xatolik!", status: "Tizim holati", online: "Onlayn", loc: "Manzil" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "Скачать CV", contactTitle: "Контакты", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить", success: "Отправлено!", error: "Ошибка!", status: "Статус системы", online: "В сети", loc: "Локация" },
  en: { hero: "About Me", hire: "Hire Me", certs: "Certificates", exp: "Experience", proj: "Projects", cvBtn: "Download CV", contactTitle: "Contact Me", name: "Name", email: "Email", msg: "Message", send: "Send", success: "Success!", error: "Error!", status: "System Status", online: "Online", loc: "Location" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={18} />;
  if (t.includes('linkedin')) return <Linkedin size={18} />;
  if (t.includes('telegram')) return <Send size={18} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={18} />;
  return <Globe size={18} />;
};

const Zamonaviy = ({ data, onSendMessage, onDownloadCV }) => {
  const { lang, setLang } = useLang();
  const { isDark, setIsDark } = useTheme();
  const t = portfolioLang[lang] || portfolioLang['uz'];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await onSendMessage(formData);
    if (res.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#030712] text-cyan-50' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-cyan-500/30 transition-colors duration-500 overflow-x-hidden relative`}>
      
      {/* FUTURISTIC GRID */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`} 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? '#00f2ff' : '#0f172a'} 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-gradient-to-b from-transparent via-transparent to-cyan-500/5' : ''}`} />
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 ${isDark ? 'bg-[#030712]/80 border-cyan-500/20' : 'bg-white/80 border-slate-200'} backdrop-blur-xl border-b`}>
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="w-11 h-11 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:rotate-12 transition-transform">
                <Box className="text-black" size={24} />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter uppercase italic leading-none">{data.firstName}</span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mt-1">Core Architecture</span>
             </div>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
            <a href="#about" className="hover:text-cyan-500 transition-all flex items-center gap-2 group">
               <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#06b6d4]" /> {t.hero}
            </a>
            {data.projects?.length > 0 && (
              <a href="#projects" className="hover:text-cyan-500 transition-all flex items-center gap-2 group">
                 <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#06b6d4]" /> {t.proj}
              </a>
            )}
            <a href="#contact" className="hover:text-cyan-500 transition-all flex items-center gap-2 group">
               <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#06b6d4]" /> {t.contactTitle}
            </a>
          </div>

          <div className="flex items-center gap-6">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-xl border ${isDark ? 'border-cyan-500/20 hover:bg-cyan-500/10' : 'border-slate-200 hover:bg-slate-100'} transition-all`}>
                {isDark ? <Sun className="text-yellow-400" size={18} /> : <Moon className="text-slate-700" size={18} />}
             </button>
             <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-[10px] font-black outline-none cursor-pointer uppercase">
                <option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option>
             </select>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section id="about" className="container mx-auto px-6 py-32 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
               <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                 <div className="flex items-center gap-4 mb-10">
                    <div className="h-px w-16 bg-cyan-500"></div>
                    <div className="flex items-center gap-2 text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em]">
                       <Shield size={14} /> <span>Security & Performance Protocol</span>
                    </div>
                 </div>
                 <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-black mb-10 leading-[0.85] tracking-tighter uppercase italic">
                    {data.firstName} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                      {data.lastName}
                    </span>
                 </h1>
                 <p className="text-xl md:text-2xl font-medium opacity-60 max-w-2xl mb-14 leading-relaxed">
                    "{data.aboutMe}"
                 </p>
                 
                 <div className="flex flex-wrap gap-8 items-center">
                    <button onClick={() => document.getElementById('projects').scrollIntoView({behavior: 'smooth'})} 
                            className="group relative px-12 py-6 bg-cyan-500 text-black text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden skew-x-[-15deg] shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50 transition-all">
                       <span className="skew-x-[15deg] flex items-center gap-3">
                          <Terminal size={16} /> {t.proj}
                       </span>
                    </button>
                    <button onClick={onDownloadCV} className="group flex items-center gap-3 text-cyan-500 text-[11px] font-black uppercase tracking-[0.3em] hover:text-white transition-all">
                       <Download size={16} className="group-hover:translate-y-1 transition-transform" /> {t.cvBtn}
                    </button>
                    <div className="flex gap-4 ml-auto lg:ml-0">
                       {data.contacts.map((c, i) => (
                          <a key={i} href={c.link} target="_blank" rel="noreferrer" className={`w-12 h-12 flex items-center justify-center rounded-xl border ${isDark ? 'border-cyan-500/20 hover:bg-cyan-500/10' : 'border-slate-200 hover:bg-white'} hover:text-cyan-500 transition-all hover:-translate-y-1 shadow-lg`}>
                             {getIcon(c.type)}
                          </a>
                       ))}
                    </div>
                 </div>
               </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative">
                  <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute -inset-8 border border-cyan-500/5 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
                  
                  <div className={`relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full p-4 ${isDark ? 'bg-[#030712]' : 'bg-white shadow-2xl'} border-4 ${isDark ? 'border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.15)]' : 'border-slate-100'} overflow-hidden group`}>
                     {data.showAvatarOnPortfolio && (
                        <img src={data.avatar || `https://ui-avatars.com/api/?name=${data.firstName}&background=030712&color=00f2ff&size=512`} 
                             className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Avatar" />
                     )}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                  </div>

                  <div className="absolute -top-6 -right-6 bg-cyan-500 text-black px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.4em] skew-x-[-15deg] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    {t.online}
                  </div>
                  <div className={`absolute -bottom-6 -left-6 ${isDark ? 'bg-slate-800' : 'bg-white shadow-xl'} border border-cyan-500/30 p-6 rounded-2xl flex items-center gap-4 skew-x-[15deg]`}>
                     <div className="skew-x-[-15deg] flex items-center gap-4">
                        <Activity className="text-cyan-500 animate-pulse" />
                        <div className="flex flex-col">
                           <span className="text-[8px] font-black uppercase opacity-40">System Core</span>
                           <span className="text-[10px] font-black uppercase">Stable // 100%</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        {data.projects?.length > 0 && (
          <section id="projects" className="container mx-auto px-6 py-40 border-t border-cyan-500/10">
             <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-cyan-500 rounded-sm rotate-45" />
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{t.proj}</h2>
                   </div>
                   <p className="text-cyan-500/60 text-[10px] font-black uppercase tracking-[0.5em] ml-8">High Performance Implementations</p>
                </div>
                <div className="flex gap-4">
                   {['LATEST', 'ARCHIVED', 'EXPERIMENTAL'].map(label => (
                      <span key={label} className="px-4 py-1 border border-cyan-500/10 text-[8px] font-black opacity-30 rounded-full">{label}</span>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {data.projects.map((proj, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group">
                     <div className={`relative aspect-video rounded-tr-[4rem] overflow-hidden ${isDark ? 'bg-black border-cyan-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]' : 'bg-white border-slate-200 shadow-xl'} border mb-8 group-hover:border-cyan-500/60 transition-all duration-500`}>
                        <img src={proj.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"} 
                             className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt={proj.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute top-6 left-6 flex gap-2">
                           {proj.tech?.split(',').slice(0, 2).map(tag => (
                              <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-cyan-500/20 text-[8px] font-black text-cyan-400 uppercase rounded-full">
                                 {tag.trim()}
                              </span>
                           ))}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <a href={proj.link} target="_blank" rel="noreferrer" className="w-full py-4 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 skew-x-[-10deg]">
                              <span className="skew-x-[10deg] flex items-center gap-2">Initialize Deployment <ExternalLink size={14} /></span>
                           </a>
                        </div>
                     </div>
                     <div className="flex justify-between items-start px-4">
                        <div className="space-y-1">
                           <h4 className="text-2xl font-black uppercase italic group-hover:text-cyan-500 transition-colors leading-none">{proj.title}</h4>
                           <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{proj.tech}</p>
                        </div>
                        <span className="text-[10px] font-black text-cyan-500/40">v1.0.{i}</span>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* RESUME & CERTIFICATES */}
        <section className={`py-40 px-6 ${isDark ? 'bg-cyan-500/[0.03]' : 'bg-white border-y border-slate-100'} skew-y-[-2deg]`}>
           <div className="container mx-auto skew-y-[2deg] grid grid-cols-1 lg:grid-cols-2 gap-32">
              
              {/* Experience */}
              <div>
                 <div className="mb-20 flex items-center gap-8">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{t.exp}</h2>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                 </div>
                 <div className="space-y-16">
                    {data.experiences.map((exp, i) => (
                      <div key={i} className="relative group pl-16 border-l-2 border-cyan-500/10 hover:border-cyan-500/40 transition-colors">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform" />
                         <div className="flex items-center gap-3 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <Clock size={12} /> {exp.period}
                         </div>
                         <h4 className="text-3xl font-black uppercase italic mb-2 group-hover:translate-x-2 transition-transform duration-500">{exp.role}</h4>
                         <div className="text-sm font-bold text-slate-500 mb-8 border-l-4 border-cyan-500/20 pl-4">{exp.company}</div>
                         <p className="text-lg opacity-60 leading-relaxed max-w-xl font-medium">{exp.description}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Certificates */}
              <div>
                 <div className="mb-20 flex items-center gap-8">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{t.certs}</h2>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {data.certificates.map((cert, i) => (
                      <div key={i} className={`p-10 border ${isDark ? 'bg-[#030712] border-cyan-500/10' : 'bg-slate-50 border-slate-200'} rounded-[2.5rem] hover:border-cyan-500/60 transition-all group relative overflow-hidden shadow-xl`}>
                         <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                         <Code className="text-cyan-500/30 mb-8 group-hover:text-cyan-500 transition-colors" size={32} />
                         <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-3 text-cyan-500">{cert.issuer}</h4>
                         <p className="font-black text-xl leading-tight group-hover:text-cyan-400 transition-colors italic">{cert.title}</p>
                         <div className="mt-8 flex items-center justify-between opacity-40 text-[10px] font-bold">
                            <span>{cert.date}</span>
                            <ChevronRight size={14} />
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Tech HUD */}
                 <div className={`mt-16 p-10 border ${isDark ? 'bg-black border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.05)]' : 'bg-white border-slate-200 shadow-2xl'} rounded-[3rem] relative overflow-hidden`}>
                    <div className="flex justify-between items-center mb-12">
                       <div className="flex items-center gap-3">
                          <Activity className="text-cyan-500 w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-[0.5em]">{t.status}</span>
                       </div>
                       <div className="px-4 py-1.5 bg-cyan-500/10 rounded-full flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                          <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{t.online}</span>
                       </div>
                    </div>
                    <div className="space-y-6">
                       {data.contacts.map((c, i) => (
                         <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-cyan-500/5 pb-4">
                            <div className="flex items-center gap-3">
                               {getIcon(c.type)}
                               <span className="opacity-40">{c.type}</span>
                            </div>
                            <span className="text-cyan-500">Live Connection</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="container mx-auto px-6 py-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                 <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-px bg-cyan-500"></div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.75]">{t.contactTitle}</h2>
                 </div>
                 <p className="text-2xl opacity-60 max-w-md mb-20 italic">Ready to integrate advanced systems and build innovative solutions.</p>
                 
                 <div className="space-y-12">
                    <div className="group flex items-center gap-8">
                       <div className="w-20 h-20 rounded-2xl bg-cyan-500 flex items-center justify-center text-black shadow-[0_20px_40px_rgba(6,182,212,0.3)] group-hover:rotate-12 transition-transform">
                          <Mail size={32} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] block mb-2">Protocol: Email</span>
                          <p className="text-3xl font-black uppercase italic break-all">{data.email}</p>
                       </div>
                    </div>
                    <div className="group flex items-center gap-8">
                       <div className={`w-20 h-20 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100 shadow-xl'} flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:-rotate-12 transition-transform`}>
                          <MapPin size={32} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] block mb-2">Protocol: {t.loc}</span>
                          <p className="text-3xl font-black uppercase italic mt-2">{data.address}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className={`p-16 border ${isDark ? 'bg-black/60 border-cyan-500/20 shadow-2xl' : 'bg-white border-slate-200 shadow-3xl'} rounded-tr-[5rem] rounded-bl-[5rem]`}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 ml-2">{t.name}</label>
                       <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                              className={`w-full bg-transparent border-b ${isDark ? 'border-cyan-500/30' : 'border-slate-200'} py-4 outline-none focus:border-cyan-500 transition-all font-black uppercase text-sm`} />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 ml-2">{t.email}</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                              className={`w-full bg-transparent border-b ${isDark ? 'border-cyan-500/30' : 'border-slate-200'} py-4 outline-none focus:border-cyan-500 transition-all font-black uppercase text-sm`} />
                    </div>
                 </div>
                 <div className="space-y-3 mb-16">
                    <label className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 ml-2">{t.msg}</label>
                    <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                              className={`w-full bg-transparent border-b ${isDark ? 'border-cyan-500/30' : 'border-slate-200'} py-4 outline-none focus:border-cyan-500 transition-all font-black uppercase text-sm resize-none`}></textarea>
                 </div>
                 
                 <button disabled={status === 'sending'} type="submit" 
                         className="group relative w-full py-7 bg-cyan-500 text-black text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-6 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-4">
                       {status === 'sending' ? 'Sending...' : status === 'success' ? t.success : status === 'error' ? t.error : t.send}
                       <ChevronRight className="group-hover:translate-x-3 transition-transform" size={20} strokeWidth={3} />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 </button>
              </form>
           </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-24 border-t border-cyan-500/10 text-center relative z-10">
         <div className="flex flex-col items-center gap-10">
            <div className="text-4xl font-black italic uppercase tracking-tighter">
               {data.firstName}<span className="text-cyan-500">.</span>dev
            </div>
            <div className="flex gap-12">
               {data.contacts.map((c, i) => (
                 <a key={i} href={c.link} className="text-cyan-500/40 hover:text-cyan-500 transition-all">
                    {getIcon(c.type)}
                 </a>
               ))}
            </div>
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">© {new Date().getFullYear()} Cyber Architecture Protocol</p>
               <div className="flex justify-center gap-4">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-cyan-500/20 rounded-full" />
                  <div className="w-2 h-2 bg-cyan-500/20 rounded-full" />
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default Zamonaviy;
