import { Routes, Route } from 'react-router-dom'
import LandingPage from '../public/landing/LandingPage'
import Login from '../client/auth/Login'
import Register from '../client/auth/Register'

import ProtectedRoute from '../Protect/ProtectedRoute'
import DashboardLayout from '../client/dashboard/DashboardLayout'
import PortfolioRender from '../portfolio/PortfolioRender'
import Home from '../client/dashboard/pages/Home'
import Visitors from '../client/dashboard/pages/Visitors'
import Messages from '../client/dashboard/pages/Messages'
import Certificates from '../client/dashboard/pages/Certificates'
import Experiences from '../client/dashboard/pages/Experiences'
import Projects from '../client/dashboard/pages/Projects'
import Settings from '../client/dashboard/pages/Settings'
import CV from '../client/dashboard/pages/CV'

// ADMIN IMPORTS
import AdminLogin from '../admin/auth/AdminLogin'
import AdminProtectedRoute from '../Protect/AdminProtectedRoute'
import AdminDashboardLayout from '../admin/dashboard/AdminDashboardLayout'
import AdminHome from '../admin/dashboard/pages/AdminHome'
import AdminUsers from '../admin/dashboard/pages/AdminUsers'
import AdminFinancial from '../admin/dashboard/pages/AdminFinancial'
import AdminSettings from '../admin/dashboard/pages/AdminSettings'

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* SUPER ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <AdminProtectedRoute>
            <AdminDashboardLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="financial" element={<AdminFinancial />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

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
        <Route path="certificates" element={<Certificates />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="projects" element={<Projects />} />
        <Route path="cv" element={<CV />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* PORTFOLIO ROUTE (PUBLIC) */}
      <Route path="/:username" element={<PortfolioRender />} />

    </Routes>
  )
}

export default MainRoute
