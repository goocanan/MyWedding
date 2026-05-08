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

      {/* Landing Page Background (Only when not open) */}
      {!isOpen && (
        <div 
          className="fixed inset-0 z-[-1]"
          style={{ 
            backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
            backgroundSize: 'cover',
            backgroundColor: '#060e1a'
          }}
        />
      )}

      {/* Animated Elements */}
      {isOpen && <BubbleBackground />}

      {/* Shared Components */}
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
              minHeight: '100vh',
              position: 'relative'
            }}
          >
            {/* 1. Global Background (Locked to 15000px Height) */}
            <div 
              className="absolute inset-0 z-[-1] overflow-hidden"
              style={{ 
                backgroundColor: '#060e1a',
                width: '100%',
                height: '100%',
              }}
            >
              <div 
                className="w-full h-full"
                style={{ 
                  backgroundImage: "url('/assets/background1.png'), url('/assets/background2.png')",
                  backgroundPosition: 'top center, bottom center',
                  /* On mobile, we use 'auto 100%' to prevent stretching while keeping 15000px height */
                  backgroundSize: 'auto 50%, auto 50%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              </div>
            </div>

            {/* Sections Wrapper - Rigid Grid Structure to Prevent Overlapping */}
            <motion.div 
              className="relative w-full px-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              {/* Each section is locked into its own grid row */}
              <HeroSection />
              <CoupleSection />
              <CountdownSection />
              <EventSection />
              <GallerySection />
              <RSVPSection onNewMessage={handleNewMessage} />
              <GuestbookSection newMessages={newMessages} />
              <GiftSection />
              <FooterSection />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
