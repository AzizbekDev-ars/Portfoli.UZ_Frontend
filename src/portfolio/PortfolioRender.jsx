import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Oddiy from './templates/Oddiy';
import Zamonaviy from './templates/Zamonaviy';
import Maxsus from './templates/Maxsus';
import Creative from './templates/Creative';
import Animatsion from './templates/Animatsion';
import api from '../services/api';

const PortfolioRender = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const templateQuery = searchParams.get('template');
  
  const [data, setData] = useState(null);
  const [templateName, setTemplateName] = useState('modern'); // Default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [username]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/auth/portfolio/${username}`);
      const { user, projects, experiences, certificates } = res.data;
      
      const profData = user.profileData || {};
      
      // Data mapping to unify templates
      const portfolioData = {
        ...user,
        firstName: profData.fullName?.split(' ')[0] || user.username,
        lastName: profData.fullName?.split(' ').slice(1).join(' ') || '',
        avatar: user.profileImage?.url || '', 
        aboutMe: profData.bio || profData.aboutMe || '', 
        address: profData.location || '',
        availableTime: profData.availableTime || 'N/A',
        // Robust check for boolean
        showAvatarOnPortfolio: profData.showAvatarOnPortfolio === true || profData.showAvatarOnPortfolio === undefined,
        
        email: user.socialLinks?.Email || user.socialLinks?.email || user.email || '',

        contacts: Object.entries(user.socialLinks || {})
          .filter(([_, link]) => link)
          .map(([type, link]) => ({ type, link })),
          
        projects: (projects || []).map(p => ({
          ...p,
          id: p._id,
          title: p.projectname,
          tech: Array.isArray(p.techStacks) ? p.techStacks.join(", ") : p.techStacks,
          image: p.image
        })),
        
        experiences: (experiences || []).map(e => ({
          ...e,
          id: e._id,
          period: `${e.startDate} - ${e.endDate}`,
          role: e.role,
          company: e.company,
          description: e.description
        })),
        
        certificates: (certificates || []).map(c => ({
          ...c,
          id: c._id,
          title: c.title,
          issuer: c.provider,
          date: c.date,
          image: c.image,
          description: c.description
        }))
      };

      setData(portfolioData);
      
      if (templateQuery) {
        setTemplateName(templateQuery.toLowerCase());
      } else if (user.selectedTemplate) {
        setTemplateName(user.selectedTemplate.toLowerCase());
      }

      api.post('/visitor/report', { 
        user: user._id, 
        page: 'portfolio' 
      }).catch(err => console.error("Visitor tracking failed:", err));

    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (formData) => {
    try {
      await api.post('/message', {
        user: data._id,
        sendername: formData.name,
        contactlink: formData.email,
        messagetext: formData.message
      });
      return { success: true };
    } catch (err) {
      console.error("Message send failed:", err);
      return { success: false, error: err.message };
    }
  };

  const handleDownloadCV = () => {
    window.open(`${api.defaults.baseURL}/cv/public-pdf/${username}`, '_blank');
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-black text-slate-800 dark:text-white font-black text-xl uppercase tracking-tighter">
      Yuklanmoqda...
    </div>
  );
  
  if (!data) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-black text-slate-800 dark:text-white">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Sahifa topilmadi</h2>
      <p className="text-slate-500 uppercase text-sm font-bold">Bunday username mavjud emas yoki profil yashirin.</p>
    </div>
  );

  const renderTemplate = () => {
    const t = templateName.toLowerCase();
    const props = { data, onSendMessage: handleSendMessage, onDownloadCV: handleDownloadCV };
    
    switch (t) {
      case 'oddiy':
      case 'simple':
      case 'minimal':
        return <Oddiy {...props} />;
      case 'zamonaviy':
      case 'modern':
        return <Zamonaviy {...props} />;
      case 'maxsus':
      case 'special':
        return <Maxsus {...props} />;
      case 'creative':
        return <Creative {...props} />;
      case 'animatsion':
      case 'animated':
        return <Animatsion {...props} />;
      default:
        return <Zamonaviy {...props} />;
    }
  };

  return renderTemplate();
};

export default PortfolioRender;
