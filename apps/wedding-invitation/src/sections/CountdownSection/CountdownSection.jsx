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
    <section className="section bg-texture-sea" id="countdown">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">⏳ Voyage Countdown</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Time until we reach the Grand Line</p>
      </ScrollReveal>

      <div className="section-content w-full max-w-4xl">
        {isExpired ? (
          <ScrollReveal>
            <div className="gold-plaque py-10 px-20 text-center">
              <p className="font-pirate text-4xl text-gold-gradient animate-pulse">⚓ The Adventure Has Begun! ⚓</p>
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
                <div className="gold-plaque p-0 aspect-square flex flex-col items-center justify-center bg-[#0c1b33]/90 border-4 border-double border-[#D4AF37] relative group overflow-hidden">
                   <div className="absolute inset-0 bg-texture-parchment opacity-5 group-hover:opacity-10 transition-opacity"></div>
                   <div className="relative z-10 font-pirate text-5xl md:text-6xl text-white drop-shadow-md">
                      {String(value).padStart(2, '0')}
                   </div>
                   <div className="relative z-10 font-serif italic text-gold/60 uppercase tracking-widest text-xs mt-2">
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
