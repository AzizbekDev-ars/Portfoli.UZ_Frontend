import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock Data (Global Context dan keladigan ma'lumotlar o'rnida)
const mockData = {
  user: {
    firstName: "Ali",
    lastName: "Valiyev",
    aboutMe: "Men 5 yillik tajribaga ega Full-Stack dasturchiman. Ilovalar arxitekturasi va foydalanuvchi interfeyslarini yaratish bo'yicha kuchli tajribaga egaman. Doimo yangi texnologiyalarni o'rganishga mukkasidan ketganman.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    profession: "Senior Software Engineer",
    address: "Toshkent sh., Chilonzor tumani",
    contacts: [
      { type: "Phone", link: "+998 90 123 45 67" },
      { type: "Email", link: "ali.valiyev@example.com" },
      { type: "LinkedIn", link: "linkedin.com/in/mrfury" },
      { type: "GitHub", link: "github.com/mrfury" }
    ]
  },
  experiences: [
    { id: 1, company: 'Meta', role: 'Senior Frontend Engineer', startDate: '2022-01', endDate: 'Hozirgacha', description: 'React va qoshimcha kutubxonalar yordamida yirik web ilovalarning old qismini yozish. Katta hajmdagi ma\'lumotlar bilan ishlash va render jarayonini optimallashtirish.' },
    { id: 2, company: 'EPAM Systems', role: 'Middle JavaScript Developer', startDate: '2019-05', endDate: '2021-12', description: 'Murakkab mijozlar uchun web ilovalarni ishlab chiqish, kodlarni optimallashtirish va takrorlanmas UI kutubxonalar yaratish.' }
  ],
  projects: [
    { id: 1, title: 'E-commerce React Ilova', description: 'Zamonaviy e-commerce loyiha. React, Redux, va TailwindCSS orqali yozilgan. To\'lov tizimlari to\'liq mavjud.', demoLink: 'myecommerce.uz' },
    { id: 2, title: 'Chat Ilovasi (Real-time)', description: 'Socket.io va MERN (MongoDB, Express, React, Node.js) yordamida yozilgan jonli suhbat ilovasi.', demoLink: 'chat.example.com' },
    { id: 3, title: 'Portfolio Sayt', description: 'Frontend dasturchilar uchun maxsus platforma. MERN stack asosida yaratilgan SSR arxitekturasi.', demoLink: 'portfolio.uz' }
  ],
  certificates: [
    { id: 1, title: 'Frontend Developer (React)', provider: 'Meta / Coursera', date: '2023-11' },
    { id: 2, title: 'JavaScript Algorithms', provider: 'freeCodeCamp', date: '2022-05' },
    { id: 3, title: 'Responsive Web Design', provider: 'Google', date: '2021-08' }
  ]
};

const CV = () => {
  const [selectedDesign, setSelectedDesign] = useState('modern');

  const designs = [
    { id: 'modern', name: 'Zamonaviy', desc: 'Ko\'k rangli gradient va toza shriftlar' },
    { id: 'creative', name: 'Ijodkor', desc: 'Yorqin ranglar va nostandart ko\'rinish' },
    { id: 'formal', name: 'Rasmiy', desc: 'Klassik va korporativ ko\'rinish (Kulrang)' },
    { id: 'ultra-formal', name: 'O\'ta Rasmiy', desc: 'Faqat oq-qora, serif shriftlar (Times)' }
  ];

  /* 
    Dizayn konfiguratsiyasi (Tailwind classlari bo'yicha). 
    A4 format: width va height belgilangan (aspect ratio: 1 / 1.414). 
    Lekin responsiveda kichrayadi. 
  */
  const getThemeClasses = () => {
    switch(selectedDesign) {
      case 'ultra-formal':
        return {
          wrapper: 'bg-white text-black font-serif',
          leftCol: 'bg-white border-r-2 border-black p-8 text-black',
          rightCol: 'bg-white p-8',
          name: 'text-4xl font-black uppercase tracking-widest text-black border-b-4 border-black pb-4 mb-4',
          sectionTitle: 'text-lg font-bold uppercase tracking-widest border-b-2 border-black inline-block pb-1 mb-4',
          accent: 'font-bold text-black',
          itemBorder: 'border-l-4 border-black pl-4 mb-6'
        };
      case 'formal':
        return {
          wrapper: 'bg-white text-slate-800 font-sans',
          leftCol: 'bg-slate-100 p-8 text-slate-700',
          rightCol: 'bg-white p-8',
          name: 'text-4xl font-light text-slate-900 border-b border-slate-300 pb-4 mb-4',
          sectionTitle: 'text-lg font-semibold text-slate-800 uppercase tracking-wider mb-4',
          accent: 'font-semibold text-slate-900',
          itemBorder: 'border-l-2 border-slate-300 pl-4 mb-6 relative left-[-2px]'
        };
      case 'creative':
        return {
          wrapper: 'bg-white text-slate-800 font-sans',
          leftCol: 'bg-gradient-to-br from-fuchsia-600 to-orange-500 p-8 text-white',
          rightCol: 'bg-orange-50/30 p-8',
          name: 'text-5xl font-black text-fuchsia-600 mb-2',
          sectionTitle: 'text-xl font-black text-orange-500 bg-orange-100 px-3 py-1 rounded-lg inline-block mb-4',
          accent: 'font-bold text-fuchsia-600',
          itemBorder: 'bg-white rounded-xl shadow-sm border border-orange-100 p-4 mb-4'
        };
      case 'modern':
      default:
        return {
          wrapper: 'bg-white text-slate-700 font-sans',
          leftCol: 'bg-[#1E293B] p-8 text-slate-300',
          rightCol: 'bg-white p-8',
          name: 'text-5xl font-black text-slate-900 tracking-tight mb-2',
          sectionTitle: 'text-xl font-black text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2 before:content-[""] before:block before:w-6 before:h-1 before:bg-indigo-600',
          accent: 'font-bold text-indigo-600',
          itemBorder: 'border-l-2 border-indigo-200 pl-4 mb-6 hover:border-indigo-600 transition-colors'
        };
    }
  };

  const t = getThemeClasses();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-12 h-full flex flex-col"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 mt-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Rezyume (CV) Yaratish
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dizaynni tanlang, ma'lumotlaringiz avtomatik joylashadi.</p>
        </div>
        
        <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Yuklab Olish (PDF)
        </button>
      </div>

      {/* DESIGN SELECTOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {designs.map(design => (
          <div 
            key={design.id}
            onClick={() => setSelectedDesign(design.id)}
            className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
              selectedDesign === design.id 
                ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-md' 
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-black hover:border-indigo-300 dark:hover:border-indigo-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold text-lg ${selectedDesign === design.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                {design.name}
              </h3>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedDesign === design.id ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-300 dark:border-slate-600'}`}>
                 {selectedDesign === design.id && <div className="w-2.5 h-2.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{design.desc}</p>
          </div>
        ))}
      </div>

      {/* A4 CV PREVIEW CONTAINER */}
      <div className="w-full flex justify-center bg-slate-100 dark:bg-[#0a0a0a] rounded-3xl p-4 sm:p-12 border border-slate-200 dark:border-white/10">
        
        {/* A4 Page Document Layout */}
        <div 
          className={`w-full max-w-[800px] min-h-[1131px] shadow-2xl flex flex-col md:flex-row ${t.wrapper}`} 
        >
           {/* LEFT COLUMN */}
           <div className={`w-full md:w-[35%] flex flex-col ${t.leftCol}`}>
             {/* Photo */}
             <div className="flex justify-center mb-8">
                {selectedDesign === 'ultra-formal' ? (
                  <img src={mockData.user.avatar} alt="Profile" className="w-32 h-40 object-cover border-4 border-black grayscale" />
                ) : (
                  <img src={mockData.user.avatar} alt="Profile" className={`w-40 h-40 object-cover rounded-full ${selectedDesign === 'creative' ? 'border-4 border-white shadow-xl' : 'border-4 border-white/20'}`} />
                )}
             </div>

             {/* Personal Info */}
             <div className="mb-10">
               <h4 className={`text-sm font-black uppercase tracking-widest mb-4 ${selectedDesign === 'modern' ? 'text-white' : ''} ${selectedDesign === 'ultra-formal' ? 'border-b-2 border-black pb-1' : 'border-b border-white/20 pb-2'}`}>
                 Bog'lanish
               </h4>
               <ul className="flex flex-col gap-4 text-sm">
                 {mockData.user.contacts.map((contact, i) => (
                   <li key={i} className="flex flex-col">
                     <span className={`text-xs opacity-70 uppercase tracking-wider ${selectedDesign === 'ultra-formal' ? 'font-bold' : ''}`}>{contact.type}</span>
                     <span>{contact.link}</span>
                   </li>
                 ))}
                 <li className="flex flex-col mt-2">
                     <span className={`text-xs opacity-70 uppercase tracking-wider ${selectedDesign === 'ultra-formal' ? 'font-bold' : ''}`}>Manzil</span>
                     <span>{mockData.user.address}</span>
                 </li>
               </ul>
             </div>

             {/* Certificates */}
             <div>
                <h4 className={`text-sm font-black uppercase tracking-widest mb-4 ${selectedDesign === 'modern' ? 'text-white' : ''} ${selectedDesign === 'ultra-formal' ? 'border-b-2 border-black pb-1' : 'border-b border-white/20 pb-2'}`}>
                 Sertifikatlar
               </h4>
               <ul className="flex flex-col gap-5 text-sm">
                 {mockData.certificates.map(cert => (
                   <li key={cert.id}>
                     <div className={`font-bold ${selectedDesign === 'ultra-formal' ? '' : selectedDesign === 'formal' ? 'text-slate-800' : 'text-white'}`}>
                       {cert.title}
                     </div>
                     <div className="opacity-80 text-xs mt-1">{cert.provider}</div>
                     <div className="opacity-60 text-xs italic">{cert.date}</div>
                   </li>
                 ))}
               </ul>
             </div>

           </div>

           {/* RIGHT COLUMN */}
           <div className={`w-full md:w-[65%] flex flex-col ${t.rightCol}`}>
              
              {/* Header inside Right Column */}
              <div className="mb-10">
                <h2 className={t.name}>
                  {mockData.user.firstName} {mockData.user.lastName}
                </h2>
                <div className={`text-xl tracking-wide ${t.accent}`}>{mockData.user.profession}</div>
              </div>

              {/* Profile / About */}
              <div className="mb-10">
                <h3 className={t.sectionTitle}>Profil</h3>
                <p className="leading-relaxed text-sm">
                  {mockData.user.aboutMe}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-10">
                <h3 className={t.sectionTitle}>Ish Tajribasi</h3>
                <div className="flex flex-col gap-2">
                   {mockData.experiences.map((exp) => (
                     <div key={exp.id} className={t.itemBorder}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-lg ${t.accent}`}>{exp.role}</h4>
                          <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 shrink-0">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <div className={`text-sm font-bold mb-2 ${selectedDesign === 'ultra-formal' ? '' : 'text-slate-500'}`}>
                          {exp.company}
                        </div>
                        <p className="text-sm leading-relaxed">
                          {exp.description}
                        </p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className={t.sectionTitle}>Loyihalar</h3>
                <div className="flex flex-col gap-2">
                   {mockData.projects.map((proj) => (
                     <div key={proj.id} className={t.itemBorder}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`text-md ${t.accent}`}>{proj.title}</h4>
                          {proj.demoLink && (
                            <span className="text-xs text-indigo-600 underline">
                              {proj.demoLink}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed mt-1">
                          {proj.description}
                        </p>
                     </div>
                   ))}
                </div>
              </div>

           </div>
        </div>
      </div>

    </motion.div>
  );
};

export default CV;
