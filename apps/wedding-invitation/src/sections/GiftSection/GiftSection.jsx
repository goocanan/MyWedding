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
    <section className="section bg-transparent" id="gift">
      <ScrollReveal>
        <h2 className="section-heading">Treasure Chest</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Digital Envelope</p>
      </ScrollReveal>

      <div className="section-content w-full max-w-4xl mx-auto px-4">
        <ScrollReveal delay={0.1}>
          <p className="text-center italic text-gold/80 mb-16 max-w-lg mx-auto font-serif-readable text-xl leading-relaxed">
            "Your presence is our greatest treasure. However, if you wish to contribute to our journey, you may send your bounty here:"
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch">
          <ScrollReveal direction="left" delay={0.2} className="flex-1 max-w-sm">
            <div className="gold-nameplate h-full flex flex-col items-center text-center p-10">
               <div className="text-6xl mb-6">🏦</div>
               <h3 className="font-script text-4xl text-gold-gradient mb-2">{gift.bank.name}</h3>
               <div className="text-3xl font-pirate tracking-widest text-white mb-2">{gift.bank.accountNumber}</div>
               <div className="font-serif-readable italic text-gold/60 mb-8 uppercase text-xs tracking-widest font-bold">a.n. {gift.bank.accountHolder}</div>
               
               <button
                 className={`w-full py-4 px-6 rounded-sm border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-[0.2em] transition-all text-xs
                   ${copied ? 'bg-[#D4AF37] text-[#102A43]' : 'hover:bg-[#D4AF37] hover:text-[#102A43] backdrop-blur-md'}`}
                 onClick={handleCopy}
                 id="copy-account-btn"
               >
                 {copied ? '✓ Bounty Copied' : '📋 Copy Details'}
               </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3} className="flex-1 max-w-sm">
            <div className="gold-nameplate h-full flex flex-col items-center text-center p-10">
               <div className="text-6xl mb-6">📱</div>
               <h3 className="font-script text-4xl text-gold-gradient mb-6">QRIS Manifest</h3>
               <div className="w-full aspect-square bg-white/90 p-4 rounded shadow-inner flex items-center justify-center border-4 border-[#D4AF37]/30">
                {gift.qris.image ? (
                  <img src={gift.qris.image} alt="QRIS Payment" className="w-full h-full object-contain" loading="lazy" />
                ) : (
                  <div className="text-[#102A43]/20 font-pirate text-2xl uppercase">
                    Coming Soon
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
