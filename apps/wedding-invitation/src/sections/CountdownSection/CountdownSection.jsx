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
          <div className="mb-12">
            <h2 className="section-title text-4xl md:text-5xl">The Voyage Begins In</h2>
            <p className="section-subtitle text-sm mt-2">Time until we reach the Grand Line</p>
          </div>
        </ScrollReveal>

        <div className="w-full">
          {isExpired ? (
            <ScrollReveal>
              <div className="text-container py-10 px-20">
                <p className="font-pirate text-3xl md:text-5xl gold-text animate-pulse">⚓ The Adventure Has Begun! ⚓</p>
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
                <motion.div key={label} className="w-28 md:w-40" variants={scaleIn}>
                  <div className="text-container p-4 aspect-square flex flex-col items-center justify-center border border-gold-primary/20">
                     <div className="font-script text-4xl md:text-7xl gold-text">
                        {String(value).padStart(2, '0')}
                     </div>
                     <div className="font-serif-readable italic text-readable uppercase tracking-widest text-xs">
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
