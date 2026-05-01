import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from './hooks/useScrollLock';

// Components
import AudioController from './components/shared/AudioController';

// Sections
import CoverOverlay from './sections/CoverOverlay/CoverOverlay';
import HeroSection from './sections/HeroSection/HeroSection';
import CoupleSection from './sections/CoupleSection/CoupleSection';
import EventSection from './sections/EventSection/EventSection';
import CountdownSection from './sections/CountdownSection/CountdownSection';
import GallerySection from './sections/GallerySection/GallerySection';
import RSVPSection from './sections/RSVPSection/RSVPSection';
import GuestbookSection from './sections/GuestbookSection/GuestbookSection';
import GiftSection from './sections/GiftSection/GiftSection';
import FooterSection from './sections/FooterSection/FooterSection';

import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const audioRef = useRef(null);
  
  // Lock scroll when cover is showing
  useScrollLock(!isOpen);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const handleNewMessage = useCallback((msg) => {
    setNewMessages((prev) => [msg, ...prev]);
  }, []);

  return (
    <div className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen text-[#102A43] bg-transparent'} relative`}>

      {/* 1. Global Background (Scrolling & Looping) */}
      <div 
        className={`${isOpen ? 'absolute' : 'fixed'} inset-0 z-[-2] w-full h-full overflow-hidden bg-[#1a140d] transition-all duration-1000 ease-in-out`}
        style={{ 
          backgroundImage: isOpen ? "url('/assets/background1.png')" : "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
          backgroundSize: '100% auto', // Fill width, maintain aspect ratio (prevents zoom)
          backgroundPosition: 'top center',
          backgroundRepeat: 'repeat', // Loop if the content is longer than the image
          backgroundAttachment: 'scroll', // Allow it to scroll with content
          filter: isOpen ? 'brightness(0.6) contrast(1.1)' : 'none',
          minHeight: isOpen ? '100%' : '100vh'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Other Shared Components */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />
      <AudioController ref={audioRef} />

      {/* Main Content — Directly on the cinematic background */}
      <AnimatePresence>
        {isOpen && (
          <motion.main 
            className="app-main flex justify-center w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Sections Wrapper - Optimized for Mobile */}
            <motion.div 
              className="relative w-full max-w-[500px] space-y-16 md:space-y-24 py-16 px-6 text-white flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="section-voyage"><HeroSection /></div>
              <div className="section-voyage"><CoupleSection /></div>
              <div className="section-voyage"><CountdownSection /></div>
              <div className="section-voyage"><EventSection /></div>
              <div className="section-voyage"><GallerySection /></div>
              <div className="section-voyage"><RSVPSection onNewMessage={handleNewMessage} /></div>
              <div className="section-voyage"><GuestbookSection newMessages={newMessages} /></div>
              <div className="section-voyage"><GiftSection /></div>
              <div className="section-voyage"><FooterSection /></div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
