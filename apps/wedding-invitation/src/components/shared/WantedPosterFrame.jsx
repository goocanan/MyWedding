import { motion } from 'framer-motion';
import './WantedPosterFrame.css';

/**
 * Wanted Poster style photo frame — Epic 3D Pirate Edition.
 */
export default function WantedPosterFrame({ label, name, parents, photo, bounty = "20.07.2026", rotationClass = "" }) {
  return (
    <div className={`wanted-poster-container ${rotationClass}`}>
      <div className="wanted-poster bg-[#F4EBD0] shadow-2xl relative p-8 flex flex-col items-center">
        
        {/* The Pin/Nail at the top center */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#3C2A1A] shadow-xl z-10 border-2 border-[#1A0F08] flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-[#1A0F08]"></div>
        </div>

        <div className="wanted-poster__header w-full text-center border-b-2 border-[#3C2A1A]/20 pb-4 mb-6">
          <div className="font-pirate text-6xl tracking-widest text-[#3C2A1A]">WANTED</div>
          <div className="text-sm font-bold tracking-[0.4em] text-[#3C2A1A] mt-2 opacity-80">DEAD OR ALIVE</div>
        </div>

        <div className="wanted-poster__photo w-full aspect-[4/5] border-4 border-[#3C2A1A] overflow-hidden relative shadow-inner">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover sepia-[0.3] contrast-[1.1]" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-[#D4C4A0]/30 text-[#3C2A1A]/20">
              {label.includes('GROOM') ? '⚓' : '🌊'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3C2A1A]/40 to-transparent pointer-events-none"></div>
        </div>

        <div className="wanted-poster__info mt-8 w-full text-center">
          <h3 className="text-gold-gradient font-pirate text-4xl mb-4 uppercase tracking-tighter drop-shadow-md">{name}</h3>
          
          <div className="flex items-baseline justify-center gap-2 mb-4 bg-[#3C2A1A]/5 py-2 rounded">
            <span className="font-pirate text-2xl text-[#8E1C1C]">B</span>
            <span className="font-pirate text-3xl text-[#3C2A1A] tracking-widest">{bounty}</span>
          </div>

          <div className="text-[10px] font-bold tracking-[0.2em] text-[#8E1C1C] uppercase mb-1">{label}</div>
          <div className="font-serif italic text-sm text-[#3C2A1A]/70 leading-tight">{parents}</div>
        </div>

        {/* Texture overlays */}
        <div className="absolute inset-0 bg-texture-parchment opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
}
