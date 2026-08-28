
import { useSermons } from "../../hooks/useSermons";

export default function LatestSermon() {
  const { sermons, isLoading, error } = useSermons();

  // Get only the 4 latest sermons
  const latestSermons = sermons.slice(0, 4);

  return (
    <section className="bg-green-950 py-24 px-6">
      <div className="max-w-screen-xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
            Latest Messages
          </p>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-50">
            Watch our latest sermons
          </h2>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-green-900 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-green-800" />

                <div className="p-5">
                  <div className="h-4 bg-green-800 rounded mb-3" />
                  <div className="h-3 bg-green-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-stone-300">
            We couldn't load the latest sermons right now. Please check back
            shortly.
          </p>
        )}

        {/* No Sermons */}
        {!isLoading && !error && latestSermons.length === 0 && (
          <p className="text-center text-stone-300">
            No sermons uploaded yet, check back soon.
          </p>
        )}

        {/* Sermon Cards */}
        {!isLoading && !error && latestSermons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestSermons.map((sermon) => (
              <a
                key={sermon.id}
                href={sermon.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-green-800">
                  {sermon.thumbnail ? (
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-800">
                      <span className="text-stone-400 text-sm">
                        No preview available
                      </span>
                    </div>
                  )}

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-green-950 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-stone-50 font-medium text-base leading-snug line-clamp-2 group-hover:text-amber-500 transition-colors">
                    {sermon.title}
                  </h3>

                  <p className="text-stone-400 text-sm mt-2">
                    {new Date(sermon.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-10">
          <a
            href="/sermons"
            className="text-amber-500 font-medium text-sm hover:text-amber-400 transition-colors"
          >
            View all sermons →
          </a>
        </div>

      </div>
    </section>
  );
}

