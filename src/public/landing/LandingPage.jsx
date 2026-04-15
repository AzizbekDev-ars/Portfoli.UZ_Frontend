import React from 'react';
import { useLang } from '../../contexts/LangContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Preview from './components/Preview';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

const LandingPage = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 font-sans text-slate-800 dark:text-slate-200 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      <Navbar t={t} />

      {/* GRADIENT MESH BACKGROUND (Absolute Hero) */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/30 dark:bg-indigo-600/20 blur-[120px]"></div>
         <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px]"></div>
      </div>

      <Hero t={t} />
      <Problem t={t} />
      <Features t={t} />
      <HowItWorks t={t} />
      <Preview t={t} />
      <Testimonials t={t} />
      <Pricing t={t} />
      <CTA t={t} />
      <Footer />

    </div>
  );
};

export default LandingPage;
