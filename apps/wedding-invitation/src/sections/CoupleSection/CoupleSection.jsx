import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import WantedPosterFrame from '../../components/shared/WantedPosterFrame';
import './CoupleSection.css';

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="section bg-transparent" id="couple">
      <ScrollReveal>
        <h2 className="section-heading">Nakama for Life</h2>
      </ScrollReveal>

      <div className="couple-cards flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 w-full px-4">
        <ScrollReveal direction="scale" delay={0.1}>
          <div className="flex flex-col items-center gap-8">
            <WantedPosterFrame
              label={groom.label}
              name={groom.fullName}
              parents={groom.parents}
              photo={groom.photo}
              rotationClass="-rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="gold-nameplate text-center w-full">
              <div className="font-script text-5xl md:text-6xl gold-gradient-text mb-2">{groom.name}</div>
              <div className="font-serif-readable italic text-gold-bronze text-sm">Son of {groom.parents}</div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.3} className="hidden md:block">
           <div className="w-16 h-16 rounded-full border-2 border-gold-primary flex items-center justify-center text-4xl bg-black/40 shadow-premium">💍</div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.5}>
          <div className="flex flex-col items-center gap-8">
            <WantedPosterFrame
              label={bride.label}
              name={bride.fullName}
              parents={bride.parents}
              photo={bride.photo}
              rotationClass="rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            <div className="gold-nameplate text-center w-full">
              <div className="font-script text-5xl md:text-6xl gold-gradient-text mb-2">{bride.name}</div>
              <div className="font-serif-readable italic text-gold-bronze text-sm">Daughter of {bride.parents}</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
