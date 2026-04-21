import './SectionDivider.css';

/**
 * Ornamental divider with compass/anchor icon between sections.
 * @param {string} icon - emoji or text to show in center
 * @param {boolean} spin - whether to spin the icon (default: true)
 */
export default function SectionDivider({ icon = '🧭', spin = true }) {
  return (
    <div className={`section-divider ${!spin ? 'section-divider--no-spin' : ''}`} aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__icon">{icon}</span>
      <span className="section-divider__line" />
    </div>
  );
}
