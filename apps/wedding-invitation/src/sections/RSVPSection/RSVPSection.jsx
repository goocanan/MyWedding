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

    // Validate
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

      // Notify parent about new message
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
      <section className="section rsvp-section" id="rsvp">
        <div className="section-content w-full px-4">
          <ScrollReveal>
            <div className="rsvp-card bg-[#F9F6EE] text-[#2c1810] rounded-sm p-8 shadow-xl max-w-lg mx-auto relative relative before:content-[''] before:absolute before:inset-0 before:bg-parchment-scroll before:opacity-40 before:pointer-events-none before:z-0 text-center">
              <div className="rsvp-success relative z-10">
                <div className="rsvp-success__icon text-[#d4a853] text-5xl mb-4">⚓</div>
                <h3 className="rsvp-success__title text-3xl font-pirate text-[#4a3525] mb-4">Welcome Aboard, Nakama!</h3>
                <p className="rsvp-success__text text-lg text-[#2c1810]">
                  Terima kasih atas konfirmasi dan doa-nya. <br />
                  See you at the Grand Wedding! 🏴‍☠️
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section rsvp-section" id="rsvp">
      <ScrollReveal>
        <h2 className="section-heading">🏴‍☠️ Join Our Crew!</h2>
        <p className="section-subheading">Konfirmasi Kehadiran</p>
      </ScrollReveal>

      <div className="section-content w-full px-4">
        <ScrollReveal delay={0.2}>
          <div className="rsvp-card bg-[#F9F6EE] text-[#2c1810] rounded-sm p-8 shadow-xl max-w-lg mx-auto relative relative before:content-[''] before:absolute before:inset-0 before:bg-parchment-scroll before:opacity-40 before:pointer-events-none before:z-0">
            <div className="relative z-10 w-full">
              <form className="rsvp-form space-y-6" onSubmit={handleSubmit}>
                <div className="rsvp-field">
                  <label className="rsvp-label block text-sm font-semibold mb-1 text-[#4a3525]" htmlFor="rsvp-name">Nama Nakama</label>
                  <input
                    id="rsvp-name"
                    className="rsvp-input w-full bg-white/50 border border-[#b59e5f] text-[#2c1810] rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama kamu"
                    autoComplete="name"
                  />
                  {errorMsg && submitState !== 'error' && (
                    <span className="rsvp-error text-red-600 text-sm mt-1">{errorMsg}</span>
                  )}
                </div>

                <div className="rsvp-field">
                  <label className="rsvp-label block text-sm font-semibold mb-1 text-[#4a3525]" htmlFor="rsvp-pax">Jumlah Crew</label>
                  <select
                    id="rsvp-pax"
                    className="rsvp-select w-full bg-white/50 border border-[#b59e5f] text-[#2c1810] rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
                    name="pax"
                    value={form.pax}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="text-black">{n} Orang</option>
                    ))}
                  </select>
                </div>

                <div className="rsvp-field">
                  <span className="rsvp-label block text-sm font-semibold mb-2 text-[#4a3525]">Konfirmasi</span>
                  <div className="rsvp-radio-group flex flex-wrap gap-4">
                    <label className="rsvp-radio flex items-center gap-2 cursor-pointer text-[#4a3525]">
                      <input
                        type="radio"
                        name="attendance"
                        value="hadir"
                        className="accent-[#d4a853]"
                        checked={form.attendance === 'hadir'}
                        onChange={handleChange}
                      />
                      ⚓ Hadir
                    </label>
                    <label className="rsvp-radio flex items-center gap-2 cursor-pointer text-[#4a3525]">
                      <input
                        type="radio"
                        name="attendance"
                        value="tidak_hadir"
                        className="accent-[#d4a853]"
                        checked={form.attendance === 'tidak_hadir'}
                        onChange={handleChange}
                      />
                      🌊 Tidak Hadir
                    </label>
                    <label className="rsvp-radio flex items-center gap-2 cursor-pointer text-[#4a3525]">
                      <input
                        type="radio"
                        name="attendance"
                        value="ragu"
                        className="accent-[#d4a853]"
                        checked={form.attendance === 'ragu'}
                        onChange={handleChange}
                      />
                      🧭 Masih Ragu
                    </label>
                  </div>
                </div>

                <div className="rsvp-field">
                  <label className="rsvp-label block text-sm font-semibold mb-1 text-[#4a3525]" htmlFor="rsvp-message">Ucapan & Doa</label>
                  <textarea
                    id="rsvp-message"
                    className="rsvp-textarea w-full bg-white/50 border border-[#b59e5f] text-[#2c1810] rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tulis ucapan dan doa untuk mempelai..."
                    rows={4}
                  />
                </div>

                {isError && (
                  <span className="rsvp-error text-red-600 text-sm">{errorMsg || error.message}</span>
                )}

                <button
                  type="submit"
                  className={`rsvp-submit w-full mt-4 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-white py-3 rounded-sm font-semibold shadow-lg hover:shadow-xl transition-all ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isPending}
                  id="submit-rsvp-btn"
                >
                  <span>🏴‍☠️ Kirim RSVP</span>
                  {isPending && (
                    <span className="rsvp-spinner ml-2 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent inline-block align-middle" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
