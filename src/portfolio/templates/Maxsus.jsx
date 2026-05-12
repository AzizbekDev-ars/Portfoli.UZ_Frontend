import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, 
  Mail, 
  MapPin, 
  Download, 
  ExternalLink, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  MessageSquare, 
  Award, 
  Briefcase 
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
  uz: { hero: "ARXITEKTURA & DIZAYN", hire: "BOG'LANISH", certs: "SERTIFIKATLAR", exp: "TAJRIBA", proj: "LOYIHALAR", cvBtn: "CV YUKLASH", contactTitle: "LOYIHAINGIZNI BIZ BILAN BOSHLANG", name: "ISM", email: "EMAIL", msg: "XABAR", send: "YUBORISH", success: "YUBORILDI", error: "XATOLIK", loc: "MANZIL" },
  ru: { hero: "АРХИТЕКТУРА И ДИЗАЙН", hire: "СВЯЗАТЬСЯ", certs: "СЕРТИФИКАТЫ", exp: "ОПЫТ", proj: "ПРОЕКТЫ", cvBtn: "СКАЧАТЬ CV", contactTitle: "НАЧНИТЕ СВОЙ ПРОЕКТ С НАМИ", name: "ИМЯ", email: "EMAIL", msg: "СООБЩЕНИЕ", send: "ОТПРАВИТЬ", success: "ОТПРАВЛЕНО", error: "ОШИБКА", loc: "АДРЕС" },
  en: { hero: "ARCHITECTURE & DESIGN", hire: "HIRE ME", certs: "CERTIFICATES", exp: "EXPERIENCE", proj: "PROJECTS", cvBtn: "DOWNLOAD CV", contactTitle: "START YOUR PROJECT WITH US", name: "NAME", email: "EMAIL", msg: "MESSAGE", send: "SUBMIT", success: "SUCCESS", error: "ERROR", loc: "LOCATION" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={18} />;
  if (t.includes('linkedin')) return <Linkedin size={18} />;
  if (t.includes('telegram')) return <Send size={18} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={18} />;
  return <Globe size={18} />;
};

const Maxsus = ({ data, onSendMessage, onDownloadCV }) => {
  const { lang, setLang } = useLang();
  const { isDark, setIsDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0A0A] text-[#E5E5E5]' : 'bg-[#FDFDFD] text-[#1A1A1A]'} font-serif transition-colors duration-700 selection:bg-[#D4AF37] selection:text-white`}>
      
      {/* LUXURY NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 border-b ${isDark ? 'bg-[#0A0A0A]/90 border-[#D4AF37]/10' : 'bg-[#FDFDFD]/90 border-[#D4AF37]/20'} backdrop-blur-md px-6 md:px-16 h-24 flex justify-between items-center`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
           <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center rotate-45 group hover:rotate-[225deg] transition-transform duration-700">
              <span className="rotate-[-45deg] group-hover:rotate-[-225deg] transition-transform duration-700 font-black text-[#D4AF37]">M</span>
           </div>
           <span className="text-xl font-black tracking-[0.3em] uppercase hidden sm:block">{data.firstName} <span className="text-[#D4AF37]">{data.lastName}</span></span>
        </motion.div>

        <div className="flex items-center gap-10">
           <div className="hidden lg:flex gap-12 text-[10px] font-black tracking-[0.4em] uppercase">
              <a href="#about" className="hover:text-[#D4AF37] transition-colors">{t.hero}</a>
              <a href="#projects" className="hover:text-[#D4AF37] transition-colors">{t.proj}</a>
              <a href="#contact" className="hover:text-[#D4AF37] transition-colors">{t.hire}</a>
           </div>

           <div className="flex items-center gap-6 border-l border-[#D4AF37]/20 pl-10">
              <button onClick={() => setIsDark(!isDark)} className="p-2 hover:scale-110 transition-transform">
                 {isDark ? <Sun className="text-[#D4AF37]" size={20} /> : <Moon className="text-[#1A1A1A]" size={20} />}
              </button>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-[10px] font-black outline-none cursor-pointer uppercase tracking-widest">
                 <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
              </select>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-[#D4AF37]">
                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
           </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-12 lg:hidden">
             <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black tracking-[0.5em] text-[#D4AF37]">{t.hero}</a>
             <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black tracking-[0.5em] text-[#D4AF37]">{t.proj}</a>
             <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black tracking-[0.5em] text-[#D4AF37]">{t.hire}</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        {/* HERO SECTION */}
        <section id="about" className="relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-[#D4AF37] to-transparent" />
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Architecture" />
           </div>

           <div className="relative z-10 max-w-5xl">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                 <div className="flex items-center gap-4 text-[#D4AF37] mb-8">
                    <div className="w-12 h-px bg-[#D4AF37]" />
                    <span className="text-[10px] font-black tracking-[0.6em] uppercase">{t.hero}</span>
                 </div>
                 <h1 className="text-5xl md:text-[6rem] font-black leading-[0.8] mb-12 tracking-tighter uppercase italic">
                    {data.firstName} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8B732A]">
                       {data.lastName}
                    </span>
                 </h1>
                 <p className="text-xl md:text-3xl font-medium opacity-60 leading-relaxed mb-16 italic max-w-3xl">
                    "{data.aboutMe}"
                 </p>
                 <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                    <button onClick={onDownloadCV} className="group relative px-14 py-6 bg-[#D4AF37] text-white overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                       <span className="relative z-10 text-[11px] font-black tracking-[0.3em] flex items-center gap-3">
                          <Download size={18} className="group-hover:translate-y-1 transition-transform" /> {t.cvBtn}
                       </span>
                       <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    <div className="flex gap-8">
                       {data.contacts.map((c, i) => (
                          <a key={i} href={c.link} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center border border-[#D4AF37]/20 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all hover:-translate-y-2">
                             {getIcon(c.type)}
                          </a>
                       ))}
                    </div>
                 </div>
              </motion.div>
           </div>

           <div className="absolute bottom-10 left-16 hidden lg:block">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="flex flex-col items-center gap-4 opacity-30">
                 <div className="w-px h-32 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                 <span className="text-[8px] font-black uppercase tracking-[0.5em] rotate-90">Scroll</span>
              </motion.div>
           </div>
        </section>

        {/* PROJECTS SECTION */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-40 px-6 md:px-16 border-t border-[#D4AF37]/10">
             <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
                <div className="space-y-6">
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic opacity-10 leading-none">Portfolio</h2>
                   <div className="flex items-center gap-4 text-[#D4AF37] absolute -mt-16 md:-mt-24">
                      <div className="w-12 h-px bg-[#D4AF37]" />
                      <span className="text-[12px] font-black tracking-[0.5em] uppercase">{t.proj}</span>
                   </div>
                </div>
                <div className="flex gap-4">
                   {['ALL', 'INTERIOR', 'EXTERIOR'].map(f => (
                      <button key={f} className="text-[10px] font-black tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity border-b border-transparent hover:border-[#D4AF37] pb-1">{f}</button>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {data.projects.map((proj, i) => (
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="group cursor-pointer">
                     <div className={`relative aspect-[4/5] overflow-hidden border border-[#D4AF37]/10 mb-8 p-3 group-hover:border-[#D4AF37]/40 transition-all duration-700 ${isDark ? 'bg-[#111]' : 'bg-white shadow-lg'}`}>
                        <img src={proj.image || "https://images.unsplash.com/photo-1600585154340-be6199f7e009?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={proj.title} />
                        <div className="absolute inset-x-3 bottom-3 bg-[#0A0A0A]/80 backdrop-blur-md p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                           <p className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase mb-2">{proj.tech}</p>
                           <h3 className="text-2xl font-black text-white italic uppercase">{proj.title}</h3>
                           <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] mt-6 group/link">
                              View Project <ExternalLink size={14} className="group-hover/link:translate-x-2 transition-transform" />
                           </a>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* RESUME SECTION */}
        <section className="py-40 px-6 md:px-16 flex flex-col lg:flex-row gap-32 border-t border-[#D4AF37]/10">
           <div className="lg:w-1/2 space-y-24">
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-[#D4AF37]">
                    <Briefcase size={20} />
                    <span className="text-[12px] font-black tracking-[0.5em] uppercase">{t.exp}</span>
                 </div>
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter">Experience</h2>
              </div>
              <div className="space-y-16">
                 {data.experiences.map((exp, i) => (
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={i} className="group relative pl-12 border-l border-[#D4AF37]/20">
                       <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#D4AF37] rotate-45" />
                       <div className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase mb-4">{exp.period}</div>
                       <h3 className="text-3xl font-black uppercase italic mb-2">{exp.role}</h3>
                       <div className="text-lg font-bold opacity-60 mb-8">{exp.company}</div>
                       <p className="text-lg opacity-50 max-w-xl leading-relaxed">{exp.description}</p>
                    </motion.div>
                 ))}
              </div>
           </div>

           <div className="lg:w-1/2 space-y-24">
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-[#D4AF37]">
                    <Award size={20} />
                    <span className="text-[12px] font-black tracking-[0.5em] uppercase">{t.certs}</span>
                 </div>
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter">Recognition</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {data.certificates.map((cert, i) => (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} key={i} className={`p-10 border border-[#D4AF37]/10 ${isDark ? 'bg-[#111]' : 'bg-white shadow-xl'} group hover:border-[#D4AF37] transition-all duration-500`}>
                       <div className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase mb-6">{cert.date}</div>
                       <h4 className="text-xl font-black uppercase italic mb-2 group-hover:text-[#D4AF37] transition-colors">{cert.title}</h4>
                       <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{cert.issuer}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-40 px-6 md:px-16 border-t border-[#D4AF37]/10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
              <div>
                 <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-16">
                    {t.contactTitle}
                 </h2>
                 <div className="space-y-16">
                    <div className="flex gap-10">
                       <div className="w-16 h-16 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] rotate-45">
                          <Mail className="-rotate-45" size={24} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] block mb-2">EMAIL</span>
                          <span className="text-2xl font-black break-all">{data.email}</span>
                       </div>
                    </div>
                    <div className="flex gap-10">
                       <div className="w-16 h-16 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] rotate-45">
                          <MapPin className="-rotate-45" size={24} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] block mb-2">{t.loc}</span>
                          <span className="text-2xl font-black">{data.address}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.name}</label>
                       <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-2 border-[#D4AF37]/10 py-4 outline-none focus:border-[#D4AF37] transition-all font-black text-xl uppercase italic" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.email}</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-2 border-[#D4AF37]/10 py-4 outline-none focus:border-[#D4AF37] transition-all font-black text-xl uppercase italic" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.msg}</label>
                    <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b-2 border-[#D4AF37]/10 py-4 outline-none focus:border-[#D4AF37] transition-all font-black text-xl uppercase italic resize-none"></textarea>
                 </div>
                 <button disabled={status === 'sending'} type="submit" className="w-full py-8 bg-[#D4AF37] text-white font-black text-[11px] uppercase tracking-[0.5em] hover:bg-[#8B732A] transition-all flex items-center justify-center gap-6 group">
                    {status === 'sending' ? '...' : status === 'success' ? t.success : status === 'error' ? t.error : t.send}
                    <MessageSquare className="group-hover:translate-x-3 transition-transform" />
                 </button>
              </form>
           </div>
        </section>
      </main>

      <footer className={`px-6 md:px-16 py-16 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-12 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FDFDFD]'}`}>
         <div className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase text-center md:text-left">
            © {new Date().getFullYear()} ARCHITECTURAL EXCELLENCE. <br/> ALL RIGHTS RESERVED.
         </div>
         <div className="flex gap-12">
            {data.contacts.map((c, i) => (
               <a key={i} href={c.link} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#D4AF37] transition-colors">{c.type}</a>
            ))}
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      ` }} />
    </div>
  );
};

export default Maxsus;
