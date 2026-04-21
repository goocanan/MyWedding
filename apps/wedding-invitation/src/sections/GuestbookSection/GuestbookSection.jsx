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
    <section className="section guestbook-section" id="guestbook">
      <ScrollReveal>
        <h2 className="section-heading">📜 Captain's Log</h2>
        <p className="section-subheading">Ucapan & Doa</p>
      </ScrollReveal>

      <div className="section-content">
        {isLoading ? (
          <div className="guestbook-loading">Loading Captain's Log... ⚓</div>
        ) : allMessages.length === 0 ? (
          <div className="guestbook-empty">
            Belum ada ucapan. Jadilah yang pertama! 🏴‍☠️
          </div>
        ) : (
          <>
            <motion.div
              className="guestbook-list"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {visible.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  className={`guestbook-item ${idx < newMessages.length ? 'guestbook-item--new' : ''}`}
                  variants={fadeInUp}
                >
                  <div className="guestbook-header">
                    <div className="guestbook-avatar">⚓</div>
                    <span className="guestbook-name">{msg.name}</span>
                    <span className={`guestbook-badge guestbook-badge--${msg.attendance}`}>
                      {badgeLabels[msg.attendance] || msg.attendance}
                    </span>
                  </div>
                  <p className="guestbook-message">{msg.message}</p>
                  <span className="guestbook-time">🕐 {timeAgo(msg.timestamp || msg.createdAt)}</span>
                </motion.div>
              ))}
            </motion.div>

            <p className="guestbook-count">
              Showing {visible.length} of {allMessages.length} messages
            </p>

            {hasMore && (
              <button
                className="guestbook-load-more"
                onClick={() => setVisibleCount((prev) => prev + INITIAL_SHOW)}
                id="load-more-messages-btn"
              >
                📜 Load More
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
