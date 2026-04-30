import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Bog'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Birgalikda ishlaymizmi?", name: "Ism", email: "Email", msg: "Xabaringiz", send: "Yuborish", success: "Xabar yuborildi!", error: "Xatolik yuz berdi" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "Скачать CV", contactTitle: "Свяжемся?", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить", success: "Сообщение отправлено!", error: "Произошла ошибка" },
  en: { hero: "About Me", hire: "Hire Me", certs: "Certificates", exp: "Experience", proj: "Projects", cvBtn: "Download CV", contactTitle: "Let's collaborate!", name: "Name", email: "Email", msg: "Message", send: "Send", success: "Message sent!", error: "Something went wrong" }
};

const Zamonaviy = ({ data, onSendMessage, onDownloadCV }) => {
  const { lang, setLang } = useLang();
  const t = portfolioLang[lang] || portfolioLang['uz'];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

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
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#030712] dark:text-slate-200 font-sans relative overflow-hidden transition-colors duration-500 selection:bg-indigo-500/30">
      
      {/* Animated Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-[120px] mix-blend-screen"
         />
         <motion.div 
           animate={{ rotate: -360, scale: [1, 1.5, 1] }} 
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/10 blur-[150px] mix-blend-screen"
         />
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      >
        <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
            {data.firstName}
          </span>.
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-xs font-bold outline-none cursor-pointer uppercase text-slate-600 dark:text-slate-300">
            <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
          </select>
          <a href="#contact" className="px-6 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold shadow-lg shadow-black/10 hover:scale-105 active:scale-95 transition-all">
            {t.hire}
          </a>
        </div>
      </motion.nav>

      <main className="relative z-10 container mx-auto px-6 pt-40 pb-32 max-w-6xl">
        
        {/* HERO SECTION */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center text-center lg:text-left"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold backdrop-blur-md">
                ✨ Frontend Developer
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
               Building <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">digital</span> <br/> experiences.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
               {data.aboutMe}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={onDownloadCV}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all border border-indigo-400/50"
              >
                 {t.cvBtn}
              </motion.button>
              <div className="flex gap-2">
                 {data.contacts.map((c, i) => (
                    <motion.a whileHover={{ y: -4, rotate: 5 }} key={i} href={c.link} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-md hover:bg-white hover:text-indigo-500 shadow-sm transition-colors text-slate-600 dark:text-slate-300 font-bold">
                      {c.type[0]}
                    </motion.a>
                 ))}
              </div>
            </div>
          </motion.div>

          {data.showAvatarOnPortfolio && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}
               className="relative lg:w-1/3 flex justify-center"
            >
               <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/40 to-cyan-500/40 rounded-[3rem] blur-2xl transform rotate-12 scale-110"></div>
               <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-[3rem] p-2 bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20 shadow-2xl">
                 <img src={data.avatar || "https://ui-avatars.com/api/?name="+data.firstName+"&background=random"} alt={data.firstName} className="w-full h-full object-cover rounded-[2.5rem]" />
               </div>
            </motion.div>
          )}
        </section>

        {/* PROJECTS SHOWCASE */}
        {data.projects?.length > 0 && (
          <section className="mb-40">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t.proj}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {data.projects.map((proj, i) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                   key={proj.id} className="group cursor-pointer"
                 >
                   <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                     <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10"></div>
                     <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
                     
                     {/* Hover floating badge */}
                     <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="px-4 py-2 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md text-indigo-600 dark:text-cyan-400 text-sm font-bold shadow-xl">
                          View Project
                        </span>
                     </div>
                   </div>
                   <div className="px-2">
                     <div className="flex gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">{proj.tech}</span>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">{proj.title}</h3>
                     <p className="text-slate-600 dark:text-slate-400">{proj.description}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* EXPERIENCES TIMELINE */}
        {data.experiences?.length > 0 && (
          <section className="mb-40">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t.exp}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
            </motion.div>
            
            <div className="max-w-4xl mx-auto space-y-8">
               {data.experiences.map((exp, i) => (
                 <motion.div 
                   initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                   key={exp.id} className="relative group"
                 >
                   <div className="absolute top-0 bottom-0 left-8 w-px bg-slate-200 dark:bg-white/10 group-last:bg-transparent"></div>
                   <div className="flex gap-8 items-start relative z-10">
                     <div className="w-16 shrink-0 flex flex-col items-center">
                       <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center text-indigo-500 font-bold group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
                         {exp.company.substring(0, 2).toUpperCase()}
                       </div>
                     </div>
                     <div className="flex-1 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 p-8 rounded-3xl shadow-sm group-hover:shadow-xl transition-all">
                       <span className="text-sm font-bold text-indigo-500 dark:text-cyan-400 mb-2 block">{exp.period}</span>
                       <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                       <h4 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                       <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp.description}</p>
                     </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES GLASS GRID */}
        {data.certificates?.length > 0 && (
          <section className="mb-40">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t.certs}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {data.certificates.map((cert, i) => (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                   key={cert.id} className="bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform"
                 >
                   <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                   </div>
                   <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">{cert.title}</h3>
                   <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">{cert.issuer} • {cert.date}</div>
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{cert.description}</p>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* IMMERSIVE CONTACT FORM */}
        <section id="contact" className="relative">
           <motion.div 
             initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
             className="relative z-10 bg-slate-900 dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-slate-800 dark:border-white/10 shadow-2xl overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
               <div>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight capitalize">{t.contactTitle}</h2>
                 <p className="text-slate-400 text-lg mb-12 max-w-md">Men har doim yangi va qiziqarli loyihalar uchun ochiqman. Loyihangizni birgalikda mukammallashtiramiz!</p>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white"><span className="text-xl">📍</span></div>
                      <div>
                        <div className="text-sm text-slate-400 font-medium mb-1">Manzil</div>
                        <div className="text-white font-bold">{data.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white"><span className="text-xl">🕒</span></div>
                      <div>
                        <div className="text-sm text-slate-400 font-medium mb-1">Ish vaqti</div>
                        <div className="text-white font-bold">{data.availableTime}</div>
                      </div>
                    </div>
                 </div>
               </div>

               <div className="bg-white/5 dark:bg-black/20 p-8 rounded-3xl border border-white/10">
                 <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.name}</label>
                       <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-white font-medium" 
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.email}</label>
                       <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-white font-medium" 
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.msg}</label>
                       <textarea 
                        required
                        rows="4" 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all text-white font-medium resize-none"
                       ></textarea>
                    </div>
                    <button 
                      disabled={status === 'sending'}
                      type="submit" 
                      className={`w-full py-4 rounded-xl font-black text-lg transition-colors mt-2 ${
                        status === 'success' ? 'bg-emerald-500 text-white' : 
                        status === 'error' ? 'bg-red-500 text-white' : 
                        'bg-white text-slate-900 hover:bg-indigo-400 hover:text-white'
                      }`}
                    >
                       {status === 'sending' ? '...' : status === 'success' ? t.success : status === 'error' ? t.error : t.send}
                    </button>
                 </form>
               </div>
             </div>
           </motion.div>
        </section>

      </main>

      <footer className="relative z-10 text-center py-8 text-sm text-slate-500 font-medium">
         &copy; {new Date().getFullYear()} {data.firstName}. Immersive Portfolio.
      </footer>
    </div>
  );
};

export default Zamonaviy;
