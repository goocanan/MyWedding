import { useState, useRef, useCallback } from 'react';
import { useScrollLock } from './hooks/useScrollLock';

// Shared Components
import ParticleBackground from './components/animation/ParticleBackground';
import AudioController from './components/shared/AudioController';
import WaveDivider from './components/shared/WaveDivider';

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
    // Trigger audio play
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const handleNewMessage = useCallback((msg) => {
    setNewMessages((prev) => [msg, ...prev]);
  }, []);

  return (
    <div className="app">
      {/* Ambient particles */}
      <ParticleBackground />

      {/* Cover Overlay — entry gate */}
      <CoverOverlay isOpen={isOpen} onOpen={handleOpen} />

      {/* Floating audio controller */}
      <AudioController ref={audioRef} />

      {/* Main content sections */}
      <main className="app-main">
        <HeroSection />

        <WaveDivider color="#132241" />
        <CoupleSection />
        <WaveDivider color="#0c1b33" flip />

        <EventSection />

        <WaveDivider color="#132241" />
        <CountdownSection />
        <WaveDivider color="#0c1b33" flip />

        <GallerySection />

        <WaveDivider color="#132241" />
        <RSVPSection onNewMessage={handleNewMessage} />
        <WaveDivider color="#0c1b33" flip />

        <GuestbookSection newMessages={newMessages} />

        <WaveDivider color="#132241" />
        <GiftSection />
        <WaveDivider color="#0c1b33" flip />

        <FooterSection />
      </main>
    </div>
  );
}
