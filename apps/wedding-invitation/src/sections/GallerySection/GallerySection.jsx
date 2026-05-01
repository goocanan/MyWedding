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
    <section className="section bg-transparent" id="gallery">
      <ScrollReveal>
        <h2 className="section-heading">Captured Memories</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Treasures of our Voyage</p>
      </ScrollReveal>

      <div className="section-content max-w-6xl px-4">
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
              className={`relative p-0 transition-all duration-500 cursor-pointer hover:z-50 hover:scale-110 hover:rotate-0 group
                ${idx % 3 === 0 ? '-rotate-3' : idx % 3 === 1 ? 'rotate-2' : 'rotate-1'}`}
              style={{ width: '280px' }}
              variants={fadeInUp}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
            >
              <div className="w-full aspect-square overflow-hidden relative shadow-2xl border-4 border-gold-gradient">
                {item.src ? (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
                    {placeholderIcons[idx % placeholderIcons.length]}
                  </div>
                )}
              </div>

              <div className="mt-4 font-script text-3xl text-center text-[#102A43]">
                Log Entry #{idx + 1}
              </div>
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
