import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useGuestName } from '../../hooks/useGuestName';
import './CoverOverlay.css';

/**
 * Full-screen cover overlay — the entry gate.
 * Elegant Parchment Concept.
 */
export default function CoverOverlay({ isOpen, onOpen }) {
  const guestName = useGuestName();
  const { couple } = weddingConfig;

  // Inisial untuk stempel lilin (mengambil huruf pertama dari nama)
  const groomInitial = couple.groom.name.charAt(0);
  const brideInitial = couple.bride.name.charAt(0);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover-gate"
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-[#FDF6E3]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, pointerEvents: 'none' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* 1. Wood Desk Background */}
          <div className="absolute inset-0 z-0 bg-[#4a3018] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>

          {/* 2. The Parchment Scroll Container */}
          <motion.div
            className="relative z-20 flex flex-col items-center text-center w-full max-w-[400px] md:max-w-[450px] min-h-[85vh] py-16 px-8 bg-[#E6D0A7] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_10px_0_15px_-5px_rgba(0,0,0,0.4),inset_-10px_0_15px_-5px_rgba(0,0,0,0.4)] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
               backgroundImage: `url('https://www.transparenttextures.com/patterns/aged-paper.png')`
            }}
          >
            {/* Scroll Rolled Edge Left */}
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.1)] to-transparent pointer-events-none"></div>
            {/* Scroll Rolled Edge Right */}
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.1)] to-transparent pointer-events-none"></div>

            {/* One Piece Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                 style={{
                   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100"><text x="50" y="50" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="%234A3000">☠</text></svg>')`,
                   backgroundSize: '60px 60px'
                 }}
            ></div>

            {/* Content Container (to stay above the rolled edges) */}
            <div className="relative z-10 w-full flex flex-col items-center">
              
              {/* Top Flourish */}
              <div className="mb-4 text-[#C19A6B] text-2xl drop-shadow-sm opacity-80">
                <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 0C30 0 35 10 45 10C35 10 30 20 30 20C30 20 25 10 15 10C25 10 30 0 30 0Z"/>
                  <circle cx="10" cy="10" r="2" />
                  <circle cx="50" cy="10" r="2" />
                </svg>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl mb-6 leading-tight drop-shadow-md" style={{ fontFamily: "'Great Vibes', cursive", color: "#a67c00" }}>
                The Grand Wedding
              </h1>

              {/* Golden Chain Divider */}
              <div className="w-full flex justify-center mb-8 opacity-80 text-[#a67c00]">
                 <span className="tracking-widest text-lg">∞∞∞∞∞∞∞∞∞</span>
              </div>

              {/* Couple Names in Gold Frame */}
              <div className="flex flex-col items-center mb-12 relative px-10 py-5 w-full border-[2px] border-[#a67c00]/60 rounded-md bg-[rgba(255,255,255,0.1)]">
                 <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#a67c00]"></div>
                 <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#a67c00]"></div>
                 <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#a67c00]"></div>
                 <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#a67c00]"></div>
                 
                 <div className="text-4xl md:text-5xl text-[#8b6508] drop-shadow-sm" style={{ fontFamily: "'Great Vibes', cursive" }}>{couple.groom.name} & {couple.bride.name}</div>
              </div>

              {/* Guest Name Section */}
              <div className="mb-14 w-full text-center relative">
                <div className="w-24 h-[1px] bg-[#102A43]/30 mx-auto mb-4 relative">
                  <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rotate-45 border border-[#102A43]/50"></div>
                </div>
                
                <span className="block text-lg text-[#102A43] mb-1 font-serif">Nakama Dear,</span>
                <span className="block text-4xl font-serif text-[#102A43] font-bold mb-4">{guestName}</span>
                
                <div className="w-24 h-[1px] bg-[#102A43]/30 mx-auto mt-4 relative">
                  <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rotate-45 border border-[#102A43]/50"></div>
                </div>
              </div>

              {/* Realistic 3D Wax Seal Button */}
              <button
                className="group relative flex flex-col items-center transition-all focus:outline-none"
                onClick={onOpen}
                id="open-invitation-btn"
              >
                {/* The Wax Seal */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#6b0f1a] via-[#4a0810] to-[#2a0408] flex items-center justify-center shadow-[0_10px_15px_rgba(0,0,0,0.6),inset_0_0_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500 border border-[#2a0408]">
                  {/* Weathered Texture Overlay */}
                  <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')] opacity-30 mix-blend-overlay"></div>
                  
                  {/* Inner Crest Ring */}
                  <div className="w-[70px] h-[70px] rounded-full border-[2px] border-[#8a2222]/80 flex items-center justify-center bg-gradient-to-br from-[#4a0810] to-[#3a050a] shadow-[inset_0_2px_5px_rgba(0,0,0,0.6)] relative overflow-hidden">
                    {/* Initials Embossed Gold */}
                    <span className="text-[#d4af37] drop-shadow-[0_1px_2px_rgba(0,0,0,1)] font-serif text-2xl font-bold tracking-widest relative z-10" style={{ fontFamily: "'Times New Roman', serif" }}>
                      {groomInitial}&{brideInitial}
                    </span>
                  </div>
                </div>

                {/* Pulsing Text */}
                <span className="mt-6 text-[#102A43] text-sm font-serif group-hover:opacity-100 transition-opacity animate-pulse">
                  Buka Undangan
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
