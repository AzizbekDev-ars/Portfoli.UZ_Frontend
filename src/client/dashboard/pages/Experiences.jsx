import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';

// Simple Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const EditIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const XIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const CalendarIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const BuildingIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const BriefcaseIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;

const initialExperiences = [
  { 
    id: 1, 
    company: 'Meta', 
    role: 'Senior Frontend Engineer', 
    startDate: '2022-01-10', 
    endDate: 'Hozirgacha', 
    description: 'React va qoshimcha kutubxonalar yordamida yirik web ilovalarning old qismini yozish. Jamoaga yangi kelgan dasturchilarga yordam berish va kodlarni code-review qilish. Katta hajmdagi ma\'lumotlar bilan ishlash va render jarayonini optimallashtirish.',
    isCV: true 
  },
  { 
    id: 2, 
    company: 'EPAM Systems', 
    role: 'Middle JavaScript Developer', 
    startDate: '2019-05-15', 
    endDate: '2021-12-30', 
    description: 'Murakkab mijozlar uchun web ilovalarni ishlab chiqish, kodlarni optimallashtirish va takrorlanmas UI kutubxonalar yaratish. Backend dasturchilar bilan API integratsiyalarini amalga oshirish.',
    isCV: true 
  },
  { 
    id: 3, 
    company: 'Najot Ta\'lim', 
    role: 'Frontend Mentor', 
    startDate: '2018-09-01', 
    endDate: '2019-04-30', 
    description: 'O\'quvchilarga veb-dasturlash (HTML, CSS, JS) asoslarini o\'rgatish. Amaliy loyihalar ustida ishlash.',
    isCV: false 
  },
];

const Experiences = () => {
  const { t } = useLang();
  
  const [experiences, setExperiences] = useState(initialExperiences);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const filteredExps = experiences.filter(exp => 
    exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAdd = () => {
    setFormData({ company: '', role: '', startDate: '', endDate: '', description: '' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setCurrentExp(exp);
    setFormData({ ...exp });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Rostdan ham ushbu tajribani o'chirmoqchimisiz?")) {
      setExperiences(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleToggleCV = (id) => {
    setExperiences(prev => {
      const isCurrentlyCV = prev.find(p => p.id === id)?.isCV;
      if (!isCurrentlyCV) {
        // Checking limit
        const cvCount = prev.filter(p => p.isCV).length;
        if (cvCount >= 2) {
          alert("CV uchun faqat 2 ta tajriba tanlash mumkin. Iltimos bittasini o'chiring.");
          return prev;
        }
      }
      return prev.map(p => p.id === id ? { ...p, isCV: !p.isCV } : p);
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newExp = { ...formData, id: Date.now() };
    setExperiences([newExp, ...experiences]);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setExperiences(prev => prev.map(c => c.id === currentExp.id ? { ...formData, id: currentExp.id } : c));
    setIsEditModalOpen(false);
  };

  // Rendering the form to avoid duplication
  const FormContent = ({ onSubmit, title, buttonText, onCancel }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-[#0a0a0a] w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 relative border border-slate-200 dark:border-white/10 z-50 max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <button 
        type="button" 
        onClick={onCancel}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <XIcon />
      </button>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{title}</h2>
      
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Kompaniya nomi</label>
            <input 
              required 
              type="text" 
              name="company" 
              value={formData.company} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="Masalan: Google, EPAM..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Lavozim</label>
            <input 
              required 
              type="text" 
              name="role" 
              value={formData.role} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="Masalan: Senior Frontend Engineer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Boshlanish Sanasi</label>
            <input 
              required 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm [color-scheme:light] dark:[color-scheme:dark]" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Tugash Sanasi</label>
            <input 
              required 
              type="text" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="Masalan: 2023-01-10 yoki 'Hozirgacha'"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Batafsil ma'lumot (Vazifalar)</label>
          <textarea 
            required 
            rows="5" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none" 
            placeholder="Nimalar qilingan, qanday vazifalar bajarilgan..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-4">
           <button 
             type="button" 
             onClick={onCancel}
             className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
           >
             Bekor qilish
           </button>
           <button 
             type="submit" 
             className="px-6 py-3 rounded-xl text-sm font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg"
           >
             {buttonText}
           </button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-12 h-full flex flex-col"
    >
      {/* HEADER SECTION (Top) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8">
        
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Tajribalar (Work Experience)
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Kompaniya yoki lavozim izlash..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow shadow-sm"
            />
          </div>

          {/* Add Button */}
          <button 
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <PlusIcon />
            <span>Yangi qo'shish</span>
          </button>
        </div>

      </div>

      {/* LIST SECTION (Bottom - 1 Column Full Width) */}
      {filteredExps.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 text-slate-400 dark:text-slate-500">
          <BriefcaseIcon />
          <p className="text-lg font-medium mt-4">Hech qanday tajriba topilmadi...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredExps.map((exp) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={exp.id} 
              className="group bg-white dark:bg-black w-full rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-start gap-6"
            >
              {/* Primary Info (Left) */}
              <div className="flex-1 flex flex-col gap-3 shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl leading-tight uppercase tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <span className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    <BuildingIcon />
                    {exp.company}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <CalendarIcon />
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
              </div>

              {/* Description & Actions (Right) */}
              <div className="flex-[2] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-3 shrink-0 w-full sm:w-auto">
                   <button 
                     onClick={() => handleToggleCV(exp.id)}
                     className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-colors font-semibold text-sm ${
                       exp.isCV 
                         ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
                         : 'bg-white border-slate-200 text-slate-500 dark:bg-black dark:border-white/10 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                     }`}
                   >
                     <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <span>{exp.isCV ? "CV da bor" : "CV ga qo'shish"}</span>
                   </button>
                   <button 
                     onClick={() => handleOpenEdit(exp)}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors font-semibold text-sm"
                   >
                     <EditIcon />
                     <span>Yangilash</span>
                   </button>
                   <button 
                     onClick={() => handleDelete(exp.id)}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors font-semibold text-sm"
                   >
                     <TrashIcon />
                     <span>O'chirish</span>
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* --- MODALS --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <FormContent 
              title="Yangi Tajriba" 
              buttonText="Qo'shish" 
              onSubmit={handleAddSubmit} 
              onCancel={() => setIsAddModalOpen(false)} 
            />
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <FormContent 
              title="Tajribani Yangilash" 
              buttonText="Saqlash" 
              onSubmit={handleEditSubmit} 
              onCancel={() => setIsEditModalOpen(false)} 
            />
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Experiences;
