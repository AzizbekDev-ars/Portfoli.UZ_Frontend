import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, 
  Mail, 
  Globe, 
  Download, 
  ArrowRight, 
  MapPin, 
  Briefcase, 
  Award, 
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles
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
  uz: { hire: "Bog'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Bog'lanish", name: "Ism", email: "Email", msg: "Xabar", send: "Yuborish", success: "Yuborildi!", error: "Xatolik!", loc: "Manzil", inq: "So'rovlar", status: "Holat", online: "Onlayn" },
  ru: { hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "Скачать CV", contactTitle: "Контакты", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить", success: "Отправлено!", error: "Ошибка!", loc: "Адрес", inq: "Запросы", status: "Статус", online: "В сети" },
  en: { hire: "Hire Me", certs: "Certificates", exp: "Experience", proj: "Selected Works", cvBtn: "Download CV", contactTitle: "Get In Touch", name: "Name", email: "Email", msg: "Message", send: "Submit", success: "Success!", error: "Error!", loc: "Location", inq: "Inquiries", status: "Status", online: "Online" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={18} />;
  if (t.includes('linkedin')) return <Linkedin size={18} />;
  if (t.includes('telegram')) return <Send size={18} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={18} />;
  return <Globe size={18} />;
};

const Animatsion = ({ data, onSendMessage, onDownloadCV }) => {
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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F8FAFC] text-[#1A1A1A]'} font-sans transition-colors duration-700 selection:bg-[#4F46E5] selection:text-white overflow-x-hidden`}>
      
      {/* IMMERSIVE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <motion.div 
            animate={{ 
               scale: [1, 1.2, 1], 
               x: [0, 50, 0], 
               y: [0, -30, 0] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] ${isDark ? 'bg-[#4F46E5]/20' : 'bg-[#4F46E5]/10'} blur-[150px] rounded-full`}
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.3, 1], 
               x: [0, -40, 0], 
               y: [0, 40, 0] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className={`absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] ${isDark ? 'bg-[#EC4899]/15' : 'bg-[#EC4899]/5'} blur-[150px] rounded-full`}
         />
      </div>

      {/* NAV BAR */}
      <nav className={`fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center ${isDark ? 'mix-blend-difference' : ''}`}>
         <Link to="/" className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-2 group cursor-pointer">
            <Cpu className="text-[#4F46E5] group-hover:rotate-12 transition-transform" />
            <span>{data.firstName}<span className="text-[#4F46E5]">.</span>lab</span>
         </Link>
         <div className="flex items-center gap-8 bg-white/10 dark:bg-black/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
            <select value={lang} onChange={(e) => setLang(e.target.value)} className={`bg-transparent border-none text-[10px] font-black outline-none cursor-pointer uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-black'}`}>
               <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
            </select>
            <div className="w-px h-4 bg-white/20" />
            <button onClick={() => setIsDark(!isDark)} className={`transition-all hover:scale-110 ${isDark ? 'text-yellow-400' : 'text-[#4F46E5]'}`}>
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
         </div>
      </nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
           <motion.div 
              style={{ scale, opacity }}
              className="text-center"
           >
              <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-3 px-6 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-[#4F46E5] mb-12"
              >
                 <Sparkles size={12} /> Digital Experiences
              </motion.div>
              <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.75] mb-12 uppercase italic">
                 {data.firstName} <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#EC4899] drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                    {data.lastName}
                 </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium opacity-60 max-w-2xl mx-auto leading-relaxed mb-16 italic">
                 "{data.aboutMe}"
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                 <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(79,70,229,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onDownloadCV}
                    className="group px-12 py-5 bg-[#4F46E5] text-white rounded-full font-black uppercase tracking-widest flex items-center gap-3 transition-all"
                 >
                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    {t.cvBtn}
                 </motion.button>
                 <div className="flex gap-4">
                    {data.contacts.map((c, i) => (
                       <a key={i} href={c.link} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 dark:bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-all hover:-translate-y-2">
                          {getIcon(c.type)}
                       </a>
                    ))}
                 </div>
              </div>
           </motion.div>

           <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
              <div className="flex flex-col items-center gap-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 mb-8">Scroll</span>
                 <div className="w-px h-24 bg-gradient-to-b from-[#4F46E5] to-transparent" />
              </div>
           </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-40 px-6 md:px-20 relative">
             <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                   <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">{t.proj}</h2>
                      <div className="flex items-center gap-4 text-[#4F46E5]">
                         <Layers size={24} />
                         <span className="text-[10px] font-black uppercase tracking-[0.5em]">Curated Portfolio // {data.projects.length}</span>
                      </div>
                   </div>
                   <div className="w-32 h-[4px] bg-gradient-to-r from-[#4F46E5] to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                   {data.projects.map((proj, i) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        key={i} className="group relative"
                     >
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[3.5rem] bg-[#111] mb-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-4">
                           <img src={proj.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={proj.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                           
                           <div className="absolute top-10 right-10">
                              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#4F46E5]">
                                 <ExternalLink className="text-white" />
                              </div>
                           </div>

                           <div className="absolute bottom-12 left-12 right-12">
                              <div className="flex items-center gap-3 mb-4">
                                 <div className="w-2 h-2 bg-[#4F46E5] rounded-full shadow-[0_0_10px_#4F46E5]" />
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">{proj.tech}</span>
                              </div>
                              <h3 className="text-5xl font-black uppercase italic text-white tracking-tighter">{proj.title}</h3>
                           </div>
                        </div>
                        <div className="px-12 flex justify-between items-center group-hover:px-14 transition-all duration-500">
                           <span className="text-sm font-bold opacity-40">{proj.description}</span>
                           <ArrowRight className="text-[#4F46E5] opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        )}

        {/* RESUME SECTION */}
        <section className="py-40 px-6 md:px-20 border-t border-white/10">
           <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
              
              {/* Experience */}
              {data.experiences?.length > 0 && (
                 <div>
                    <div className="flex items-center gap-8 mb-24">
                       <h2 className="text-3xl font-black uppercase tracking-tighter italic">{t.exp}</h2>
                       <Briefcase className="text-[#4F46E5]" size={32} />
                    </div>
                    <div className="space-y-24">
                       {data.experiences.map((exp, i) => (
                         <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={i} className="relative pl-16 group">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-[#4F46E5]/50 transition-colors" />
                            <div className="absolute left-[-6px] top-0 w-3 h-3 bg-[#4F46E5] rounded-full shadow-[0_0_15px_#4F46E5] group-hover:scale-150 transition-transform" />
                            
                            <div className="inline-block px-4 py-1 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[10px] font-black uppercase tracking-widest text-[#4F46E5] mb-8">
                               {exp.period}
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500 italic">{exp.role}</h3>
                            <h4 className="text-xl font-bold opacity-60 mb-8 border-l-4 border-[#4F46E5] pl-6">{exp.company}</h4>
                            <p className="text-xl font-medium opacity-50 leading-relaxed max-w-xl">{exp.description}</p>
                         </motion.div>
                       ))}
                    </div>
                 </div>
              )}

              {/* Certificates & Stats */}
              <div className="space-y-40">
                 {data.certificates?.length > 0 && (
                    <div>
                       <div className="flex items-center gap-8 mb-24">
                          <h2 className="text-3xl font-black uppercase tracking-tighter italic">{t.certs}</h2>
                          <Award className="text-[#EC4899]" size={32} />
                       </div>
                       <div className="grid grid-cols-1 gap-6">
                          {data.certificates.map((cert, i) => (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                              key={i} className={`p-10 ${isDark ? 'bg-white/[0.03]' : 'bg-white shadow-xl'} border border-white/10 rounded-[3rem] hover:border-[#EC4899]/50 transition-all group relative overflow-hidden`}
                            >
                               <div className="absolute top-0 right-0 w-32 h-32 bg-[#EC4899]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                               <h4 className="text-2xl font-black mb-2 uppercase italic">{cert.title}</h4>
                               <p className="text-sm font-black uppercase tracking-widest opacity-40 mb-8">{cert.issuer}</p>
                               <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[#EC4899]">{cert.date}</span>
                                  <ChevronRight className="text-[#EC4899] group-hover:translate-x-2 transition-transform" />
                               </div>
                            </motion.div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Tech Status Card */}
                 <div className={`p-12 ${isDark ? 'bg-[#4F46E5]/5' : 'bg-[#4F46E5]/10'} border border-[#4F46E5]/20 rounded-[4rem] relative overflow-hidden group`}>
                    <div className="flex justify-between items-center mb-12">
                       <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-[#4F46E5] rounded-full animate-ping" />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em]">{t.status}</span>
                       </div>
                       <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">{t.online}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       {data.contacts.map((c, i) => (
                          <div key={i} className="space-y-2">
                             <span className="text-[8px] font-black opacity-40 uppercase tracking-widest">{c.type}</span>
                             <div className="flex items-center gap-2 text-sm font-bold">
                                {getIcon(c.type)} <span className="text-[#4F46E5]">●</span> Active
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-40 px-6 md:px-20 border-t border-white/10">
           <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-16">
                       Let's <br/>
                       <span className="text-[#4F46E5]">Connect</span>
                    </h2>
                    <div className="space-y-12">
                       <div className="flex items-center gap-10 group cursor-default">
                          <div className="w-24 h-24 rounded-[3rem] bg-[#4F46E5] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform duration-500">
                             <Mail size={40} />
                          </div>
                          <div>
                             <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] block mb-2">{t.inq}</span>
                             <span className="text-3xl font-black break-all">{data.email}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-10 group cursor-default">
                          <div className="w-24 h-24 rounded-[3rem] bg-[#EC4899] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(236,72,153,0.3)] group-hover:-rotate-12 transition-transform duration-500">
                             <MapPin size={40} />
                          </div>
                          <div>
                             <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] block mb-2">{t.loc}</span>
                             <span className="text-3xl font-black">{data.address}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className={`p-16 ${isDark ? 'bg-white/[0.03]' : 'bg-white shadow-2xl'} backdrop-blur-3xl border border-white/10 rounded-[5rem] space-y-12`}>
                    <div className="space-y-10">
                       <div className="relative">
                          <input required type="text" placeholder={t.name} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                 className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none font-bold text-2xl focus:border-[#4F46E5] transition-all placeholder:opacity-30" />
                       </div>
                       <div className="relative">
                          <input required type="email" placeholder={t.email} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                 className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none font-bold text-2xl focus:border-[#4F46E5] transition-all placeholder:opacity-30" />
                       </div>
                       <div className="relative">
                          <textarea required rows="4" placeholder={t.msg} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                 className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none font-bold text-2xl focus:border-[#4F46E5] transition-all resize-none placeholder:opacity-30"></textarea>
                       </div>
                    </div>
                    <button disabled={status === 'sending'} type="submit" 
                            className="w-full py-8 bg-[#4F46E5] text-white font-black uppercase tracking-[0.3em] rounded-[2.5rem] shadow-2xl hover:bg-[#4338CA] transition-all flex items-center justify-center gap-4 group">
                       {status === 'sending' ? '...' : status === 'success' ? t.success : status === 'error' ? t.error : t.send}
                       <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                    </button>
                 </form>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-24 px-8 border-t border-white/10">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="text-3xl font-black italic uppercase tracking-tighter">
                  {data.firstName}<span className="text-[#4F46E5]">.</span>
               </div>
               <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em]">© {new Date().getFullYear()} Next-Gen Design.</p>
            </div>
            
            <div className="flex gap-12">
               {data.contacts.map((c, i) => (
                  <a key={i} href={c.link} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-[#4F46E5] transition-all">{c.type}</a>
               ))}
            </div>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      ` }} />
    </div>
  );
};

export default Animatsion;
