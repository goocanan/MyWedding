import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useGuestName } from '../../hooks/useGuestName';
import './CoverOverlay.css';

export default function CoverOverlay({ isOpen, onOpen }) {
  const guestName = useGuestName();
  const { couple } = weddingConfig;

  const groomInitial = couple.groom.name.charAt(0);
  const brideInitial = couple.bride.name.charAt(0);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="cover-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* FULL BACKGROUND */}
          <div className="cover-bg"></div>

          {/* CONTENT */}
          <div className="cover-content">

            {/* TOP */}
            <div className="cover-top">
              <h1>The Grand Wedding</h1>
              <h2>{couple.groom.name} & {couple.bride.name}</h2>
            </div>

            {/* CENTER */}
            <div className="cover-center">
              <span>Nakama Dear,</span>
              <strong>{guestName}</strong>
            </div>

            {/* BOTTOM CTA */}
            <div className="cover-bottom">
              <button className="wax-btn" onClick={onOpen}>
                {groomInitial}&{brideInitial}
              </button>
              <p>Buka Undangan</p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}