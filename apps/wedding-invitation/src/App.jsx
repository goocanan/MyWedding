import { useState, useRef, useCallback } from 'react';
import { useScrollLock } from './hooks/useScrollLock';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

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
      <div className="ember-system">
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

      {/* Main content sections */}
      <main className="app-main">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel={true}
          keyboard={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              opacity: 0,
              scale: 0.8,
            },
            next: {
              opacity: 0,
              scale: 1.1,
            },
          }}
          modules={[Mousewheel, Keyboard, EffectCreative]}
          speed={1000}
          allowTouchMove={isOpen}
          allowSlideNext={isOpen}
          allowSlidePrev={isOpen}
          className="wedding-swiper"
        >

          {/* Hero — Starry night sky */}
          <SwiperSlide className="section-bg-stars">
            <HeroSection />
          </SwiperSlide>

          {/* Couple — Navy with gold streaks + anchor watermark */}
          <SwiperSlide className="section-bg-navy">
            <CoupleSection />
          </SwiperSlide>

          {/* Event — Ocean with compass watermark */}
          <SwiperSlide className="section-bg-ocean">
            <EventSection />
          </SwiperSlide>

          {/* Countdown — Stars variant */}
          <SwiperSlide className="section-bg-stars">
            <CountdownSection />
          </SwiperSlide>

          {/* Gallery — Deep abyss with edge glow */}
          <SwiperSlide className="section-bg-abyss">
            <GallerySection />
          </SwiperSlide>

          {/* RSVP — Treasure map warm glow */}
          <SwiperSlide className="section-bg-treasure">
            <RSVPSection onNewMessage={handleNewMessage} />
          </SwiperSlide>

          {/* Guestbook — Navy variant */}
          <SwiperSlide className="section-bg-navy">
            <GuestbookSection newMessages={newMessages} />
          </SwiperSlide>

          {/* Gift — Ocean variant */}
          <SwiperSlide className="section-bg-ocean">
            <GiftSection />
          </SwiperSlide>

          {/* Footer — Deep abyss */}
          <SwiperSlide className="section-bg-abyss">
            <FooterSection />
          </SwiperSlide>

        </Swiper>
      </main>
    </div>
  );
}
