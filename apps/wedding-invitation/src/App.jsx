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
    <div className={`app ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen text-[#102A43]'}`}>

      {/* 1. Global Parchment Background with Subtle One Piece Pattern */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden bg-[#FDF6E3]">
        {/* A soft repeating pattern simulating aged parchment */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply"></div>
        
        {/* Subtle repeating silhouette pattern (Simulated via CSS) */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(circle at 50% 50%, #4A3000 2px, transparent 2px)`,
               backgroundSize: '100px 100px',
               backgroundPosition: '0 0, 50px 50px'
             }}
        ></div>
      </div>

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
