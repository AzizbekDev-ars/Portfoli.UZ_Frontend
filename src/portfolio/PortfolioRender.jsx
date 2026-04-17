import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Oddiy from './templates/Oddiy';
import Zamonaviy from './templates/Zamonaviy';
import Maxsus from './templates/Maxsus';
import Creative from './templates/Creative';
import Animatsion from './templates/Animatsion';

// Mock Data
const mockData = {
  firstName: "Ali",
  lastName: "Valiyev",
  username: "mr-fury",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  showAvatarOnPortfolio: true,
  aboutMe: "Men 5 yillik tajribaga ega dasturchiman. React, Node.js va qator zamonaviy texnologiyalarni amaliyotda faol qo'llayman. Har doim yangi texnologiyalarni o'rganishga tayyorman va murakkab muammolarga optimal yechimlar topishni yoqtiraman. Mijozlarning talablariga mos, sifatli va tezkor dasturiy mahsulotlar yarataman.",
  address: "Toshkent shahri, Chilonzor tumani",
  availableTime: "09:00 - 18:00 (Dush-Jum)",
  contacts: [
    { id: 1, type: "Telegram", link: "@mrfury" },
    { id: 2, type: "Phone", link: "+998 90 123 45 67" },
    { id: 3, type: "Email", link: "contact@mrfury.uz" },
    { id: 4, type: "GitHub", link: "github.com/mrfury" }
  ],
  certificates: [
    { id: 1, title: "Advanced React Patterns", issuer: "Frontend Masters", date: "2023", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80", description: "In-depth knowledge of React design patterns." },
    { id: 2, title: "Node.js Complete Guide", issuer: "Udemy", date: "2022", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80", description: "Backend development with Express and MongoDB." }
  ],
  experiences: [
    { id: 1, role: "Senior Frontend Developer", company: "TechCorp Uz", period: "2021 - Hozirgacha", description: "Zamonaviy veb-ilovalarni noldan yaratish va mavjud tizimlarni optimallashtirish." },
    { id: 2, role: "Web Developer", company: "SoftSolutions", period: "2019 - 2021", description: "Kichik va o'rta bizneslar uchun korporativ saytlar va admin panellar tayyorlash." }
  ],
  projects: [
    { id: 1, title: "E-Commerce Platform", tech: "React, Node.js, MongoDB", link: "#", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80", description: "To'liq funksiyali onlayn do'kon. To'lov tizimlari integratsiyasi bilan." },
    { id: 2, title: "SaaS Dashboard", tech: "Vue.js, Firebase", link: "#", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", description: "Korxona ma'lumotlarini boshqarish stansiyasi." },
    { id: 3, title: "Mobile UI Kit", tech: "Figma, React Native", link: "#", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80", description: "Mobil ilovalar uchun tayyor vizual komponentlar to'plami." }
  ]
};

const PortfolioRender = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const templateQuery = searchParams.get('template');
  
  const [data, setData] = useState(null);
  const [templateName, setTemplateName] = useState('Zamonaviy'); // Default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar lokal xotirada Settings.jsx dan saqlangan "portfolioSettings" bo'lsa, undan dizaynni olish
    const localSettings = JSON.parse(localStorage.getItem('portfolioSettings'));
    
    // Aslida Backenddan username orqali ma'lumotlarni tortib olish kerak
    // Hozir mockData ishlatamiz
    const finalData = { ...mockData };
    if (localSettings) {
       finalData.firstName = localSettings.firstName || finalData.firstName;
       finalData.lastName = localSettings.lastName || finalData.lastName;
       finalData.aboutMe = localSettings.aboutMe || finalData.aboutMe;
       finalData.showAvatarOnPortfolio = localSettings.showAvatarOnPortfolio !== undefined ? localSettings.showAvatarOnPortfolio : finalData.showAvatarOnPortfolio;
       finalData.avatar = localSettings.avatar || finalData.avatar;
       finalData.contacts = localSettings.contacts?.length > 0 ? localSettings.contacts : finalData.contacts;
       
       if (localSettings.selectedDesign) {
         setTemplateName(localSettings.selectedDesign);
       }
    }
    
    // URL orqali dizaynni majburlab ko'rsatish (test uchun)
    if (templateQuery) {
       setTemplateName(templateQuery);
    }
    
    setData(finalData);
    setLoading(false);
  }, [username, templateQuery]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-black text-slate-800 dark:text-white">Yuklanmoqda...</div>;
  if (!data) return <div className="h-screen w-full flex items-center justify-center">Sahifa topilmadi</div>;

  // Render Template
  switch (templateName) {
    case 'Oddiy':
      return <Oddiy data={data} />;
    case 'Zamonaviy':
      return <Zamonaviy data={data} />;
    case 'Maxsus':
      return <Maxsus data={data} />;
    case 'Creative':
      return <Creative data={data} />;
    case 'Animatsion':
      return <Animatsion data={data} />;
    default:
      return <Zamonaviy data={data} />;
  }
};

export default PortfolioRender;
