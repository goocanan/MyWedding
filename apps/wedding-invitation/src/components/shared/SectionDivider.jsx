import './SectionDivider.css';

/**
 * Ornamental divider with compass/anchor icon between sections.
 * @param {string} icon - emoji or text to show in center
 * @param {boolean} spin - whether to spin the icon (default: true)
 */
export default function SectionDivider({ icon = '🧭', spin = true }) {
  return (
    <div className={`flex items-center justify-center w-full max-w-sm mx-auto my-6 opacity-80 ${!spin ? 'animate-none' : ''}`} aria-hidden="true">
      {/* Ornate Pirate Sword Divider */}
      <svg width="100%" height="24" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         {/* Left Blade */}
         <path d="M185 12L0 12M0 12L30 8M0 12L30 16" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />
         
         {/* Center Hilt / Ornament */}
         <circle cx="200" cy="12" r="8" fill="#121f33" stroke="url(#goldGradient)" strokeWidth="2" />
         <path d="M196 12L204 12M200 8L200 16" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />
         <path d="M188 12 C188 6, 194 4, 200 4 C206 4, 212 6, 212 12 C212 18, 206 20, 200 20 C194 20, 188 18, 188 12Z" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2 2" />

         {/* Right Blade */}
         <path d="M215 12L400 12M400 12L370 8M400 12L370 16" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />

         <defs>
           <linearGradient id="goldGradient" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
             <stop stopColor="#BF953F" />
             <stop offset="0.5" stopColor="#FCF6BA" />
             <stop offset="1" stopColor="#B38728" />
           </linearGradient>
         </defs>
      </svg>
    </div>
  );
}
