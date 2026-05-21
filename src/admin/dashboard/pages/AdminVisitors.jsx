import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../../API/axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdminVisitors = () => {
    const [stats, setStats] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [statsRes, dailyRes, countryRes] = await Promise.all([
                api.apiAdmin.get('/admin/visitors/stats'),
                api.apiAdmin.get('/admin/visitors/daily'),
                api.apiAdmin.get('/admin/visitors/country')
            ]);
            setStats(statsRes.data);
            setDailyData(dailyRes.data);
            setCountryData(countryRes.data);
        } catch (err) {
            console.error("Error fetching admin visitor stats:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-slate-400">Yuklanmoqda...</div>;

    const lineChartData = {
        labels: dailyData.map(d => d._id),
        datasets: [{
            label: 'Kunlik tashriflar',
            data: dailyData.map(d => d.total),
            borderColor: '#f43f5e',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#f43f5e'
        }]
    };

    const countryChartData = {
        labels: countryData.slice(0, 10).map(d => d._id),
        datasets: [{
            label: 'Tashriflar soni',
            data: countryData.slice(0, 10).map(d => d.total),
            backgroundColor: [
                '#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
                '#ec4899', '#06b6d4', '#84cc16', '#6366f1', '#14b8a6'
            ],
            borderWidth: 0
        }]
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-white">Platforma tashriflari</h1>
                <button 
                    onClick={fetchStats}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Jami tashriflar</p>
                    <p className="text-3xl font-black text-white">{stats?.totalVisits || 0}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Unique tashriflar</p>
                    <p className="text-3xl font-black text-rose-500">{stats?.uniqueVisitors || 0}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Davlarlar soni</p>
                    <p className="text-3xl font-black text-blue-500">{countryData.length}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Bugungi tashriflar</p>
                    <p className="text-3xl font-black text-emerald-500">
                        {dailyData.find(d => d._id === new Date().toISOString().split('T')[0])?.total || 0}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-bold mb-6">Tashriflar dinamikasi</h3>
                    <div className="h-64">
                        <Line data={lineChartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-bold mb-6">Davlarlar bo'yicha (Top 10)</h3>
                    <div className="h-64 flex justify-center">
                        <Pie data={countryChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-bold">So'nggi 100 ta tashrif</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Foydalanuvchi</th>
                                <th className="px-6 py-4">Sahifa</th>
                                <th className="px-6 py-4">Joylashuv</th>
                                <th className="px-6 py-4">IP / Qurilma</th>
                                <th className="px-6 py-4">Vaqt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {stats?.recentVisitors?.map((v) => (
                                <tr key={v._id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        {v.user ? (
                                            <span className="text-blue-400 font-medium">@{v.user.username}</span>
                                        ) : (
                                            <span className="text-slate-500 italic">Mehmon</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-[150px]">{v.page}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white">{v.country}</span>
                                            <span className="text-xs text-slate-500">{v.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono">{v.ip}</span>
                                            <span className="text-[10px] text-slate-500 truncate max-w-[200px]">{v.userAgent}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {new Date(v.visitedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminVisitors;
