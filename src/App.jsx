import React, { useState, useEffect } from 'react';
import MainRoute from './mainRoutes/MainRoute';
import api from './services/api';
import Maintenance from './public/Maintenance';
import { useAuth } from './contexts/AuthContext';
import GlobalBanner from './components/GlobalBanner';

function App() {
  const { user } = useAuth();
  const [maintenance, setMaintenance] = useState(false);
  const [bannerData, setBannerData] = useState({ active: false, text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get('/platform/settings');
        const s = res.data;
        setMaintenance(s.maintenanceMode);
        setBannerData({ active: s.bannerActive, text: s.bannerText });
        
        // Dinamik sarlavha va meta ma'lumotlar
        if (s.siteName) document.title = s.siteName;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && s.metaDesc) metaDesc.setAttribute('content', s.metaDesc);
        
      } catch (err) {
        console.error("Status check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
  }, []);

  if (loading) return null;

  // Agar maintenance yoqilgan bo'lsa va foydalanuvchi admin bo'lmasa - Maintenance sahifasini ko'rsatamiz
  if (maintenance && user?.role !== 'admin') {
    return <Maintenance />;
  }

  return (
    <>
      <GlobalBanner active={bannerData.active} text={bannerData.text} />
      <MainRoute />
    </>
  );
}

export default App;
