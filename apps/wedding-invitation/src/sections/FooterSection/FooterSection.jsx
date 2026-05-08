import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import SectionDivider from '../../components/shared/SectionDivider';
import './FooterSection.css';

export default function FooterSection() {
  const { couple } = weddingConfig;

  return (
    <section className="section" id="footer">
      <div className="content relative z-10 text-center max-w-lg">
        <ScrollReveal>
          <div className="text-container overlay-soft flex flex-col items-center gap-10">
            <div className="w-16 h-16 border-2 border-gold-primary rounded-full flex items-center justify-center text-3xl bg-black/40 shadow-premium text-gold-primary">⚓</div>
            <p className="font-serif-readable italic text-2xl text-readable leading-relaxed">
              "It is a great honor and happiness for us
              if you would be willing to attend
              and give your blessings to our journey."
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-container overlay-soft flex flex-col items-center gap-4 mt-8">
            <p className="text-bronze tracking-[0.5em] uppercase text-[10px] font-bold text-shadow-premium">With love and gratitude,</p>
            <h2 className="gold-text font-script text-6xl md:text-8xl leading-none py-2">
              {couple.groom.name} <span className="font-pirate text-4xl italic">&</span> {couple.bride.name}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent"></ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="text-container overlay-strong">
            <p className="font-pirate text-3xl gold-text tracking-widest uppercase animate-pulse">
              The Adventure Begins... ⚓
            </p>
          </div>
        </ScrollReveal>

        <div className="text-[10px] font-bold text-bronze uppercase tracking-[0.5em] mt-8 text-shadow-premium">
          Powered by the spirit of Nakama
        </div>
      </div>
    </section>
  );
}
