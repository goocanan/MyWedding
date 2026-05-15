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
    <section className="section" id="gift">
      <div className="content">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="section-title text-4xl md:text-5xl">Treasure Chest</h2>
            <p className="section-subtitle text-sm mt-2">Digital Envelope</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10 w-full">
          <ScrollReveal delay={0.1}>
            <div className="max-w-lg mx-auto mb-10">
              <p className="hero-verse text-center text-xl md:text-2xl">
                "Your presence is our greatest treasure. However, if you wish to contribute to our journey, you may send your bounty here:"
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
            <ScrollReveal direction="left" delay={0.2} className="flex-1 max-w-sm">
              <div className="text-container h-full flex flex-col items-center p-8">
                 <div className="text-5xl mb-4">🏦</div>
                 <h3 className="font-script text-3xl gold-text mb-2">{gift.bank.name}</h3>
                 <div className="text-2xl font-pirate tracking-widest text-readable mb-1">{gift.bank.accountNumber}</div>
                 <div className="font-serif-readable italic text-bronze uppercase text-xs font-bold tracking-widest mb-6">a.n. {gift.bank.accountHolder}</div>
                 
                 <button
                   className={`w-full py-4 px-6 border-2 border-gold-primary text-gold-primary font-bold uppercase tracking-widest text-xs mt-auto transition-all
                     ${copied ? 'bg-gold-primary text-bg-deep-sea' : 'hover:bg-gold-primary hover:text-bg-deep-sea shadow-xl'}`}
                   onClick={handleCopy}
                   id="copy-account-btn"
                 >
                   {copied ? '✓ Bounty Copied' : '📋 Copy Details'}
                 </button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3} className="flex-1 max-w-sm">
              <div className="text-container h-full flex flex-col items-center p-8">
                 <div className="text-5xl mb-4">📱</div>
                 <h3 className="font-script text-3xl gold-text mb-4">QRIS Manifest</h3>
                 <div className="w-full aspect-square bg-white p-4 rounded shadow-xl border-4 border-gold-primary">
                  {gift.qris.image ? (
                     <img src={gift.qris.image} alt="QRIS Payment" className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                     <div className="text-bg-deep-sea/20 font-pirate text-xl uppercase h-full flex items-center justify-center">
                       Coming Soon
                     </div>
                  )}
                 </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
