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
          className="text-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="flex flex-col items-center gap-6" variants={fadeInUp}>
            <div className="w-16 h-16 border-2 border-gold-primary rounded-full flex items-center justify-center text-2xl bg-black/40 text-gold-primary">
              📜
            </div>
            <p className="font-serif-readable italic text-xl md:text-2xl text-readable">
              "{quotes.religious.text}"
            </p>
            <span className="font-pirate text-gold-primary text-base md:text-lg tracking-widest uppercase">
              — {quotes.religious.source} —
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-2/3 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50 mx-auto"></motion.div>

          <motion.div className="flex flex-col gap-4 items-center" variants={fadeInUp}>
            <h1 className="font-script text-3xl md:text-5xl gold-text leading-tight">
              "{quotes.theme.text}"
            </h1>

            <span className="font-pirate text-bronze text-lg md:text-xl uppercase tracking-[0.3em]">
              {quotes.theme.source}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
