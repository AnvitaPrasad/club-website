import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = "!@#$%^&*():{};|,.<>/?";
const CYCLES_PER_LETTER = 4;
const SHUFFLE_TIME = 80;

const EncryptText = ({ text }) => {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          if (char === ' ') return ' ';
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];
          return randomChar;
        })
        .join("");
      setDisplayText(scrambled);
      pos++;
      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setDisplayText(text);
  };

  return (
    <motion.span
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
    >
      {displayText}
    </motion.span>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path, section = null) => {
    setIsOpen(false);
    
    if (location.pathname !== '/' && section) {
      navigate('/', { state: { scrollTo: section } });
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/', section: 'about' },
    { text: 'Events', path: '/', section: 'events' },
    { text: 'Team', path: '/team' }
  ];

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="CS Club" 
                className="h-12 w-auto hover:scale-110 transition-transform"
              />
            </Link>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ text, path, section }) => (
                <button
                  key={text}
                  onClick={() => handleNavigation(path, section)}
                  className="text-white hover:text-gray-300 transition-colors px-3 py-2 text-lg no-underline focus:outline-none"
                >
                  <EncryptText text={text} />
                </button>
              ))}
              
              <button
                onClick={() => setShowQR(true)}
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors focus:outline-none"
              >
                <svg 
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80">
              {navItems.map(({ text, path, section }) => (
                <button
                  key={text}
                  onClick={() => handleNavigation(path, section)}
                  className="block w-full text-white hover:text-gray-300 transition-colors px-3 py-2 text-lg text-center no-underline focus:outline-none"
                >
                  <EncryptText text={text} />
                </button>
              ))}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowQR(true);
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-gray-300 transition-colors px-3 py-2 text-lg no-underline focus:outline-none"
                >
                  Join WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              onClick={e => e.stopPropagation()}
              className="bg-black/20 backdrop-blur-md rounded-xl p-8 max-w-md w-full text-center border border-white/5 shadow-lg ring-1 ring-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white w-full text-center">Join Our WhatsApp Group</h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="text-white/70 hover:text-white transition-colors absolute right-8"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-transparent">
                <img 
                  src="/whatsapp-qr.png" 
                  alt="WhatsApp QR Code"
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-6 text-base text-white/70 text-center">
                Scan this QR code to join our WhatsApp group
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;