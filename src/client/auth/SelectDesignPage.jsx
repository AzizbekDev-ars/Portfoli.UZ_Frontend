import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateSelection from './components/TemplateSelection';
import { useAuth } from '../../contexts/AuthContext';

const SelectDesignPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Agar foydalanuvchi allaqachon dizayn tanlagan bo'lsa, dashboardga qaytaramiz
  React.useEffect(() => {
    if (user && user.selectedTemplate) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return <TemplateSelection onComplete={() => navigate('/dashboard')} />;
};

export default SelectDesignPage;
