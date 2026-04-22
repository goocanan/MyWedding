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
          className="cover-overlay"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="cover-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="cover-ornament" aria-hidden="true">⚓ ⚓ ⚓</div>

            <div className="cover-jolly" aria-hidden="true">🏴‍☠️</div>

            <span className="cover-pretitle">Set Sail to Our</span>

            <h1 className="cover-title">Grand Wedding</h1>

            <div className="cover-couple-names">
              {couple.groom.name}
              <span className="cover-ampersand">&</span>
              {couple.bride.name}
            </div>

            <div className="cover-date">Minggu, 20 Juli 2026</div>

            <div className="cover-guest-wrapper">
              <span className="cover-guest-label">── Kepada Yth. ──</span>
              <span className="cover-guest-name">{guestName}</span>
            </div>

            <button
              className="cover-btn"
              onClick={onOpen}
              id="open-invitation-btn"
              aria-label="Buka Undangan"
            >
              <span>⚓ Buka Undangan</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
