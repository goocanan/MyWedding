import { motion } from 'framer-motion';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn } from './motionVariants';

const directionVariants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
};

/**
 * Animation wrapper: reveals children when they enter the viewport.
 * Uses Framer Motion's whileInView.
 *
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'scale'
 * @param {number} delay - additional delay in seconds
 * @param {boolean} once - trigger only once (default: true)
 * @param {string} className - optional CSS class
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  once = true,
  className = '',
  style = {},
}) {
  const variants = directionVariants[direction] || fadeInUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
