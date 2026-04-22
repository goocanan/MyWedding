import { useState, useRef, useCallback } from 'react';
import { useScrollLock } from './hooks/useScrollLock';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

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
    <div className="app w-screen h-screen overflow-hidden">
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

      {/* Main content sections — Locked by pointer-events-none until isOpen */}
      <main className={`app-main w-screen h-screen overflow-hidden transition-all duration-1000 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel={true}
          keyboard={true}
          effect={'fade'}
          fadeEffect={{
            crossFade: true
          }}
          modules={[Mousewheel, Keyboard, EffectFade]}
          speed={800}
          className="wedding-swiper w-full h-full"
        >

          {/* Hero — Starry night sky */}
          <SwiperSlide className="section-bg-stars w-full h-screen flex flex-col">
            <HeroSection />
          </SwiperSlide>

          {/* Couple — Navy with gold streaks + anchor watermark */}
          <SwiperSlide className="section-bg-navy w-full h-screen flex flex-col">
            <CoupleSection />
          </SwiperSlide>

          {/* Event — Ocean with compass watermark */}
          <SwiperSlide className="section-bg-ocean w-full h-screen flex flex-col">
            <EventSection />
          </SwiperSlide>

          {/* Countdown — Stars variant */}
          <SwiperSlide className="section-bg-stars w-full h-screen flex flex-col">
            <CountdownSection />
          </SwiperSlide>

          {/* Gallery — Deep abyss with edge glow */}
          <SwiperSlide className="section-bg-abyss w-full h-screen flex flex-col">
            <GallerySection />
          </SwiperSlide>

          {/* RSVP — Treasure map warm glow */}
          <SwiperSlide className="section-bg-treasure w-full h-screen flex flex-col">
            <RSVPSection onNewMessage={handleNewMessage} />
          </SwiperSlide>

          {/* Guestbook — Navy variant */}
          <SwiperSlide className="section-bg-navy w-full h-screen flex flex-col">
            <GuestbookSection newMessages={newMessages} />
          </SwiperSlide>

          {/* Gift — Ocean variant */}
          <SwiperSlide className="section-bg-ocean w-full h-screen flex flex-col">
            <GiftSection />
          </SwiperSlide>

          {/* Footer — Deep abyss */}
          <SwiperSlide className="section-bg-abyss w-full h-screen flex flex-col">
            <FooterSection />
          </SwiperSlide>

        </Swiper>
      </main>
    </div>
  );
}
