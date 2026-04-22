import { useState } from 'react';
import { useGuestName } from '../../hooks/useGuestName';
import { useSubmitRsvp } from '../../hooks/useRsvp';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './RSVPSection.css';

export default function RSVPSection({ onNewMessage }) {
  const guestName = useGuestName();
  const { mutateAsync: submitRsvp, isPending, isSuccess, isError, error } = useSubmitRsvp();

  const [form, setForm] = useState({
    name: guestName !== 'Tamu Undangan' ? guestName : '',
    pax: '1',
    attendance: 'hadir',
    message: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.name.trim().length < 2) {
      setErrorMsg('Nama harus diisi minimal 2 karakter');
      return;
    }
    setErrorMsg('');

    try {
      const result = await submitRsvp({
        name: form.name.trim(),
        pax: parseInt(form.pax),
        attendance: form.attendance,
        message: form.message.trim(),
      });
      if (onNewMessage && form.message.trim()) {
        onNewMessage({
          id: result.id,
          name: form.name.trim(),
          message: form.message.trim(),
          attendance: form.attendance,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mengirim RSVP. Silakan coba lagi.');
    }
  };

  if (isSuccess) {
    return (
      <section className="section bg-texture-sea" id="rsvp">
        <div className="section-content w-full px-4">
          <ScrollReveal>
            <div className="aged-scroll max-w-lg mx-auto text-center py-16 px-10 relative border-l-8 border-r-8 border-[#3C2A1A]/10">
              <div className="rsvp-success relative z-10">
                <div className="text-[#8E1C1C] text-6xl mb-6">⚓</div>
                <h3 className="text-4xl font-pirate text-[#3C2A1A] mb-6">Welcome Aboard, Nakama!</h3>
                <p className="font-serif italic text-xl text-[#3C2A1A]/80 leading-relaxed">
                  Your name has been added to the crew manifest. <br />
                  See you at the Grand Line! 🏴‍☠️
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-texture-sea" id="rsvp">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">🏴‍☠️ Crew Manifest</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Join the Voyage</p>
      </ScrollReveal>

      <div className="section-content w-full px-4 max-w-2xl">
        <ScrollReveal delay={0.2}>
          <div className="aged-scroll relative border-l-8 border-r-8 border-[#3C2A1A]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="relative z-10 w-full">
              <div className="text-center mb-10 pb-6 border-b border-[#3C2A1A]/20">
                <h3 className="font-pirate text-3xl text-[#3C2A1A] uppercase tracking-widest">Sign the Scroll</h3>
                <p className="font-serif italic text-[#3C2A1A]/60">Every nakama counts on this journey</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="rsvp-field">
                  <label className="block font-pirate text-xl text-[#3C2A1A] mb-2 uppercase tracking-wide" htmlFor="rsvp-name">Full Name</label>
                  <input
                    id="rsvp-name"
                    className="w-full bg-transparent border-b-2 border-[#3C2A1A]/30 text-[#3C2A1A] px-2 py-3 focus:border-[#8E1C1C] transition-colors font-serif italic text-xl outline-none"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name..."
                  />
                  {errorMsg && (
                    <span className="text-red-600 text-sm mt-2 block font-bold">{errorMsg}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rsvp-field">
                    <label className="block font-pirate text-xl text-[#3C2A1A] mb-2 uppercase tracking-wide" htmlFor="rsvp-pax">Crew Size</label>
                    <select
                      id="rsvp-pax"
                      className="w-full bg-transparent border-b-2 border-[#3C2A1A]/30 text-[#3C2A1A] px-2 py-3 focus:border-[#8E1C1C] transition-colors font-serif italic text-xl outline-none appearance-none"
                      name="pax"
                      value={form.pax}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} People</option>
                      ))}
                    </select>
                  </div>

                  <div className="rsvp-field">
                    <span className="block font-pirate text-xl text-[#3C2A1A] mb-2 uppercase tracking-wide">Status</span>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="attendance"
                          value="hadir"
                          className="w-4 h-4 accent-[#8E1C1C]"
                          checked={form.attendance === 'hadir'}
                          onChange={handleChange}
                        />
                        <span className="font-serif italic text-lg text-[#3C2A1A]/80 group-hover:text-[#3C2A1A]">Aye Aye, Captain!</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="attendance"
                          value="tidak_hadir"
                          className="w-4 h-4 accent-[#8E1C1C]"
                          checked={form.attendance === 'tidak_hadir'}
                          onChange={handleChange}
                        />
                        <span className="font-serif italic text-lg text-[#3C2A1A]/80 group-hover:text-[#3C2A1A]">Stay at Shore</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rsvp-field pt-4">
                  <label className="block font-pirate text-xl text-[#3C2A1A] mb-2 uppercase tracking-wide" htmlFor="rsvp-message">Wishes & Log Entry</label>
                  <textarea
                    id="rsvp-message"
                    className="w-full bg-[#3C2A1A]/5 border-2 border-dashed border-[#3C2A1A]/20 text-[#3C2A1A] p-4 focus:border-[#8E1C1C] transition-colors font-serif italic text-lg outline-none rounded"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your blessing to the happy couple..."
                    rows={4}
                  />
                </div>

                {isError && (
                  <span className="text-red-600 text-sm block font-bold">{errorMsg || error.message}</span>
                )}

                <button
                  type="submit"
                  className={`w-full py-4 px-8 mt-6 bg-[#3C2A1A] text-[#F4EBD0] font-pirate text-2xl tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 hover:bg-[#1A0F08] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isPending}
                  id="submit-rsvp-btn"
                >
                  {isPending ? 'Sending Message...' : '⚓ Sign Manifest'}
                </button>
              </form>
            </div>
            
            {/* Scroll decorative rolls */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#3C2A1A]/10 -translate-y-4 rounded-t-full"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#3C2A1A]/10 translate-y-4 rounded-b-full"></div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
