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
        <div className="section-content">
          <ScrollReveal>
            <div className="rsvp-card">
              <div className="rsvp-success">
                <div className="rsvp-success__icon">⚓</div>
                <h3 className="rsvp-success__title">Welcome Aboard, Nakama!</h3>
                <p className="rsvp-success__text">
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

      <div className="section-content">
        <ScrollReveal delay={0.2}>
          <div className="rsvp-card">
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-name">Nama Nakama</label>
                <input
                  id="rsvp-name"
                  className="rsvp-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama kamu"
                  autoComplete="name"
                />
                {errorMsg && submitState !== 'error' && (
                  <span className="rsvp-error">{errorMsg}</span>
                )}
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-pax">Jumlah Crew</label>
                <select
                  id="rsvp-pax"
                  className="rsvp-select"
                  name="pax"
                  value={form.pax}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Orang</option>
                  ))}
                </select>
              </div>

              <div className="rsvp-field">
                <span className="rsvp-label">Konfirmasi</span>
                <div className="rsvp-radio-group">
                  <label className="rsvp-radio">
                    <input
                      type="radio"
                      name="attendance"
                      value="hadir"
                      checked={form.attendance === 'hadir'}
                      onChange={handleChange}
                    />
                    ⚓ Hadir
                  </label>
                  <label className="rsvp-radio">
                    <input
                      type="radio"
                      name="attendance"
                      value="tidak_hadir"
                      checked={form.attendance === 'tidak_hadir'}
                      onChange={handleChange}
                    />
                    🌊 Tidak Hadir
                  </label>
                  <label className="rsvp-radio">
                    <input
                      type="radio"
                      name="attendance"
                      value="ragu"
                      checked={form.attendance === 'ragu'}
                      onChange={handleChange}
                    />
                    🧭 Masih Ragu
                  </label>
                </div>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label" htmlFor="rsvp-message">Ucapan & Doa</label>
                <textarea
                  id="rsvp-message"
                  className="rsvp-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tulis ucapan dan doa untuk mempelai..."
                  rows={4}
                />
              </div>

              {isError && (
                <span className="rsvp-error">{errorMsg || error.message}</span>
              )}

              <button
                type="submit"
                className={`rsvp-submit ${isPending ? 'rsvp-submit--loading' : ''}`}
                disabled={isPending}
                id="submit-rsvp-btn"
              >
                <span>🏴‍☠️ Kirim RSVP</span>
                {isPending && (
                  <span className="rsvp-spinner" />
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
