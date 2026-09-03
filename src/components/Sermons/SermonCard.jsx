export default function SermonCard({ sermon, index, openContent }) {
  return (
    <button
      type="button"
      onClick={() => openContent(sermon)}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group bg-stone-50 border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left w-full opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
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
            <span className="text-stone-400 text-sm">No preview available</span>
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
  );
}