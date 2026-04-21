import './ParticleBackground.css';

/**
 * Floating golden particles — CSS-only for performance.
 * Creates an ambient ocean/treasure atmosphere.
 */
export default function ParticleBackground() {
  return (
    <div className="particle-container" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}
