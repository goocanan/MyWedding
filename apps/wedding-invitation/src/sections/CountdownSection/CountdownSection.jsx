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
    <section className="section bg-transparent" id="countdown">
      <ScrollReveal>
        <h2 className="section-heading">The Voyage Begins In</h2>
        <p className="section-subheading text-gold-bronze tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Time until we reach the Grand Line</p>
      </ScrollReveal>

      <div className="section-content w-full max-w-4xl px-4">
        {isExpired ? (
          <ScrollReveal>
            <div className="gold-nameplate py-10 px-20 text-center">
              <p className="font-pirate text-4xl gold-gradient-text animate-pulse">⚓ The Adventure Has Begun! ⚓</p>
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
                <div className="gold-nameplate p-0 aspect-square flex flex-col items-center justify-center relative group overflow-hidden bg-black/20 rounded-lg backdrop-blur-sm border border-gold-primary/20">
                   <div className="relative z-10 font-script text-5xl md:text-7xl gold-gradient-text drop-shadow-md">
                      {String(value).padStart(2, '0')}
                   </div>
                   <div className="relative z-10 font-serif-readable italic text-ivory/60 uppercase tracking-widest text-xs mt-2">
                      {label}
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
