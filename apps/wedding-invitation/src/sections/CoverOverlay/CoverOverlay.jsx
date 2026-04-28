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
          {/* Background */}
          <div className="wood-desk-bg"></div>

          {/* Scroll */}
          <motion.div
            className="parchment-scroll"
            initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="scroll-edge-left"></div>
            <div className="scroll-edge-right"></div>
            <div className="op-pattern-overlay"></div>

            {/* ===== CONTENT ===== */}
            <div className="scroll-content">

              {/* TOP */}
              <div className="scroll-top">
                <h1 className="title">The Grand Wedding</h1>
              </div>

              {/* CENTER */}
              <div className="scroll-center">
                <div className="couple-name">
                  {couple.groom.name} & {couple.bride.name}
                </div>

                <div className="guest">
                  <span>Nakama Dear,</span>
                  <strong>{guestName}</strong>
                </div>
              </div>

              {/* BOTTOM CTA */}
              <div className="scroll-bottom">
                <button className="wax-seal-btn" onClick={onOpen}>
                  <div className="wax-seal-inner">
                    {groomInitial}&{brideInitial}
                  </div>
                </button>

                <span className="open-text">Buka Undangan</span>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}