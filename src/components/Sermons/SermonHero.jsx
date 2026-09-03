import { useEffect, useState } from "react";
import sermonsHeroImage from "../../assets/sermon_bible.jpg";

export default function SermonsHero() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${sermonsHeroImage})`, backgroundPosition: "center 55%" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.55) 40%, rgba(11,26,19,0.35) 100%), radial-gradient(ellipse at center, rgba(11,26,19,0.15) 0%, rgba(11,26,19,0.55) 70%)",
        }}
      />

      <div className="relative">
        <p
          className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4 transition-all duration-700 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Messages
        </p>
        <h1
          className={`font-serif text-4xl md:text-5xl text-stone-50 transition-all duration-700 delay-150 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          All Sermons
        </h1>
        <p
          className={`text-stone-300 mt-4 max-w-xl mx-auto transition-all duration-700 delay-300 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Browse our full library of messages, videos, and audio teachings.
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
  );
}