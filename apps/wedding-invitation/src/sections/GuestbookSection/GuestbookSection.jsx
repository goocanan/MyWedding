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
    <section className="section" id="guestbook">
      <div className="content">
        <ScrollReveal>
          <div className="text-container">
            <h2 className="section-heading gold-text">Captain's Log</h2>
            <p className="font-pirate text-bronze tracking-widest uppercase text-sm">Wishes from Nakama</p>
          </div>
        </ScrollReveal>

        <div className="w-full">
          {isLoading ? (
            <div className="text-container py-10">
              <div className="animate-spin text-5xl mb-4 text-gold-primary">⚓</div>
              <p className="font-pirate text-xl gold-text tracking-widest">Scanning the Horizon...</p>
            </div>
          ) : allMessages.length === 0 ? (
            <div className="text-container italic text-readable py-10">
              No entries found. Be the first to sign the log! 🏴‍☠️
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {visible.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    className={`text-container p-6 flex flex-col gap-4
                      ${idx < newMessages.length ? 'border-2 border-gold-primary/60' : ''}`}
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-4 pb-3 border-b border-gold-primary/10">
                      <div className="w-12 h-12 rounded-full border-2 border-gold-primary flex items-center justify-center text-2xl text-gold-primary bg-black/20">⚓</div>
                      <div className="flex-1 text-left">
                        <span className="block font-script text-2xl gold-text">{msg.name}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded
                          ${msg.attendance === 'hadir' ? 'bg-gold-primary/20 text-gold-primary' : 'bg-red-900/40 text-red-200'}`}>
                          {badgeLabels[msg.attendance] || msg.attendance}
                        </span>
                      </div>
                    </div>
                    <p className="font-serif-readable italic text-readable text-lg text-left leading-relaxed">"{msg.message}"</p>
                    <div className="text-right text-[10px] font-bold text-bronze uppercase tracking-tighter">
                      🕐 {timeAgo(msg.timestamp || msg.createdAt)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && (
                <div className="flex justify-center">
                  <button
                    className="px-10 py-4 bg-gradient-to-r from-gold-deep to-gold-primary text-bg-deep-sea font-pirate text-xl tracking-widest rounded shadow-xl hover:scale-105 transition-transform uppercase"
                    onClick={() => setVisibleCount((prev) => prev + INITIAL_SHOW)}
                    id="load-more-messages-btn"
                  >
                    📜 Read More Logs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
