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
