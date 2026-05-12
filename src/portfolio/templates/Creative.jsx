import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, 
  Mail, 
  Globe, 
  Download, 
  Sparkles, 
  Zap, 
  Palette, 
  Cpu, 
  Rocket,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
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
  uz: { hire: "Menga yozing!", certs: "Yutuqlar", exp: "Tajriba yo'li", proj: "Ijodiy ishlar", cvBtn: "CV ni olish", contactTitle: "Keling, ajoyib narsa yaratamiz!", name: "Ismingiz", email: "Emailingiz", msg: "Xabaringiz", send: "Yuborish!", success: "Uraa, yuborildi!", error: "Voy, xatolik!" },
  ru: { hire: "Напишите мне!", certs: "Достижения", exp: "Путь опыта", proj: "Творчество", cvBtn: "Скачать CV", contactTitle: "Давайте создадим шедевр!", name: "Ваше имя", email: "Ваш Email", msg: "Сообщение", send: "Отправить!", success: "Ура, отправлено!", error: "Ой, ошибка!" },
  en: { hire: "Say Hello!", certs: "Awards", exp: "Career Path", proj: "Selected Works", cvBtn: "Get My CV", contactTitle: "Let's build something epic!", name: "Your Name", email: "Your Email", msg: "Your Message", send: "Send Now!", success: "Yay, Sent!", error: "Oops, Error!" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={18} />;
  if (t.includes('linkedin')) return <Linkedin size={18} />;
  if (t.includes('telegram')) return <Send size={18} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={18} />;
  return <Globe size={18} />;
};

const Creative = ({ data, onSendMessage, onDownloadCV }) => {
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
    <div className={`min-h-screen ${isDark ? 'bg-[#0F172A] text-white' : 'bg-[#FFF8E7] text-[#1A1A1A]'} font-sans transition-colors duration-500 overflow-x-hidden selection:bg-[#FFD700] selection:text-black relative`}>
      
      {/* FLOATING DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#FF4500]/10 rounded-full blur-3xl" />
         <motion.div animate={{ rotate: -360, scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#4169E1]/10 rounded-full blur-3xl" />
         <div className="absolute top-20 right-20 text-8xl opacity-5 font-black uppercase select-none">CREATIVE</div>
         <div className="absolute bottom-20 left-20 text-8xl opacity-5 font-black uppercase select-none">PASSION</div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 bg-white/20 dark:bg-black/20 backdrop-blur-xl px-10 py-5 rounded-full border-4 border-black shadow-[8px_8px_0px_#000]">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FFD700] rounded-lg border-2 border-black flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_#000]">
               {data.firstName[0]}
            </div>
            <span className="text-sm font-black uppercase tracking-widest hidden md:block">{data.firstName}</span>
         </div>
         <div className="flex items-center gap-6">
            <button onClick={() => setIsDark(!isDark)} className="p-2 bg-white dark:bg-slate-800 border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
               {isDark ? <Zap className="text-yellow-400" size={18} /> : <Palette className="text-blue-500" size={18} />}
            </button>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-xs font-black outline-none cursor-pointer uppercase tracking-tighter">
               <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
            </select>
         </div>
      </nav>

      <main className="relative z-10 pt-40">
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-20 text-center relative">
           <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }} className="inline-block px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.5em] mb-12 skew-x-[-10deg]">
              ✨ Design Explorer
           </motion.div>
           <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-none mb-12 uppercase italic relative">
              <span className="relative z-10">{data.firstName}</span>
              <br/>
              <span className="text-transparent border-t-8 border-black bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFD700] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                 {data.lastName}
              </span>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -right-10 text-6xl md:text-8xl">🎨</motion.div>
           </h1>
           <p className="text-2xl md:text-4xl font-bold opacity-60 max-w-4xl mx-auto leading-tight italic mb-20">
              "{data.aboutMe}"
           </p>
           <div className="flex flex-wrap justify-center gap-12">
              <button onClick={onDownloadCV} className="group px-12 py-6 bg-[#FF4500] text-white border-4 border-black rounded-2xl font-black uppercase tracking-widest text-sm shadow-[10px_10px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-4">
                 <Download size={20} /> {t.cvBtn}
              </button>
              <div className="flex gap-4">
                 {data.contacts.map((c, i) => (
                    <a key={i} href={c.link} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group">
                       {getIcon(c.type)}
                    </a>
                 ))}
              </div>
           </div>
        </section>

        {/* PROJECTS SECTION */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-40 px-6 container mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <div>
                   <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">{t.proj}</h2>
                   <div className="w-32 h-4 bg-[#FFD700] mt-4 border-2 border-black" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4">
                   <Sparkles className="text-[#FF4500]" /> <span>Visual Storytelling // 00{data.projects.length}</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {data.projects.map((proj, i) => (
                  <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={i} className="group relative">
                     <div className="relative aspect-[4/3] bg-white border-4 border-black rounded-[3rem] overflow-hidden shadow-[15px_15px_0px_#000] transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none">
                        <img src={proj.image || "https://images.unsplash.com/photo-1579546678183-a9c101ad90d9?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={proj.title} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-12 text-center text-white">
                           <Rocket size={48} className="mb-6 -rotate-45" />
                           <h3 className="text-4xl font-black uppercase italic mb-4">{proj.title}</h3>
                           <p className="text-sm font-bold opacity-80 mb-8">{proj.tech}</p>
                           <a href={proj.link} target="_blank" rel="noreferrer" className="px-8 py-3 bg-white text-black font-black uppercase text-xs rounded-xl border-2 border-black">Explore Work</a>
                        </div>
                     </div>
                     <div className="mt-10 px-4 flex justify-between items-center">
                        <h4 className="text-2xl font-black uppercase italic">{proj.title}</h4>
                        <div className="text-[10px] font-black bg-black text-white px-4 py-1 rounded-full uppercase">{proj.tech?.split(',')[0]}</div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* RESUME SECTION */}
        <section className="py-40 bg-black text-white px-6">
           <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
              
              {/* Experience */}
              <div>
                 <div className="flex items-center gap-8 mb-24">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{t.exp}</h2>
                    <Cpu className="text-[#FFD700]" size={40} />
                 </div>
                 <div className="space-y-20">
                    {data.experiences.map((exp, i) => (
                      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="group relative pl-16">
                         <div className="absolute left-0 top-0 w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black border-2 border-[#FFD700]">0{i+1}</div>
                         <div className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest mb-4 italic">{exp.period}</div>
                         <h3 className="text-3xl font-black uppercase mb-2 group-hover:text-[#FFD700] transition-colors">{exp.role}</h3>
                         <div className="text-xl font-bold opacity-60 mb-8 flex items-center gap-3">
                            <Clock size={16} /> {exp.company}
                         </div>
                         <p className="text-lg opacity-40 leading-relaxed font-medium">{exp.description}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>

              {/* Certificates & Fun Stats */}
              <div className="space-y-40">
                 {data.certificates?.length > 0 && (
                    <div>
                       <div className="flex items-center gap-8 mb-24">
                          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{t.certs}</h2>
                          <Sparkles className="text-[#FF4500]" size={40} />
                       </div>
                       <div className="grid grid-cols-1 gap-8">
                          {data.certificates.map((cert, i) => (
                            <div key={i} className="p-10 bg-white/5 border-4 border-white rounded-[2.5rem] flex items-center justify-between group hover:bg-[#FF4500] hover:text-black transition-all">
                               <div>
                                  <h4 className="text-2xl font-black uppercase mb-2 italic">{cert.title}</h4>
                                  <p className="text-xs font-bold opacity-60 uppercase">{cert.issuer}</p>
                               </div>
                               <CheckCircle2 className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                            </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Fun Card */}
                 <div className="p-12 bg-[#FFD700] text-black rounded-[4rem] border-8 border-black shadow-[20px_20px_0px_rgba(255,255,255,0.1)] relative overflow-hidden group">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-10 -right-10 text-9xl opacity-10">⚡</motion.div>
                    <div className="relative z-10">
                       <AlertCircle size={40} className="mb-6" />
                       <h3 className="text-4xl font-black uppercase italic leading-none mb-4">Availability</h3>
                       <p className="text-xl font-black uppercase tracking-tighter">Ready for new projects // 2026</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-40 px-6 container mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                 <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter italic leading-none mb-16">
                    {t.contactTitle.split(' ').slice(0, 3).join(' ')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4169E1] to-[#FF4500]">
                       {t.contactTitle.split(' ').slice(3).join(' ')}
                    </span>
                 </h2>
                 <div className="flex flex-col gap-12">
                    <div className="flex items-center gap-8 group">
                       <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl flex items-center justify-center text-3xl shadow-[8px_8px_0px_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                          <Mail size={32} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] block mb-2">Protocol: EMAIL</span>
                          <span className="text-3xl font-black break-all">{data.email}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-8 group">
                       <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl flex items-center justify-center text-3xl shadow-[8px_8px_0px_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                          <MapPin size={32} />
                       </div>
                       <div>
                          <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] block mb-2">Protocol: LOCATION</span>
                          <span className="text-3xl font-black">{data.address}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="p-12 md:p-20 bg-white border-[8px] border-black rounded-[5rem] shadow-[30px_30px_0px_#000] space-y-12">
                 <div className="space-y-10">
                    <div className="relative">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Who are you?</label>
                       <input required type="text" placeholder={t.name} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-4 border-black py-4 outline-none font-black text-2xl uppercase placeholder:opacity-20 focus:placeholder:opacity-0 transition-all" />
                    </div>
                    <div className="relative">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Where can I reach you?</label>
                       <input required type="email" placeholder={t.email} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-4 border-black py-4 outline-none font-black text-2xl uppercase placeholder:opacity-20 focus:placeholder:opacity-0 transition-all" />
                    </div>
                    <div className="relative">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">What's the plan?</label>
                       <textarea required rows="1" placeholder={t.msg} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b-4 border-black py-4 outline-none font-black text-2xl uppercase placeholder:opacity-20 focus:placeholder:opacity-0 transition-all resize-none"></textarea>
                    </div>
                 </div>
                 <button disabled={status === 'sending'} type="submit" className="w-full py-8 bg-[#FFD700] text-black font-black uppercase tracking-[0.3em] rounded-[2rem] border-4 border-black shadow-[10px_10px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xl">
                    {status === 'sending' ? 'Working...' : status === 'success' ? t.success : status === 'error' ? t.error : t.send}
                 </button>
              </form>
           </div>
        </section>
      </main>

      <footer className="py-24 px-8 border-t-8 border-black">
         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="text-4xl font-black italic uppercase tracking-tighter">{data.firstName}</div>
               <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em]">© {new Date().getFullYear()} Creative Universe. No Limits.</p>
            </div>
            <div className="flex gap-12">
               {data.contacts.map((c, i) => (
                  <a key={i} href={c.link} target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-widest hover:text-[#FF4500] transition-colors">{c.type}</a>
               ))}
            </div>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700;900&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      ` }} />
    </div>
  );
};

export default Creative;
