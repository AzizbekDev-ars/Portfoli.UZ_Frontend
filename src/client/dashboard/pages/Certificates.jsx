import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import api from '../../../services/api';

// Icons
const SearchIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const EditIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
const TrashIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const MapPinIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const CalendarIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const XIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const LinkIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>;
const GlobeIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.041 9.041 0 01-3.987-.933L8.25 18l1.335-2.67A4.451 4.451 0 0010.5 13.5V12a1.5 1.5 0 00-1.5-1.5h-1.5A1.5 1.5 0 016 9V7.5a1.5 1.5 0 00-1.5-1.5h-.75m11.25 0h.75A1.5 1.5 0 0118 7.5V9a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 011.5 1.5v3.933a9.041 9.041 0 01-3.987.933M12 21a9 9 0 009-9V9a9 9 0 00-9-9 9 9 0 00-9 9v3a9 9 0 009 9z" /></svg>;

// Separate Form Component
const FormContent = ({ onSubmit, title, buttonText, onCancel, formData, setFormData, handleInputChange, loading }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white dark:bg-[#0a0a0a] w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 relative border border-slate-200 dark:border-white/10 z-50 max-h-[90vh] overflow-y-auto"
    onClick={e => e.stopPropagation()}
  >
    <button 
      type="button" 
      onClick={onCancel}
      className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
    >
      <XIcon />
    </button>

    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{title}</h2>
    
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Sertifikat Surati</label>
        <div className="flex items-center gap-4 w-full">
          {formData.image && (
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-20 h-20 object-cover rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm shrink-0" 
            />
          )}
          <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl px-4 py-6 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center group">
             <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">
               {formData.image ? "Rasmni almashtirish" : "Sertifikat suratini yuklash"}
             </span>
             <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">.jpg, .png, .jpeg</span>
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
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">Sertifikat Nomi</label>
          <input 
            required 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm font-medium" 
            placeholder="Masalan: React Developer..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">Olingan Sana</label>
          <input 
            required 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleInputChange}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm [color-scheme:light] dark:[color-scheme:dark]" 
          />
        </div>
        <div>
           <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">Taqdim Etuvchi</label>
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
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">Sertifikat Linki (Ixtiyoriy)</label>
        <input 
          type="url" 
          name="url" 
          value={formData.url || ''} 
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm" 
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">Qisqacha Tafsif</label>
        <textarea 
          required 
          rows="3" 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange}
          className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm resize-none leading-relaxed" 
          placeholder="Nimalar o'rganildi, qanday natijalar..."
        ></textarea>
      </div>

      <div className="flex justify-end gap-3 mt-4">
         <button 
           type="button" 
           onClick={onCancel}
           className="px-6 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
         >
           Bekor qilish
         </button>
         <button 
           type="submit" 
           disabled={loading}
           className="px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-all shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50"
         >
           {loading ? "Yuklanmoqda..." : buttonText}
         </button>
      </div>
    </form>
  </motion.div>
);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' });
  } catch (e) {
    return dateStr;
  }
};

const Certificates = () => {
  const { t } = useLang();
  
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  // New Link Flow State
  const [addMethod, setAddMethod] = useState(null); // 'link' or 'manual'
  const [certUrl, setCertUrl] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    image: '',
    url: '',
    file: null
  });

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await api.get('/certificate');
      setCertificates(res.data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAdd = () => {
    setFormData({ 
      title: '', 
      provider: '', 
      date: new Date().toISOString().split('T')[0], 
      description: '', 
      image: '', 
      url: '',
      file: null 
    });
    setAddMethod(null);
    setCertUrl('');
    setVerifyError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setCurrentCert(cert);
    setFormData({ ...cert, file: null });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Rostdan ham ushbu sertifikatni o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/certificate/${id}`);
        setCertificates(prev => prev.filter(c => c._id !== id));
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  const handleVerifyLink = async () => {
    if (!certUrl) return;
    setVerifyLoading(true);
    setVerifyError('');
    try {
      const res = await api.post('/certificate/verify-link', { url: certUrl });
      if (res.data.success) {
        const certData = res.data.data;
        setFormData(prev => ({
          ...prev,
          title: certData.title || '',
          provider: certData.provider || '',
          description: certData.description || '',
          image: certData.image || '',
          url: certUrl
        }));
        setAddMethod('manual'); // Open the form with pre-filled data
      }
    } catch (err) {
      setVerifyError(err.response?.data?.message || "Sertifikat topilmadi. Iltimos linkni tekshiring yoki qo'lda qo'shing.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('provider', formData.provider);
    data.append('date', formData.date);
    data.append('description', formData.description);
    if (formData.url) data.append('url', formData.url);
    
    // If we have a file (manual upload)
    if (formData.file) {
      data.append('certificate_image', formData.file);
    } 
    // If we have only a URL (from link verification)
    else if (formData.image) {
      data.append('image_url', formData.image);
    }

    try {
      const res = await api.post('/certificate', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCertificates([res.data, ...certificates]);
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + (err.response?.data?.message || err.message));
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('provider', formData.provider);
    data.append('date', formData.date);
    data.append('description', formData.description);
    if (formData.url) data.append('url', formData.url);

    if (formData.file) {
      data.append('certificate_image', formData.file);
    }

    try {
      const res = await api.put(`/certificate/${currentCert._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCertificates(prev => prev.map(c => c._id === currentCert._id ? res.data : c));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Xatolik: " + (err.response?.data?.message || err.message));
    } finally {
      setFormLoading(false);
    }
  };

  const filteredCerts = certificates.filter(cert => 
    cert.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-full text-slate-500 font-bold uppercase tracking-widest text-xs">Yuklanmoqda...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-12 h-full flex flex-col"
    >
      {/* HEADER SECTION (Top) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-10 mt-2">
        
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Sertifikatlar
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Qidirsh..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-sm"
            />
          </div>

          {/* Add Button */}
          <button 
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-black/10"
          >
            <PlusIcon />
            <span>Qo'shish</span>
          </button>
        </div>

      </div>

      {/* CARDS GRID (Bottom) */}
      {filteredCerts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 text-slate-400 dark:text-slate-500">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <GlobeIcon />
          </div>
          <p className="text-sm font-black uppercase tracking-widest opacity-50">Sertifikatlar topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCerts.map((cert) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={cert._id} 
              className="group bg-white dark:bg-black rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              {/* Image Area */}
              <div className="h-52 w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image' }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Action Buttons as Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                   <button 
                     onClick={() => handleOpenEdit(cert)}
                     className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-black flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                     title="Yangilash"
                   >
                     <EditIcon />
                   </button>
                   <button 
                     onClick={() => handleDelete(cert._id)}
                     className="w-10 h-10 rounded-xl bg-red-500/90 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors"
                     title="O'chirish"
                   >
                     <TrashIcon />
                   </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tight mb-4 group-hover:text-indigo-500 transition-colors">
                  {cert.title}
                </h3>
                
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                      <MapPinIcon />
                    </div>
                    <span>{cert.provider}</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                      <CalendarIcon />
                    </div>
                    <span>{formatDate(cert.date)}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed italic mb-4">
                  "{cert.description}"
                </p>

                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-auto text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest group/link"
                  >
                    <span>Sertifikatni ko'rish</span>
                    <svg className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            {addMethod === null ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative border border-slate-200 dark:border-white/10 z-50"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-wider text-center">Sertifikat qo'shish</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setAddMethod('link')}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <LinkIcon />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Link orqali</div>
                      <div className="text-xs text-slate-500 font-medium">Linkdan avtomatik to'ldirish</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setAddMethod('manual')}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <PlusIcon />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Qo'lda qo'shish</div>
                      <div className="text-xs text-slate-500 font-medium">Barcha ma'lumotlarni o'zingiz kiritasiz</div>
                    </div>
                  </button>
                </div>
              </motion.div>
            ) : addMethod === 'link' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative border border-slate-200 dark:border-white/10 z-50"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setAddMethod(null)} className="absolute top-8 left-8 text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                
                <div className="mt-8 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto mb-6">
                    <LinkIcon />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest">Sertifikat Linki</h2>
                  <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-widest">Linkdan ma'lumotlarni avtomatik olamiz</p>
                  
                  <div className="space-y-4">
                    <input 
                      type="url" 
                      placeholder="https://coursera.org/verify/..."
                      value={certUrl}
                      onChange={(e) => setCertUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    
                    {verifyError && (
                      <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider text-left bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-200 dark:border-red-500/20 leading-relaxed">
                        {verifyError}
                      </p>
                    )}

                    <button 
                      onClick={handleVerifyLink}
                      disabled={verifyLoading || !certUrl}
                      className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {verifyLoading ? "Tekshirilmoqda..." : "Sertifikatni topish"}
                    </button>

                    <button 
                      onClick={() => setAddMethod('manual')}
                      className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      O'zim qo'shaman
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <FormContent 
                title="Sertifikat Ma'lumotlari" 
                buttonText="Saqlash" 
                onSubmit={handleAddSubmit} 
                onCancel={() => setAddMethod(null)} 
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                loading={formLoading}
              />
            )}
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsEditModalOpen(false)}
            />
            <FormContent 
              title="Sertifikatni Yangilash" 
              buttonText="Saqlash" 
              onSubmit={handleEditSubmit} 
              onCancel={() => setIsEditModalOpen(false)} 
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
              loading={formLoading}
            />
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Certificates;
