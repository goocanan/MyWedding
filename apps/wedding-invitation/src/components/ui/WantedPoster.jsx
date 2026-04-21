import { motion } from 'framer-motion';
import './WantedPoster.css';

/**
 * WantedPoster — A One Piece themed component to display couple info.
 * @param {string} name - The name to display (Groom/Bride).
 * @param {string} label - The 'bounty' label (e.g. THE GROOM).
 * @param {string} photo - Path to the photo image.
 * @param {string} bounty - The 'bounty' value (wedding date or similar).
 */
export default function WantedPoster({ name, label, photo, bounty }) {
  return (
    <motion.div 
      className="wanted-poster-container"
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="wanted-poster">
        <div className="wanted-header">
          <span className="wanted-text">WANTED</span>
        </div>
        
        <div className="wanted-subheading">
          <span>DEAD OR ALIVE</span>
        </div>

        <div className="wanted-photo-frame">
          <div className="photo-inner">
            {photo ? (
              <img src={photo} alt={name} className="wanted-img" />
            ) : (
              <div className="photo-placeholder">
                <span className="placeholder-icon">⚓</span>
              </div>
            )}
            <div className="photo-overlay"></div>
          </div>
        </div>

        <div className="wanted-name-section">
          <h2 className="wanted-name">{name}</h2>
          <div className="wanted-bounty">
            <span className="bounty-symbol">B</span>
            <span className="bounty-value">{bounty}</span>
          </div>
          <p className="wanted-label">{label}</p>
        </div>

        {/* Burned edges / stamp effects */}
        <div className="corner-decor top-left"></div>
        <div className="corner-decor top-right"></div>
        <div className="corner-decor bottom-left"></div>
        <div className="corner-decor bottom-right"></div>
      </div>
    </motion.div>
  );
}
