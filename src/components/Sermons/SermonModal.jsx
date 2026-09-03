export default function SermonModal({ selectedSermon, contentLoading, setContentLoading, closeContent }) {
  if (!selectedSermon) return null;

  const getLoadingText = () => {
    if (selectedSermon.isVideo) return "Loading video...";
    if (selectedSermon.isAudio) return "Loading audio...";
    return "Loading image...";
  };

  return (
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
  );
}