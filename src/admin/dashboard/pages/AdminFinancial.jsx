import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../API/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const AdminFinancial = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalExpenses: 0 });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTx, setNewTx] = useState({ type: 'income', amount: '', reason: '', date: new Date().toISOString().split('T')[0] });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transRes, statsRes] = await Promise.all([
        api.apiAdmin.get('/admin/transactions'),
        api.apiAdmin.get('/admin/stats')
      ]);
      setTransactions(transRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Financial data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ushbu tranzaksiyani o'chirmoqchimisiz?")) {
      try {
        await api.apiAdmin.delete(`/admin/transactions/${id}`);
        fetchData();
      } catch (err) {
        alert("Xatolik yuz berdi");
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.apiAdmin.post('/admin/transactions', newTx);
      setShowAddModal(false);
      setNewTx({ type: 'income', amount: '', reason: '', date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch (err) {
      alert("Xatolik yuz berdi");
    }
  };



  // --- CALCULATE DYNAMIC CHART DATA ---
  const getLineChartData = () => {
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const currentMonth = new Date().getMonth();
    const last7Months = [];
    for (let i = 6; i >= 0; i--) {
      let m = currentMonth - i;
      if (m < 0) m += 12;
      last7Months.push(months[m]);
    }

    const incomeData = new Array(7).fill(0);
    const expenseData = new Array(7).fill(0);

    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      const txMonth = months[txDate.getMonth()];
      const idx = last7Months.indexOf(txMonth);
      if (idx !== -1) {
        if (tx.type === 'income') incomeData[idx] += tx.amount;
        else expenseData[idx] += tx.amount;
      }
    });

    return {
      labels: last7Months,
      datasets: [
        {
          label: 'Kirim (UZS)',
          data: incomeData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Chiqim (UZS)',
          data: expenseData,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const getPieChartData = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(ex => {
      const cat = ex.reason || 'Boshqa';
      categories[cat] = (categories[cat] || 0) + ex.amount;
    });

    const sortedLabels = Object.keys(categories).sort((a, b) => categories[b] - categories[a]).slice(0, 5);
    const sortedData = sortedLabels.map(l => categories[l]);

    // If no data, show empty state
    if (sortedData.length === 0) {
      return {
        labels: ['Ma\'lumot yo\'q'],
        datasets: [{ data: [1], backgroundColor: ['#334155'], borderWidth: 0 }]
      };
    }

    return {
      labels: sortedLabels,
      datasets: [
        {
          data: sortedData,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 4
        }
      ]
    };
  };

  const lineChartData = getLineChartData();
  const pieChartData = getPieChartData();

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          color: '#94a3b8', 
          font: { family: 'Inter', size: 10 },
          callback: (value) => value.toLocaleString()
        }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'right',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 10 }, padding: 15 }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 md:space-y-8 pb-10"
    >
      {/* 1. HEADER & BALANCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2 p-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group min-h-[160px]">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.57-.24-3.11-.93-4.14-2.04l1.45-1.45c.7.75 1.76 1.25 2.69 1.4v-3.08c-1.89-.66-3.8-1.55-3.8-4.04 0-2.02 1.48-3.56 3.8-3.95V3h2.82v1.94c1.29.17 2.4.67 3.25 1.37l-1.38 1.44c-.5-.41-1.14-.73-1.87-.85v2.9c1.94.75 4 1.63 4 4.14 0 2.22-1.63 3.82-4 4.15z"/></svg>
          </div>
          <div>
            <p className="text-emerald-100/80 font-medium text-sm">Umumiy Hisob (Current Balance)</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">{(stats.totalRevenue - stats.totalExpenses).toLocaleString()} <span className="text-lg md:text-xl font-medium">UZS</span></h2>
          </div>
          <div className="mt-8 flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-emerald-600 bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">U{i}</div>)}
             </div>
             <p className="text-xs text-emerald-500 bg-white px-3 py-1 rounded-full font-bold">Safe & Secured</p>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-center gap-4 shadow-lg backdrop-blur-sm">
           <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm font-medium">Umumiy Kirim</span>
              <span className="text-emerald-500 font-bold text-xs">+100%</span>
           </div>
           <p className="text-2xl font-bold text-white">{stats.totalRevenue.toLocaleString()} UZS</p>
           <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[100%]"></div>
           </div>
           <p className="text-[10px] text-slate-500">Platforma umumiy daromadi</p>
        </div>
      </div>

      {/* 2. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md flex flex-col">
          <h3 className="font-bold text-base md:text-lg mb-6">Oylik Kirim va Chiqim</h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md flex flex-col">
          <h3 className="font-bold text-base md:text-lg mb-6">Xarajatlar Taqsiboti</h3>
          <div className="h-[250px] md:h-[300px] w-full flex items-center justify-center">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* 3. TRANSACTION TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-white">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Tranzaksiyalar Tarixi
          </h2>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] md:text-xs font-bold text-white transition-all">CSV Export</button>
             <button 
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] md:text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
             >
              Yangi qo'shish
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Turi</th>
                <th className="px-6 py-4 font-semibold">Miqdor</th>
                <th className="px-6 py-4 font-semibold">Sabab / Maqsad</th>
                <th className="px-6 py-4 font-semibold">Sana</th>
                <th className="px-6 py-4 font-semibold text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {transactions.map((tx) => (
                  <motion.tr 
                    key={tx._id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4 text-white">
                      {tx.type === 'income' ? (
                        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 w-max px-3 py-1.5 rounded-lg border border-emerald-500/20">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span className="text-[10px] font-bold uppercase">Kirim</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 w-max px-3 py-1.5 rounded-lg border border-rose-500/20">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                          </svg>
                          <span className="text-[10px] font-bold uppercase">Chiqim</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()} UZS
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      {tx.reason}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(tx._id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100"
                        title="O'chirish"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    Tranzaksiyalar mavjud emas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- ADD TRANSACTION MODAL --- */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#161B22] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                  Tranzaksiya qo'shish
                </h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Turi</label>
                  <select 
                    value={newTx.type}
                    onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="income" className="bg-[#161B22]">Kirim</option>
                    <option value="expense" className="bg-[#161B22]">Chiqim</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Miqdor (UZS)</label>
                  <input 
                    type="number" required
                    value={newTx.amount}
                    onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                    placeholder="Masalan: 50000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Sabab / Maqsad</label>
                  <input 
                    type="text" required
                    value={newTx.reason}
                    onChange={(e) => setNewTx({ ...newTx, reason: e.target.value })}
                    placeholder="Masalan: Pro Obuna (Foydalanuvchi)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Sana</label>
                  <input 
                    type="date" required
                    value={newTx.date}
                    onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 mt-2"
                >
                  Saqlash
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export default AdminFinancial;
