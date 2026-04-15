import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../../contexts/LangContext';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler );

// Dummy Data for Table
const initialVisitors = [
  { id: 1, name: "Azizbek", email: "azizbek@gmail.com", date: "2026-04-10T14:30", city: "Tashkent", avatar: "https://ui-avatars.com/api/?name=Azizbek&background=random", hasMsg: true, hasCV: false },
  { id: 2, name: "Malika", email: "malika@gmail.com", date: "2026-04-11T09:15", city: "Samarkand", avatar: "https://ui-avatars.com/api/?name=Malika&background=random", hasMsg: false, hasCV: true },
  { id: 3, name: "Sardor", email: "sardor@mail.ru", date: "2026-04-11T16:45", city: "Bukhara", avatar: "https://ui-avatars.com/api/?name=Sardor&background=random", hasMsg: true, hasCV: true },
  { id: 4, name: "Nigora", email: "nigora_99@yahoo.com", date: "2026-04-12T11:20", city: "Tashkent", avatar: "https://ui-avatars.com/api/?name=Nigora&background=random", hasMsg: false, hasCV: false },
  { id: 5, name: "Jahongir", email: "jakh.dev@gmail.com", date: "2026-04-12T18:05", city: "Fergana", avatar: "https://ui-avatars.com/api/?name=Jahongir&background=random", hasMsg: true, hasCV: false },
  { id: 6, name: "Kamola", email: "kamola@gmail.com", date: "2026-04-13T10:10", city: "Andijan", avatar: "https://ui-avatars.com/api/?name=Kamola&background=random", hasMsg: false, hasCV: true },
  { id: 7, name: "Bekzod", email: "bekzod@yandex.ru", date: "2026-04-14T15:40", city: "Tashkent", avatar: "https://ui-avatars.com/api/?name=Bekzod&background=random", hasMsg: false, hasCV: false },
  { id: 8, name: "Eldor", email: "eldor@gmail.com", date: "2026-04-14T20:30", city: "Samarkand", avatar: "https://ui-avatars.com/api/?name=Eldor&background=random", hasMsg: true, hasCV: true },
  { id: 9, name: "Madina", email: "m.madina@gmail.com", date: "2026-04-15T08:25", city: "Bukhara", avatar: "https://ui-avatars.com/api/?name=Madina&background=random", hasMsg: true, hasCV: false },
  { id: 10, name: "Zafar", email: "zafar.work@gmail.com", date: "2026-04-15T12:00", city: "Namangan", avatar: "https://ui-avatars.com/api/?name=Zafar&background=random", hasMsg: false, hasCV: true },
];

const DeleteIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const MailIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;

const Visitors = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  
  const [visitors, setVisitors] = useState(initialVisitors);
  const [search, setSearch] = useState('');
  
  // Filter States
  const [sortDate, setSortDate] = useState('desc');
  const [filterCity, setFilterCity] = useState('');
  const [filterMsg, setFilterMsg] = useState('');
  const [filterCV, setFilterCV] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const txt = t.dashboard?.visitors || {};

  // Extract unique cities
  const uniqueCities = [...new Set(initialVisitors.map(v => v.city))];

  // Filtering & Sorting Logic
  const processedVisitors = useMemo(() => {
    let result = visitors.filter(v => 
      v.email.toLowerCase().includes(search.toLowerCase()) || 
      v.name.toLowerCase().includes(search.toLowerCase())
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
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDate === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [visitors, search, filterCity, filterMsg, filterCV, sortDate]);

  // Pagination Logic
  const totalPages = Math.ceil(processedVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVisitors = processedVisitors.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setVisitors(visitors.filter(v => v.id !== id));
  };

  // Chart Setup
  const lineChartData = {
    labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'],
    datasets: [{
      label: txt.title || 'Tashriflar',
      data: [120, 190, 300, 250, 420, 500],
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
      y: { grid: { color: 'rgba(150, 150, 150, 0.1)' } }
    }
  };

  const barChartData = {
    labels: ['Tashkent', 'Samarkand', 'Bukhara', 'Fergana', 'Andijan'],
    datasets: [{
      label: 'Visits',
      data: [45, 20, 15, 10, 10],
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
      y: { grid: { color: 'rgba(150, 150, 150, 0.1)' } }
    }
  };

  const formatDate = (ds) => {
    const d = new Date(ds);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-12"
    >
      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {txt.lineChartTitle || "Oylik tashriflar"}
          </h2>
          <div className="flex-1 w-full overflow-hidden relative">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {txt.barChartTitle || "Tashriflar shaharlar bo'yicha"}
          </h2>
          <div className="flex-1 w-full overflow-hidden relative">
            <Bar data={barChartData} options={barChartOptions} />
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
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{txt.colUser}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{txt.colDate}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{txt.colCity}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{txt.colMsg}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{txt.colCV}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">{txt.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {currentVisitors.length > 0 ? currentVisitors.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={v.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{v.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{v.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {formatDate(v.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {v.city}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {v.hasMsg 
                      ? <span className="text-green-600 dark:text-green-400 font-semibold">{txt.yes}</span> 
                      : <span className="text-slate-400 dark:text-slate-500">{txt.no}</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {v.hasCV 
                      ? <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{txt.yes}</span> 
                      : <span className="text-slate-400 dark:text-slate-500">{txt.no}</span>}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    {v.hasMsg && (
                      <button 
                        onClick={() => navigate('/dashboard/messages')}
                        title={txt.viewMsg || "Xabarni ko'rish"}
                        className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                      >
                        <MailIcon />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(v.id)}
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
