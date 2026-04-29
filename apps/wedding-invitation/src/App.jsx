import { useState, useRef, useCallback } from 'react';
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
    <div className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen text-[#102A43] bg-[#4a3018]'} relative`}>

      {/* 1. Global Wood Desk Background */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden bg-[#4a3018] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>

      {/* Other Shared Components */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />
      <AudioController ref={audioRef} />

      {/* Main Content — Scrolling inside the parchment scroll */}
      <AnimatePresence>
        {isOpen && (
          <motion.main 
            className="app-main flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            
            {/* The Parchment Scroll Container (Global) */}
            <motion.div 
              className="relative z-10 w-full max-w-[400px] md:max-w-[450px] min-h-screen bg-[#E6D0A7] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_10px_0_15px_-5px_rgba(0,0,0,0.4),inset_-10px_0_15px_-5px_rgba(0,0,0,0.4)] flex flex-col items-center"
              style={{ 
                backgroundImage: `url('https://www.transparenttextures.com/patterns/aged-paper.png')`,
                originY: 0 
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.8 // Start after cover begins to fade
              }}
            >
              
              {/* Wooden Scroll Roller (Top) */}
              <div className="absolute top-0 left-[-5%] right-[-5%] h-10 scroll-roller rounded-full z-20 border-y border-[#5c3c1e] flex items-center justify-between px-4">
                <div className="w-6 h-6 rounded-full gold-endcap shadow-inner"></div>
                <div className="w-6 h-6 rounded-full gold-endcap shadow-inner"></div>
              </div>

              {/* Scroll Rolled Edge Left */}
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.1)] to-transparent pointer-events-none z-0"></div>
              {/* Scroll Rolled Edge Right */}
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.1)] to-transparent pointer-events-none z-0"></div>
    
              {/* One Piece Background Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply z-0"
                   style={{
                     backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100"><text x="50" y="50" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="%234A3000">☠</text></svg>')`,
                     backgroundSize: '60px 60px'
                   }}
              ></div>
    
              {/* Sections Wrapper */}
              <motion.div 
                className="relative z-10 space-y-24 py-20 w-full px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
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
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
