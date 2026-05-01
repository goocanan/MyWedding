import { weddingConfig, generateCalendarUrl } from '../../data/weddingConfig';
import ScrollReveal from '../../components/animation/ScrollReveal';
import './EventSection.css';

export default function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="section bg-transparent" id="event">
      <ScrollReveal>
        <h2 className="section-heading text-gold-gradient">The Voyage Plan</h2>
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
                <div className="parchment-floating relative p-10 transition-all duration-500 group-hover:-translate-y-4 text-[#102A43]">
                  {/* Decorative corners removed for clean look */}
                  
                  <div className="text-6xl mb-6 text-center drop-shadow-lg">{event.icon}</div>
                  <h3 className="text-3xl font-pirate text-[#102A43] text-center mb-8 pb-4">{event.title}</h3>

                  <div className="space-y-6 font-serif-readable text-[#102A43]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#102A43]/5 flex items-center justify-center text-[#102A43]">📅</div>
                      <span className="text-lg font-bold">{event.displayDate}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#102A43]/5 flex items-center justify-center text-[#102A43]">⏰</div>
                      <span className="text-lg font-bold">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-4 pt-6 border-t border-[#102A43]/10">
                      <div className="w-10 h-10 rounded-full bg-[#102A43]/5 flex items-center justify-center text-[#102A43]">📍</div>
                      <div>
                        <div className="font-bold text-[#8E1C1C] uppercase tracking-widest text-sm mb-1">{event.venue}</div>
                        <div className="text-sm italic opacity-80">{event.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Ornate Gold Divider between events */}
              {idx === 0 && (
                <div className="hidden md:flex absolute top-1/2 -right-[10rem] w-[8rem] items-center justify-center z-0">
                   <div className="w-16 h-16 rounded-full border-4 border-double border-gold flex items-center justify-center text-gold text-2xl animate-pulse">⚜️</div>
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
              className="px-12 py-5 bg-gradient-to-r from-[#BF953F] to-[#B38728] text-white font-pirate text-2xl tracking-[0.2em] rounded shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 uppercase"
              id="open-maps-btn"
            >
              🗺️ Open Chart
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
