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

      <div className="couple-cards flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-16 w-full">
        <ScrollReveal direction="scale" delay={0.1}>
          <WantedPosterFrame
            label={groom.label}
            name={groom.fullName}
            parents={groom.parents}
            photo={groom.photo}
            rotationClass="-rotate-2"
          />
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.3} className="hidden md:block">
          <span className="couple-ampersand text-4xl font-pirate text-wedding-gold">&</span>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.5}>
          <WantedPosterFrame
            label={bride.label}
            name={bride.fullName}
            parents={bride.parents}
            photo={bride.photo}
            rotationClass="rotate-3 md:-translate-y-4"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
