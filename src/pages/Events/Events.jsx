import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEvents } from "../../hooks/useEvents";
import eventsHeroImage from "../../assets/event_hero.jpg"; 

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseLocalDate(dateString) {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function Events() {
  const { events, isLoading, error } = useEvents("general");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  const openEvent = (event) => setSelectedEvent(event);
  const closeEvent = () => setSelectedEvent(null);

  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${eventsHeroImage})`, backgroundPosition: "center 30%" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.5) 35%, rgba(11,26,19,0.28) 100%), linear-gradient(180deg, rgba(15,36,27,0.35) 0%, rgba(15,36,27,0.2) 100%)",
          }}
        />

        <div className="relative">
          <p
            className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4 transition-all duration-700 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Join Us
          </p>
          <h1
            className={`font-serif text-4xl md:text-5xl text-stone-50 transition-all duration-700 delay-150 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Upcoming Events
          </h1>
          <p
            className={`text-stone-300 mt-4 max-w-xl mx-auto transition-all duration-700 delay-300 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Gather with us for worship, fellowship, and community, every
            event is a chance to belong.
          </p>

          <div
            className={`mt-10 text-amber-500 text-xl animate-bounce transition-opacity duration-700 delay-500 ${
              hasMounted ? "opacity-100" : "opacity-0"
            }`}
          >
            ↓
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-stone-100 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-40 bg-stone-200" />
                  <div className="p-5">
                    <div className="h-4 bg-stone-200 rounded mb-3" />
                    <div className="h-3 bg-stone-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-center text-stone-500">
              We couldn't load events right now. Please check back shortly.
            </p>
          )}

          {!isLoading && !error && events.length === 0 && (
            <p className="text-center text-stone-500">
              No upcoming events right now, check back soon.
            </p>
          )}

          {!isLoading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => {
                const dateObj = parseLocalDate(event.date);
                const day = dateObj.getDate();
                const month = MONTHS[dateObj.getMonth()];
                const hasImage = Boolean(event.imageUrl);

                return (
                  <button
                    key={event.id || `${event.title}-${event.date}`}
                    type="button"
                    onClick={() => openEvent(event)}
                    style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                    className="group bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left w-full opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  >
                    {hasImage ? (
                      <div className="relative h-40 overflow-hidden bg-stone-100">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-green-950/90 backdrop-blur-sm text-stone-50 rounded px-3 py-1.5 text-center leading-none">
                          <div className="font-serif text-lg">{day}</div>
                          <div className="text-[10px] tracking-wider uppercase text-amber-500 mt-0.5">
                            {month}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-950 text-stone-50 px-6 py-4">
                        <div className="font-serif text-3xl leading-none">{day}</div>
                        <div className="text-xs tracking-wider uppercase text-amber-500 mt-1">
                          {month}
                        </div>
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="font-serif text-lg text-green-950 leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-stone-500 mt-2">
                        {event.time} {event.location ? `— ${event.location}` : ""}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={closeEvent}
        >
          <div
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeEvent}
              aria-label="Close event details"
              className="absolute -top-12 right-0 md:-top-14 text-white hover:text-amber-500 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              {selectedEvent.imageUrl ? (
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-[3/1] bg-green-950 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="font-serif text-2xl text-green-950 mb-3">
                  {selectedEvent.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 mb-4">
                  <span>
                    {parseLocalDate(selectedEvent.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {selectedEvent.time && (
                    <>
                      <span className="text-amber-500">•</span>
                      <span>{selectedEvent.time}</span>
                    </>
                  )}
                  {selectedEvent.location && (
                    <>
                      <span className="text-amber-500">•</span>
                      <span>{selectedEvent.location}</span>
                    </>
                  )}
                </div>

                <p className="text-stone-600 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}