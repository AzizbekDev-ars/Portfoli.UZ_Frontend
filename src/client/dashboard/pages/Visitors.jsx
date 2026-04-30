import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';
import UpgradePlaceholder from '../components/UpgradePlaceholder';
import api from '../../../services/api';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler );

const DeleteIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const MailIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;

const Visitors = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({ totalVisits: 0, uniqueVisitors: 0 });
  const [dailyStats, setDailyStats] = useState([]);
  const [countryStats, setCountryStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isPro, setIsPro] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolioSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsPro(!!parsed.isPro);
    } else {
      setIsPro(false);
    }
  }, []);

  useEffect(() => {
    if (isPro) {
      fetchData();
    }
  }, [isPro]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resList, resDaily, resCountry] = await Promise.all([
        api.get('/visitor'),
        api.get('/visitor/stats/daily'),
        api.get('/visitor/stats/country')
      ]);
      
      setVisitors(resList.data.recentVisitors || []);
      setStats({
        totalVisits: resList.data.totalVisits,
        uniqueVisitors: resList.data.uniqueVisitors
      });
      setDailyStats(resDaily.data);
      setCountryStats(resCountry.data);
    } catch (err) {
      console.error("Error fetching visitor data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsPro(true);
    const saved = localStorage.getItem("portfolioSettings") || "{}";
    const parsed = JSON.parse(saved);
    parsed.isPro = true;
    localStorage.setItem("portfolioSettings", JSON.stringify(parsed));
    alert("Tabriklaymiz! Siz endi PRO tarifidasiz 🎉");
  };
  
  // Filter States
  const [sortDate, setSortDate] = useState('desc');
  const [filterCity, setFilterCity] = useState('');
  const [filterMsg, setFilterMsg] = useState('');
  const [filterCV, setFilterCV] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const txt = t.dashboard?.visitors || {};

  // Extract unique cities
  const uniqueCities = [...new Set(visitors.map(v => v.city).filter(Boolean))];

  // Filtering & Sorting Logic
  const processedVisitors = useMemo(() => {
    let result = visitors.filter(v => 
      v.city?.toLowerCase().includes(search.toLowerCase()) || 
      v.ip?.toLowerCase().includes(search.toLowerCase())
    );

    if (filterCity) {
      result = result.filter(v => v.city === filterCity);
    }
    if (filterMsg) {
      const wantMsg = filterMsg === 'yes';
      result = result.filter(v => v.hasMsg === wantMsg);
    }
    if (filterCV) {
      const wantCV = filterCV === 'yes';
      result = result.filter(v => v.hasCV === wantCV);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.visitedAt).getTime();
      const dateB = new Date(b.visitedAt).getTime();
      return sortDate === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [visitors, search, filterCity, filterMsg, filterCV, sortDate]);

  // Pagination Logic
  const totalPages = Math.ceil(processedVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVisitors = processedVisitors.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    if(window.confirm("Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz?")) {
      try {
        await api.delete(`/visitor/${id}`);
        setVisitors(visitors.filter(v => v._id !== id));
      } catch (err) {
        alert("Xatolik: " + err.message);
      }
    }
  };

  // Chart Setup
  const lineChartData = {
    labels: dailyStats.map(s => s._id),
    datasets: [{
      label: txt.title || 'Tashriflar',
      data: dailyStats.map(s => s.total),
      fill: true,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
      tension: 0.4,
    }]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { 
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(150, 150, 150, 0.1)' }, beginAtZero: true }
    }
  };

  const barChartData = {
    labels: countryStats.map(s => s._id),
    datasets: [{
      label: 'Visits',
      data: countryStats.map(s => s.total),
      backgroundColor: '#8b5cf6',
      borderRadius: 4,
    }]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { 
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(150, 150, 150, 0.1)' }, beginAtZero: true }
    }
  };

  const formatDate = (ds) => {
    const d = new Date(ds);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  if (!isPro) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-12">
        <UpgradePlaceholder 
          title="Tashriflar Statistikasi (PRO)" 
          description="Sizning portfolio sahifangizga kimlar kirmoqda, qaysi shahardan ekanligi va grafiklarni kuzatish uchun PRO tarifiga o'ting." 
          onUpgradeClick={() => setIsPaymentModalOpen(true)} 
        />
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-12"
    >
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Umumiy ko'rishlar</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalVisits}</h3>
           </div>
           <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
           </div>
        </div>
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Noyob tashrif buyuruvchilar</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.uniqueVisitors}</h3>
           </div>
           <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
           </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {txt.lineChartTitle || "Oylik tashriflar"}
          </h2>
          <div className="flex-1 w-full overflow-hidden relative">
            {dailyStats.length > 0 ? (
              <Line data={lineChartData} options={lineChartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">Ma'lumot yetarli emas</div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {txt.barChartTitle || "Tashriflar shaharlar bo'yicha"}
          </h2>
          <div className="flex-1 w-full overflow-hidden relative">
            {countryStats.length > 0 ? (
              <Bar data={barChartData} options={barChartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">Ma'lumot yetarli emas</div>
            )}
          </div>
        </div>

      </div>

      {/* TABLE SECTION */}
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
        
        {/* Filters Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
               {txt.title || "Tashrif buyuruvchilar"}
            </h2>
            <div className="relative w-full sm:w-72">
               <input 
                 type="text" 
                 placeholder={txt.search || "Qidirish..."}
                 value={search}
                 onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                 className="w-full bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-transparent focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all"
               />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort Date */}
            <select 
              value={sortDate} onChange={(e) => { setSortDate(e.target.value); setCurrentPage(1); }}
              className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500"
            >
              <option className="text-slate-900" value="desc">{txt.fDateDesc || 'Eng yangilari'}</option>
              <option className="text-slate-900" value="asc">{txt.fDateAsc || 'Eng eskilar'}</option>
            </select>

            {/* Filter City */}
            <select 
              value={filterCity} onChange={(e) => { setFilterCity(e.target.value); setCurrentPage(1); }}
              className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500"
            >
              <option className="text-slate-900" value="">{txt.fCityAll || 'Barcha shaharlar'}</option>
              {uniqueCities.map(c => <option className="text-slate-900" key={c} value={c}>{c}</option>)}
            </select>

            {/* Filter Msg */}
            <select 
              value={filterMsg} onChange={(e) => { setFilterMsg(e.target.value); setCurrentPage(1); }}
              className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500"
            >
              <option className="text-slate-900" value="">{txt.fMsgAll || 'Xabar holati'}</option>
              <option className="text-slate-900" value="yes">{txt.yes || 'Ha'}</option>
              <option className="text-slate-900" value="no">{txt.no || "Yo'q"}</option>
            </select>

            {/* Filter CV */}
            <select 
              value={filterCV} onChange={(e) => { setFilterCV(e.target.value); setCurrentPage(1); }}
              className="bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-200 outline-none px-3 py-2 rounded-xl focus:border-indigo-500"
            >
              <option className="text-slate-900" value="">{txt.fCVAll || 'CV holati'}</option>
              <option className="text-slate-900" value="yes">{txt.yes || 'Ha'}</option>
              <option className="text-slate-900" value="no">{txt.no || "Yo'q"}</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">IP / Qurilma</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vaqt</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Shahar / Davlat</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sahifa</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Metod</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {currentVisitors.length > 0 ? currentVisitors.map((v) => (
                <tr key={v._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs shadow-sm border border-indigo-500/20">
                      {v.country?.slice(0, 2) || '??'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{v.ip || 'Unknown IP'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{v.userAgent?.slice(0, 30)}...</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {formatDate(v.visitedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {v.city || 'Unknown'}, {v.country || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {v.page || '/'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {v.method || 'GET'}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleDelete(v._id)}
                      title={txt.btnDelete}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    {txt.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-300 transition-colors"
              >
                {txt.prev}
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-300 transition-colors"
              >
                {txt.next}
              </button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Visitors;
