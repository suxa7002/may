import { signInWithGoogle } from "./firebase";
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Biography from './pages/Biography';
import Gallery from './pages/Gallery';
import Relationships from './pages/Relationships';
import Quotes from './pages/Quotes';
import Extra from './pages/Extra';
import Dashboard from './pages/Dashboard';
import { Menu, X, Heart, Star, Camera, Quote, Info, BookOpen, Globe, Settings } from 'lucide-react';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { translations } from './translations';
import { ImageProvider } from './context/ImageContext';

const LanguageContext = createContext({
  lang: 'ru',
  setLang: (l: string) => {},
  t: translations.ru
});

export const useTranslation = () => useContext(LanguageContext);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.bio, path: '/biography' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.relationships, path: '/relationships' },
    { name: t.nav.quotes, path: '/quotes' },
    { name: t.nav.extra, path: '/extra' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/" className="text-2xl font-serif font-semibold tracking-widest text-mai-beige">
          MAI SAKURAJIMA
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.name}
            </Link>
          ))}

          {/* 🔥 КНОПКА ВХОДА */}
          <button
            onClick={signInWithGoogle}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            Войти
          </button>

          {/* язык */}
          <button 
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          >
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            меню
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.name}
            </Link>
          ))}

          {/* 🔥 КНОПКА ВХОДА МОБИЛКА */}
          <button onClick={signInWithGoogle}>
            Войти
          </button>
        </div>
      )}
    </nav>
  );
}
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen"
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = translations[lang as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <ImageProvider>
        <Router>
          <div className="relative overflow-x-hidden perspective-1000">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/biography" element={<PageWrapper><Biography /></PageWrapper>} />
                <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                <Route path="/relationships" element={<PageWrapper><Relationships /></PageWrapper>} />
                <Route path="/quotes" element={<PageWrapper><Quotes /></PageWrapper>} />
                <Route path="/extra" element={<PageWrapper><Extra /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
            
            <footer className="py-12 text-center text-white/30 text-xs tracking-widest uppercase">
              <p>© 2026 {lang === 'ru' ? 'Посвящается девушке в костюме зайчика' : 'Dedicated to the Girl in the Bunny Suit'}</p>
              <p className="mt-2 italic">"I want to be with you. That's my only wish."</p>
              <Link to="/dashboard" className="mt-6 flex items-center justify-center gap-2 hover:text-mai-sunset transition-colors">
                <Settings size={12} />
                {lang === 'ru' ? 'Панель управления' : 'Dashboard'}
              </Link>
            </footer>
          </div>
        </Router>
      </ImageProvider>
    </LanguageContext.Provider>
  );
}
