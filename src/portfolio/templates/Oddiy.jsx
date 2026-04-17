import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LangContext';

const portfolioLang = {
  uz: { hero: "Men haqimda", hire: "Bod'lanish", certs: "Sertifikat", exp: "Tajriba", proj: "Loyihalar", cvBtn: "CV ni Yuklash", contactTitle: "Bog'lanish", name: "Ism", email: "Email", msg: "Xabar", send: "Yuborish" },
  ru: { hero: "Обо мне", hire: "Связаться", certs: "Признание", exp: "Опыт", proj: "Работы", cvBtn: "Скачать CV", contactTitle: "Написать", name: "Имя", email: "Email", msg: "Сообщение", send: "Отправить" },
  en: { hero: "About", hire: "Contact", certs: "Awards", exp: "Experience", proj: "Work", cvBtn: "Download CV", contactTitle: "Get in touch", name: "Name", email: "Email", msg: "Message", send: "Submit" }
};

const Oddiy = ({ data }) => {
  const { lang, setLang } = useLang();
  const t = portfolioLang[lang] || portfolioLang['uz'];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111] text-[#111] dark:text-[#fafafa] font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-700">
      
      {/* Subtle Grid Ambient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#fafafa]/80 dark:bg-[#111]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="text-sm font-semibold tracking-tight">
          {data.firstName}
        </div>
        <div className="flex items-center gap-6">
           <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none text-[11px] font-medium outline-none cursor-pointer uppercase text-gray-500 font-mono">
            <option className="text-black" value="uz">UZ</option><option className="text-black" value="ru">RU</option><option className="text-black" value="en">EN</option>
          </select>
          <a href="#contact" className="text-[13px] font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            {t.hire}
          </a>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 pt-32 pb-40 max-w-4xl mx-auto">
        
        {/* HERO */}
        <section className="mb-40 flex flex-col items-start pt-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            {data.showAvatarOnPortfolio && (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-8 border border-black/10 dark:border-white/10 shadow-sm">
                 <img src={data.avatar || "https://ui-avatars.com/api/?name="+data.firstName+"&background=random"} alt={data.firstName} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-[1.2] text-black/90 dark:text-white/90">
               Hello, I'm {data.firstName} {data.lastName}. <br className="hidden md:block"/>
               <span className="text-gray-400 dark:text-gray-500">{data.aboutMe}</span>
            </h1>
            <div className="flex gap-4">
              <button className="text-[13px] font-medium bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2">
                {t.cvBtn}
              </button>
              {data.contacts.map((c, i) => (
                 <a key={i} href={c.link} className="text-[13px] font-medium border border-black/10 dark:border-white/10 px-6 py-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
                   {c.type}
                 </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section className="mb-40">
            <h2 className="text-sm font-medium text-gray-400 mb-8 border-b border-black/5 dark:border-white/5 pb-4 uppercase tracking-widest">{t.proj}</h2>
            <div className="flex flex-col gap-12">
               {data.projects.map((proj, idx) => (
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} key={proj.id} className="group relative">
                   <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden mb-5">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
                   </div>
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-xl font-medium tracking-tight mb-1 group-hover:underline underline-offset-4">{proj.title}</h3>
                       <p className="text-[15px] text-gray-500 max-w-2xl">{proj.description}</p>
                     </div>
                     <span className="text-[12px] font-mono text-gray-400 mt-1">{proj.tech}</span>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* EXPERIENCES */}
        {data.experiences?.length > 0 && (
          <section className="mb-40">
            <h2 className="text-sm font-medium text-gray-400 mb-8 border-b border-black/5 dark:border-white/5 pb-4 uppercase tracking-widest">{t.exp}</h2>
            <div className="flex flex-col gap-0">
               {data.experiences.map((exp, idx) => (
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} key={exp.id} className="flex flex-col md:flex-row md:items-start py-8 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg">
                   <div className="md:w-1/4 mb-2 md:mb-0 text-[13px] text-gray-500 mt-1 font-mono">{exp.period}</div>
                   <div className="md:w-3/4">
                     <h3 className="text-lg font-medium mb-1">{exp.role}</h3>
                     <h4 className="text-[15px] text-gray-600 dark:text-gray-400 mb-3">{exp.company}</h4>
                     <p className="text-[15px] text-gray-500 max-w-xl leading-relaxed">{exp.description}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {data.certificates?.length > 0 && (
          <section className="mb-40">
            <h2 className="text-sm font-medium text-gray-400 mb-8 border-b border-black/5 dark:border-white/5 pb-4 uppercase tracking-widest">{t.certs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {data.certificates.map(cert => (
                 <div key={cert.id} className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                   <h3 className="text-[17px] font-medium mb-1">{cert.title}</h3>
                   <div className="text-[13px] text-gray-500 mb-3">{cert.issuer} &mdash; {cert.date}</div>
                   <p className="text-[14px] text-gray-600 dark:text-gray-400">{cert.description}</p>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* CONTACT MINIMAL */}
        <section id="contact" className="pt-20 border-t border-black/5 dark:border-white/5">
           <div className="flex flex-col md:flex-row gap-16 justify-between">
             <div className="md:w-1/3">
               <h2 className="text-2xl font-medium tracking-tight mb-8">{t.contactTitle}</h2>
               <div className="space-y-4 text-[15px] text-gray-500">
                 <p>{data.address}</p>
                 <p>{data.availableTime}</p>
                 <p className="pt-4"><a href={`mailto:${data.contacts[0]?.link}`} className="text-black dark:text-white hover:underline underline-offset-4">Say hello &rarr;</a></p>
               </div>
             </div>
             
             <div className="md:w-2/3">
                <form className="flex flex-col gap-8" onSubmit={e => e.preventDefault()}>
                  <div>
                    <input type="text" placeholder={t.name} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-3 outline-none text-[15px] focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  <div>
                    <input type="email" placeholder={t.email} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-3 outline-none text-[15px] focus:border-black dark:focus:border-white transition-colors" />
                  </div>
                  <div>
                    <textarea rows="3" placeholder={t.msg} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-3 outline-none text-[15px] focus:border-black dark:focus:border-white transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <button type="button" className="text-[13px] font-medium bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:opacity-80 transition-opacity">
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

export default Oddiy;
