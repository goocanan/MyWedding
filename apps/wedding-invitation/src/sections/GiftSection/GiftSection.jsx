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
    <section className="section bg-texture-sea" id="gift">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">💰 Treasure Chest</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Digital Envelope</p>
      </ScrollReveal>

      <div className="section-content w-full max-w-4xl mx-auto">
        <ScrollReveal delay={0.1}>
          <p className="text-center italic text-gold/80 mb-16 max-w-lg mx-auto font-serif text-lg">
            "Your presence is our greatest treasure. However, if you wish to contribute to our journey, you may send your bounty here:"
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch">
          <ScrollReveal direction="left" delay={0.2} className="flex-1 max-w-sm">
            <div className="gold-plaque h-full flex flex-col items-center text-center p-10 bg-[#0c1b33]/90">
               <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] -translate-x-1 -translate-y-1"></div>
               <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] translate-x-1 -translate-y-1"></div>
               
               <div className="text-6xl mb-6">🏦</div>
               <h3 className="font-pirate text-3xl text-gold-gradient mb-2 uppercase">{gift.bank.name}</h3>
               <div className="text-2xl font-pirate tracking-widest text-white mb-2">{gift.bank.accountNumber}</div>
               <div className="font-serif italic text-gold/60 mb-8 uppercase text-xs tracking-widest">a.n. {gift.bank.accountHolder}</div>
               
               <button
                 className={`w-full py-3 px-6 rounded border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest transition-all
                   ${copied ? 'bg-[#D4AF37] text-[#0c1b33]' : 'hover:bg-[#D4AF37] hover:text-[#0c1b33]'}`}
                 onClick={handleCopy}
                 id="copy-account-btn"
               >
                 {copied ? '✓ Bounty Copied' : '📋 Copy Details'}
               </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3} className="flex-1 max-w-sm">
            <div className="gold-plaque h-full flex flex-col items-center text-center p-10 bg-[#0c1b33]/90">
               <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] -translate-x-1 translate-y-1"></div>
               <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] translate-x-1 translate-y-1"></div>
               
               <div className="text-6xl mb-6">📱</div>
               <h3 className="font-pirate text-3xl text-gold-gradient mb-6 uppercase">QRIS Manifest</h3>
               <div className="w-full aspect-square bg-[#F4EBD0] p-4 rounded-lg shadow-inner flex items-center justify-center">
                {gift.qris.image ? (
                  <img src={gift.qris.image} alt="QRIS Payment" className="w-full h-full object-contain" loading="lazy" />
                ) : (
                  <div className="text-[#3C2A1A]/20 font-pirate text-2xl">
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
