import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LightboxModal.css';

/**
 * Full-screen image lightbox with navigation.
 * @param {Array} images - gallery image array
 * @param {number|null} activeIndex - currently active index (null = closed)
 * @param {function} onClose - close handler
 * @param {function} onChange - index change handler
 */
export default function LightboxModal({ images, activeIndex, onClose, onChange }) {
  const isOpen = activeIndex !== null;

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange(Math.min(activeIndex + 1, images.length - 1));
      if (e.key === 'ArrowLeft') onChange(Math.max(activeIndex - 1, 0));
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, activeIndex, images.length, onClose, onChange]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const current = isOpen ? images[activeIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

            {activeIndex > 0 && (
              <button
                className="lightbox-nav lightbox-nav--prev"
                onClick={() => onChange(activeIndex - 1)}
                aria-label="Previous"
              >
                ‹
              </button>
            )}

            {current?.src ? (
              <img src={current.src} alt={current.alt || 'Photo'} />
            ) : (
              <div className="lightbox-placeholder">📸</div>
            )}

            {activeIndex < images.length - 1 && (
              <button
                className="lightbox-nav lightbox-nav--next"
                onClick={() => onChange(activeIndex + 1)}
                aria-label="Next"
              >
                ›
              </button>
            )}

            <span className="lightbox-counter">
              {activeIndex + 1} / {images.length}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
