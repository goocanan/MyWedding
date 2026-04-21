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
      <main className="app-main section-anchor">
        {/* Animated Corner Ornaments */}
        <div className="corner-ornament ornament-tl"></div>
        <div className="corner-ornament ornament-tr"></div>
        <div className="corner-ornament ornament-bl"></div>
        <div className="corner-ornament ornament-br"></div>

        <HeroSection />

        <div className="nautical-divider">
          <svg className="nautical-icon" viewBox="0 0 24 24" fill="currentColor">
             {/* Anchor SVG path */}
             <path d="M12 2C10.9 2 10 2.9 10 4C10 4.8 10.5 5.5 11.2 5.8L10.3 10.3L6.8 9.3L6.5 10.3L9.6 11.1L8.2 18.2C5.3 16.9 3.1 14.3 2.2 11L4.2 11L4.2 9L0.2 9L0.2 11L1.2 11C2.2 15.6 6 19.3 10.8 20V22L8 22L8 24L16 24L16 22L13.2 22V20C18 19.3 21.8 15.6 22.8 11L23.8 11L23.8 9L19.8 9L19.8 11L21.8 11C20.9 14.3 18.7 16.9 15.8 18.2L14.4 11.1L17.5 10.3L17.2 9.3L13.7 10.3L12.8 5.8C13.5 5.5 14 4.8 14 4C14 2.9 13.1 2 12 2M12 3C12.6 3 13 3.4 13 4C13 4.6 12.6 5 12 5C11.4 5 11 4.6 11 4C11 3.4 11.4 3 12 3Z"/>
          </svg>
        </div>

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
