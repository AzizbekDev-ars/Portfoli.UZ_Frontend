import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, Mail, MapPin, Download, ExternalLink, Menu, X, 
  Sun, Moon, Globe, MessageSquare, Award, Briefcase, ChevronRight, Zap
} from 'lucide-react';

// Custom Brand Icons
const Github = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-60.86 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const portfolioLang = {
  uz: { hero: "TIZIMGA XUSH KELIBSIZ", hire: "ALOQA", certs: "SERTIFIKATLAR", exp: "TAJRIBA", proj: "LOYIHALAR", cvBtn: "CV YUKLASH", contactTitle: "BOG'LANISH", name: "ISM", email: "EMAIL", msg: "XABAR", send: "YUBORISH", success: "YUBORILDI", error: "XATOLIK", loc: "MANZIL", viewCode: "KODNI KO'RISH", viewDemo: "DEMO KO'RISH" },
  ru: { hero: "ДОБРО ПОЖАЛОВАТЬ", hire: "СВЯЗЬ", certs: "СЕРТИФИКАТЫ", exp: "ОПЫТ", proj: "ПРОЕКТЫ", cvBtn: "СКАЧАТЬ CV", contactTitle: "СВЯЗАТЬСЯ", name: "ИМЯ", email: "EMAIL", msg: "СООБЩЕНИЕ", send: "ОТПРАВИТЬ", success: "ОТПРАВЛЕНО", error: "ОШИБКА", loc: "АДРЕС", viewCode: "КОД", viewDemo: "ДЕМО" },
  en: { hero: "SYSTEM INITIALIZED", hire: "CONNECT", certs: "CERTIFICATES", exp: "EXPERIENCE", proj: "PROJECTS", cvBtn: "DOWNLOAD CV", contactTitle: "TRANSMISSION", name: "NAME", email: "EMAIL", msg: "MESSAGE", send: "TRANSMIT", success: "SUCCESS", error: "ERROR", loc: "LOCATION", viewCode: "SOURCE", viewDemo: "LIVE DEMO" }
};

const getIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('github')) return <Github size={20} />;
  if (t.includes('linkedin')) return <Linkedin size={20} />;
  if (t.includes('telegram')) return <Send size={20} />;
  if (t.includes('mail') || t.includes('email')) return <Mail size={20} />;
  return <Globe size={20} />;
};

const Maxsus = ({ data, onSendMessage, onDownloadCV, forceCustomDesign }) => {
  const { lang, setLang } = useLang();
  const { isDark, setIsDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = portfolioLang[lang] || portfolioLang['uz'];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const design = data.customDesign || {
    primaryColor: '#00F0FF', // Default to cyan for futuristic look
    backgroundColor: '#050505',
    textColor: '#FFFFFF',
    fontFamily: 'sans',
    borderRadius: '16px',
    gridType: 'grid'
  };

  const hex2rgb = (hex) => {
    if(!hex) return '0, 240, 255';
    let h = hex.replace('#', '');
    if(h.length === 3) h = h.split('').map(c => c+c).join('');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  const primaryRGB = hex2rgb(design.primaryColor);
  const bgRGB = hex2rgb(design.backgroundColor);
  const textRGB = hex2rgb(design.textColor);
  const isCustom = forceCustomDesign || !!data.customDesign;
  
  const customStyle = `
    .maxsus-theme {
      --primary-rgb: ${primaryRGB};
      --bg-rgb: ${bgRGB};
      --text-rgb: ${textRGB};
      --font-family: ${design.fontFamily === 'serif' ? "'Playfair Display', serif" : design.fontFamily === 'mono' ? "'Fira Code', monospace" : "'Space Grotesk', 'Inter', sans-serif"};
      --radius: ${design.borderRadius};
      
      background-color: ${isCustom ? 'rgb(var(--bg-rgb))' : (isDark ? '#050505' : '#F8F9FA')} !important;
      color: ${isCustom ? 'rgb(var(--text-rgb))' : (isDark ? '#FFFFFF' : '#0F172A')} !important;
      font-family: var(--font-family) !important;
    }
    
    .maxsus-theme .text-primary { color: rgb(var(--primary-rgb)) !important; }
    .maxsus-theme .bg-primary { background-color: rgb(var(--primary-rgb)) !important; }
    .maxsus-theme .border-primary { border-color: rgb(var(--primary-rgb)) !important; }
    
    .maxsus-theme .bg-primary-10 { background-color: rgba(var(--primary-rgb), 0.1) !important; }
    .maxsus-theme .bg-primary-20 { background-color: rgba(var(--primary-rgb), 0.2) !important; }
    .maxsus-theme .border-primary-10 { border-color: rgba(var(--primary-rgb), 0.1) !important; }
    .maxsus-theme .border-primary-30 { border-color: rgba(var(--primary-rgb), 0.3) !important; }
    
    /* Cyberpunk / Glassmorphism glows */
    .maxsus-theme .glow-primary { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.4); }
    .maxsus-theme .glow-primary-hover:hover { box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.6); }
    
    .maxsus-theme .glass-panel {
      background: rgba(var(--text-rgb), 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(var(--text-rgb), 0.1);
    }
    
    .maxsus-theme .glass-panel:hover {
      border-color: rgba(var(--primary-rgb), 0.4);
      background: rgba(var(--primary-rgb), 0.05);
    }

    .maxsus-theme .rounded-custom { border-radius: var(--radius) !important; }
    
    /* Tech Grid Background */
    .maxsus-theme .tech-grid {
      background-image: 
        linear-gradient(to right, rgba(var(--primary-rgb), 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(var(--primary-rgb), 0.05) 1px, transparent 1px);
      background-size: 50px 50px;
    }

    /* Glitch text effect basic */
    .glitch-wrapper {
      position: relative;
    }
    .glitch-wrapper::before, .glitch-wrapper::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
    .glitch-wrapper::before {
      color: #0ff;
      z-index: -1;
      transform: translate(-2px, 2px);
    }
    .glitch-wrapper::after {
      color: #f0f;
      z-index: -2;
      transform: translate(2px, -2px);
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await onSendMessage(formData);
    if (res.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="maxsus-theme min-h-screen relative overflow-hidden transition-colors duration-700 selection:bg-primary selection:text-white">
      
      {/* CSS Injections */}
      <style key={JSON.stringify(design)} dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&family=Fira+Code:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        ${customStyle}
      ` }} />

      {/* DYNAMIC BACKGROUND EFFECTS */}
      {design.effectType === 'grid' && <div className="fixed inset-0 tech-grid pointer-events-none z-0" />}
      {design.effectType === 'particles' && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgb(var(--primary-rgb)) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      )}
      <motion.div 
        animate={{ 
          x: mousePosition.x - 300, 
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 50, mass: 1 }}
        className="fixed w-[600px] h-[600px] rounded-full bg-primary-10 blur-[120px] pointer-events-none z-0"
      />
      
      {/* FUTURISTIC NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 border-b border-primary-10 glass-panel h-20 px-6 md:px-12 flex justify-between items-center transition-all`}>
        <Link to="/" className="flex items-center gap-4 group">
           <div className="relative w-10 h-10 flex items-center justify-center rounded-custom overflow-hidden border border-primary-30 group-hover:border-primary glow-primary-hover transition-all">
              <div className="absolute inset-0 bg-primary-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Zap className="text-primary z-10 w-5 h-5" />
           </div>
           <span className="text-xl font-bold tracking-widest uppercase hidden sm:flex items-center gap-2">
             {data.firstName} <span className="text-primary font-black">{data.lastName}</span>
           </span>
        </Link>

        <div className="flex items-center gap-8">
           <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
              <a href="#about" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-primary opacity-50">01.</span> {t.hero}
              </a>
              <a href="#projects" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-primary opacity-50">02.</span> {t.proj}
              </a>
              <a href="#experience" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-primary opacity-50">03.</span> {t.exp}
              </a>
           </div>

           <div className="flex items-center gap-4 pl-8 border-l border-primary-10">
              <button onClick={() => setIsDark(!isDark)} className="w-10 h-10 flex items-center justify-center rounded-custom glass-panel hover:border-primary hover:text-primary transition-all">
                 {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <div className="relative group">
                <button className="w-10 h-10 flex items-center justify-center rounded-custom glass-panel text-xs font-bold uppercase hover:border-primary hover:text-primary transition-all">
                  {lang}
                </button>
                <div className="absolute right-0 top-full mt-2 w-16 glass-panel rounded-custom overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col">
                  {['uz', 'ru', 'en'].map(l => (
                    <button key={l} onClick={() => setLang(l)} className="p-2 text-xs uppercase hover:bg-primary-20 hover:text-primary font-bold text-center">
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-custom glass-panel hover:border-primary text-primary transition-all">
                 {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
           </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-40 bg-black/80 flex flex-col items-center justify-center gap-8 md:hidden">
             {['about', 'projects', 'experience', 'contact'].map((item, idx) => (
                <a key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-[0.3em] uppercase flex flex-col items-center gap-2 group">
                  <span className="text-primary text-xs opacity-50">0{idx+1}.</span>
                  <span className="group-hover:text-primary transition-colors">{t[item === 'about' ? 'hero' : item === 'experience' ? 'exp' : item === 'contact' ? 'hire' : 'proj']}</span>
                </a>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section id="about" className="min-h-[90vh] flex items-center px-6 md:px-12 max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-custom glass-panel border border-primary-30 text-xs font-bold tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="opacity-80">System Online</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                    <span className="block opacity-90">{data.firstName}</span>
                    <span className={`text-primary block ${design.animationStyle === 'glitch' ? 'glitch-wrapper' : design.animationStyle === 'pulse' ? 'animate-pulse' : ''}`} data-text={data.lastName}>{data.lastName}</span>
                 </h1>
                 
                 <p className="text-lg opacity-70 leading-relaxed max-w-xl font-medium border-l-2 border-primary-30 pl-6 py-2">
                    {data.aboutMe}
                 </p>
                 
                 <div className="flex flex-wrap gap-6 pt-4">
                    <button onClick={onDownloadCV} className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-custom hover:bg-white transition-all glow-primary flex items-center gap-3 group">
                       <span>{t.cvBtn}</span>
                       <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                    
                    <a href="#contact" className="px-8 py-4 glass-panel font-bold uppercase tracking-widest rounded-custom hover:border-primary hover:text-primary transition-all flex items-center gap-3 group">
                       <span>{t.hire}</span>
                       <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </motion.div>

              {/* Holographic Image / Avatar container */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center lg:justify-end">
                 <div className="relative w-72 h-72 md:w-96 md:h-96">
                    {/* Outer Rings */}
                    <div className="absolute inset-0 border border-primary-20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-4 border border-dashed border-primary-30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                    
                    {/* Avatar Image */}
                    <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-primary glow-primary flex items-center justify-center">
                       <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-30 z-10 pointer-events-none"></div>
                       {data.showAvatarOnPortfolio ? (
                         <img 
                           src={data.avatar || "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop"} 
                           alt="Avatar" 
                           className="w-full h-full object-cover filter contrast-125"
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-[#050505]">
                           <span className="text-3xl font-black tracking-widest text-primary break-all px-4 text-center">
                             /{data.username || "user"}
                           </span>
                         </div>
                       )}
                    </div>

                    {/* Floating Tech Badges */}
                    <div className="absolute top-10 -left-6 px-4 py-2 glass-panel rounded-custom text-xs font-bold animate-bounce shadow-lg">
                       <span className="text-primary">XP:</span> {data.experiences?.length || 0} YRS
                    </div>
                    <div className="absolute bottom-10 -right-6 px-4 py-2 glass-panel rounded-custom text-xs font-bold animate-pulse shadow-lg">
                       <span className="text-primary">LVL:</span> PRO
                    </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* PROJECTS MATRIX */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
             <div className="flex flex-col mb-16 gap-4">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight flex items-center gap-4">
                   <span className="text-primary">02.</span> {t.proj}
                </h2>
                <div className="w-24 h-1 bg-primary"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.projects.map((proj, i) => (
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="group h-full">
                     <div className="h-full flex flex-col glass-panel rounded-custom overflow-hidden transition-all duration-500 hover:-translate-y-2 glow-primary-hover relative">
                        {/* Status indicator */}
                        <div className="absolute top-4 right-4 z-10 w-2 h-2 rounded-full bg-primary animate-ping"></div>
                        
                        <div className="relative h-56 overflow-hidden">
                           <div className="absolute inset-0 bg-primary mix-blend-color opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                           <img src={proj.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={proj.title} />
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1 relative z-20 bg-gradient-to-t from-black/80 to-transparent -mt-12 pt-12">
                           <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                           
                           {/* Tech Stack Tags */}
                           <div className="flex flex-wrap gap-2 mb-6 mt-auto pt-4">
                              {proj.tech?.split(',').map((tech, idx) => (
                                <span key={idx} className="text-[10px] font-bold px-2 py-1 bg-primary-10 text-primary rounded-custom uppercase tracking-wider border border-primary-20">
                                  {tech.trim()}
                                </span>
                              ))}
                           </div>

                           <div className="flex gap-4 border-t border-white/10 pt-4">
                              {proj.link && (
                                <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">
                                   <ExternalLink size={14} /> {t.viewDemo}
                                </a>
                              )}
                              {proj.codeLink && (
                                <a href={proj.codeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest ml-auto">
                                   <Github size={14} /> {t.viewCode}
                                </a>
                              )}
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* EXPERIENCE & DATA LOGS */}
        <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-primary-10">
           <div className="flex flex-col mb-16 gap-4">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight flex items-center gap-4">
                 <span className="text-primary">03.</span> {t.exp}
              </h2>
              <div className="w-24 h-1 bg-primary"></div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Experience Timeline */}
              <div className="space-y-8 relative">
                 <div className="absolute left-3 top-0 bottom-0 w-px bg-primary-20"></div>
                 {data.experiences.map((exp, i) => (
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="relative pl-12 group">
                       <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-10 border-2 border-primary flex items-center justify-center group-hover:scale-125 transition-transform glow-primary">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                       </div>
                       
                       <div className="glass-panel p-6 rounded-custom group-hover:border-primary-40 transition-colors">
                          <div className="inline-block px-3 py-1 bg-primary-10 text-primary text-[10px] font-bold rounded-custom uppercase tracking-widest mb-4">
                             {exp.period}
                          </div>
                          <h3 className="text-xl font-bold uppercase mb-1">{exp.role}</h3>
                          <div className="text-sm font-medium opacity-60 mb-4 text-primary">{exp.company}</div>
                          <p className="text-sm opacity-70 leading-relaxed">{exp.description}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>

              {/* Certificates / Achievements */}
              <div>
                 <div className="flex items-center gap-3 mb-8">
                    <Award className="text-primary" />
                    <h3 className="text-xl font-bold uppercase tracking-widest">{t.certs}</h3>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data.certificates.map((cert, i) => (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="glass-panel p-6 rounded-custom hover:border-primary transition-all group relative overflow-hidden">
                          <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                          <div className="relative z-10">
                             <div className="text-[10px] font-bold text-primary tracking-widest mb-2">{cert.date}</div>
                             <h4 className="text-sm font-bold uppercase mb-2 leading-snug">{cert.title}</h4>
                             <p className="text-xs opacity-50 uppercase">{cert.issuer}</p>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* TRANSMISSION TERMINAL (CONTACT) */}
        <section id="contact" className="py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-primary-10">
           <div className="glass-panel p-8 md:p-16 rounded-custom relative overflow-hidden glow-primary-hover transition-all duration-700">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{t.contactTitle}</h2>
                 <p className="text-sm opacity-60 uppercase tracking-widest">Establish a secure connection</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-primary">{t.name}</label>
                       <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/20 border border-primary-20 rounded-custom px-4 py-3 outline-none focus:border-primary focus:bg-primary-10 transition-all text-sm font-medium" placeholder="IDENTIFICATION" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-primary">{t.email}</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/20 border border-primary-20 rounded-custom px-4 py-3 outline-none focus:border-primary focus:bg-primary-10 transition-all text-sm font-medium" placeholder="COMMLINK ADDRESS" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-primary">{t.msg}</label>
                    <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/20 border border-primary-20 rounded-custom px-4 py-3 outline-none focus:border-primary focus:bg-primary-10 transition-all text-sm font-medium resize-none" placeholder="ENTER TRANSMISSION DATA..."></textarea>
                 </div>
                 
                 <button disabled={status === 'sending'} type="submit" className="w-full py-4 bg-primary text-black font-black text-sm uppercase tracking-widest rounded-custom hover:bg-white transition-all flex items-center justify-center gap-4 glow-primary">
                    {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMISSION SUCCESSFUL' : status === 'error' ? 'ERROR IN TRANSMISSION' : 'INITIATE TRANSFER'}
                    <Send size={16} />
                 </button>
              </form>
           </div>
        </section>

      </main>

      {/* FOOTER TERMINAL */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-primary-20 bg-black/50 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase">
               SYSTEM V.2.0.26 © {new Date().getFullYear()}
            </span>
         </div>
         <div className="flex gap-6">
            {data.contacts.map((c, i) => (
               <a key={i} href={c.link} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-custom glass-panel hover:text-primary hover:border-primary transition-all">
                  {getIcon(c.type)}
               </a>
            ))}
         </div>
      </footer>
    </div>
  );
};

export default Maxsus;
