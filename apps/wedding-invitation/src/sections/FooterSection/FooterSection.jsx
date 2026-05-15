import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import SectionDivider from '../../components/shared/SectionDivider';
import './FooterSection.css';

export default function FooterSection() {
  const { couple } = weddingConfig;

  return (
    <section className="section" id="footer">
      <div className="content">
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex flex-col items-center gap-10">
              <div className="w-16 h-16 border-2 border-gold-primary rounded-full flex items-center justify-center text-3xl bg-black/20 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]">⚓</div>
              <p className="hero-verse text-center">
                "It is a great honor and happiness for us
                if you would be willing to attend
                and give your blessings to our journey."
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-12">
            <div className="flex flex-col items-center gap-4">
              <p className="section-subtitle text-[10px]">With love and gratitude,</p>
              <h2 className="section-title text-5xl md:text-7xl">
                {couple.groom.name} <span className="italic">&</span> {couple.bride.name}
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent"></ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mb-8">
            <p className="section-title text-2xl md:text-3xl animate-pulse">
              The Adventure Begins... ⚓
            </p>
          </div>
        </ScrollReveal>

        <div className="text-[10px] font-bold text-bronze uppercase tracking-[0.5em] mt-4">
          Powered by the spirit of Nakama
        </div>
      </div>
    </section>
  );
}
