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
    <div 
      className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen text-[#102A43] cinematic-grain'} relative flex flex-col items-center`} 
    >
      
      {isOpen && <div className="cinematic-vignette" />}

      {/* 1. Global Background (Cinematic Grand Line Map) */}
      <div 
        className={`${isOpen ? 'absolute' : 'fixed'} z-[-1]`}
        style={{ 
          backgroundColor: '#060e1a',
          backgroundImage: isOpen ? "url('/assets/background1.png')" : "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
          backgroundSize: '100% 100%', 
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat', 
          filter: isOpen ? 'brightness(1.1) contrast(1.1) saturate(1.2)' : 'none',
          width: '100%',
          maxWidth: '1080px',
          height: isOpen ? 'auto' : '100vh',
          aspectRatio: isOpen ? '1080 / 15000' : 'unset',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
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

      {/* Main Content — Aligned to the 1080x15000px Cinematic Map */}
      <AnimatePresence>
        {isOpen && (
          <motion.main 
            className="app-main flex justify-center w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ 
              width: '100%', 
              maxWidth: '1080px',
              height: 'auto',
              aspectRatio: '1080 / 15000'
            }}
          >
            {/* Sections Wrapper - Proportional Distribution */}
            <motion.div 
              className="relative w-full h-full px-6 text-white flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Spacing sections proportionally across the map to maintain alignment on all screens */}
              <div className="section-voyage" style={{ height: '12%' }}><HeroSection /></div>
              <div className="section-voyage" style={{ height: '12%' }}><CoupleSection /></div>
              <div className="section-voyage" style={{ height: '10.66%' }}><CountdownSection /></div>
              <div className="section-voyage" style={{ height: '12%' }}><EventSection /></div>
              <div className="section-voyage" style={{ height: '13.34%' }}><GallerySection /></div>
              <div className="section-voyage" style={{ height: '10.66%' }}><RSVPSection onNewMessage={handleNewMessage} /></div>
              <div className="section-voyage" style={{ height: '10.66%' }}><GuestbookSection newMessages={newMessages} /></div>
              <div className="section-voyage" style={{ height: '9.34%' }}><GiftSection /></div>
              <div className="section-voyage" style={{ height: '9.34%' }}><FooterSection /></div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
