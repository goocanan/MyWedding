import { motion } from 'framer-motion';
import './WantedPosterFrame.css';

/**
 * Wanted Poster style photo frame — One Piece Edition.
 * Used in CoupleSection for groom & bride profiles.
 */
export default function WantedPosterFrame({ label, name, parents, photo, bounty = "20.07.2026" }) {
  return (
    <div className="wanted-poster">
      <div className="wanted-poster__header">
        <div className="wanted-poster__wanted-text font-pirate">WANTED</div>
        <div className="wanted-poster__dead-or-alive">DEAD OR ALIVE</div>
      </div>

      <div className="wanted-poster__photo">
        <div className="photo-inner">
          {photo ? (
            <img src={photo} alt={name} loading="lazy" />
          ) : (
            <div className="wanted-poster__photo-placeholder">
              {label.includes('GROOM') ? '⚓' : '🌊'}
            </div>
          )}
          <div className="photo-overlay"></div>
        </div>
      </div>

      <div className="wanted-poster__info">
        <h3 className="wanted-poster__name font-pirate">{name}</h3>
        
        <div className="wanted-poster__bounty">
          <span className="bounty-currency font-pirate">B</span>
          <span className="bounty-amount font-pirate">{bounty}</span>
        </div>

        <div className="wanted-poster__label">{label}</div>
        <div className="wanted-poster__parents">{parents}</div>
      </div>

      {/* Decorative elements */}
      <div className="wanted-poster__corner tl"></div>
      <div className="wanted-poster__corner tr"></div>
      <div className="wanted-poster__corner bl"></div>
      <div className="wanted-poster__corner br"></div>
    </div>
  );
}
