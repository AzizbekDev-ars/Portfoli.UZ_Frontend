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
const MapPinIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;

const initialCertificates = [
  { id: 1, title: 'Frontend Developer (React)', provider: 'Meta / Coursera', date: '2023-11-01', description: 'Modern UI interfaces, Responsive Design, State Management and Advanced React concepts.', image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'JavaScript Algorithms', provider: 'freeCodeCamp', date: '2022-05-15', description: 'Data structures, algorithm complexity, object oriented programming fundamentals.', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Responsive Web Design', provider: 'Google', date: '2021-08-20', description: 'Accessibility, Mobile First architecture, CSS animations and layout optimization.', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80' },
];

const Certificates = () => {
  const { t } = useLang();
  
  const [certificates, setCertificates] = useState(initialCertificates);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    date: '',
    description: '',
    image: ''
  });

  const filteredCerts = certificates.filter(cert => 
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAdd = () => {
    setFormData({ title: '', provider: '', date: '', description: '', image: '' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setCurrentCert(cert);
    setFormData({ ...cert });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Rostdan ham ushbu sertifikatni o'chirmoqchimisiz?")) {
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCert = { ...formData, id: Date.now() };
    setCertificates([newCert, ...certificates]);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCertificates(prev => prev.map(c => c.id === currentCert.id ? { ...formData, id: currentCert.id } : c));
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
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Sertifikat Surati</label>
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
                 {formData.image ? "Rasmni almashtirish" : "Sertifikat suratini yuklash"}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Sertifikat Nomi</label>
            <input 
              required 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="Masalan: React Developer..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Olingan Sana</label>
            <input 
              required 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm [color-scheme:light] dark:[color-scheme:dark]" 
            />
          </div>
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Qayerdan Olingan</label>
           <input 
              required 
              type="text" 
              name="provider" 
              value={formData.provider} 
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
              placeholder="Masalan: Coursera, Udemy..."
            />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Qisqacha Tafsif (Nima uchun)</label>
          <textarea 
            required 
            rows="3" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none" 
            placeholder="Nimalar o'rganildi, qanday natijalar..."
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
          Sertifikatlar
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Qidirsh..." 
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
      {filteredCerts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 text-slate-400 dark:text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <p className="text-lg font-medium">Hech qanday sertifikat topilmadi...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCerts.map((cert) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={cert.id} 
              className="group bg-white dark:bg-black rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Area */}
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image' }}
                />
                
                {/* Action Buttons as Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => handleOpenEdit(cert)}
                     className="w-8 h-8 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center shadow-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                     title="Yangilash"
                   >
                     <EditIcon />
                   </button>
                   <button 
                     onClick={() => handleDelete(cert.id)}
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
                    {cert.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  <MapPinIcon />
                  <span>{cert.provider}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  <CalendarIcon />
                  <span>{cert.date}</span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mt-auto">
                  {cert.description}
                </p>
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
              title="Yangi Sertifikat" 
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
              title="Sertifikatni Yangilash" 
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

export default Certificates;
