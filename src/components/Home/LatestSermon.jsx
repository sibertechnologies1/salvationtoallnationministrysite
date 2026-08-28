import { useSermons } from "../../hooks/useSermons";

export default function LatestSermon() {
  const { sermons, isLoading, error } = useSermons();
  const latest = sermons[0]; // sermons are already sorted newest-first by the API

  return (
    <section className="bg-green-950 py-24 px-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
            Latest Message
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-50">
            Watch our most recent sermon
          </h2>
        </div>

        {isLoading && (
          <div className="aspect-video w-full bg-green-900 rounded-lg animate-pulse" />
        )}

        {error && (
          <p className="text-center text-stone-300">
            We couldn't load the latest sermon right now. Please check back shortly.
          </p>
        )}

        {!isLoading && !error && !latest && (
          <p className="text-center text-stone-300">
            No sermons uploaded yet, check back soon.
          </p>
        )}

        {latest && (
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                src={latest.embedUrl}
                title={latest.title}
                allow="autoplay"
                className="w-full h-full"
              />
            </div>
            <div className="bg-green-900 px-6 py-5">
              <h3 className="text-stone-50 font-medium text-lg">{latest.title}</h3>
              <p className="text-stone-400 text-sm mt-1">
                {new Date(latest.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}

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