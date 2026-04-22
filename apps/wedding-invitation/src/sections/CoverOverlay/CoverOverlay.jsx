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
          className="cover-overlay bg-texture-sea"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Parchment Overlay */}
          <div className="absolute inset-0 bg-texture-parchment opacity-10 mix-blend-overlay pointer-events-none"></div>

          <motion.div
            className="cover-content relative z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="cover-ornament gold-gradient-text" aria-hidden="true">⚓ ⚓ ⚓</div>

            <div className="cover-jolly text-6xl mb-6" aria-hidden="true">🏴‍☠️</div>

            <span className="cover-pretitle text-gold tracking-[0.4em] uppercase text-sm mb-4">Set Sail to Our</span>

            <h1 className="cover-title text-gold-gradient text-6xl md:text-8xl mb-8">Grand Wedding</h1>

            <div className="cover-couple-names text-4xl md:text-6xl mb-8 font-display">
              {couple.groom.name}
              <span className="text-gold italic mx-6">&</span>
              {couple.bride.name}
            </div>

            <div className="cover-date border-y border-gold/30 py-4 mb-12 text-xl tracking-widest uppercase">
              Minggu, 20 Juli 2026
            </div>

            <div className="cover-guest-wrapper mb-12">
              <span className="block text-sm text-gold/60 uppercase tracking-widest mb-2">Kepada Yth.</span>
              <span className="block text-3xl font-display text-gold-gradient">{guestName}</span>
            </div>

            <button
              className="group relative flex items-center justify-center"
              onClick={onOpen}
              id="open-invitation-btn"
            >
              <div className="wax-seal group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(142,28,28,0.5)]"></div>
              <span className="absolute top-full mt-4 text-gold tracking-[0.3em] uppercase text-xs opacity-60 group-hover:opacity-100 transition-opacity">Buka Undangan</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
