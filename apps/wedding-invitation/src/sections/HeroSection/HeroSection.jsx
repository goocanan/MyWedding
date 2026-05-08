import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { staggerContainer, fadeInUp } from '../../components/animation/motionVariants';
import SectionDivider from '../../components/shared/SectionDivider';
import './HeroSection.css';

export default function HeroSection() {
  const { quotes } = weddingConfig;

  return (
    <section className="section" id="hero">
      <div className="absolute inset-0 bg-texture-parchment opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <motion.div
        className="content relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-container overlay-soft max-w-2xl">
          <motion.div className="text-container-premium flex flex-col items-center gap-6" variants={fadeInUp}>
            <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-gold-primary rounded-full flex items-center justify-center text-2xl md:text-3xl bg-black/40 text-gold-primary shadow-premium">
              📜
            </div>
            <p className="font-serif-readable italic text-xl md:text-2xl leading-relaxed px-2 text-readable">
              "{quotes.religious.text}"
            </p>
            <span className="font-pirate text-gold-primary text-base md:text-lg tracking-widest block uppercase text-shadow-premium">
              — {quotes.religious.source} —
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-2/3 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50 my-8 mx-auto"></motion.div>

          <motion.div className="flex flex-col gap-4 items-center" variants={fadeInUp}>
            <p className="font-script text-4xl md:text-7xl gold-text leading-tight px-2 drop-shadow-2xl">
              "{quotes.theme.text}"
            </p>

            <motion.span className="font-pirate text-bronze text-lg md:text-xl uppercase tracking-[0.3em] text-shadow-premium">
              {quotes.theme.source}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
