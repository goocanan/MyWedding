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
    <section className="section" id="gallery">
      <div className="content">
        <ScrollReveal>
          <div className="text-container">
            <h2 className="section-heading gold-text">Captured Memories</h2>
            <p className="font-pirate text-bronze tracking-widest uppercase text-sm">Treasures of our Voyage</p>
          </div>
        </ScrollReveal>

        <div className="w-full">
          <motion.div
            className="flex flex-wrap justify-center gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {gallery.map((item, idx) => (
              <motion.div
                key={item.id}
                className="flex flex-col gap-4 items-center"
                style={{ width: '280px' }}
                variants={fadeInUp}
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
              >
                <div className={`w-full aspect-square overflow-hidden relative shadow-2xl border-4 border-gold-primary transition-all duration-500 hover:scale-105
                  ${idx % 3 === 0 ? '-rotate-2' : idx % 3 === 1 ? 'rotate-1' : 'rotate-0'}`}>
                  {item.src ? (
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-black/20">
                      {placeholderIcons[idx % placeholderIcons.length]}
                    </div>
                  )}
                </div>

                <div className="text-container py-2 px-4">
                  <div className="font-script text-2xl text-center gold-text">
                    Log Entry #{idx + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
