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
import shipImage from './assets/ship-voyage.png';

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

      {/* 1. The Unified Vibrant One Piece Background */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden bg-[#87CEEB]">
        <img 
          src={voyageBg} 
          alt="" 
          className="absolute top-0 left-0 w-full h-full object-cover scale-105" 
        />
        {/* Vibrant color grading instead of dark gloom */}
        <div className="absolute inset-0 vibrant-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB]/20 via-transparent to-[#006994]/40"></div>
      </div>

      {/* 2. Floating Thousand Sunny in Background */}
      <div className="fixed bottom-[10%] left-1/2 -translate-x-1/2 z-[-1] pointer-events-none opacity-80 mix-blend-normal">
        <img 
          src={shipImage} 
          alt="Thousand Sunny" 
          className="w-[30rem] md:w-[45rem] animate-float-ship drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* 3. New Global Bubble Background Effect */}
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
