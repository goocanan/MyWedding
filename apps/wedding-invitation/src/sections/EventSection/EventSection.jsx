import { weddingConfig, generateCalendarUrl } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './EventSection.css';

export default function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="section bg-texture-sea" id="event">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">🧭 The Grand Voyage</h2>
        <p className="section-subheading text-gold tracking-widest text-center mt-[-2rem] mb-16 uppercase text-sm">Wedding Itinerary</p>
      </ScrollReveal>

      <div className="section-content relative w-full max-w-5xl mx-auto">
        <div className="event-cards flex flex-col md:flex-row gap-16 md:gap-32 items-center justify-center relative w-full">
          {events.map((event, idx) => (
            <div key={event.title} className="relative flex-1 w-full max-w-sm group">
              <ScrollReveal
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.2}
              >
                <div className="gold-plaque relative bg-[#0c1b33]/90 border-2 border-[#D4AF37] p-10 shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 group-hover:-translate-y-4">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D4AF37] -translate-x-2 -translate-y-2"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D4AF37] translate-x-2 -translate-y-2"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D4AF37] -translate-x-2 translate-y-2"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D4AF37] translate-x-2 translate-y-2"></div>
                  
                  <div className="event-card__icon text-6xl mb-6 text-center drop-shadow-lg">{event.icon}</div>
                  <h3 className="event-card__title text-3xl font-pirate text-gold-gradient text-center mb-8">{event.title}</h3>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/90">
                      <div className="w-10 h-10 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">📅</div>
                      <span className="font-display text-lg">{event.displayDate}</span>
                    </div>

                    <div className="flex items-center gap-4 text-white/90">
                      <div className="w-10 h-10 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">⏰</div>
                      <span className="font-display text-lg">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-4 text-white/90 border-t border-[#D4AF37]/20 pt-6">
                      <div className="w-10 h-10 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">📍</div>
                      <div>
                        <div className="font-bold text-[#D4AF37] uppercase tracking-widest text-sm mb-1">{event.venue}</div>
                        <div className="text-sm opacity-70 italic">{event.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Treasure Map Trail connecting events */}
              {idx === 0 && (
                <div className="hidden md:flex absolute top-1/2 -right-[10rem] w-[8rem] items-center justify-center z-0">
                   <div className="w-full border-t-4 border-dashed border-[#D4AF37] opacity-30"></div>
                   <span className="absolute right-0 translate-x-1/2 text-6xl text-red-600 font-pirate rotate-12 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">X</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-6 mt-20 justify-center items-center">
            <a
              href={events[0].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#D4AF37] text-[#0c1b33] font-bold rounded shadow-xl hover:scale-110 transition-transform flex items-center gap-2 uppercase tracking-widest"
              id="open-maps-btn"
            >
              🗺️ Open Logs
            </a>
            <a
              href={generateCalendarUrl(events[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded hover:bg-[#D4AF37] hover:text-[#0c1b33] transition-all flex items-center gap-2 uppercase tracking-widest"
              id="save-date-btn"
            >
              📅 Mark Calendar
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
