import { weddingConfig, generateCalendarUrl } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './EventSection.css';

export default function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="section event-section" id="event">
      <ScrollReveal>
        <h2 className="section-heading">🧭 The Grand Voyage</h2>
        <p className="section-subheading">Detail Acara</p>
      </ScrollReveal>

      <div className="section-content relative">
        <div className="event-cards flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center relative w-full">
          {events.map((event, idx) => (
            <div key={event.title} className="relative flex-1 w-full max-w-sm">
              <ScrollReveal
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.2}
              >
                <div className="event-card relative bg-[#121f33] border-2 border-[#D4AF37] rounded-none p-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  {/* Ornate corners using pseudo elements simulation */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] -translate-x-1 -translate-y-1"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] translate-x-1 -translate-y-1"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] -translate-x-1 translate-y-1"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] translate-x-1 translate-y-1"></div>
                  
                  <div className="event-card__icon text-4xl mb-4 text-center">{event.icon}</div>
                  <h3 className="event-card__title text-2xl font-pirate text-[#D4AF37] text-center mb-6">{event.title}</h3>

                  <div className="event-card__row flex items-start gap-3 mb-4 text-gray-300">
                    <span className="event-card__row-icon">📅</span>
                    <span className="event-card__row-text">{event.displayDate}</span>
                  </div>

                  <div className="event-card__row flex items-start gap-3 mb-4 text-gray-300">
                    <span className="event-card__row-icon">⏰</span>
                    <span className="event-card__row-text">{event.time}</span>
                  </div>

                  <div className="event-card__row flex items-start gap-3 text-gray-300">
                    <span className="event-card__row-icon">📍</span>
                    <div className="event-card__row-text">
                      <div className="event-card__venue font-bold text-white leading-tight mb-1">{event.venue}</div>
                      <div className="event-card__address text-sm">{event.address}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Treasure Map Trail connecting events */}
              {idx === 0 && (
                <div className="hidden md:flex absolute top-1/2 -right-[6rem] w-[5rem] items-center justify-center z-0">
                   <div className="w-full border-t-2 border-dashed border-[#D4AF37] opacity-60"></div>
                   <span className="absolute right-0 translate-x-1/2 text-2xl text-red-500 font-bold rotate-12 drop-shadow-md">X</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="event-actions">
            <a
              href={events[0].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-action-btn"
              id="open-maps-btn"
            >
              🗺️ Open Google Maps
            </a>
            <a
              href={generateCalendarUrl(events[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="event-action-btn"
              id="save-date-btn"
            >
              📅 Save the Date
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
