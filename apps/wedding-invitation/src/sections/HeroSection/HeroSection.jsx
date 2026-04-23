import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { staggerContainer, fadeInUp } from '../../components/animation/motionVariants';
import SectionDivider from '../../components/shared/SectionDivider';
import './HeroSection.css';

export default function HeroSection() {
  const { quotes } = weddingConfig;

  return (
    <section className="section bg-transparent" id="hero">
      <div className="absolute inset-0 bg-texture-parchment opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <motion.div
        className="section-content relative z-10 max-w-2xl text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="parchment-floating mb-16" variants={fadeInUp}>
          <div className="w-20 h-20 mx-auto mb-8 border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-3xl bg-[#102A43] text-[#D4AF37] shadow-lg">
            📜
          </div>
          <p className="font-serif-readable italic text-2xl mb-8 leading-relaxed">
            "{quotes.religious.text}"
          </p>
          <span className="font-pirate text-[#D4AF37] text-lg tracking-widest block uppercase">
            — {quotes.religious.source} —
          </span>
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16"></motion.div>

        <motion.p className="font-script text-5xl md:text-7xl text-gold-gradient mb-6 leading-tight" variants={fadeInUp}>
          "{quotes.theme.text}"
        </motion.p>

        <motion.span className="font-pirate text-gold/60 text-xl uppercase tracking-[0.3em]" variants={fadeInUp}>
          {quotes.theme.source}
        </motion.span>
      </motion.div>
    </section>
  );
}
