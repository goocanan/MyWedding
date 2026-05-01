import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGuestbook } from '../../hooks/useGuestbook';
import { staggerFast, fadeInUp } from '../../components/animation/motionVariants';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './GuestbookSection.css';

const INITIAL_SHOW = 8;

const badgeLabels = {
  hadir: '⚓ Hadir',
  tidak_hadir: '🌊 Absent',
  ragu: '🧭 Maybe',
};

function timeAgo(timestamp) {
  if (!timestamp) return '...';
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export default function GuestbookSection({ newMessages = [] }) {
  const { data: messages = [], isLoading } = useGuestbook();
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  const allMessages = [...newMessages, ...messages];
  const visible = allMessages.slice(0, visibleCount);
  const hasMore = visibleCount < allMessages.length;


  return (
    <section className="section bg-transparent" id="guestbook">
      <ScrollReveal>
        <h2 className="section-heading">Captain's Log</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Wishes from Nakama</p>
      </ScrollReveal>

      <div className="section-content w-full max-w-4xl px-4">
        {isLoading ? (
          <div className="text-center font-pirate text-2xl text-gold-gradient animate-pulse">Loading Logs... ⚓</div>
        ) : allMessages.length === 0 ? (
          <div className="text-center italic text-gold/60">
            No entries found. Be the first to sign the log! 🏴‍☠️
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {visible.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  className={`parchment-floating p-6 relative transition-all duration-500 hover:-translate-y-2 text-[#102A43]
                    ${idx < newMessages.length ? 'border-2 border-[#8E1C1C]/60' : ''}`}
                  variants={fadeInUp}
                >
                  <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#102A43]/10">
                    <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center text-2xl shadow-md text-gold">⚓</div>
                    <div className="flex-1">
                      <span className="block font-script text-3xl text-[#102A43]">{msg.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded
                        ${msg.attendance === 'hadir' ? 'bg-[#102A43]/10 text-[#102A43]' : 'bg-red-100 text-red-800'}`}>
                        {badgeLabels[msg.attendance] || msg.attendance}
                      </span>
                    </div>
                  </div>
                  <p className="font-serif-readable italic text-[#102A43]/90 leading-relaxed text-lg">"{msg.message}"</p>
                  <div className="mt-4 text-right text-[10px] font-bold text-[#102A43]/40 uppercase tracking-tighter">
                    🕐 {timeAgo(msg.timestamp || msg.createdAt)}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              {hasMore && (
                <button
                  className="px-12 py-5 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-white font-pirate text-2xl tracking-[0.2em] rounded shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 uppercase"
                  onClick={() => setVisibleCount((prev) => prev + INITIAL_SHOW)}
                  id="load-more-messages-btn"
                >
                  📜 Read More Logs
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
