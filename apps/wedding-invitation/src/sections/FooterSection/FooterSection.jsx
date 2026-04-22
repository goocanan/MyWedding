import { weddingConfig } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import SectionDivider from '../../components/shared/SectionDivider';
import './FooterSection.css';

export default function FooterSection() {
  const { couple } = weddingConfig;

  return (
    <section className="section bg-texture-sea" id="footer">
      <div className="absolute inset-0 bg-texture-parchment opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      <div className="section-content relative z-10 text-center max-w-lg">
        <ScrollReveal>
          <div className="wax-seal mx-auto mb-12 shadow-[0_0_40px_rgba(142,28,28,0.4)] border-4 border-[#3C2A1A]"></div>
          <p className="font-serif italic text-xl text-white/80 leading-relaxed mb-12">
            "It is a great honor and happiness for us
            if you would be willing to attend
            and give your blessings to our journey."
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">With love and gratitude,</p>
          <h2 className="text-gold-gradient font-pirate text-5xl md:text-6xl mb-8">
            {couple.groom.name} <span className="font-serif italic text-3xl">&</span> {couple.bride.name}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12"></ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="font-pirate text-2xl text-gold-gradient tracking-widest uppercase animate-pulse">
            The Adventure Begins... ⚓
          </p>
        </ScrollReveal>

        <div className="mt-20 text-[10px] font-bold text-gold/30 uppercase tracking-[0.4em]">
          Powered by the spirit of Nakama
        </div>
      </div>
    </section>
  );
}
