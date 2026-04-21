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
    <section className="section countdown-section" id="countdown">
      <ScrollReveal>
        <h2 className="section-heading">⏳ Countdown to the Grand Day</h2>
      </ScrollReveal>

      {isExpired ? (
        <ScrollReveal>
          <p className="countdown-expired">⚓ The Adventure Has Begun! ⚓</p>
        </ScrollReveal>
      ) : (
        <motion.div
          className="countdown-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {items.map(({ value, label }) => (
            <motion.div key={label} className="countdown-item" variants={scaleIn}>
              <div className="countdown-number">
                {String(value).padStart(2, '0')}
              </div>
              <div className="countdown-label">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
