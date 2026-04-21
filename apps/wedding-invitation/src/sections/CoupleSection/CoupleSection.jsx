import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import WantedPosterFrame from '../../components/shared/WantedPosterFrame';
import './CoupleSection.css';

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="section couple-section" id="couple">
      <ScrollReveal>
        <h2 className="section-heading">The Happy Couple</h2>
      </ScrollReveal>

      <div className="couple-cards">
        <ScrollReveal direction="scale" delay={0.1}>
          <WantedPosterFrame
            label={groom.label}
            name={groom.fullName}
            parents={groom.parents}
            photo={groom.photo}
          />
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.3}>
          <span className="couple-ampersand">&</span>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.5}>
          <WantedPosterFrame
            label={bride.label}
            name={bride.fullName}
            parents={bride.parents}
            photo={bride.photo}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
