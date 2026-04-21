import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import SectionDivider from '../../components/shared/SectionDivider';
import './FooterSection.css';

export default function FooterSection() {
  const { couple } = weddingConfig;

  return (
    <section className="section footer-section" id="footer">
      <ScrollReveal>
        <p className="footer-closing">
          "Merupakan kehormatan dan kebahagiaan bagi kami
          apabila Bapak/Ibu/Saudara/i berkenan hadir
          untuk memberikan doa restu."
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>
          With love,
        </p>
        <h2 className="footer-couple">
          {couple.groom.name} & {couple.bride.name} ⚓
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <SectionDivider icon="❤️" spin={false} />
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <p className="footer-tagline">"The adventure begins..."</p>
      </ScrollReveal>

      <div className="footer-credits">
        Made with ❤️ & Nakama Spirit
      </div>
    </section>
  );
}
