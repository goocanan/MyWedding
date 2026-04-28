import './SectionDivider.css';

/**
 * Ornamental divider with a nautical icon between sections.
 * @param {string} icon - emoji or text to show in center
 * @param {boolean} spin - whether to spin the icon (default: true)
 */
export default function SectionDivider({ icon = '🧭', spin = true }) {
  return (
    <div className={`section-divider ${!spin ? 'section-divider--no-spin' : ''}`} aria-hidden="true">
      <div className="section-divider__line"></div>
      <div className="section-divider__icon">{icon}</div>
      <div className="section-divider__line"></div>
    </div>
  );
}