import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Sun, 
  Moon,
  ExternalLink
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
  uz: { hero: "Men haqimda", hire: "Bog'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "LOYIHALAR", cvBtn: "CV ni Yuklash", contactTitle: "Keling, birga ishlaymiz.", name: "Ism", email: "Email", msg: "Xabar", send: "Yuborish", success: "Yuborildi!", error: "Xatolik!", view_projects: "LOYIHALARNI KO'RISH", view_all: "BARCHA LOYIHALAR", featured: "SARALANGAN ISHLAR" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "ПРОЕКТЫ", cvBtn: "Скачать CV", contactTitle: "Давайте работать вместе.", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить", success: "Отправлено!", error: "Ошибка!", view_projects: "ПОСMOTРЕТЬ ПРОЕКТЫ", view_all: "ВСЕ ПРОЕКТЫ", featured: "ИЗБРАННЫЕ РАБОТЫ" },
  en: { hero: "About Me", hire: "Contact", certs: "Certificates", exp: "Experience", proj: "PROJECTS", cvBtn: "Download CV", contactTitle: "Let's work together.", name: "Name", email: "Email", msg: "Message", send: "Submit", success: "Success!", error: "Error", view_projects: "VIEW PROJECTS", view_all: "VIEW ALL PROJECTS", featured: "FEATURED WORK" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={18} />;
  if (t.includes('linkedin')) return <Linkedin size={18} />;
  if (t.includes('telegram')) return <Send size={18} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={18} />;
  return <Globe size={18} />;
};

const Oddiy = ({ data, onSendMessage, onDownloadCV }) => {
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
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-black/10 dark:selection:bg-white/20 ${isDark ? 'bg-[#0F1115] text-white' : 'bg-white text-slate-900'}`}>
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-500 ${isDark ? 'bg-[#0F1115]/80 border-white/5' : 'bg-white/80 border-slate-100'} backdrop-blur-md px-6 md:px-20 h-20 flex justify-between items-center`}>
        <Link to="/" className="text-sm font-black uppercase tracking-tighter flex items-center gap-2 group">
          <div className="w-2 h-2 bg-black dark:bg-white rounded-full group-hover:scale-150 transition-transform" />
          {data.firstName} {data.lastName}
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">{t.proj}</a>
             <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">{t.hero}</a>
             <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">{t.hire}</a>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={() => setIsDark(!isDark)} className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-[10px] font-black outline-none cursor-pointer uppercase text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                <option className="text-black" value="uz">UZ</option>
                <option className="text-black" value="ru">RU</option>
                <option className="text-black" value="en">EN</option>
             </select>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-40">
        
        {/* HERO */}
        <section id="about" className="py-20 md:py-32 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest mb-8">
                <Globe size={12} /> Available for projects
             </div>
             <h1 className="text-3xl md:text-5xl font-serif font-black uppercase leading-[1.1] tracking-tighter mb-8 max-w-4xl">
               Crafting Meaningful <br className="hidden md:block" /> Digital Experiences
             </h1>
             <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto mb-12 leading-relaxed">
               {data.aboutMe}
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#1A1A1A] dark:bg-white text-white dark:text-black px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  {t.view_projects}
                </button>
                <button onClick={onDownloadCV} className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-all">
                   <Download size={16} className="group-hover:translate-y-1 transition-transform" /> {t.cvBtn}
                </button>
             </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-20 border-t border-slate-100 dark:border-white/5">
             <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">{t.featured}</h2>
                <div className="hidden sm:block w-32 h-px bg-slate-200 dark:bg-white/10" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-20">
                {data.projects.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }}
                    className="group"
                  >
                    <div className="aspect-[1.5] bg-[#F4F4F4] dark:bg-white/5 rounded-3xl overflow-hidden mb-8 transition-all duration-700 group-hover:shadow-2xl relative">
                        <img 
                          src={proj.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          alt={proj.title} 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                           {proj.link && (
                             <a href={proj.link} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform" title="Demo">
                                <ExternalLink size={20} />
                             </a>
                           )}
                           {proj.codeLink && (
                             <a href={proj.codeLink} className="w-14 h-14 bg-[#0F1115] border border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform" title="Code">
                                <Github size={20} />
                             </a>
                           )}
                        </div>
                    </div>
                    <div className="px-2">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{proj.tech || "Creative"}</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Study</span>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors">
                           {proj.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                           {proj.description}
                        </p>
                        <div className="flex gap-6 mt-6">
                           {proj.link && (
                             <a href={proj.link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all text-slate-900 dark:text-white">
                                Explore Project <ArrowRight size={14} />
                             </a>
                           )}
                           {!proj.link && proj.codeLink && (
                             <a href={proj.codeLink} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all text-slate-900 dark:text-white">
                                View Source <ArrowRight size={14} />
                             </a>
                           )}
                        </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* EXPERIENCE & CERTIFICATES */}
        {(data.experiences?.length > 0 || data.certificates?.length > 0) && (
           <section className="py-24 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-20">
              {data.experiences?.length > 0 && (
                 <div>
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                       <span className="w-8 h-px bg-slate-200 dark:bg-white/10" /> {t.exp}
                    </h2>
                    <div className="space-y-16">
                       {data.experiences.map((exp, i) => (
                          <div key={i} className="group relative pl-8 border-l border-slate-100 dark:border-white/5">
                             <div className="absolute left-[-4.5px] top-0 w-2 h-2 bg-black dark:bg-white rounded-full group-hover:scale-150 transition-transform" />
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{exp.period}</div>
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{exp.role}</h3>
                             <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-6">{exp.company}</div>
                             <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-md font-medium">{exp.description}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
              {data.certificates?.length > 0 && (
                 <div>
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                       <span className="w-8 h-px bg-slate-200 dark:bg-white/10" /> {t.certs}
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                       {data.certificates.map((cert, i) => (
                          <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-black dark:hover:border-white transition-all group">
                             <h4 className="font-black text-xl text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors italic leading-tight">{cert.title}</h4>
                             <div className="flex justify-between items-center mt-8">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cert.issuer}</span>
                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{cert.date}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
           </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="py-32 border-t border-slate-100 dark:border-white/5">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
              <div className="space-y-6">
                 <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tighter leading-none text-slate-900 dark:text-white">
                   {t.contactTitle}
                 </h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg font-medium italic leading-relaxed">
                    Open for new opportunities and interesting collaborations. Feel free to reach out for a quick chat!
                 </p>
              </div>
              <div className="flex flex-col items-end gap-6 text-right w-full md:w-auto">
                 <a href={`mailto:${data.email}`} className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-colors border-b-4 border-black dark:border-white pb-2 break-all">{data.email}</a>
                 <div className="flex gap-4">
                    {data.contacts.map((c, i) => (
                       <a key={i} href={c.link} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm">
                          {getIcon(c.type)}
                       </a>
                    ))}
                 </div>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
              <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">{t.name}</label>
                 <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 outline-none text-xl focus:border-black dark:focus:border-white transition-all font-bold placeholder:opacity-20" />
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">{t.email}</label>
                 <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 outline-none text-xl focus:border-black dark:focus:border-white transition-all font-bold placeholder:opacity-20" />
              </div>
              <div className="md:col-span-2 space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">{t.msg}</label>
                 <textarea required rows="1" placeholder="Your message here..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 outline-none text-xl focus:border-black dark:focus:border-white transition-all font-bold resize-none placeholder:opacity-20"></textarea>
              </div>
              <div>
                <button 
                  disabled={status === 'sending'}
                  type="submit" 
                  className={`px-16 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center gap-4 group ${
                    status === 'success' ? 'bg-emerald-500 text-white' : 
                    status === 'error' ? 'bg-red-500 text-white' : 
                    'bg-[#1A1A1A] dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95'
                  }`}
                >
                  {status === 'sending' ? 'Sending...' : status === 'success' ? t.success : status === 'error' ? t.error : <>{t.send} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>}
                </button>
              </div>
           </form>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`border-t py-16 transition-colors duration-500 ${isDark ? 'bg-[#0F1115] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
         <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
                  {data.firstName} {data.lastName}
               </div>
               <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                 © {new Date().getFullYear()} Minimalist Excellence.
               </div>
            </div>
            <div className="flex gap-12">
               {data.contacts.map((c, i) => (
                  <a key={i} href={c.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                     {getIcon(c.type)}
                  </a>
               ))}
            </div>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      ` }} />
    </div>
  );
};

export default Oddiy;
