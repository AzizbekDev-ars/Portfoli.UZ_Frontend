import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#05080f] overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 w-full h-full relative">
        {/* Background Mesh for Dashboard */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[120px]"></div>
        </div>

        {/* TOP NAVBAR */}
        <TopNav />

        {/* OUTLET SCROLLABLE AREA */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent z-10 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
