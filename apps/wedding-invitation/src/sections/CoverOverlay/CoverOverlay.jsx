import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useGuestName } from '../../hooks/useGuestName';
import './CoverOverlay.css';

/**
 * Full-screen cover overlay — the entry gate.
 * Locks scroll until "Buka Undangan" is clicked.
 */
export default function CoverOverlay({ isOpen, onOpen }) {
  const guestName = useGuestName();
  const { couple } = weddingConfig;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover-gate"
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-texture-sea"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Parchment Overlay */}
          <div className="absolute inset-0 bg-texture-parchment opacity-10 mix-blend-overlay pointer-events-none"></div>

          <motion.div
            className="cover-content relative z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="cover-ornament gold-gradient-text text-2xl mb-4" aria-hidden="true">⚓ ⚓ ⚓</div>

            <div className="text-7xl mb-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" aria-hidden="true">🏴‍☠️</div>

            <span className="block text-gold tracking-[0.5em] uppercase text-xs mb-6 font-bold">Set Sail to Our</span>

            <h1 className="text-gold-gradient text-7xl md:text-9xl mb-10 font-pirate tracking-tighter leading-none">
              Grand <br className="md:hidden" /> Wedding
            </h1>

            <div className="flex flex-col items-center gap-4 mb-12">
               <div className="text-4xl md:text-6xl font-display text-white drop-shadow-lg">{couple.groom.name}</div>
               <div className="text-gold font-pirate text-4xl italic">&</div>
               <div className="text-4xl md:text-6xl font-display text-white drop-shadow-lg">{couple.bride.name}</div>
            </div>

            <div className="w-48 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-12"></div>

            <div className="cover-guest-wrapper mb-16 scale-110">
              <span className="block text-[10px] text-gold/60 uppercase tracking-[0.4em] mb-3 font-bold">Exclusively invited for</span>
              <span className="block text-4xl font-display text-gold-gradient drop-shadow-md">{guestName}</span>
            </div>

            <button
              className="group relative flex flex-col items-center transition-all active:scale-95"
              onClick={onOpen}
              id="open-invitation-btn"
            >
              <div className="wax-seal w-24 h-24 border-4 border-[#3C2A1A] group-hover:scale-110 transition-transform duration-700 shadow-[0_0_50px_rgba(142,28,28,0.6)]"></div>
              <span className="mt-6 text-gold tracking-[0.4em] uppercase text-[10px] font-bold opacity-60 group-hover:opacity-100 transition-opacity">Buka Undangan</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
