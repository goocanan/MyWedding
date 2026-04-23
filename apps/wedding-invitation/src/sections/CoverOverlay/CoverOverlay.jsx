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
          {/* 1. Global Parchment Background with Subtle One Piece Pattern */}
          {/* A soft repeating pattern simulating aged parchment and subtle pirate symbols */}
          <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply"></div>
          
          {/* Subtle One Piece repeating silhouette pattern (Simulated via CSS) */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
               style={{
                 backgroundImage: `radial-gradient(circle at 50% 50%, #4A3000 2px, transparent 2px)`,
                 backgroundSize: '100px 100px',
                 backgroundPosition: '0 0, 50px 50px'
               }}
          ></div>

          {/* 2. Central Content Container */}
          <motion.div
            className="relative z-20 flex flex-col items-center text-center w-full max-w-md px-8 py-12 bg-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            
            {/* Top Classical Divider */}
            <div className="w-full flex justify-center mb-8 opacity-70">
              <svg width="200" height="20" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10 L80,10 L90,5 L100,15 L110,5 L120,10 L200,10" stroke="url(#gold-grad)" strokeWidth="2" fill="none"/>
                <defs>
                  <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BF953F" />
                    <stop offset="50%" stopColor="#FCF6BA" />
                    <stop offset="100%" stopColor="#B38728" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl mb-10 tracking-widest leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
              <span className="block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-lg uppercase font-serif">
                The Grand
              </span>
              <span className="block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-lg uppercase font-serif">
                Wedding
              </span>
            </h1>

            {/* Couple Names in Decorative Gold Frame Concept */}
            <div className="flex flex-col items-center gap-4 mb-12 relative px-8 py-6 border-y border-[#D4AF37]/40 w-full">
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]"></div>
               
               <div className="text-4xl md:text-5xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-lg" style={{ fontFamily: "'Pinyon Script', cursive" }}>{couple.groom.name}</div>
               <div className="text-[#D4AF37] text-2xl italic opacity-80" style={{ fontFamily: "'Great Vibes', cursive" }}>and</div>
               <div className="text-4xl md:text-5xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-lg" style={{ fontFamily: "'Pinyon Script', cursive" }}>{couple.bride.name}</div>
            </div>

            {/* Guest Name Section (Decree Style) */}
            <div className="mb-14 w-full text-center">
              <span className="block text-xs text-[#102A43]/60 uppercase tracking-[0.3em] mb-3 font-serif">Specially Invited</span>
              <span className="block text-3xl font-serif text-[#102A43] font-semibold border-b border-[#102A43]/20 pb-2 inline-block px-8">{guestName}</span>
            </div>

            {/* Realistic 3D Wax Seal Button */}
            <button
              className="group relative flex flex-col items-center transition-all focus:outline-none"
              onClick={onOpen}
              id="open-invitation-btn"
            >
              {/* The Wax Seal */}
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#800000] via-[#5e0000] to-[#3a0000] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500">
                {/* Weathered Texture Overlay */}
                <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')] opacity-20 mix-blend-overlay"></div>
                
                {/* Inner Crest Ring */}
                <div className="w-20 h-20 rounded-full border-[2px] border-[#800000]/60 flex items-center justify-center bg-gradient-to-br from-[#5e0000] to-[#4a0000] shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] relative overflow-hidden">
                  {/* Initials Embossed Gold */}
                  <span className="bg-gradient-to-b from-[#FCF6BA] to-[#BF953F] text-transparent bg-clip-text drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] font-serif text-3xl font-bold tracking-widest relative z-10">
                    {groomInitial}&{brideInitial}
                  </span>
                </div>
              </div>

              {/* Pulsing Text */}
              <span className="mt-8 text-[#102A43]/80 tracking-[0.4em] uppercase text-xs font-serif font-bold group-hover:opacity-100 transition-opacity animate-pulse">
                Buka Undangan
              </span>
            </button>

            {/* Bottom Classical Divider */}
            <div className="w-full flex justify-center mt-12 opacity-70">
              <svg width="200" height="20" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10 L80,10 L90,15 L100,5 L110,15 L120,10 L200,10" stroke="url(#gold-grad-bot)" strokeWidth="2" fill="none"/>
                <defs>
                  <linearGradient id="gold-grad-bot" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BF953F" />
                    <stop offset="50%" stopColor="#FCF6BA" />
                    <stop offset="100%" stopColor="#B38728" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
