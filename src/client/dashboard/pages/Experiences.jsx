import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import api from '../../../services/api';

// Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const EditIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const BuildingIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const CalendarIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const BriefcaseIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H18.75V8.25A2.25 2.25 0 0016.5 6H7.5a2.25 2.25 0 00-2.25 2.25v3.65m16.5 0a2.25 2.25 0 01-2.25 2.25H18.75v1.35m-15 0a2.25 2.25 0 012.25-2.25H5.25v-1.35m0 0a2.25 2.25 0 012.25-2.25H7.5V12" /></svg>;
const XIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

// Separate Form Component
const FormContent = ({ onSubmit, title, buttonText, onCancel, formData, handleInputChange }) => (
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

const Experiences = () => {
  const { t } = useLang();
  
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    if(window.confirm("Rostdan ham ushbu tajribani o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/experience/${id}`);
        setExperiences(prev => prev.filter(c => c._id !== id));
      } catch (err) {
        alert("Xatolik yuz berdi: " + err.message);
      }
    }
  };

  const handleToggleCV = async (id) => {
    const exp = experiences.find(p => p._id === id);
    const isCurrentlyCV = exp?.isCV;
    
    if (!isCurrentlyCV) {
      const cvCount = experiences.filter(p => p.isCV).length;
      if (cvCount >= 2) {
        alert("CV uchun faqat 2 ta tajriba tanlash mumkin. Iltimos bittasini o'chiring.");
        return;
      }
    }

    try {
      const res = await api.put(`/experience/${id}`, { isCV: !isCurrentlyCV });
      setExperiences(prev => prev.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error("Error toggling CV status:", err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/experience', formData);
      setExperiences([res.data, ...experiences]);
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/experience/${currentExp._id}`, formData);
      setExperiences(prev => prev.map(c => c._id === currentExp._id ? res.data : c));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };
  const filteredExps = experiences.filter(exp => 
    exp.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-full text-slate-500">Yuklanmoqda...</div>;

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
              key={exp._id} 
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
                <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                   <button 
                     onClick={() => handleToggleCV(exp._id)}
                     className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-wider ${
                       exp.isCV 
                         ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
                         : 'bg-white border-slate-200 text-slate-500 dark:bg-black dark:border-white/10 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                     }`}
                   >
                     <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <span>{exp.isCV ? "CV da bor" : "CV ga qo'shish"}</span>
                   </button>
                   <button 
                     onClick={() => handleOpenEdit(exp)}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-wider"
                   >
                     <EditIcon />
                     <span>Yangilash</span>
                   </button>
                   <button 
                     onClick={() => handleDelete(exp._id)}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-wider"
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
              formData={formData}
              handleInputChange={handleInputChange}
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
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Experiences;
