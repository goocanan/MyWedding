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
      
      <div className="content">
        <motion.div
          className="w-full flex flex-col items-center gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="flex flex-col items-center gap-6" variants={fadeInUp}>
            <div className="w-16 h-16 border-2 border-gold-primary rounded-full flex items-center justify-center text-2xl bg-black/20 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              📜
            </div>
            <p className="hero-verse text-center">
              "{quotes.religious.text}"
            </p>
            <span className="section-subtitle text-base md:text-lg">
              — {quotes.religious.source} —
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-1/3 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-30 mx-auto"></motion.div>

          <motion.div className="flex flex-col gap-4 items-center" variants={fadeInUp}>
            <h1 className="hero-verse text-3xl md:text-5xl !font-normal">
              "{quotes.theme.text}"
            </h1>

            <span className="section-subtitle text-lg md:text-xl">
              {quotes.theme.source}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
