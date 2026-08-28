import { useEffect, useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { EVENT_SHEETS } from "../../config/eventSheets";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function UpcomingEvents() {
  // Home page shows the "general" category. A future Youth page, for
  // example, would call useEvents(EVENT_SHEETS.youth) instead.
  const { events, isLoading, error } = useEvents(EVENT_SHEETS.general);
  const displayEvents = events.slice(0, 3); // Home page shows top 3 only

  const [selectedEvent, setSelectedEvent] = useState(null);

  // Prevent page scrolling when the modal is open — same pattern as LatestSermon
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
      <section className="bg-white py-24 px-6">
        <div className="max-w-screen-lg mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
              Join Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-green-950">
              Upcoming Events
            </h2>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
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

          {/* Error */}
          {error && (
            <p className="text-center text-stone-500">
              We couldn't load upcoming events right now. Please check back shortly.
            </p>
          )}

          {/* No Content */}
          {!isLoading && !error && displayEvents.length === 0 && (
            <p className="text-center text-stone-500">
              No upcoming events right now, check back soon.
            </p>
          )}

          {/* Event Cards */}
          {!isLoading && !error && displayEvents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {displayEvents.map((event) => {
                const dateObj = new Date(event.date);
                const day = dateObj.getDate();
                const month = MONTHS[dateObj.getMonth()];
                const hasImage = Boolean(event.imageUrl);

                return (
                  <button
                    key={event.title + event.date}
                    type="button"
                    onClick={() => openEvent(event)}
                    className="group bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left w-full"
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
                        {event.time} — {event.location}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* View All */}
          <div className="text-center mt-14">
            <a
              href="/events"
              className="text-amber-500 font-semibold text-sm hover:text-amber-600 transition-colors"
            >
              View all events →
            </a>
          </div>
        </div>
      </section>

      {/* Event Detail Modal — mirrors LatestSermon's modal shell */}
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
                    {new Date(selectedEvent.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-amber-500">•</span>
                  <span>{selectedEvent.time}</span>
                  <span className="text-amber-500">•</span>
                  <span>{selectedEvent.location}</span>
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