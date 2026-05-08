import { weddingConfig, generateCalendarUrl } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './EventSection.css';

export default function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="section" id="event">
      <div className="content max-w-5xl">
        <ScrollReveal>
          <div className="text-container overlay-soft flex flex-col items-center gap-2 mb-8">
            <h2 className="section-heading gold-text">The Voyage Plan</h2>
            <p className="section-subheading text-bronze tracking-widest text-center uppercase text-sm text-shadow-premium">Wedding Itinerary</p>
          </div>
        </ScrollReveal>

        <div className="w-full flex flex-col items-center gap-12">
          <div className="event-cards flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center relative w-full">
            {events.map((event, idx) => (
              <div key={event.title} className="relative flex-1 w-full max-w-sm group">
                <ScrollReveal
                  direction={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx * 0.2}
                >
                  <div className="text-container overlay-strong parchment-floating relative p-10 transition-all duration-500 group-hover:-translate-y-4">
                    <div className="text-6xl mb-6 text-center drop-shadow-2xl">{event.icon}</div>
                    <h3 className="text-3xl font-pirate gold-text text-center mb-8 pb-4 border-b border-gold-primary/20">{event.title}</h3>

                    <div className="space-y-6 font-serif-readable">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary text-shadow-premium">📅</div>
                        <span className="text-lg font-bold text-readable">{event.displayDate}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary text-shadow-premium">⏰</div>
                        <span className="text-lg font-bold text-readable">{event.time}</span>
                      </div>

                      <div className="flex items-start gap-4 pt-6 border-t border-gold-primary/10">
                        <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary text-shadow-premium">📍</div>
                        <div className="text-left">
                          <div className="font-bold text-bronze uppercase tracking-widest text-sm mb-1 text-shadow-premium">{event.venue}</div>
                          <div className="text-sm italic text-secondary-readable">{event.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {idx === 0 && (
                  <div className="hidden md:flex absolute top-1/2 -right-[10rem] w-[8rem] items-center justify-center z-0">
                     <div className="w-16 h-16 rounded-full border-4 border-double border-gold flex items-center justify-center text-gold text-2xl animate-pulse">⚜️</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={events[0].mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-white font-pirate text-2xl tracking-[0.2em] rounded shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 uppercase"
                id="open-maps-btn"
              >
                🗺️ Open Chart
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
