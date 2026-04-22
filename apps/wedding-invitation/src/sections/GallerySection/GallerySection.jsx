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
    <section className="section bg-texture-sea" id="gallery">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">📸 Our Treasure Gallery</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Captured Moments</p>
      </ScrollReveal>

      <div className="section-content max-w-6xl">
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
              className={`relative bg-[#F4EBD0] p-4 pb-12 shadow-2xl transition-all duration-500 cursor-pointer hover:z-50 hover:scale-110 hover:rotate-0 group
                ${idx % 3 === 0 ? '-rotate-3' : idx % 3 === 1 ? 'rotate-2' : 'rotate-1'}`}
              style={{ width: '280px' }}
              variants={fadeInUp}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
            >
              {/* Gold Frame Border */}
              <div className="absolute inset-0 border-8 border-double border-[#D4AF37]/30 pointer-events-none group-hover:border-[#D4AF37]"></div>
              
              <div className="w-full aspect-square bg-[#D4C4A0]/20 overflow-hidden relative">
                {item.src ? (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
                    {placeholderIcons[idx % placeholderIcons.length]}
                  </div>
                )}
                <div className="absolute inset-0 bg-texture-parchment opacity-10 pointer-events-none"></div>
              </div>

              <div className="mt-4 font-serif italic text-center text-[#3C2A1A] opacity-80">
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
