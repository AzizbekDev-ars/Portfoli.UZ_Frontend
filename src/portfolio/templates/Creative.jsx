import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Holat: Ochiq", certs: "Sertifikat", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Yozish!", name: "Ism", email: "Email", msg: "Xabaring", send: "Yuborish!" },
  ru: { hero: "Обо мне", hire: "Доступен", certs: "Сертификаты", exp: "Опыт", proj: "Проекты", cvBtn: "Мое CV", contactTitle: "Написать", name: "Имя", email: "Email", msg: "Текст", send: "Отправить!" },
  en: { hero: "About", hire: "Available", certs: "Certs", exp: "Experience", proj: "Work", cvBtn: "Get CV", contactTitle: "Say Hi!", name: "Name", email: "Email", msg: "Message", send: "Send It!" }
};

const Creative = ({ data }) => {
  const { lang, setLang } = useLang();
  const t = portfolioLang[lang] || portfolioLang['uz'];

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono relative overflow-hidden">
      
      {/* Neo-brutalism Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-multiply z-[60]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* NAVBAR */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-[#FFD700] border-4 border-black px-6 py-4 flex justify-between items-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <div className="text-2xl font-black uppercase rotate-[-1deg] bg-white border-2 border-black px-2 py-1">
          {data.username}
        </div>
        <div className="flex items-center gap-4">
           <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white border-4 border-black px-3 py-2 text-sm font-black outline-none cursor-pointer uppercase hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <option className="text-black bg-white" value="uz">UZ</option><option className="text-black bg-white" value="ru">RU</option><option className="text-black bg-white" value="en">EN</option>
          </select>
          <a href="#contact" className="hidden sm:inline-block px-4 py-2 bg-[#FF4136] text-white border-4 border-black font-black text-sm uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
            {t.hire}
          </a>
        </div>
      </nav>

      <main className="px-4 md:px-12 pt-32 pb-24 max-w-7xl mx-auto relative z-10">
        
        {/* HERO */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-32">
          <div className="w-full lg:w-3/5">
            <motion.div initial={{ rotate: -5, scale: 0 }} animate={{ rotate: -2, scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="inline-block bg-[#0074D9] text-white border-4 border-black px-4 py-2 font-black text-xl mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
               🔥 Hello, World!
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase leading-none tracking-tighter">
              <span className="bg-[#2ECC40] text-white px-2 mb-2 inline-block border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rotate-1">{data.firstName}</span> <br/> 
              <span className="bg-white px-2 inline-block border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] -rotate-1">{data.lastName}</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-10 max-w-2xl leading-relaxed">
              {data.aboutMe}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-4 bg-[#FF851B] border-4 border-black font-black text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all uppercase">
                {t.cvBtn}
              </button>
              <div className="flex gap-3">
                 {data.contacts.map((c, i) => (
                    <a key={i} href={c.link} className="w-16 h-16 flex items-center justify-center bg-[#B10DC9] text-white border-4 border-black font-black text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all rounded-full">
                      {c.type[0]}
                    </a>
                 ))}
              </div>
            </div>
          </div>
          
          {data.showAvatarOnPortfolio && (
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full lg:w-2/5 flex justify-center">
               <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
                 <div className="absolute inset-0 bg-[#FFD700] border-4 border-black shadow-[16px_16px_0px_rgba(0,0,0,1)] rotate-6"></div>
                 <div className="absolute inset-0 bg-[#2ECC40] border-4 border-black -rotate-3"></div>
                 <img src={data.avatar || "https://ui-avatars.com/api/?name="+data.firstName+"&background=random"} alt={data.firstName} className="w-full h-full object-cover border-4 border-black relative z-10 grayscale hover:grayscale-0 transition-all duration-300" />
               </div>
            </motion.div>
          )}
        </section>

        {/* PROJECTS MARQUEE & GRID */}
        {data.projects?.length > 0 && (
          <section className="mb-32">
            <div className="bg-black text-white py-4 overflow-hidden mb-12 border-y-4 border-black shadow-[0_8px_0px_rgba(0,0,0,1)] transform -rotate-1 w-[110vw] relative left-1/2 -ml-[55vw]">
               <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] font-black text-4xl uppercase items-center gap-8">
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span> 
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
                 <span>{t.proj}</span> <span className="text-[#FFD700]">★</span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 px-4">
               {data.projects.map((proj, idx) => (
                 <motion.div whileHover={{ scale: 1.02 }} key={proj.id} className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                   <div className="w-full aspect-video border-4 border-black mb-6 overflow-hidden bg-black relative group">
                     <span className="absolute top-4 left-4 z-20 bg-[#FF4136] text-white border-2 border-black px-3 py-1 font-black text-sm uppercase -rotate-6 shadow-[2px_2px_0px_#000]">
                       {proj.tech}
                     </span>
                     <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                   </div>
                   <h3 className="text-3xl font-black uppercase mb-4 leading-tight">{proj.title}</h3>
                   <p className="text-lg font-bold text-gray-700">{proj.description}</p>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* EXPERIENCES */}
        {data.experiences?.length > 0 && (
          <section className="mb-32">
            <h2 className="text-5xl font-black bg-[#B10DC9] text-white border-4 border-black inline-block px-8 py-4 mb-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rotate-1">{t.exp}</h2>
            <div className="space-y-12">
               {data.experiences.map(exp => (
                 <div key={exp.id} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:bg-[#FFD700] transition-colors">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                   <div className="md:w-1/4">
                      <div className="inline-block bg-black text-white px-4 py-2 font-black text-xl rotate-[-2deg] mb-2">{exp.period}</div>
                   </div>
                   <div className="md:w-3/4 relative z-10">
                     <h3 className="text-3xl font-black uppercase mb-1">{exp.role}</h3>
                     <h4 className="text-xl font-bold bg-white text-black border-2 border-black inline-block px-2 mb-4">{exp.company}</h4>
                     <p className="text-xl font-medium">{exp.description}</p>
                   </div>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* CONTACT BRUTALISM */}
        <section id="contact" className="bg-[#2ECC40] border-4 border-black p-8 md:p-16 shadow-[16px_16px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden">
           {/* Abstract shape */}
           <svg className="absolute bottom-0 right-0 w-64 h-64 text-black opacity-10 -mr-16 -mb-16 rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,0 100,50 50,100 0,50" />
           </svg>
           
           <h2 className="text-6xl md:text-8xl font-black uppercase mb-12 leading-none text-white drop-shadow-[4px_4px_0_#000]">{t.contactTitle}</h2>
           
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
             <div className="lg:col-span-2 space-y-6 text-xl font-bold text-black bg-white border-4 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
               <div className="border-b-4 border-black pb-4">
                 <div className="uppercase text-sm mb-1 text-gray-500 font-black">Base</div>
                 {data.address}
               </div>
               <div className="pt-2">
                 <div className="uppercase text-sm mb-1 text-gray-500 font-black">Availability</div>
                 {data.availableTime}
               </div>
             </div>
             
             <form className="lg:col-span-3 flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col md:flex-row gap-6">
                  <input type="text" placeholder={t.name} className="w-full bg-white border-4 border-black px-6 py-4 font-black text-xl outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_#000] transition-all placeholder-gray-400" />
                  <input type="email" placeholder={t.email} className="w-full bg-white border-4 border-black px-6 py-4 font-black text-xl outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_#000] transition-all placeholder-gray-400" />
                </div>
                <textarea rows="4" placeholder={t.msg} className="w-full bg-white border-4 border-black px-6 py-4 font-black text-xl outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_#000] transition-all resize-none placeholder-gray-400"></textarea>
                <button type="button" className="py-5 bg-black text-[#FFD700] border-4 border-black font-black text-3xl hover:bg-white hover:text-black hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#000] transition-all uppercase w-full">
                  {t.send}
                </button>
             </form>
           </div>
        </section>

      </main>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Creative;
