import { Routes, Route } from 'react-router-dom'
import LandingPage from '../public/landing/LandingPage'
import Login from '../client/auth/Login'
import Register from '../client/auth/Register'

import ProtectedRoute from '../Protect/ProtectedRoute'
import DashboardLayout from '../client/dashboard/DashboardLayout'
import Home from '../client/dashboard/pages/Home'
import Visitors from '../client/dashboard/pages/Visitors'
import Messages from '../client/dashboard/pages/Messages'

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD ROUTES */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="messages" element={<Messages />} />
        <Route path="certificates" element={<div className="text-slate-800 dark:text-white">Certificates Page (Tez kunda...)</div>} />
        <Route path="experiences" element={<div className="text-slate-800 dark:text-white">Experiences Page (Tez kunda...)</div>} />
        <Route path="projects" element={<div className="text-slate-800 dark:text-white">Projects Page (Tez kunda...)</div>} />
        <Route path="cv" element={<div className="text-slate-800 dark:text-white">CV Page (Tez kunda...)</div>} />
        <Route path="settings" element={<div className="text-slate-800 dark:text-white">Settings Page (Tez kunda...)</div>} />
      </Route>

    </Routes>
  )
}

export default MainRoute
