import { useState, useEffect, useRef } from "react";
import { sermons } from "../../data/sermons";

export default function LatestSermon() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Take the most recent sermon from the shared array
  const latestSermon = sermons[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-stone-900 py-24 px-6 text-stone-50">
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-800 pb-8">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-amber-500 font-semibold mb-3">
              Current Teaching
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-100">
              Latest Message
            </h2>
          </div>
          <a
            href="/sermons"
            className="mt-4 md:mt-0 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            Browse all sermons
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Feature Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden p-6 md:p-8">
          {/* Left Column: Media Feature Card with Play Overlay */}
          <div className="lg:col-span-7 relative group rounded-xl overflow-hidden bg-stone-900 aspect-video">
            <img
              src={latestSermon.thumbnail}
              alt={latestSermon.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors duration-300" />

            {/* Play Button Trigger */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-amber-500 text-green-950 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none"
              aria-label="Play video"
            >
              <svg
                className="w-7 h-7 md:w-8 md:h-8 fill-current translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Right Column: Metadata Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-amber-500 font-semibold mb-4">
              <span>{latestSermon.date}</span>
              <span>•</span>
              <span>{latestSermon.scripture}</span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-stone-100 mb-3 leading-snug">
              {latestSermon.title}
            </h3>

            <p className="text-sm font-medium text-stone-400 mb-4">
              By {latestSermon.speaker}
            </p>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-8">
              {latestSermon.description}
            </p>

            <div>
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-amber-500 text-green-950 font-semibold text-sm px-6 py-3.5 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                Watch full sermon
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Close Modal Button */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 text-stone-300 hover:text-white bg-stone-900/80 p-2 rounded-full focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full">
              <video
                src={latestSermon.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}