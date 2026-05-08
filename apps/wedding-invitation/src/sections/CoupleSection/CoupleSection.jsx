import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import WantedPosterFrame from '../../components/shared/WantedPosterFrame';
import './CoupleSection.css';

export default function CoupleSection() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="section" id="couple">
      <div className="content">
        <ScrollReveal>
          <div className="text-container overlay-soft mb-8">
            <h2 className="section-heading gold-text">Nakama for Life</h2>
          </div>
        </ScrollReveal>

        <div className="couple-cards flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
          <ScrollReveal direction="scale" delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <WantedPosterFrame
                label={groom.label}
                name={groom.fullName}
                parents={groom.parents}
                photo={groom.photo}
                rotationClass="-rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="text-container overlay-soft gold-nameplate text-center w-full">
                <div className="font-script text-5xl md:text-6xl gold-text">{groom.name}</div>
                <div className="font-serif-readable italic text-bronze text-sm mt-2 text-shadow-premium">Son of {groom.parents}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.3} className="hidden md:block">
            <div className="w-12 h-12 rounded-full border-2 border-gold-primary flex items-center justify-center text-3xl bg-black/40 shadow-premium">💍</div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.5}>
            <div className="flex flex-col items-center gap-6">
              <WantedPosterFrame
                label={bride.label}
                name={bride.fullName}
                parents={bride.parents}
                photo={bride.photo}
                rotationClass="rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="text-container overlay-soft gold-nameplate text-center w-full">
                <div className="font-script text-5xl md:text-6xl gold-text">{bride.name}</div>
                <div className="font-serif-readable italic text-bronze text-sm mt-2 text-shadow-premium">Daughter of {bride.parents}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
