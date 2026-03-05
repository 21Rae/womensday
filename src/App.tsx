import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  BookOpen,
  Menu,
  X,
  CheckCircle2,
  Send,
  User,
  Bot,
  Loader2,
  ShieldAlert,
  Search,
  Globe,
  Mail,
  HeartHandshake
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const lastScrollY = React.useRef(0);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Visibility logic: Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;

      // Progress logic
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-black/5 h-16 md:h-20' 
            : 'bg-black/30 backdrop-blur-sm h-20 md:h-24'
        }`}
      >
        {/* Progress Bar with Glow */}
        <div 
          className="absolute bottom-0 left-0 h-[3px] bg-accent transition-all duration-150 ease-out z-[60] shadow-[0_0_10px_rgba(242,139,130,0.5)]" 
          style={{ width: `${scrollProgress}%` }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full">
            <Link to="/" className="flex-shrink-0 flex items-center group mr-12 lg:mr-16">
              <div className={`flex items-center font-heading font-black text-lg md:text-xl tracking-tighter transition-all duration-500 group-hover:scale-105 ${
                scrolled ? 'text-ink' : 'text-white'
              }`}>
                <span>SKILL</span>
                <div className="relative w-5 h-5 md:w-7 md:h-7 mx-1 flex items-center justify-center">
                  {/* Colorful Ring */}
                  <div className="absolute inset-0 rounded-full border-[2px] border-t-cyan-400 border-r-lime-400 border-b-red-500 border-l-magenta-600 animate-[spin_10s_linear_infinite]" />
                  {/* Inner Icon Detail */}
                  <div className="relative w-2.5 h-2.5 md:w-3.5 md:h-3.5 flex flex-col justify-between rotate-45">
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                  </div>
                </div>
                <span>WORKS</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center ml-auto space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`relative text-[11px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all group ${
                    scrolled 
                      ? (location.pathname === link.path ? 'text-primary' : 'text-ink/70 hover:text-primary')
                      : (location.pathname === link.path ? 'text-accent' : 'text-white/90 hover:text-white')
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="activeNav"
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        scrolled ? 'bg-primary' : 'bg-accent'
                      }`}
                    />
                  )}
                </Link>
              ))}
              
              <div className={`flex items-center gap-3 lg:gap-4 pl-4 lg:pl-6 border-l transition-colors h-8 ${scrolled ? 'border-black/10' : 'border-white/20'}`}>
                <button className={`transition-colors ${scrolled ? 'text-ink/40 hover:text-primary' : 'text-white/40 hover:text-white'}`}>
                  <Search size={18} />
                </button>
                <button className={`flex items-center gap-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${scrolled ? 'text-ink/40 hover:text-primary' : 'text-white/40 hover:text-white'}`}>
                  <Globe size={16} />
                  <span>EN</span>
                </button>
                <Link 
                  to="/donate" 
                  className={`px-4 lg:px-6 py-2 rounded-full text-[11px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shadow-xl hover:scale-105 active:scale-95 ${
                    scrolled ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-ink shadow-white/10'
                  }`}
                >
                  Donate
                </Link>
                <a 
                  href="https://sirztest.app.n8n.cloud/form/18c8ac75-e8e8-419e-b723-048e646636ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-4 lg:px-6 py-2 rounded-full text-[11px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 ${
                    scrolled ? 'bg-red-600 text-white shadow-red-600/20' : 'bg-red-500 text-white shadow-red-500/20'
                  }`}
                >
                  <ShieldAlert size={14} />
                  Report Abuse
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <Link to="/donate" className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                scrolled ? 'bg-primary text-white' : 'bg-white text-ink'
              }`}>Donate</Link>
              <button onClick={() => setIsOpen(true)} className={`p-2 transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-ink flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex items-center font-heading font-black text-xl tracking-tighter text-white">
                <span>SKILL</span>
                <div className="relative w-6 h-6 mx-1 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[2px] border-t-cyan-400 border-r-lime-400 border-b-red-500 border-l-magenta-600 animate-[spin_10s_linear_infinite]" />
                  <div className="relative w-3 h-3 flex flex-col justify-between rotate-45">
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                    <div className="h-[1px] w-full bg-red-500 rounded-full" />
                  </div>
                </div>
                <span>WORKS</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-display uppercase tracking-tighter transition-colors ${
                      location.pathname === link.path ? 'text-accent' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
              >
                <a 
                  href="https://sirztest.app.n8n.cloud/form/18c8ac75-e8e8-419e-b723-048e646636ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
                >
                  <ShieldAlert size={24} />
                  Report Abuse
                </a>
              </motion.div>
            </div>

            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-8">
              <div className="flex gap-8">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">© 2026 EmpowerWomen Support Network</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#8B2E5F] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#8B2E5F] font-serif text-xl font-bold italic">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight">EmpowerWomen</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              We envision a more just and peaceful world where every woman has access to the support she needs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">What We Do</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Advancing women's human rights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Healthcare, rehabilitation & awareness</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Building feminist leadership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expanding reproductive freedoms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Education programmes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Subscribe</h4>
            <p className="text-sm text-white/70 mb-6">Stay updated with our latest news and events.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border-none rounded-l-full px-6 py-3 text-sm focus:ring-2 focus:ring-[#F28B82] w-full"
              />
              <button className="bg-[#F28B82] px-6 py-3 rounded-r-full hover:bg-[#e07a71] transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Contact Us</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Project mail:<br />
              gethelpforwomen26@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-xs text-white/40 mb-4 leading-relaxed max-w-4xl mx-auto">
            We are a voluntary organisation registered in 1985. All donations given to us are used to support our mission of providing safe, confidential and immediate support to women facing gender-based violence.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
            <p>Copyright © 2026 EmpowerWomen. All rights reserved.</p>
            <p>Powered by My Blog</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const DonationCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Supportive hands" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#F28B82] mb-6">Want to make a difference?</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
          Help us raise money for our humanitarian causes
        </h3>
        <Link to="/donate" className="inline-block bg-[#F28B82] text-white px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#e07a71] transition-all shadow-xl">
          Donate
        </Link>
      </div>
    </section>
  );
};

// --- Home Page Components ---

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink pt-20">
    {/* Background elements */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="w-full h-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Determined woman advocate" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink"></div>
      
      {/* Floating accent circles */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/30 rounded-full blur-[120px]"
      />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-accent font-heading font-bold tracking-[0.6em] uppercase mb-8 text-xs md:text-sm drop-shadow-lg">
          SkillWorks Support Network
        </p>
        
        <h1 className="text-display text-white font-bold text-[12vw] md:text-[10vw] lg:text-[8vw] mb-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-[0.9]">
          Every woman <br />
          <span className="text-accent italic font-serif font-light">deserves to be</span> <br />
          <span className="text-red-500 drop-shadow-[0_10px_20px_rgba(220,38,38,0.3)]">Heard</span>
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-2xl text-white/90 mb-12 font-light leading-relaxed drop-shadow-md">
            You are not alone. Help is available, safely and confidentially. 
            Access immediate support regardless of location or circumstance.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-8">
            <Link 
              to="/chat"
              className="group relative bg-red-600 text-white px-16 py-6 rounded-full text-base font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40"
            >
              <span className="relative z-10">Start Safe Chat</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">Start Safe Chat</span>
            </Link>

            <a 
              href="https://sirztest.app.n8n.cloud/form/18c8ac75-e8e8-419e-b723-048e646636ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-red-600 text-white px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:bg-red-700 hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
            >
              <ShieldAlert size={18} />
              Report Abuse
            </a>
            
            <Link 
              to="/about"
              className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group"
            >
              Learn our mission
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
    
    {/* Scroll indicator */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
      <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
    </motion.div>
  </section>
);

const AboutPreview = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
      <div className="w-[600px] h-[600px] border-[40px] border-[#8B2E5F] rounded-full"></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">About Us</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 leading-tight">
          Helping women who face gender-based violence have access to safe, confidential and immediate support, regardless of location or circumstance.
        </h3>
        <Link to="/about" className="inline-block bg-[#F28B82] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#e07a71] transition-all">
          Learn more
        </Link>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 bg-paper relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <p className="text-accent font-heading font-bold tracking-[0.3em] uppercase mb-4 text-sm">Our Core Pillars</p>
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-ink leading-tight max-w-2xl">
          A multi-layered approach to <span className="text-primary italic">safety</span> and <span className="text-primary italic">empowerment</span>.
        </h2>
      </div>
      
      <div className="bento-grid">
        {/* Large Item */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-item col-span-12 lg:col-span-8 flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-8">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <h4 className="text-2xl font-heading font-bold text-ink mb-6 uppercase tracking-tight">Safety & Privacy First</h4>
            <p className="text-gray-600 leading-relaxed mb-8">
              We understand that privacy is critical when seeking help. We protect your personal data with anonymous conversions and secure, end-to-end encrypted communication. Your safety is our absolute priority.
            </p>
            <Link to="/chat" className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group">
              Explore safety features
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 w-full h-64 md:h-full rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1516534775068-ba3e84529973?auto=format&fit=crop&q=80&w=800&h=600" alt="Safety and Support" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </motion.div>

        {/* Small Item 1 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-item col-span-12 md:col-span-6 lg:col-span-4 flex flex-col"
        >
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-8">
            <Heart className="text-accent" size={24} />
          </div>
          <h4 className="text-2xl font-heading font-bold text-ink mb-6 uppercase tracking-tight">Confidential Support</h4>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Whatever you are experiencing, your feelings are valid. Our support is non-judgmental and completely confidential.
          </p>
          <div className="mt-auto pt-8 border-t border-black/5">
            <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=400&h=200" alt="Confidential Counseling" className="w-full h-32 object-cover rounded-xl" referrerPolicy="no-referrer" />
          </div>
        </motion.div>

        {/* Small Item 2 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-item col-span-12 md:col-span-6 lg:col-span-4 flex flex-col"
        >
          <div className="w-12 h-12 bg-ink/5 rounded-xl flex items-center justify-center mb-8">
            <BookOpen className="text-ink" size={24} />
          </div>
          <h4 className="text-2xl font-heading font-bold text-ink mb-6 uppercase tracking-tight">Education Center</h4>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Knowledge is power. Access clear, compassionate information to help you understand your rights and options.
          </p>
          <div className="mt-auto pt-8 border-t border-black/5">
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-accent/20 rounded-full" />
              <div className="flex-1 h-2 bg-accent/40 rounded-full" />
              <div className="flex-1 h-2 bg-accent rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Medium Item */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-item col-span-12 lg:col-span-8 bg-ink text-white border-none"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h4 className="text-3xl font-heading font-bold mb-6 uppercase tracking-tight">Global Network of Care</h4>
              <p className="text-white/60 leading-relaxed mb-8">
                We bridge the gap between technology and human touch. Our global network ensures that no matter where you are, help is within reach.
              </p>
              <div className="flex gap-8">
                <div>
                  <span className="block text-3xl font-heading font-bold text-accent">50+</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Countries</span>
                </div>
                <div>
                  <span className="block text-3xl font-heading font-bold text-accent">24/7</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Availability</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-48 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                <span className="text-white/20 font-display text-6xl">GLOBAL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- About Page Components ---

const AboutHero = () => (
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Women's rights advocacy" 
        className="w-full h-full object-cover opacity-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#F28B82]"
      >
        A few words
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold"
      >
        About Us
      </motion.h1>
    </div>
  </section>
);

const History = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">History</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          Our story starts way back, when velit esse cillum dolore eu fugiat nulla.
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-12">
          {[
            { year: '1982', text: 'We first started our work' },
            { year: '1985', text: 'Recognized by the AGDA' },
            { year: '1995', text: 'Grow to over 100 volunteers' },
            { year: '2010', text: "Became part of Women's Rights" },
            { year: '2015', text: 'Became a global volunteer' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 group">
              <div className="w-24 text-right">
                <span className="text-lg font-bold text-[#8B2E5F] group-hover:text-[#F28B82] transition-colors">— {item.year}</span>
              </div>
              <div className="flex-1 border-l-2 border-gray-100 pl-8 py-2">
                <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Achievements = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 border-b border-gray-100 pb-6">Achievements</h2>
          <ul className="space-y-4">
            {[
              'A reduction of new cases of lorem',
              'Putting an end to mauris',
              'Operating the #1-ranked litora',
              'Helping other communities',
              'Opening the first neque',
              'Consulting on accumsan',
              'In 2019, we partnered with ACME',
              'Launching the first sociosqu',
              'Receiving the Presidential Award',
              'Inspiring and supporting vellit'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                <CheckCircle2 size={16} className="text-[#F28B82]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1584933333291-143a9b5928d9?auto=format&fit=crop&q=80&w=800&h=1000" 
            alt="Protest for safety and rights" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const Careers = () => (
  <section className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Professional advocacy team" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#F28B82] mb-6">Come work with us</h2>
      <p className="text-3xl md:text-5xl font-bold mb-10 leading-tight max-w-4xl mx-auto">
        If you would like to work for an organisation making a real impact non mauris vitae erat consequat auctor eu in.
      </p>
      <button className="bg-[#F28B82] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#e07a71] transition-all">
        View current vacancies
      </button>
    </div>
  </section>
);

const Partners = () => (
  <section className="py-20 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-12">Our partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
        {[1, 2, 3, 4, 5].map((i) => (
          <img key={i} src={`https://picsum.photos/seed/logo${i}/150/60`} alt="Partner Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
        ))}
      </div>
    </div>
  </section>
);

const WhatWeDoHero = () => (
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Support group session" 
        className="w-full h-full object-cover opacity-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#F28B82]"
      >
        Our Mission in Action
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold"
      >
        What We Do
      </motion.h1>
    </div>
  </section>
);

const Programs = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          We empower women through comprehensive support systems and advocacy.
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-12">
          {[
            { title: "Human Rights Advocacy", text: "Advancing women's human rights globally" },
            { title: "Healthcare Access", text: "Rehabilitation, awareness, and medical support" },
            { title: "Feminist Leadership", text: "Building the next generation of leaders" },
            { title: "Reproductive Freedom", text: "Expanding access to reproductive healthcare" },
            { title: "Education Programs", text: "Empowering through knowledge and skills" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 group">
              <div className="w-32 text-right">
                <span className="text-sm font-bold text-[#8B2E5F] group-hover:text-[#F28B82] transition-colors tracking-widest uppercase">{item.title}</span>
              </div>
              <div className="flex-1 border-l-2 border-gray-100 pl-8 py-2">
                <p className="text-gray-600 font-medium text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Our approach is holistic, addressing the immediate needs of survivors while working towards long-term systemic change. We believe that by providing safe spaces and the right tools, every woman can reclaim her narrative and lead a life free from violence.
          </p>
          <p>
            Through our secure chatbot and local resource centers, we offer 24/7 support that is both anonymous and effective. Our team of volunteers and professionals works tirelessly to ensure that no woman has to face her challenges alone.
          </p>
          <p>
            We also focus on preventative measures, educating communities about the signs of abuse and the importance of gender equality. By fostering a culture of respect and empowerment, we aim to build a future where gender-based violence is a thing of the past.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ProgramImpact = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 border-b border-gray-100 pb-6">Our Methodology</h2>
          <ul className="space-y-4">
            {[
              '24/7 Anonymous Chatbot Support',
              'Legal Aid and Counseling Services',
              'Emergency Shelter Coordination',
              'Community Awareness Workshops',
              'Policy Advocacy at National Levels',
              'Economic Empowerment Training',
              'Youth Mentorship Programs',
              'Health and Wellness Retreats',
              'Survivor Support Groups',
              'Digital Safety Education'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                <CheckCircle2 size={16} className="text-[#F28B82]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800&h=1000" 
            alt="Empowerment workshop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const MethodologyCTA = () => (
  <section className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Determined survivor advocate" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#F28B82] mb-6">How we make a difference</h2>
      <p className="text-3xl md:text-5xl font-bold mb-10 leading-tight max-w-4xl mx-auto">
        By combining technology with grassroots activism, we create a safety net that reaches women in even the most remote locations.
      </p>
      <button className="bg-[#F28B82] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#e07a71] transition-all">
        Explore our impact
      </button>
    </div>
  </section>
);

const EventsHero = () => (
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Community awareness event" 
        className="w-full h-full object-cover opacity-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#F28B82]"
      >
        Participate in our
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold"
      >
        Events
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
      >
        We organize events all around the globe talking about women's empowerment, education, and human rights.
      </motion.p>
    </div>
  </section>
);

const EventsList = () => {
  const events = [
    { date: '17 July, 2020', title: 'Education Programmes that lorem ipsum', category: 'Education' },
    { date: '29 June, 2020', title: 'Sunt in culpa qui Officia Deserunt mollit anim', category: 'Advocacy' },
    { date: '5 May, 2020', title: 'Fugit, sed quia magni dolores eos qui Ratione', category: 'Leadership' },
    { date: '5 April, 2020', title: 'Magni dolores eos qui ratione sequi nesciun', category: 'Health' },
    { date: '10 March, 2020', title: 'Fugit, sed quia magni dolores eos qui Ratione', category: 'Empowerment' },
    { date: '3 March, 2020', title: 'Incidunt ut labore dolore magnam aliquam', category: 'Community' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=600&h=400&sig=${i}`} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8B2E5F]">
                  {event.category}
                </div>
              </div>
              <div className="p-8">
                <p className="text-xs font-bold text-[#F28B82] mb-3 uppercase tracking-widest">{event.date}</p>
                <h4 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-[#8B2E5F] transition-colors leading-tight">
                  {event.title}
                </h4>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-[#8B2E5F] transition-colors">
                  Read more <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryHero = () => (
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Advocacy through art" 
        className="w-full h-full object-cover opacity-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#F28B82]"
      >
        Moments of Impact
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold"
      >
        Gallery
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
      >
        A visual journey through our programs, events, and the communities we serve.
      </motion.p>
    </div>
  </section>
);

const GalleryGrid = () => {
  const images = [
    { src: 'https://picsum.photos/seed/abuse-prevention/800/600', title: 'Community Workshop', category: 'Education' },
    { src: 'https://picsum.photos/seed/women-rights/800/1000', title: 'Advocacy March', category: 'Advocacy' },
    { src: 'https://picsum.photos/seed/leadership-empower/800/600', title: 'Leadership Training', category: 'Leadership' },
    { src: 'https://picsum.photos/seed/health-safety/800/600', title: 'Health Awareness', category: 'Health' },
    { src: 'https://picsum.photos/seed/survivor-support/800/1000', title: 'Survivor Support', category: 'Empowerment' },
    { src: 'https://picsum.photos/seed/youth-advocacy/800/600', title: 'Youth Mentorship', category: 'Education' },
    { src: 'https://picsum.photos/seed/global-action/800/600', title: 'Global Summit', category: 'Advocacy' },
    { src: 'https://picsum.photos/seed/safe-space/800/1000', title: 'Safe Space Initiative', category: 'Community' },
    { src: 'https://picsum.photos/seed/empower-gala/800/600', title: 'Empowerment Gala', category: 'Events' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((image, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-[#F28B82] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{image.category}</p>
                <h4 className="text-white text-xl font-bold">{image.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DonateHero = () => (
  <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Supportive community" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[#8B2E5F]/60"></div>
    </div>
    <div className="relative z-10 text-center text-white px-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.4em] uppercase mb-4 text-[#F28B82]"
      >
        Your Support Matters
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        Empower a Life
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white/90 max-w-2xl mx-auto font-medium"
      >
        100% of your donation goes directly to providing safe shelter, legal aid, and counseling for survivors of gender-based violence.
      </motion.p>
    </div>
  </section>
);

const DonationTiers = () => {
  const tiers = [
    { amount: '$25', impact: 'Provides a safe night of emergency shelter for one woman.', icon: Heart },
    { amount: '$50', icon: ShieldCheck, impact: 'Covers the cost of a legal consultation for a survivor.' },
    { amount: '$100', icon: BookOpen, impact: 'Funds a month of counseling and mental health support.' },
    { amount: '$500', icon: CheckCircle2, impact: 'Supports a full community awareness workshop for 50 people.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">Choose Your Impact</h2>
          <h3 className="text-3xl font-bold text-gray-900">Every contribution creates a ripple of change</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center group hover:bg-[#8B2E5F] hover:text-white transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F28B82] transition-colors">
                <tier.icon className="text-[#8B2E5F] group-hover:text-white" size={24} />
              </div>
              <span className="text-4xl font-bold mb-4">{tier.amount}</span>
              <p className="text-sm text-gray-600 group-hover:text-white/80 leading-relaxed">
                {tier.impact}
              </p>
              <button className="mt-8 w-full py-3 rounded-full border-2 border-[#8B2E5F] text-[#8B2E5F] font-bold text-xs uppercase tracking-widest group-hover:border-white group-hover:text-white transition-all">
                Select
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DonationForm = () => {
  const [frequency, setFrequency] = React.useState('monthly');

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-[#8B2E5F] p-12 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">Join our Circle of Empowerment</h3>
            <p className="text-white/80 mb-10 leading-relaxed">
              Monthly donors provide the consistent support needed to keep our 24/7 services running without interruption.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-[#F28B82]" />
                </div>
                <span className="text-sm font-medium">Secure & Encrypted Payment</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Heart size={20} className="text-[#F28B82]" />
                </div>
                <span className="text-sm font-medium">Tax-Deductible Contribution</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-12">
            <div className="flex bg-gray-100 p-1 rounded-full mb-10">
              <button 
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${frequency === 'one-time' ? 'bg-white shadow-sm text-[#8B2E5F]' : 'text-gray-400'}`}
              >
                One-time
              </button>
              <button 
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${frequency === 'monthly' ? 'bg-white shadow-sm text-[#8B2E5F]' : 'text-gray-400'}`}
              >
                Monthly
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0.00" className="w-full bg-gray-50 border-none rounded-2xl pl-10 pr-6 py-4 text-lg font-bold focus:ring-2 focus:ring-[#F28B82]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
                <input type="text" placeholder="Last Name" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
              
              <button type="button" className="w-full bg-[#F28B82] text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#e07a71] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                Complete Donation <ArrowRight size={18} />
              </button>
              
              <p className="text-[10px] text-center text-gray-400 leading-relaxed">
                By donating, you agree to our terms of service and privacy policy. Your data is protected by industry-standard encryption.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactStats = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-16 text-center">
        <div>
          <span className="block text-5xl font-bold text-[#8B2E5F] mb-4">15k+</span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Women Supported Annually</p>
        </div>
        <div>
          <span className="block text-5xl font-bold text-[#8B2E5F] mb-4">24/7</span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Anonymous Support Available</p>
        </div>
        <div>
          <span className="block text-5xl font-bold text-[#8B2E5F] mb-4">100%</span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Transparency in Funding</p>
        </div>
      </div>
    </div>
  </section>
);

const ContactHero = () => (
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=1920&h=1080" 
        alt="Compassionate support" 
        className="w-full h-full object-cover opacity-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#F28B82]"
      >
        Get in touch
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold"
      >
        Contact
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
      >
        Reach out to us via our project email for any inquiries or support.
      </motion.p>
    </div>
  </section>
);

const ContactInfo = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-50 p-12 md:p-20 rounded-[3rem] border border-gray-100 text-center shadow-xl">
          <div className="w-20 h-20 bg-[#F28B82]/10 rounded-3xl flex items-center justify-center mx-auto mb-10">
            <Mail className="text-[#F28B82]" size={40} />
          </div>
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">Contact Information</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#8B2E5F] mb-8">Project mail</h3>
          <a 
            href="mailto:gethelpforwomen26@gmail.com" 
            className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-[#F28B82] transition-colors break-all"
          >
            gethelpforwomen26@gmail.com
          </a>
          <p className="mt-10 text-gray-500 leading-relaxed">
            Our team monitors this email 24/7 to provide support and answer your questions as quickly as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#8B2E5F] mb-6">Message Us</h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
            <input type="text" placeholder="Last Name" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]" />
          <textarea placeholder="Your Message" rows={5} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#F28B82]"></textarea>
          <button className="w-full bg-[#8B2E5F] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#70254d] transition-all shadow-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

// --- Chat Page Component ---

const SafeChatSystemInstruction = `You are a compassionate, supportive AI assistant designed to provide a safe, respectful, and judgment-free space for women to express their thoughts, concerns, and experiences related to personal safety, relationships, and abuse.

Your primary purpose is to educate, support, and guide women toward safety and empowerment.

Core Principles

Safety First
Always prioritize the user’s safety. If a user appears to be in immediate danger, calmly encourage them to seek help from trusted people, local support services, or emergency authorities.

Non-Judgmental Support
Respond with empathy and understanding. Never blame the user, minimize their experiences, or question their credibility.

Encourage Expression
Allow users to share their feelings, experiences, or fears openly. Validate their emotions and reassure them that their concerns are important.

Educational Guidance
Provide clear information about:
- Types of abuse (physical, emotional, financial, psychological, sexual, digital)
- Warning signs of abusive behavior
- Healthy relationship boundaries
- Personal safety strategies
- Steps for documenting abuse
- Ways to seek help or support

Empowerment, Not Pressure
Offer suggestions and resources without forcing decisions. Respect that leaving or reporting abuse can be complex and deeply personal.

Privacy Respect
Do not request unnecessary personal information. Encourage users to protect their identity and safety when sharing sensitive details online.

Practical Safety Advice
Provide practical strategies such as:
- Creating safety plans
- Identifying trusted support networks
- Preparing emergency contacts
- Recognizing manipulation or coercion
- Setting personal boundaries

Encourage Professional Support
When appropriate, recommend reaching out to trained professionals such as counselors, legal advisors, or local support organizations.

Communication Style
- Speak in simple, clear, and compassionate language.
- Use calm, reassuring, and supportive tones.
- Avoid legal or medical claims unless clearly framed as general information.
- Encourage hope, strength, and self-worth.

Boundaries
You must not:
- Provide violent retaliation advice.
- Encourage illegal actions.
- Replace professional legal, medical, or psychological services.
Instead, guide users toward safe resources and informed choices.

Goal
Your goal is to help women:
- Feel heard and supported
- Understand abuse and its warning signs
- Learn practical ways to protect themselves
- Know they are not alone and help exists`;

const ChatPage = () => {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hi there. I'm here to listen and support you. How are you feeling today?" }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const chatRef = React.useRef<any>(null);

  const getApiKey = () => {
    return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  };

  const initChat = () => {
    const apiKey = getApiKey();
    if (!apiKey) return;

    const ai = new GoogleGenAI({ apiKey });
    chatRef.current = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SafeChatSystemInstruction,
      },
    });
  };

  React.useEffect(() => {
    initChat();
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!chatRef.current) initChat();

    if (!chatRef.current) {
      setMessages(prev => [...prev, { role: 'bot', text: "I need an API key to function. Please ensure one is configured in the environment." }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const text = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMessage = "I'm having trouble connecting right now. Please ensure you are in a safe location and try again later.";
      
      const errorMsg = error.message || "";
      if (errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("not found") || errorMsg.includes("403") || errorMsg.includes("invalid")) {
        errorMessage = "I'm having trouble accessing my intelligence core. This might be due to an invalid or missing API key. Error: " + errorMsg;
      } else if (errorMsg) {
        errorMessage = "Connection error: " + errorMsg;
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-20 flex flex-col font-sans">
      {/* Safety Banner */}
      <div className="bg-[#8B2E5F] text-white py-2 px-4 flex justify-between items-center sticky top-20 z-40 shadow-md">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
          <ShieldAlert size={14} className="text-pink-300" />
          <span>Secure Session Active</span>
        </div>
        <button 
          onClick={quickExit}
          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border border-white/20 backdrop-blur-sm"
        >
          Quick Exit
        </button>
      </div>

      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-140px)]">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(139,46,95,0.08)] border border-gray-100 flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B2E5F] to-[#70254d] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-900/10">
                  <Bot size={28} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg tracking-tight">Support Assistant</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Confidential & Private</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
                End-to-End Encrypted
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-[#FDFCFB]/50"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-[#F28B82] to-[#e57373] text-white' 
                        : 'bg-gradient-to-br from-[#8B2E5F] to-[#70254d] text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className={`group relative p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm transition-all ${
                      msg.role === 'user' 
                        ? 'bg-[#F28B82] text-white rounded-tr-none shadow-pink-200/50' 
                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-gray-200/30'
                    }`}>
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-li:my-1">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                      <span className={`absolute bottom-[-20px] text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity ${
                        msg.role === 'user' ? 'right-0' : 'left-0'
                      }`}>
                        {msg.role === 'user' ? 'Sent' : 'Assistant'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white px-6 py-4 rounded-[1.5rem] rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="flex gap-1">
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                        className="w-1.5 h-1.5 bg-[#8B2E5F] rounded-full"
                      />
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-[#8B2E5F] rounded-full"
                      />
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-[#8B2E5F] rounded-full"
                      />
                    </div>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-white border-t border-gray-50">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-gray-50/80 border-2 border-transparent rounded-[1.5rem] pl-6 pr-20 py-5 text-[15px] transition-all focus:bg-white focus:border-[#F28B82]/20 focus:ring-0 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-4 bg-[#8B2E5F] text-white rounded-2xl hover:bg-[#70254d] transition-all shadow-lg shadow-pink-900/20 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed group"
              >
                <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
            <div className="mt-6 flex items-center justify-center gap-4">
              <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1.5">
                <HeartHandshake size={12} className="text-pink-300" />
                You are not alone. We are here for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page Views ---

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <ContactHero />
    <ContactInfo />
    <ContactForm />
    <Partners />
    <DonationCTA />
  </motion.div>
);

const DonatePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <DonateHero />
    <ImpactStats />
    <DonationTiers />
    <DonationForm />
    <Partners />
  </motion.div>
);

const GalleryPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <GalleryHero />
    <GalleryGrid />
    <Partners />
    <DonationCTA />
  </motion.div>
);

const EventsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <EventsHero />
    <EventsList />
    <Partners />
    <DonationCTA />
  </motion.div>
);

const WhatWeDoPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <WhatWeDoHero />
    <Programs />
    <ProgramImpact />
    <MethodologyCTA />
    <Partners />
    <DonationCTA />
  </motion.div>
);

const HomePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero />
    <AboutPreview />
    <Features />
    <DonationCTA />
  </motion.div>
);

const AboutPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <AboutHero />
    <History />
    <Achievements />
    <Careers />
    <Partners />
    <DonationCTA />
  </motion.div>
);

const FloatingChatButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <Link
        to="/chat"
        className="flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full shadow-2xl shadow-red-600/40 hover:bg-red-700 transition-all hover:scale-105 active:scale-95 group border-2 border-white/10 backdrop-blur-sm w-full sm:w-auto"
      >
        <div className="relative">
          <Bot size={24} className="group-hover:animate-bounce" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-red-600 rounded-full" />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest whitespace-nowrap">Start Safe Chat</span>
      </Link>

      <a
        href="https://sirztest.app.n8n.cloud/form/18c8ac75-e8e8-419e-b723-048e646636ca"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full shadow-2xl shadow-red-600/40 hover:bg-red-700 transition-all hover:scale-105 active:scale-95 group border-2 border-white/10 backdrop-blur-sm w-full sm:w-auto"
      >
        <ShieldAlert size={24} className="group-hover:animate-pulse" />
        <span className="text-sm font-bold uppercase tracking-widest whitespace-nowrap">Report Abuse</span>
      </a>
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-[#8B2E5F] selection:text-white">
        <Navbar />
        <FloatingChatButton />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/what-we-do" element={<WhatWeDoPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
