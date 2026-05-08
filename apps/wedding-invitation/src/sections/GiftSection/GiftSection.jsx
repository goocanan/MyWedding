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
      <div className="content max-w-4xl">
        <ScrollReveal>
          <div className="text-container overlay-soft flex flex-col items-center gap-2 mb-8">
            <h2 className="section-heading gold-text">Treasure Chest</h2>
            <p className="section-subheading text-bronze tracking-widest text-center uppercase text-sm text-shadow-premium">Digital Envelope</p>
          </div>
        </ScrollReveal>

        <div className="w-full flex flex-col gap-10">
          <ScrollReveal delay={0.1}>
            <div className="text-container overlay-soft max-w-lg mx-auto">
              <p className="text-center italic text-readable font-serif-readable text-xl leading-relaxed">
                "Your presence is our greatest treasure. However, if you wish to contribute to our journey, you may send your bounty here:"
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch w-full">
            <ScrollReveal direction="left" delay={0.2} className="flex-1 max-w-sm">
              <div className="text-container overlay-strong gold-nameplate h-full flex flex-col items-center text-center p-8">
                 <div className="text-6xl mb-6 drop-shadow-2xl">🏦</div>
                 <h3 className="font-script text-4xl gold-text mb-2">{gift.bank.name}</h3>
                 <div className="text-3xl font-pirate tracking-widest text-ivory mb-2 text-shadow-premium">{gift.bank.accountNumber}</div>
                 <div className="font-serif-readable italic text-bronze mb-8 uppercase text-xs tracking-widest font-bold text-shadow-premium">a.n. {gift.bank.accountHolder}</div>
                 
                 <button
                   className={`w-full py-4 px-6 rounded-sm border-2 border-gold-primary text-gold-primary font-bold uppercase tracking-[0.2em] transition-all text-xs mt-auto
                     ${copied ? 'bg-gold-primary text-bg-deep-sea' : 'hover:bg-gold-primary hover:text-bg-deep-sea shadow-premium'}`}
                   onClick={handleCopy}
                   id="copy-account-btn"
                 >
                   {copied ? '✓ Bounty Copied' : '📋 Copy Details'}
                 </button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3} className="flex-1 max-w-sm">
              <div className="text-container overlay-strong gold-nameplate h-full flex flex-col items-center text-center p-8">
                 <div className="text-6xl mb-6 drop-shadow-2xl">📱</div>
                 <h3 className="font-script text-4xl gold-text mb-6">QRIS Manifest</h3>
                 <div className="w-full aspect-square bg-white p-4 rounded shadow-2xl border-4 border-gold-primary mb-4">
                  {gift.qris.image ? (
                     <img src={gift.qris.image} alt="QRIS Payment" className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                     <div className="text-bg-deep-sea/20 font-pirate text-2xl uppercase h-full flex items-center justify-center">
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
