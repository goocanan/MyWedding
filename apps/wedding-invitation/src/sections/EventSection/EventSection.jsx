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

      <div className="section-content">
        <div className="event-cards">
          {events.map((event, idx) => (
            <ScrollReveal
              key={event.title}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 0.2}
            >
              <div className="event-card">
                <div className="event-card__icon">{event.icon}</div>
                <h3 className="event-card__title">{event.title}</h3>

                <div className="event-card__row">
                  <span className="event-card__row-icon">📅</span>
                  <span className="event-card__row-text">{event.displayDate}</span>
                </div>

                <div className="event-card__row">
                  <span className="event-card__row-icon">⏰</span>
                  <span className="event-card__row-text">{event.time}</span>
                </div>

                <div className="event-card__row">
                  <span className="event-card__row-icon">📍</span>
                  <div className="event-card__row-text">
                    <div className="event-card__venue">{event.venue}</div>
                    <div className="event-card__address">{event.address}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
