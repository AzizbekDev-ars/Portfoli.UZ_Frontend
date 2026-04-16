import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';

// Simple Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const EditIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const XIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const GithubIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>;
const ExternalLinkIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>;

const initialProjects = [
  { 
    id: 1, 
    title: 'E-commerce React Ilova', 
    description: 'Zamonaviy e-commerce loyiha. React, Redux, va TailwindCSS orqali yozilgan. To\'lov tizimlari va korzina funksiyasi to\'liq mavjud.', 
    githubLink: 'https://github.com/user/e-commerce',
    demoLink: 'https://myecommerce.uz',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80',
    isCV: true
  },
  { 
    id: 2, 
    title: 'Chat Ilovasi (Real-time)', 
    description: 'Socket.io va MERN (MongoDB, Express, React, Node.js) yordamida yozilgan jonli suhbat ilovasi. 1-to-1 guruh chatlarini qo\'llab quvvatlaydi.', 
    githubLink: 'https://github.com/user/chat-app',
    demoLink: 'https://chat.example.com',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=600&q=80',
    isCV: true
  },
  { 
    id: 3, 
    title: 'Portfolio Sayt', 
    description: 'Frontend dasturchilar uchun maxsus platforma. MERN stack asosida yaratilgan.', 
    githubLink: 'https://github.com/user/portfolio',
    demoLink: 'https://portfolio.uz',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    isCV: false
  },
];

const Projects = () => {
  const { t } = useLang();
  
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProj, setCurrentProj] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    demoLink: '',
    image: ''
  });

  const filteredProjects = projects.filter(proj => 
    proj.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAdd = () => {
    setFormData({ title: '', description: '', githubLink: '', demoLink: '', image: '' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setCurrentProj(proj);
    setFormData({ ...proj });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Rostdan ham ushbu loyihani o'chirmoqchimisiz?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleCV = (id) => {
    setProjects(prev => {
      const isCurrentlyCV = prev.find(p => p.id === id)?.isCV;
      if (!isCurrentlyCV) {
        // Checking limit
        const cvCount = prev.filter(p => p.isCV).length;
        if (cvCount >= 3) {
          alert("CV uchun faqat 3 ta loyiha tanlash mumkin. Iltimos bittasini navbatdan olib tashlang.");
          return prev;
        }
      }
      return prev.map(p => p.id === id ? { ...p, isCV: !p.isCV } : p);
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newProj = { ...formData, id: Date.now() };
    setProjects([newProj, ...projects]);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProjects(prev => prev.map(p => p.id === currentProj.id ? { ...formData, id: currentProj.id } : p));
    setIsEditModalOpen(false);
  };

  // Rendering the form to avoid duplication
  const FormContent = ({ onSubmit, title, buttonText, onCancel }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-[#0a0a0a] w-full max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 relative border border-slate-200 dark:border-white/10 z-50 max-h-[90vh] overflow-y-auto"
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
      
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Loyiha Surati</label>
          <div className="flex items-center gap-4 w-full">
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-white/10 shadow-sm shrink-0" 
              />
            )}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl px-4 py-4 cursor-pointer hover:border-black dark:hover:border-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center">
               <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                 {formData.image ? "Rasmni almashtirish" : "Loyiha suratini yuklash"}
               </span>
               <span className="text-xs text-slate-400 mt-1">.jpg, .png, .jpeg</span>
               <input 
                 type="file" 
                 accept="image/*"
                 onChange={(e) => {
                   const file = e.target.files[0];
                   if (file) {
                     setFormData(prev => ({ ...prev, image: URL.createObjectURL(file), file: file }));
                   }
                 }}
                 className="hidden" 
               />
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Loyiha Nomi</label>
          <input 
            required 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
            placeholder="Masalan: E-commerce Website..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Loyiha Tafsifi (Description)</label>
          <textarea 
            required 
            rows="3" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none" 
            placeholder="Loyiha haqida qisqacha ma'lumot va ishlatilgan texnologiyalar..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">GitHub Link</label>
            <input 
              type="url" 
              name="githubLink" 
              value={formData.githubLink} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Demo / Live Link</label>
            <input 
              type="url" 
              name="demoLink" 
              value={formData.demoLink} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="https://myliveproject.com"
            />
          </div>
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
          Loyihalar
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Loyiha izlash..." 
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

      {/* CARDS GRID (Bottom) */}
      {filteredProjects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 text-slate-400 dark:text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
          <p className="text-lg font-medium">Hech qanday loyiha topilmadi...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((proj) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={proj.id} 
              className="group bg-white dark:bg-black rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Area */}
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden group">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image' }}
                />
                
                {/* Action Buttons as Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                   <button 
                     onClick={() => handleOpenEdit(proj)}
                     className="w-8 h-8 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center shadow-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                     title="Yangilash"
                   >
                     <EditIcon />
                   </button>
                   <button 
                     onClick={() => handleDelete(proj.id)}
                     className="w-8 h-8 rounded-full bg-white dark:bg-black text-red-500 flex items-center justify-center shadow-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                     title="O'chirish"
                   >
                     <TrashIcon />
                   </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tight">
                    {proj.title}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5">
                  {proj.description}
                </p>

                {/* Footer Let's links */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
                  {proj.githubLink ? (
                     <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors text-xs font-bold">
                       <GithubIcon />
                       <span>Code</span>
                     </a>
                  ) : (
                     <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-white/5 opacity-50 cursor-not-allowed text-slate-400 text-xs font-bold">
                       <GithubIcon />
                       <span>Code</span>
                     </div>
                  )}

                  {proj.demoLink ? (
                     <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors text-xs font-bold">
                       <ExternalLinkIcon />
                       <span>Demo</span>
                     </a>
                  ) : (
                     <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 opacity-50 cursor-not-allowed text-indigo-400 text-xs font-bold">
                       <ExternalLinkIcon />
                       <span>Demo</span>
                     </div>
                  )}
                </div>

                {/* CV Button at the bottom */}
                <button 
                  onClick={() => handleToggleCV(proj.id)}
                  className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-colors font-semibold text-sm ${
                    proj.isCV 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
                      : 'bg-white border-slate-200 text-slate-500 dark:bg-black dark:border-white/10 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{proj.isCV ? "CV da bor" : "CV ga qo'shish"}</span>
                </button>

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
              title="Yangi Loyiha" 
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
              title="Loyihani Yangilash" 
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

export default Projects;
