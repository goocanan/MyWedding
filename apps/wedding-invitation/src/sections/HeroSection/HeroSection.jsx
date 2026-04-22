import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { staggerContainer, fadeInUp } from '../../components/animation/motionVariants';
import SectionDivider from '../../components/shared/SectionDivider';
import './HeroSection.css';

export default function HeroSection() {
  const { quotes } = weddingConfig;

  return (
    <section className="section bg-texture-sea" id="hero">
      <div className="absolute inset-0 bg-texture-parchment opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <motion.div
        className="section-content relative z-10 max-w-2xl text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="mb-12" variants={fadeInUp}>
           <div className="w-24 h-24 mx-auto mb-8 border-4 border-gold rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(212,168,83,0.3)] bg-[#0c1b33]">
              🧭
           </div>
        </motion.div>

        <motion.p className="font-serif italic text-2xl text-white/90 mb-6 leading-relaxed" variants={fadeInUp}>
          "{quotes.religious.text}"
        </motion.p>

        <motion.span className="font-pirate text-gold-gradient text-xl tracking-widest mb-16 block" variants={fadeInUp}>
          — {quotes.religious.source} —
        </motion.span>

        <motion.div variants={fadeInUp} className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16"></motion.div>

        <motion.p className="font-pirate text-3xl md:text-5xl text-gold-gradient mb-4 uppercase tracking-tighter" variants={fadeInUp}>
          "{quotes.theme.text}"
        </motion.p>

        <motion.span className="font-serif italic text-gold/60 text-lg uppercase tracking-[0.2em]" variants={fadeInUp}>
          {quotes.theme.source}
        </motion.span>
      </motion.div>
    </section>
  );
}
