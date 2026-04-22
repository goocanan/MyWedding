import { motion } from 'framer-motion';
import './WantedPosterFrame.css';

/**
 * Wanted Poster style photo frame — One Piece Edition.
 * Used in CoupleSection for groom & bride profiles.
 */
export default function WantedPosterFrame({ label, name, parents, photo, bounty = "20.07.2026", rotationClass = "" }) {
  return (
    <div className={`wanted-poster relative p-6 max-w-sm mx-auto flex flex-col items-center bg-wedding-parchment shadow-2xl shadow-black/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] border-2 border-[#b59e5f] ${rotationClass}`}>
      
      {/* The Pin/Nail at the top center */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-600 shadow-md border-2 border-gray-400 z-10 before:content-[''] before:absolute before:inset-[4px] before:rounded-full before:bg-gray-800"></div>

      <div className="wanted-poster__header w-full text-center border-b-2 border-black/20 pb-2 mb-4">
        <div className="wanted-poster__wanted-text font-pirate text-5xl tracking-widest text-[#4a3525]">WANTED</div>
        <div className="wanted-poster__dead-or-alive text-sm font-bold tracking-[0.3em] text-[#4a3525] mt-1">DEAD OR ALIVE</div>
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
