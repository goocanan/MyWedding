import { useState, useRef, useCallback } from 'react';
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

        {/* Hero — Starry night sky */}
        <div className="section-bg-stars section-fade-out">
          <HeroSection />
        </div>

        {/* Couple — Navy with gold streaks + anchor watermark */}
        <div className="section-bg-navy section-fade-in section-fade-out">
          <CoupleSection />
        </div>

        {/* Event — Ocean with compass watermark */}
        <div className="section-bg-ocean section-fade-in section-fade-out">
          <EventSection />
        </div>

        {/* Countdown — Stars variant */}
        <div className="section-bg-stars section-fade-in section-fade-out">
          <CountdownSection />
        </div>

        {/* Gallery — Deep abyss with edge glow */}
        <div className="section-bg-abyss section-fade-in section-fade-out">
          <GallerySection />
        </div>

        {/* RSVP — Treasure map warm glow */}
        <div className="section-bg-treasure section-fade-in section-fade-out">
          <RSVPSection onNewMessage={handleNewMessage} />
        </div>

        {/* Guestbook — Navy variant */}
        <div className="section-bg-navy section-fade-in section-fade-out">
          <GuestbookSection newMessages={newMessages} />
        </div>

        {/* Gift — Ocean variant */}
        <div className="section-bg-ocean section-fade-in section-fade-out">
          <GiftSection />
        </div>

        {/* Footer — Deep abyss */}
        <div className="section-bg-abyss section-fade-in">
          <FooterSection />
        </div>

      </main>
    </div>
  );
}
