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
import voyageBg from './assets/voyage-bg.png';

import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const audioRef = useRef(null);
  
  // Parallax Scroll logic
  const { scrollYProgress } = useScroll();
  
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

      {/* 3. Section Content — Scrolling over the background */}
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
