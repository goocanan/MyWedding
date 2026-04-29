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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // Exit from bottom up
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
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
            transition: { duration: 1, ease: "easeInOut" } 
          }}
        >
          {/* 1. BACKGROUND LAYER (Depth) */}
          <motion.div 
            className="wood-desk-bg"
            exit={{ 
              scale: 1.2, 
              filter: "blur(20px) brightness(1.5)",
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
            }}
          ></motion.div>

          {/* 2. LIGHT BURST LAYER (Impact) */}
          <motion.div 
            className="light-burst"
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ 
              opacity: [0, 1, 0], 
              scale: [0.8, 1.5, 2],
              transition: { duration: 0.8, times: [0, 0.2, 1], ease: "easeOut", delay: 0.1 } 
            }}
          />

          {/* 3. CONTENT LAYER */}
          <motion.div 
            className="cover-content-direct"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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

              <motion.div className="guest-box invite-box guest-card" variants={itemVariants}>
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
                    rotate: 2,
                    filter: "brightness(1.1)"
                  }}
                  whileTap={{ 
                    scale: 0.85, 
                    rotate: [0, -3, 3, -1, 0], // Micro-shake for physical feedback
                    transition: { duration: 0.3 }
                  }}
                  exit={{ 
                    scale: 0.5, 
                    opacity: 0,
                    transition: { duration: 0.4, ease: "backIn" } 
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