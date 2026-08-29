import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useSermons } from "../../hooks/useSermons";
import sermonsHeroImage from "../../assets/sermon_bible.jpg"; // adjust path to wherever you place the image

export default function Sermons() {
  const { sermons, isLoading, error } = useSermons(); // full list, no slicing

  const [selectedSermon, setSelectedSermon] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedSermon ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSermon]);

  const openContent = (sermon) => {
    setContentLoading(true);
    setSelectedSermon(sermon);
  };

  const closeContent = () => {
    setSelectedSermon(null);
    setContentLoading(false);
  };

  const getLoadingText = () => {
    if (!selectedSermon) return "Loading...";
    if (selectedSermon.isVideo) return "Loading video...";
    if (selectedSermon.isAudio) return "Loading audio...";
    return "Loading image...";
  };

  return (
    <>
      <Navbar />

      {/* Page header banner */}
      <section
        className="relative pt-32 pb-16 px-6 text-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${sermonsHeroImage})`, backgroundPosition: "center 55%" }}
      >
        {/* Dark overlay — keeps the heading readable over the bright glow in the photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.55) 40%, rgba(11,26,19,0.35) 100%), radial-gradient(ellipse at center, rgba(11,26,19,0.15) 0%, rgba(11,26,19,0.55) 70%)",
          }}
        />

        <div className="relative">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
            Messages
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-50">
            All Sermons
          </h1>
          <p className="text-stone-300 mt-4 max-w-xl mx-auto">
            Browse our full library of messages, videos, and audio teachings.
          </p>
        </div>
      </section>

      {/* Full sermon grid */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-stone-100 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-stone-200" />
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
              We couldn't load sermons right now. Please check back shortly.
            </p>
          )}

          {!isLoading && !error && sermons.length === 0 && (
            <p className="text-center text-stone-500">
              No sermons uploaded yet, check back soon.
            </p>
          )}

          {!isLoading && !error && sermons.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sermons.map((sermon) => (
                <button
                  key={sermon.id}
                  type="button"
                  onClick={() => openContent(sermon)}
                  className="group bg-stone-50 border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left w-full"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-200">
                    {sermon.thumbnail ? (
                      <img
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-stone-400 text-sm">
                          No preview available
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {sermon.isVideo && (
                          <svg className="w-6 h-6 text-green-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                        {sermon.isAudio && (
                          <svg className="w-6 h-6 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13" />
                            <circle cx="6" cy="18" r="3" strokeWidth="2" />
                            <circle cx="18" cy="15" r="3" strokeWidth="2" />
                          </svg>
                        )}
                        {!sermon.isVideo && !sermon.isAudio && (
                          <svg className="w-6 h-6 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15l-5-5L5 21" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-green-950 font-medium text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {sermon.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-2">
                      {new Date(sermon.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-amber-600 text-xs uppercase tracking-wider mt-3 font-medium">
                      {sermon.isVideo ? "Video" : sermon.isAudio ? "Audio" : "Image"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Content Modal — same pattern as Home's LatestSermon */}
      {selectedSermon && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={closeContent}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeContent}
              aria-label="Close content"
              className="absolute -top-12 right-0 md:-top-14 text-white hover:text-amber-500 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
              {contentLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
                  <div className="w-12 h-12 border-4 border-stone-700 border-t-amber-500 rounded-full animate-spin" />
                  <p className="text-stone-300 text-sm mt-4">{getLoadingText()}</p>
                </div>
              )}

              {selectedSermon.isVideo && (
                <iframe
                  src={selectedSermon.embedUrl}
                  title={selectedSermon.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  onLoad={() => setContentLoading(false)}
                  className="w-full h-full border-0"
                />
              )}

              {selectedSermon.isAudio && (
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="w-full max-w-2xl text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13" />
                        <circle cx="6" cy="18" r="3" strokeWidth="2" />
                        <circle cx="18" cy="15" r="3" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3 className="text-white text-xl font-medium mb-6">{selectedSermon.title}</h3>
                    <iframe
                      src={selectedSermon.embedUrl}
                      title={selectedSermon.title}
                      allow="autoplay"
                      onLoad={() => setContentLoading(false)}
                      className="w-full h-24 border-0"
                    />
                  </div>
                </div>
              )}

              {!selectedSermon.isVideo && !selectedSermon.isAudio && (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  {selectedSermon.thumbnail && (
                    <img
                      src={selectedSermon.thumbnail}
                      alt={selectedSermon.title}
                      onLoad={() => setContentLoading(false)}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="bg-green-900 px-5 py-4 rounded-b-lg">
              <h3 className="text-stone-50 font-medium text-lg">{selectedSermon.title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-stone-400 text-sm">
                  {new Date(selectedSermon.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span className="text-amber-500">•</span>
                <p className="text-amber-500 text-sm">
                  {selectedSermon.isVideo ? "Video" : selectedSermon.isAudio ? "Audio" : "Image"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}