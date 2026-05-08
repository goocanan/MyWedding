import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { useCountdown } from '../../hooks/useCountdown';
import { staggerContainer, scaleIn } from '../../components/animation/motionVariants';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './CountdownSection.css';

export default function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingConfig.targetDate);

  const items = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ];

  return (
    <section className="section" id="countdown">
      <div className="content">
        <ScrollReveal>
          <div className="text-container overlay-soft flex flex-col items-center gap-2 mb-8">
            <h2 className="section-heading gold-text">The Voyage Begins In</h2>
            <p className="section-subheading text-bronze tracking-widest text-center uppercase text-sm text-shadow-premium">Time until we reach the Grand Line</p>
          </div>
        </ScrollReveal>

        <div className="w-full max-w-4xl">
          {isExpired ? (
            <ScrollReveal>
              <div className="text-container overlay-strong py-10 px-20 text-center">
                <p className="font-pirate text-4xl gold-text animate-pulse">⚓ The Adventure Has Begun! ⚓</p>
              </div>
            </ScrollReveal>
          ) : (
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {items.map(({ value, label }) => (
                <motion.div key={label} className="w-32 md:w-40" variants={scaleIn}>
                  <div className="text-container overlay-strong p-0 aspect-square flex flex-col items-center justify-center relative group overflow-hidden border border-gold-primary/20">
                     <div className="relative z-10 font-script text-5xl md:text-7xl gold-text drop-shadow-2xl">
                        {String(value).padStart(2, '0')}
                     </div>
                     <div className="relative z-10 font-serif-readable italic text-readable uppercase tracking-widest text-xs mt-2 opacity-80">
                        {label}
                     </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
