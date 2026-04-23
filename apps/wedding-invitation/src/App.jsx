import { useState, useRef, useCallback } from 'react';
import { useScrollLock } from './hooks/useScrollLock';

// Updated/New Components
import BubbleBackground from './components/animation/BubbleBackground';
import AudioController from './components/shared/AudioController';
import ParticleBackground from './components/animation/ParticleBackground';

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

      {/* 1. The Unified Elegant Background (Fixed image with rich blending) */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden bg-[#0c1b33]">
        <img 
          src={voyageBg} 
          alt="" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 scale-105" 
        />
        <div className="absolute inset-0 bg-[#0c1b33]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1b33]/90 via-[#0c1b33]/60 to-[#0c1b33]/90"></div>
      </div>

      {/* 2. New Global Bubble Background Effect */}
      <BubbleBackground /> 

      {/* Other Shared Components */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />
      <AudioController ref={audioRef} />

      {/* Main Content — Scrolling over the bubble ocean */}
      <main className={`app-main transition-all duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative z-10 space-y-24 py-20 bg-transparent">
          <div className="section-voyage"><HeroSection /></div>
          <div className="section-voyage"><CoupleSection /></div>
          <div className="section-voyage"><CountdownSection /></div>
          <div className="section-voyage"><EventSection /></div>
          <div className="section-voyage"><GallerySection /></div>
          <div className="section-voyage"><RSVPSection onNewMessage={handleNewMessage} /></div>
          <div className="section-voyage"><GuestbookSection newMessages={newMessages} /></div>
          <div className="section-voyage"><GiftSection /></div>
          <div className="section-voyage"><FooterSection /></div>
        </div>
      </main>
    </div>
  );
}
