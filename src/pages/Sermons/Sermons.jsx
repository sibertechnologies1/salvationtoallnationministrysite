import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SermonsHero from "../../components/Sermons/SermonsHero";
import SermonSearchBar from "../../components/Sermons/SermonSearchBar";
import SermonCard from "../../components/Sermons/SermonCard";
import SermonModal from "../../components/Sermons/SermonModal";
import { useSermons } from "../../hooks/useSermons";

export default function Sermons() {
  const { sermons, isLoading, error } = useSermons();

  const [selectedSermon, setSelectedSermon] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const clearSearch = () => setSearchTerm("");

  const filteredSermons = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sermons;
    return sermons.filter((sermon) =>
      sermon.title.toLowerCase().includes(query)
    );
  }, [sermons, searchTerm]);

  return (
    <>
      <Navbar />

      <SermonsHero />

      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <SermonSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
          />

          {!isLoading && !error && searchTerm && (
            <p className="text-center text-sm text-stone-500 mb-10">
              {filteredSermons.length === 0
                ? `No sermons found for "${searchTerm}"`
                : `Showing ${filteredSermons.length} of ${sermons.length} sermons`}
            </p>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-stone-100 rounded-lg overflow-hidden animate-pulse">
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

          {!isLoading && !error && filteredSermons.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {filteredSermons.map((sermon, index) => (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  index={index}
                  openContent={openContent}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <SermonModal
        selectedSermon={selectedSermon}
        contentLoading={contentLoading}
        setContentLoading={setContentLoading}
        closeContent={closeContent}
      />
    </>
  );
}