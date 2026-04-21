import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { staggerContainer, fadeInUp } from '../../components/animation/motionVariants';
import SectionDivider from '../../components/shared/SectionDivider';
import './HeroSection.css';

export default function HeroSection() {
  const { quotes } = weddingConfig;

  return (
    <section className="section hero-section" id="hero">
      <motion.div
        className="section-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="hero-quote" variants={fadeInUp}>
          "{quotes.religious.text}"
        </motion.p>

        <motion.span className="hero-source" variants={fadeInUp}>
          — {quotes.religious.source} —
        </motion.span>

        <motion.div variants={fadeInUp}>
          <SectionDivider icon="⚓" spin={false} />
        </motion.div>

        <motion.p className="hero-theme-quote" variants={fadeInUp}>
          "{quotes.theme.text}"
        </motion.p>

        <motion.span className="hero-theme-source" variants={fadeInUp}>
          {quotes.theme.source}
        </motion.span>
      </motion.div>
    </section>
  );
}
