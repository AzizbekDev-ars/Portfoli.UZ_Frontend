import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Bog'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Bog'lanish", name: "Ism", email: "Email", msg: "Xabar", send: "Yuborish" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "CV Скачать", contactTitle: "Контакты", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить" },
  en: { hero: "About", hire: "Get in touch", certs: "Certificates", exp: "Experience", proj: "Projects", cvBtn: "Download CV", contactTitle: "Contact Me", name: "Name", email: "Email", msg: "Message", send: "Submit" }
};

const Animatsion = ({ data }) => {
  const { lang, setLang } = useLang();
  const t = portfolioLang[lang] || portfolioLang['uz'];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="min-h-screen bg-[#000000] text-white font-sans overflow-hidden">
      
      {/* Dynamic Animated BG */}
      <motion.div style={{ y: yBg }} className="fixed inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="absolute w-[80vw] h-[80vw] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"></div>
        <div className="absolute w-[60vw] h-[60vw] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] animate-bounce" style={{ animationDuration: '7s' }}></div>
      </motion.div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-b border-white/10 px-8 py-5 flex justify-between items-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {data.username}
        </motion.div>
        <div className="flex items-center gap-6">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-sm font-bold shadow-none outline-none cursor-pointer uppercase text-white/70">
            <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
          </select>
          <motion.a whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }} whileTap={{ scale: 0.95 }} href="#contact" className="px-5 py-2.5 rounded-2xl bg-white/10 text-white text-sm font-bold transition-all border border-white/20">
            {t.hire}
          </motion.a>
        </div>
      </motion.nav>

      <main className="container mx-auto px-6 pt-32 pb-32 max-w-6xl relative z-10">
        
        {/* HERO */}
        <section className="flex flex-col items-center justify-center min-h-[85vh] mb-20 text-center relative">
          <motion.div style={{ y: yHero }} className="w-full flex flex-col items-center">
             {data.showAvatarOnPortfolio && (
               <motion.div 
                 initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                 className="mb-8 relative"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                 <img src={data.avatar || "https://ui-avatars.com/api/?name="+data.firstName+"&background=random"} alt={data.firstName} className="w-56 h-56 object-cover rounded-full border-4 border-white pb-0 relative z-10" />
               </motion.div>
             )}
             
             <motion.h1 
               initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
               className="text-7xl md:text-9xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
             >
               {data.firstName}
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
               className="text-xl md:text-3xl text-white/70 max-w-3xl leading-relaxed mb-12 font-light"
             >
               {data.aboutMe}
             </motion.p>
             
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-4">
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236,72,153,0.5)" }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg">
                  {t.cvBtn}
                </motion.button>
             </motion.div>
          </motion.div>
        </section>

        {/* PROJECTS (3D Scroll effect) */}
        {data.projects?.length > 0 && (
          <section className="mb-48 perspective-1000">
             <motion.h2 initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} className="text-4xl md:text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase tracking-tighter">{t.proj}</motion.h2>
             <div className="space-y-32">
               {data.projects.map((proj, i) => (
                 <motion.div 
                   key={proj.id} 
                   initial={{ opacity: 0, rotateX: 20, y: 100 }} 
                   whileInView={{ opacity: 1, rotateX: 0, y: 0 }} 
                   viewport={{ once: true, margin: "-200px" }}
                   transition={{ duration: 0.8, type: "spring" }}
                   className="group flex flex-col md:flex-row gap-12 items-center bg-white/5 border border-white/10 rounded-[3rem] p-4 hover:bg-white/10 transition-colors"
                 >
                   <div className="w-full md:w-1/2 overflow-hidden rounded-[2.5rem]">
                     <motion.img 
                       whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                       src={proj.image} alt={proj.title} className="w-full aspect-video object-cover" 
                     />
                   </div>
                   <div className="w-full md:w-1/2 p-6 md:p-12 pl-0">
                     <div className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-4 inline-block px-3 py-1 bg-pink-500/10 rounded-full">{proj.tech}</div>
                     <h3 className="text-4xl font-black text-white mb-6 uppercase leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 to-pink-600 transition-all">{proj.title}</h3>
                     <p className="text-lg text-white/60 leading-relaxed">{proj.description}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
          </section>
        )}

        {/* EXPERIENCES (Staggered List) */}
        {data.experiences?.length > 0 && (
          <section className="mb-48">
            <motion.h2 initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} className="text-4xl md:text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase tracking-tighter">{t.exp}</motion.h2>
            <div className="grid grid-cols-1 gap-6">
               {data.experiences.map((exp, i) => (
                 <motion.div 
                   key={exp.id} 
                   initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} 
                   whileInView={{ opacity: 1, x: 0 }} 
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                   whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                   className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer"
                 >
                   <div>
                     <h3 className="text-3xl font-black text-white mb-2">{exp.role}</h3>
                     <h4 className="text-xl font-medium text-white/50">{exp.company}</h4>
                   </div>
                   <div className="md:text-right">
                     <div className="text-pink-500 font-bold mb-4 text-lg bg-pink-500/10 inline-block px-4 py-2 rounded-full">{exp.period}</div>
                     <p className="text-white/60 text-sm max-w-sm ml-auto">{exp.description}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES (Hover Cards) */}
        {data.certificates?.length > 0 && (
          <section className="mb-48">
            <motion.h2 initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} className="text-4xl md:text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase tracking-tighter">{t.certs}</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {data.certificates.map((cert, i) => (
                 <motion.div 
                   key={cert.id} 
                   initial={{ opacity: 0, scale: 0.8, rotateY: 90 }} 
                   whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} 
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                   whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(236,72,153,0.15)" }}
                   className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl group"
                 >
                   <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gradient-to-br from-purple-500 to-pink-500 transition-colors">
                      <span className="text-2xl">🏆</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3">{cert.title}</h3>
                   <div className="text-pink-400 font-bold mb-4 text-xs tracking-widest uppercase">{cert.issuer} • {cert.date}</div>
                   <p className="text-white/50 text-sm">{cert.description}</p>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* CONTACT (Glowing Form) */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} 
          className="relative group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
           <div className="bg-black/80 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 border border-white/20 relative z-10 shadow-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               <div>
                 <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 uppercase tracking-tighter">{t.contactTitle}</h2>
                 <p className="text-white/60 text-lg mb-12 max-w-md">Ready to start your next big project? Let's create something spectacular together.</p>
                 <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl flex items-center gap-6 border border-white/5">
                      <div className="text-3xl">📍</div>
                      <div>
                        <div className="text-white/40 text-sm mb-1 uppercase tracking-widest font-bold">Location</div>
                        <div className="text-white font-medium text-lg">{data.address}</div>
                      </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl flex items-center gap-6 border border-white/5">
                      <div className="text-3xl">⏰</div>
                      <div>
                        <div className="text-white/40 text-sm mb-1 uppercase tracking-widest font-bold">Hours</div>
                        <div className="text-white font-medium text-lg">{data.availableTime}</div>
                      </div>
                    </div>
                 </div>
               </div>
               <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative z-0">
                    <input type="text" placeholder={t.name} className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 outline-none focus:border-pink-500 transition-colors text-white font-medium shadow-inner" />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative z-0">
                    <input type="email" placeholder={t.email} className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 outline-none focus:border-pink-500 transition-colors text-white font-medium shadow-inner" />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative z-0">
                    <textarea rows="4" placeholder={t.msg} className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 outline-none focus:border-pink-500 transition-colors text-white font-medium resize-none shadow-inner"></textarea>
                  </motion.div>
                  <motion.button whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }} whileTap={{ scale: 0.98 }} type="button" className="py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black text-xl mt-2 tracking-widest uppercase">
                    {t.send}
                  </motion.button>
               </form>
             </div>
           </div>
        </motion.section>

      </main>
    </div>
  );
};

export default Animatsion;
