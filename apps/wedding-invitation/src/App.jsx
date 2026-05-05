import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from './hooks/useScrollLock';

// Components
import AudioController from './components/shared/AudioController';
import BubbleBackground from './components/animation/BubbleBackground';

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
    <div className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen text-[#102A43] bg-transparent cinematic-grain'} relative`} style={{ height: isOpen ? '15000px' : 'auto' }}>
      
      {isOpen && <div className="cinematic-vignette" />}

      {/* 1. Global Background (Cinematic Grand Line Map) */}
      <div 
        className={`${isOpen ? 'absolute' : 'fixed'} inset-0 z-[-2] overflow-hidden`}
        style={{ 
          backgroundImage: isOpen ? "url('/assets/background1.png')" : "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
          backgroundSize: isOpen ? '100% 15000px' : 'cover', 
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat', 
          filter: isOpen ? 'brightness(1.1) contrast(1.1) saturate(1.2)' : 'none',
          height: isOpen ? '15000px' : '100vh',
          width: '100%',
          transition: 'filter 2s ease-in-out',
        }}
      >
        {/* Cinematic Overlays */}
        {isOpen && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          </>
        )}
      </div>

      {/* Animated Elements */}
      {isOpen && <BubbleBackground />}

      {/* Other Shared Components */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />
      <AudioController ref={audioRef} />

      {/* Main Content — Aligned to the 15000px Cinematic Map */}
      <AnimatePresence>
        {isOpen && (
          <motion.main 
            className="app-main flex justify-center w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ height: '15000px' }}
          >
            {/* Sections Wrapper - Distributed over 15000px */}
            <motion.div 
              className="relative w-full max-w-[600px] px-6 text-white flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Spacing sections evenly across the 15000px map */}
              <div className="section-voyage" style={{ height: '1800px' }}><HeroSection /></div>
              <div className="section-voyage" style={{ height: '1800px' }}><CoupleSection /></div>
              <div className="section-voyage" style={{ height: '1600px' }}><CountdownSection /></div>
              <div className="section-voyage" style={{ height: '1800px' }}><EventSection /></div>
              <div className="section-voyage" style={{ height: '2000px' }}><GallerySection /></div>
              <div className="section-voyage" style={{ height: '1600px' }}><RSVPSection onNewMessage={handleNewMessage} /></div>
              <div className="section-voyage" style={{ height: '1600px' }}><GuestbookSection newMessages={newMessages} /></div>
              <div className="section-voyage" style={{ height: '1400px' }}><GiftSection /></div>
              <div className="section-voyage" style={{ height: '1400px' }}><FooterSection /></div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
