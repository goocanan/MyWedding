import './WaveDivider.css';

/**
 * SVG wave divider between sections.
 * @param {string} color - fill color (default: --bg-secondary)
 * @param {boolean} flip - flip vertically
 */
export default function WaveDivider({ color = '#132241', flip = false }) {
  return (
    <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,60 C150,100 350,0 500,60 C650,120 850,20 1000,60 C1100,80 1150,50 1200,60 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
