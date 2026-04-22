import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import SectionDivider from '../../components/shared/SectionDivider';
import './FooterSection.css';

export default function FooterSection() {
  const { couple } = weddingConfig;

  return (
    <section className="section bg-transparent" id="footer">
      <div className="section-content relative z-10 text-center max-w-lg px-4">
        <ScrollReveal>
          <div className="w-20 h-20 mx-auto mb-12 border-2 border-gold rounded-full flex items-center justify-center text-4xl bg-[#102A43] shadow-[0_0_30px_rgba(212,175,55,0.4)]">⚓</div>
          <p className="font-serif-readable italic text-2xl text-white/80 leading-relaxed mb-12">
            "It is a great honor and happiness for us
            if you would be willing to attend
            and give your blessings to our journey."
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-gold tracking-[0.5em] uppercase text-[10px] font-bold mb-4">With love and gratitude,</p>
          <h2 className="text-gold-gradient font-script text-6xl md:text-8xl mb-12 leading-none">
            {couple.groom.name} <span className="font-pirate text-4xl italic">&</span> {couple.bride.name}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12"></ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="font-pirate text-3xl text-gold-gradient tracking-widest uppercase animate-pulse">
            The Adventure Begins... ⚓
          </p>
        </ScrollReveal>

        <div className="mt-20 text-[10px] font-bold text-gold/30 uppercase tracking-[0.5em]">
          Powered by the spirit of Nakama
        </div>
      </div>
    </section>
  );
}
