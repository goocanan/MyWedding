import { weddingConfig, generateCalendarUrl } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './EventSection.css';

export default function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="section" id="event">
      <div className="content">
        <ScrollReveal>
          <div className="text-container">
            <h2 className="section-heading gold-text">The Voyage Plan</h2>
            <p className="font-pirate text-bronze tracking-widest uppercase text-sm">Wedding Itinerary</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center gap-12 w-full">
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full">
            {events.map((event, idx) => (
              <ScrollReveal
                key={event.title}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.2}
                className="flex-1"
              >
                <div className="text-container h-full p-8 flex flex-col items-center">
                  <div className="text-5xl mb-4">{event.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-pirate gold-text mb-6 pb-2 border-b border-gold-primary/20 w-full text-center">{event.title}</h3>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-gold-primary">📅</span>
                      <span className="text-readable font-bold">{event.displayDate}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gold-primary">⏰</span>
                      <span className="text-readable font-bold">{event.time}</span>
                    </div>

                    <div className="pt-4 border-t border-gold-primary/10 flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="text-gold-primary">📍</span>
                        <span className="text-bronze font-bold uppercase tracking-widest text-sm">{event.venue}</span>
                      </div>
                      <p className="text-sm italic text-readable opacity-80 pl-8">{event.address}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <a
              href={events[0].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-gradient-to-r from-gold-deep to-gold-primary text-bg-deep-sea font-pirate text-xl tracking-widest rounded shadow-xl hover:scale-105 transition-transform uppercase"
              id="open-maps-btn"
            >
              🗺️ Open Chart
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
