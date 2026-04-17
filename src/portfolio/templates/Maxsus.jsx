import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Bod'lanish", certs: "Sertifikatlar", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklab Olish", contactTitle: "Aloqa", name: "Ism", email: "Email", msg: "Xabaringiz", send: "Yuborish" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "Скачать CV", contactTitle: "Контакт", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить" },
  en: { hero: "About Me", hire: "Hire Me", certs: "Certificates", exp: "Experience", proj: "Projects", cvBtn: "Download CV", contactTitle: "Contact", name: "Name", email: "Email", msg: "Message", send: "Submit" }
};

const Maxsus = ({ data }) => {
  const { lang, setLang } = useLang();
  const t = portfolioLang[lang] || portfolioLang['uz'];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-serif transition-colors duration-500 selection:bg-[#cda25e] selection:text-black">
      
      {/* Luxury Ambient Lines */}
      <div className="fixed inset-0 pointer-events-none flex justify-around opacity-10 z-0">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#cda25e] to-transparent"></div>
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#cda25e] to-transparent hidden md:block"></div>
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#cda25e] to-transparent hidden lg:block"></div>
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#cda25e] to-transparent"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-[#cda25e]/20 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl italic font-black text-[#cda25e] tracking-widest uppercase">
          {data.firstName}
        </div>
        <div className="flex items-center gap-8">
           <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-xs font-bold outline-none cursor-pointer uppercase text-[#a0a0a0] focus:text-[#cda25e] font-sans tracking-widest">
            <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
          </select>
          <a href="#contact" className="px-6 py-2 border border-[#cda25e] text-[#cda25e] hover:bg-[#cda25e] hover:text-[#09090b] transition-all uppercase text-[10px] tracking-[0.2em] font-sans font-bold">
            {t.hire}
          </a>
        </div>
      </nav>

      <main className="relative z-10 px-8 pt-48 pb-32 max-w-[1400px] mx-auto">
        
        {/* HERO */}
        <section className="flex flex-col items-center text-center mb-48">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase text-white leading-none tracking-tighter mix-blend-lighten relative">
              <span className="block italic text-[#cda25e] text-3xl md:text-5xl lg:text-7xl font-light mb-[-20px] md:mb-[-40px] tracking-normal translate-x-[-10%]">
                Hello, I am
              </span>
              {data.lastName}
            </h1>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-16 flex flex-col md:flex-row items-center gap-12 max-w-4xl">
            {data.showAvatarOnPortfolio && (
               <div className="w-56 h-72 md:w-64 md:h-80 overflow-hidden border border-[#cda25e]/30 relative p-3">
                 <div className="absolute inset-0 border border-[#cda25e]/10 -rotate-3 scale-105"></div>
                 <img src={data.avatar || "https://ui-avatars.com/api/?name="+data.firstName+"&background=random"} alt={data.firstName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
               </div>
            )}
            <div className="flex-1 text-left">
              <div className="w-16 h-px bg-[#cda25e] mb-6"></div>
              <p className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed italic mb-8 font-light">
                "{data.aboutMe}"
              </p>
              <div className="flex gap-6 uppercase tracking-[0.2em] text-[#cda25e] text-[10px] font-sans font-bold">
                <button className="flex items-center gap-2 hover:text-white transition-colors uppercase">
                  <span className="w-1.5 h-1.5 bg-[#cda25e] rounded-full inline-block"></span> {t.cvBtn}
                </button>
                {data.contacts.map((c, i) => (
                   <a key={i} href={c.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                     <span className="w-1.5 h-1.5 bg-[#cda25e] rounded-full inline-block"></span> {c.type}
                   </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCES */}
        {data.experiences?.length > 0 && (
          <section className="mb-48 border-t border-[#cda25e]/20 pt-24">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3">
                 <h2 className="text-sm font-sans text-[#cda25e] uppercase tracking-[0.3em] font-bold sticky top-32">
                   01 // {t.exp}
                 </h2>
               </div>
               <div className="md:w-2/3 space-y-16">
                  {data.experiences.map(exp => (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={exp.id} className="group cursor-default">
                      <div className="text-[#a0a0a0] font-sans text-sm tracking-widest mb-4">{exp.period}</div>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-[#cda25e] transition-colors">{exp.role}</h3>
                      <h4 className="text-xl italic text-[#cda25e] mb-6">{exp.company}</h4>
                      <p className="text-[#a0a0a0] font-sans leading-loose text-sm max-w-2xl">{exp.description}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section className="mb-48 border-t border-[#cda25e]/20 pt-24">
            <div className="flex flex-col md:flex-row gap-12 mb-16">
               <div className="md:w-1/3">
                 <h2 className="text-sm font-sans text-[#cda25e] uppercase tracking-[0.3em] font-bold">
                   02 // {t.proj}
                 </h2>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-32">
               {data.projects.map((proj, idx) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                   key={proj.id} className={`group flex flex-col ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
                 >
                   <div className="w-full aspect-[3/4] overflow-hidden border border-[#222] mb-8 relative p-4 group-hover:border-[#cda25e]/50 transition-colors duration-500">
                     <div className="w-full h-full relative overflow-hidden bg-[#09090b]">
                       <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
                     </div>
                   </div>
                   <div className="text-[#cda25e] font-sans text-xs tracking-widest uppercase mb-4 flex items-center justify-between">
                     <span>No. {String(idx + 1).padStart(2, '0')}</span>
                     <span>{proj.tech}</span>
                   </div>
                   <h3 className="text-3xl text-white font-black uppercase tracking-widest leading-tight">{proj.title}</h3>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* CONTACT AREA */}
        <section id="contact" className="border-t border-[#cda25e]/20 pt-32 pb-16">
           <div className="flex flex-col lg:flex-row gap-20 justify-between">
             <div className="lg:w-1/2">
               <h2 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                 {t.contactTitle}.
               </h2>
               <div className="h-px w-24 bg-[#cda25e] mb-12"></div>
               <div className="font-sans">
                 <p className="text-[#a0a0a0] mb-6 text-sm tracking-widest uppercase">Office: <span className="text-white block mt-2 text-lg normal-case font-serif italic">{data.address}</span></p>
                 <p className="text-[#a0a0a0] mb-12 text-sm tracking-widest uppercase">Hours: <span className="text-white block mt-2 text-lg normal-case font-serif italic">{data.availableTime}</span></p>
                 <a href={`mailto:${data.contacts[0]?.link}`} className="text-[#cda25e] tracking-[0.2em] uppercase text-xs font-bold hover:text-white transition-colors border-b border-[#cda25e] pb-2">
                   Drop an inquiry
                 </a>
               </div>
             </div>
             
             <div className="lg:w-1/2">
                <form className="flex flex-col gap-12" onSubmit={e => e.preventDefault()}>
                  <div className="relative group">
                    <input type="text" placeholder={t.name.toUpperCase()} className="w-full bg-transparent border-b border-[#333] pb-4 outline-none text-[#e0e0e0] font-sans tracking-[0.2em] uppercase text-xs focus:border-[#cda25e] transition-colors peer" />
                  </div>
                  <div className="relative group">
                    <input type="email" placeholder={t.email.toUpperCase()} className="w-full bg-transparent border-b border-[#333] pb-4 outline-none text-[#e0e0e0] font-sans tracking-[0.2em] uppercase text-xs focus:border-[#cda25e] transition-colors peer" />
                  </div>
                  <div className="relative group">
                    <textarea rows="4" placeholder={t.msg.toUpperCase()} className="w-full bg-transparent border-b border-[#333] pb-4 outline-none text-[#e0e0e0] font-sans tracking-[0.2em] uppercase text-xs focus:border-[#cda25e] transition-colors resize-none peer"></textarea>
                  </div>
                  <div>
                    <button type="button" className="px-12 py-4 border border-[#cda25e] text-[#cda25e] font-sans font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#cda25e] hover:text-[#09090b] transition-all w-full md:w-auto">
                      {t.send}
                    </button>
                  </div>
                </form>
             </div>
           </div>
        </section>

      </main>
    </div>
  );
};

export default Maxsus;
