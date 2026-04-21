import { useState } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { useToast } from '../../components/ui/Toast';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './GiftSection.css';

export default function GiftSection() {
  const { gift } = weddingConfig;
  const addToast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gift.bank.accountNumber);
      setCopied(true);
      addToast('Nomor rekening tersalin! 📋', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Gagal menyalin. Coba manual.', 'error');
    }
  };

  return (
    <section className="section gift-section" id="gift">
      <ScrollReveal>
        <h2 className="section-heading">💰 Treasure Chest</h2>
        <p className="section-subheading">Amplop Digital</p>
      </ScrollReveal>

      <div className="section-content">
        <ScrollReveal delay={0.1}>
          <p className="gift-intro">
            Doa Restu Anda sudah lebih dari cukup. Namun jika berkenan memberikan
            tanda kasih, kami menyediakannya melalui:
          </p>
        </ScrollReveal>

        <div className="gift-cards">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="gift-card">
              <div className="gift-card__icon">🏦</div>
              <div className="gift-card__title">{gift.bank.name}</div>
              <div className="gift-card__number">{gift.bank.accountNumber}</div>
              <div className="gift-card__holder">a.n. {gift.bank.accountHolder}</div>
              <button
                className={`gift-copy-btn ${copied ? 'gift-copy-btn--copied' : ''}`}
                onClick={handleCopy}
                id="copy-account-btn"
              >
                {copied ? '✓ Tersalin!' : '📋 Copy Number'}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="gift-card">
              <div className="gift-card__icon">📱</div>
              <div className="gift-card__title">QRIS</div>
              <div className="gift-qris">
                {gift.qris.image ? (
                  <img src={gift.qris.image} alt="QRIS Payment" loading="lazy" />
                ) : (
                  <div className="gift-qris-placeholder">
                    QRIS<br />Coming Soon
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
