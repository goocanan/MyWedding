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
          <div className="mb-12">
            <h2 className="section-title text-4xl md:text-6xl">Nakama for Life</h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
          <ScrollReveal direction="scale" delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <WantedPosterFrame
                label={groom.label}
                name={groom.fullName}
                parents={groom.parents}
                photo={groom.photo}
                bounty={groom.birthDate}
                rotationClass="-rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="text-center w-full mt-4">
                <div className="section-title text-3xl md:text-5xl mb-2">{groom.name}</div>
                <div className="section-subtitle text-sm">Son of {groom.parents}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.3} className="hidden md:block">
            <div className="w-12 h-12 rounded-full border-2 border-gold-primary flex items-center justify-center text-3xl bg-black/40">💍</div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.5}>
            <div className="flex flex-col items-center gap-6">
              <WantedPosterFrame
                label={bride.label}
                name={bride.fullName}
                parents={bride.parents}
                photo={bride.photo}
                bounty={bride.birthDate}
                rotationClass="rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="text-center w-full mt-4">
                <div className="section-title text-3xl md:text-5xl mb-2">{bride.name}</div>
                <div className="section-subtitle text-sm">Daughter of {bride.parents}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
