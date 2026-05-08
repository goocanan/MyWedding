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
      <section className="section" id="rsvp">
        <div className="content">
          <ScrollReveal>
            <div className="text-container p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="text-gold-primary text-6xl">⚓</div>
                <h3 className="text-4xl md:text-5xl font-script gold-text">Welcome Aboard, Nakama!</h3>
                <p className="font-serif-readable italic text-xl text-readable">
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
    <section className="section" id="rsvp">
      <div className="content">
        <ScrollReveal>
          <div className="text-container">
            <h2 className="section-heading gold-text">Join the Crew</h2>
            <p className="font-pirate text-bronze tracking-widest uppercase text-sm">Sign the Manifest</p>
          </div>
        </ScrollReveal>

        <div className="w-full">
          <ScrollReveal delay={0.2}>
            <div className="text-container p-8">
              <div className="flex flex-col gap-8">
                <div className="text-center pb-6 border-b border-gold-primary/20">
                  <h3 className="font-script text-4xl gold-text mb-2">Crew Manifest</h3>
                  <p className="font-serif-readable italic text-readable opacity-70">Every nakama counts on this journey</p>
                </div>

                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="font-pirate text-xl text-gold-primary uppercase tracking-wide" htmlFor="rsvp-name">Full Name</label>
                    <input
                      id="rsvp-name"
                      className="w-full bg-black/40 border-b-2 border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary transition-colors font-serif-readable italic text-xl outline-none"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Write your name here..."
                    />
                    {errorMsg && (
                      <span className="text-red-400 text-sm font-bold">{errorMsg}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-pirate text-xl text-gold-primary uppercase tracking-wide" htmlFor="rsvp-pax">Crew Size</label>
                      <select
                        id="rsvp-pax"
                        className="w-full bg-black/40 border-b-2 border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary transition-colors font-serif-readable italic text-xl outline-none appearance-none"
                        name="pax"
                        value={form.pax}
                        onChange={handleChange}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n} className="bg-bg-navy text-white">{n} People</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-pirate text-xl text-gold-primary uppercase tracking-wide">Status</span>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="attendance"
                            value="hadir"
                            className="w-4 h-4 accent-gold-primary"
                            checked={form.attendance === 'hadir'}
                            onChange={handleChange}
                          />
                          <span className="font-serif-readable italic text-lg text-readable opacity-80 group-hover:opacity-100 transition-opacity">Aye Aye, Captain!</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="attendance"
                            value="tidak_hadir"
                            className="w-4 h-4 accent-gold-primary"
                            checked={form.attendance === 'tidak_hadir'}
                            onChange={handleChange}
                          />
                          <span className="font-serif-readable italic text-lg text-readable opacity-80 group-hover:opacity-100 transition-opacity">Stay at Shore</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-pirate text-xl text-gold-primary uppercase tracking-wide" htmlFor="rsvp-message">Wishes & Log Entry</label>
                    <textarea
                      id="rsvp-message"
                      className="w-full bg-black/40 border-2 border-dashed border-gold-primary/10 text-ivory p-4 focus:border-gold-primary transition-colors font-serif-readable italic text-lg outline-none rounded"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your blessing to the happy couple..."
                      rows={4}
                    />
                  </div>

                  {isError && (
                    <span className="text-red-400 text-sm font-bold">{errorMsg || error.message}</span>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-5 px-8 bg-gold-primary text-bg-deep-sea font-pirate text-2xl tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 hover:bg-gold-light shadow-xl hover:scale-105 active:scale-95 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isPending}
                    id="submit-rsvp-btn"
                  >
                    {isPending ? 'Sending Message...' : '⚓ Sign Scroll'}
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
