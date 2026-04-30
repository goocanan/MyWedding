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
        <motion.div className="parchment-floating mb-12 md:mb-16" variants={fadeInUp}>
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-2xl md:text-3xl bg-[#102A43] text-[#D4AF37] shadow-lg">
            📜
          </div>
          <p className="font-serif-readable italic text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed px-2">
            "{quotes.religious.text}"
          </p>
          <span className="font-pirate text-[#D4AF37] text-base md:text-lg tracking-widest block uppercase">
            — {quotes.religious.source} —
          </span>
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-12 md:mb-16"></motion.div>

        <motion.p className="font-script text-4xl md:text-7xl text-gold-gradient mb-6 leading-tight px-2" variants={fadeInUp}>
          "{quotes.theme.text}"
        </motion.p>

        <motion.span className="font-pirate text-gold/60 text-lg md:text-xl uppercase tracking-[0.3em]" variants={fadeInUp}>
          {quotes.theme.source}
        </motion.span>
      </motion.div>
    </section>
  );
}
