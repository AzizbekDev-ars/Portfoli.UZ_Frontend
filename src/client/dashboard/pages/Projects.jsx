import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import api from '../../../services/api';

// Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const EditIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const GithubIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const ExternalLinkIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>;
const XIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

// Separate Form Component to avoid re-renders on input
const FormContent = ({ onSubmit, title, buttonText, onCancel, formData, setFormData, handleInputChange }) => (
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
          name="projectname" 
          value={formData.projectname} 
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
            name="codeLink" 
            value={formData.codeLink} 
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

const Projects = () => {
  const { t } = useLang();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProj, setCurrentProj] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    projectname: '',
    description: '',
    codeLink: '',
    demoLink: '',
    image: '',
    file: null
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/project');
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAdd = () => {
    setFormData({ projectname: '', description: '', codeLink: '', demoLink: '', image: '', file: null });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setCurrentProj(proj);
    setFormData({ 
        projectname: proj.projectname, 
        description: proj.description, 
        codeLink: proj.codeLink, 
        demoLink: proj.demoLink, 
        image: proj.image, 
        file: null 
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Rostdan ham ushbu loyihani o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/project/${id}`);
        setProjects(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  const handleToggleCV = async (id) => {
    const proj = projects.find(p => p._id === id);
    const isCurrentlyCV = proj?.isCV;
    
    if (!isCurrentlyCV) {
      const cvCount = projects.filter(p => p.isCV).length;
      if (cvCount >= 3) {
        alert("CV uchun faqat 3 ta loyiha tanlash mumkin. Iltimos bittasini navbatdan olib tashlang.");
        return;
      }
    }

    try {
      const res = await api.put(`/project/${id}`, { isCV: !isCurrentlyCV });
      setProjects(prev => prev.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error("Error toggling CV status:", err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('projectname', formData.projectname);
    data.append('description', formData.description);
    data.append('codeLink', formData.codeLink);
    data.append('demoLink', formData.demoLink);
    if (formData.file) {
      data.append('project_image', formData.file);
    }

    try {
      const res = await api.post('/project', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjects([res.data, ...projects]);
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('projectname', formData.projectname);
    data.append('description', formData.description);
    data.append('codeLink', formData.codeLink);
    data.append('demoLink', formData.demoLink);
    if (formData.file) {
      data.append('project_image', formData.file);
    }

    try {
      const res = await api.put(`/project/${currentProj._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjects(prev => prev.map(p => p._id === currentProj._id ? res.data : p));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const filteredProjects = projects.filter(proj => 
    proj.projectname?.toLowerCase().includes(searchQuery.toLowerCase())
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
              key={proj._id} 
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
                     onClick={() => handleDelete(proj._id)}
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
                    {proj.projectname}
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
                  onClick={() => handleToggleCV(proj._id)}
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
              formData={formData}
              setFormData={setFormData}
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
              title="Loyihani Yangilash" 
              buttonText="Saqlash" 
              onSubmit={handleEditSubmit} 
              onCancel={() => setIsEditModalOpen(false)} 
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Projects;
