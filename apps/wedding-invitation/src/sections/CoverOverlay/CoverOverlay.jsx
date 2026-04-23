import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useGuestName } from '../../hooks/useGuestName';
import './CoverOverlay.css';
import voyageBg from '../../assets/voyage-bg.png';

/**
 * Full-screen cover overlay — the entry gate.
 * Locks scroll until "Buka Undangan" is clicked.
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
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-[#0c1b33]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, pointerEvents: 'none' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* 1. Background Layers */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${voyageBg})` }}
          ></div>
          <div className="absolute inset-0 z-10 bg-[#0c1b33]/60 backdrop-blur-[3px] mix-blend-multiply"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0c1b33]/90 via-[#0c1b33]/40 to-[#0c1b33]/90"></div>
          
          {/* 2. Ornate Inner Frame (Memberikan kesan Logbook Mewah) */}
          <div className="absolute inset-4 md:inset-8 z-15 border-[1px] border-[#D4AF37]/30 rounded-sm pointer-events-none flex flex-col justify-between p-4">
            <div className="w-full flex justify-between">
               <span className="text-[#D4AF37]/50 text-xl">⚜</span>
               <span className="text-[#D4AF37]/50 text-xl">⚜</span>
            </div>
            <div className="w-full flex justify-between">
               <span className="text-[#D4AF37]/50 text-xl">⚜</span>
               <span className="text-[#D4AF37]/50 text-xl">⚜</span>
            </div>
          </div>

          {/* 3. Main Content */}
          <motion.div
            className="cover-content relative z-20 flex flex-col items-center text-center w-full max-w-md px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {/* Header Ornament */}
            <div className="mb-6 opacity-80">
              <span className="block text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] font-bold mb-2">The Voyage Begins</span>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70"></div>
                <span className="text-[#D4AF37] text-lg">⚓</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70"></div>
              </div>
            </div>

            {/* Main Titles */}
            <h1 className="text-5xl md:text-7xl mb-6 font-pirate tracking-wider leading-tight">
              <span className="block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                THE GRAND
              </span>
              <span className="block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                WEDDING
              </span>
            </h1>

            {/* Couple Names */}
            <div className="flex flex-col items-center gap-2 mb-10 mt-4">
               <div className="text-4xl md:text-5xl font-display text-[#FDF6E3] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{couple.groom.name}</div>
               <div className="text-[#D4AF37] font-pirate text-3xl italic opacity-80">&</div>
               <div className="text-4xl md:text-5xl font-display text-[#FDF6E3] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{couple.bride.name}</div>
            </div>

            {/* Guest Name Box (Styled like a targeted bounty/invite) */}
            <div className="mb-14 p-4 border-y border-[#D4AF37]/20 bg-[#0c1b33]/40 backdrop-blur-sm w-full relative">
              <span className="block text-[10px] text-[#D4AF37]/80 uppercase tracking-[0.3em] mb-2 font-semibold">Dear Nakama,</span>
              <span className="block text-3xl font-display text-white drop-shadow-md tracking-wide">{guestName}</span>
            </div>

            {/* Wax Seal Button */}
            <button
              className="group relative flex flex-col items-center transition-all focus:outline-none"
              onClick={onOpen}
              id="open-invitation-btn"
            >
              {/* Outer Glow on hover */}
              <div className="absolute inset-0 rounded-full bg-[#8E1C1C] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              {/* The Wax Seal */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#A02222] via-[#6B1414] to-[#3A0A0A] border-[3px] border-[#2A0808] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500">
                {/* Inner Crest Ring */}
                <div className="w-16 h-16 rounded-full border-[1.5px] border-[#D4AF37]/40 flex items-center justify-center bg-gradient-to-br from-[#6B1414] to-[#4A0E0E] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
                  {/* Initials */}
                  <span className="text-[#D4AF37] font-pirate text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,1)] tracking-widest">
                    {groomInitial}&{brideInitial}
                  </span>
                </div>
              </div>

              {/* Pulsing Text */}
              <span className="mt-6 text-[#D4AF37] tracking-[0.4em] uppercase text-[11px] font-bold opacity-70 group-hover:opacity-100 transition-opacity animate-pulse">
                Buka Undangan
              </span>
            </button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
