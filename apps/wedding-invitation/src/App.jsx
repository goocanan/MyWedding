import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollLock } from './hooks/useScrollLock';

// Shared Components
import ParticleBackground from './components/animation/ParticleBackground';
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

// Assets
import shipImage from './assets/ship-voyage.png';
import voyageBg from './assets/voyage-bg.png';

import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const audioRef = useRef(null);
  
  // Parallax Scroll logic
  const { scrollYProgress } = useScroll();
  
  // Ship animations linked to scroll — matching the artistic tilted style
  const shipY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const shipRotate = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 3, -3, 3, -3, 0]);
  const shipScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.1]);
  const shipX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "5%", "0%", "-5%", "0%"]);

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
    <div className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* 1. The Parallax Background (Fixed High Quality Image) */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden bg-[#0c1b33]">
        <img 
          src={voyageBg} 
          alt="Ocean Voyage" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-[#0c1b33]/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a]/70 via-transparent to-[#060e1a]/80"></div>
      </div>

      <div className="ember-system pointer-events-none">
        <div className="ember"></div>
        <div className="ember"></div>
        <div className="ember"></div>
        <div className="ember"></div>
      </div>

      {/* Ambient particles */}
      <ParticleBackground />

      {/* Cover Overlay — entry gate */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />

      {/* Floating audio controller */}
      <AudioController ref={audioRef} />

      {/* 2. The Main Subject (The Ship) — Floating Layer */}
      {isOpen && (
        <motion.div 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-60 md:opacity-90"
          style={{ 
            y: shipY,
            x: shipX,
            rotate: shipRotate,
            scale: shipScale
          }}
        >
          <img 
            src={shipImage} 
            alt="Thousand Sunny Voyage" 
            className="w-[45rem] md:w-[70rem] drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter contrast-[1.1] saturate-[1.2]"
          />
        </motion.div>
      )}

      {/* 3. Section Content — Scrolling over the background and ship */}
      <main className={`app-main transition-all duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative z-10">
          
          <div className="section-voyage">
            <HeroSection />
          </div>

          <div className="section-voyage">
            <CoupleSection />
          </div>

          <div className="section-voyage">
            <EventSection />
          </div>

          <div className="section-voyage">
            <CountdownSection />
          </div>

          <div className="section-voyage">
            <GallerySection />
          </div>

          <div className="section-voyage">
            <RSVPSection onNewMessage={handleNewMessage} />
          </div>

          <div className="section-voyage">
            <GuestbookSection newMessages={newMessages} />
          </div>

          <div className="section-voyage">
            <GiftSection />
          </div>

          <div className="section-voyage">
            <FooterSection />
          </div>

        </div>
      </main>
    </div>
  );
}
