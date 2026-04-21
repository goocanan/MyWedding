import { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { staggerContainer, fadeInUp } from '../../components/animation/motionVariants';
import ScrollReveal from '../../components/animation/ScrollReveal';
import LightboxModal from '../../components/shared/LightboxModal';
import './GallerySection.css';

const placeholderIcons = ['📸', '🌊', '⚓', '🗺️', '🧭', '🏴‍☠️'];

export default function GallerySection() {
  const { gallery } = weddingConfig;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section gallery-section" id="gallery">
      <ScrollReveal>
        <h2 className="section-heading">📸 Our Treasure Gallery</h2>
        <p className="section-subheading">Moments Worth More Than Gold</p>
      </ScrollReveal>

      <div className="section-content">
        <motion.div
          className="gallery-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              variants={fadeInUp}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
            >
              {item.src ? (
                <img src={item.src} alt={item.alt} loading="lazy" />
              ) : (
                <div className="gallery-placeholder">
                  {placeholderIcons[idx % placeholderIcons.length]}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LightboxModal
        images={gallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  );
}
