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
          key="cover-gate"
          className="cover-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Map */}
          <div className="wood-desk-bg"></div>

          {/* ===== CONTENT (Directly on Map) ===== */}
          <motion.div 
            className="cover-content-direct"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* TOP */}
            <div className="cover-top">
              <h1 className="title">The Grand Wedding</h1>
            </div>

            {/* CENTER */}
            <div className="cover-center">
              <div className="couple-name">
                {couple.groom.name} & {couple.bride.name}
              </div>

              <div className="guest">
                <span>Nakama Dear,</span>
                <strong>{guestName}</strong>
              </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="cover-bottom">
              <button className="wax-btn" onClick={onOpen} id="open-invitation-btn">
                <img 
                  src="/assets/wax-seal.png" 
                  alt="Wax Seal" 
                  className="wax-seal-img"
                />
                <span className="wax-text">
                  {groomInitial}&{brideInitial}
                </span>
              </button>

              <span className="open-text">Buka Undangan</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}