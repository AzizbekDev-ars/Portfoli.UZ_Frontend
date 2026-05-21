import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../API/axios';

const AdminSupport = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSupportMessages();
    }, []);

    const fetchSupportMessages = async () => {
        try {
            const res = await api.apiAdmin.get('/admin/support');
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching support messages:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.apiAdmin.put(`/admin/support/${id}`, { status });
            setMessages(messages.map(m => m._id === id ? { ...m, status } : m));
        } catch (err) {
            alert("Xatolik: " + err.message);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm("Rostdan ham ushbu habarni o'chirmoqchimisiz?")) return;
        try {
            await api.apiAdmin.delete(`/admin/support/${id}`);
            setMessages(messages.filter(m => m._id !== id));
        } catch (err) {
            alert("Xatolik: " + err.message);
        }
    };

    if (loading) return <div className="p-8 text-slate-400">Yuklanmoqda...</div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-white">Foydalanuvchi murojaatlari</h1>
                <div className="px-4 py-2 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20 text-sm font-bold">
                    Jami: {messages.length}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {messages.length > 0 ? messages.map((msg) => (
                        <motion.div 
                            layout
                            key={msg._id}
                            className={`p-6 bg-white/5 border rounded-2xl transition-all ${msg.status === 'open' ? 'border-rose-500/30' : 'border-white/10 opacity-70'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center font-bold">
                                        {msg.user?.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{msg.user?.username || 'Noma\'lum'}</h3>
                                        <p className="text-xs text-slate-400">{msg.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${msg.status === 'open' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                        {msg.status}
                                    </span>
                                    <p className="text-[10px] text-slate-500">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-rose-400 mb-1">Mavzu: {msg.subject}</h4>
                                <p className="text-sm text-slate-300 bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed">
                                    {msg.message}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                {msg.status === 'open' ? (
                                    <button 
                                        onClick={() => updateStatus(msg._id, 'closed')}
                                        className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                                    >
                                        Yopish (Bajarildi)
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => updateStatus(msg._id, 'open')}
                                        className="px-4 py-2 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                                    >
                                        Qayta ochish
                                    </button>
                                )}
                                <button 
                                    onClick={() => deleteMessage(msg._id)}
                                    className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-lg border border-white/5 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    O'chirish
                                </button>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="py-20 text-center text-slate-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            Hozircha habarlar yo'q
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AdminSupport;
