import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import WantedPosterFrame from '../../components/shared/WantedPosterFrame';
import './CoupleSection.css';

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="section bg-texture-sea" id="couple">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">The Happy Couple</h2>
      </ScrollReveal>

      <div className="couple-cards flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 w-full px-4">
        <ScrollReveal direction="scale" delay={0.1}>
          <WantedPosterFrame
            label={groom.label}
            name={groom.fullName}
            parents={groom.parents}
            photo={groom.photo}
            rotationClass="-rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.3} className="hidden md:block">
          <div className="wax-seal border-4 border-gold shadow-[0_0_20px_rgba(212,168,83,0.5)]"></div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.5}>
          <WantedPosterFrame
            label={bride.label}
            name={bride.fullName}
            parents={bride.parents}
            photo={bride.photo}
            rotationClass="rotate-3 hover:rotate-0 transition-transform duration-500"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
