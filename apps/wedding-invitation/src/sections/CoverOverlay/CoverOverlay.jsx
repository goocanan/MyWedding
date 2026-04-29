import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useGuestName } from '../../hooks/useGuestName';
import './CoverOverlay.css';

export default function CoverOverlay({ isOpen, onOpen }) {
  const guestName = useGuestName();
  const { couple } = weddingConfig;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover-gate"
          className="cover-wrapper"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { 
              duration: 1.2, 
              ease: [0.43, 0.13, 0.23, 0.96] 
            } 
          }}
        >
          {/* Background Map & Lighting */}
          <div className="wood-desk-bg"></div>

          {/* Content Layer */}
          <motion.div 
            className="cover-content-direct"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* TOP: Cinematic Title */}
            <motion.div className="cover-top" variants={itemVariants}>
              <div className="hero-tagline">
                <span>Let’s Sail to Our Wedding</span>
                <h2>Through the Grand Line</h2>
              </div>
            </motion.div>

            {/* CENTER: Couple & Guest */}
            <div className="cover-center">
              <motion.div className="couple-name gold-metallic" variants={itemVariants}>
                {couple.groom.name}
                <span>&</span>
                {couple.bride.name}
              </motion.div>

              <motion.div className="guest-box guest-card" variants={itemVariants}>
                <span className="guest-label">To Our Dear Nakama</span>
                <strong className="guest-name">{guestName}</strong>
              </motion.div>
            </div>

            {/* BOTTOM: Premium CTA */}
            <motion.div className="cover-bottom" variants={itemVariants}>
              <div className="wax-btn-container">
                <motion.button 
                  className="wax-btn" 
                  onClick={onOpen} 
                  id="open-invitation-btn"
                  aria-label="Open Invitation"
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 5,
                    filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.9)) brightness(1.1)"
                  }}
                  whileTap={{ 
                    scale: 0.92, 
                    rotate: -2,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.9)) brightness(0.9)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }}
                >
                  <img 
                    src="/assets/wax-seal.png" 
                    alt="Wax Seal" 
                    className="wax-seal-img"
                  />
                </motion.button>
              </div>

              <span className="open-hint">Tap to Unseal</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}