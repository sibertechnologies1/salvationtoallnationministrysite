import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import defaultSermonsHero from "../../assets/sermon_bible.jpg";

export default function SermonsHero() {
  const [hasMounted, setHasMounted] = useState(false);
  const [heroContent, setHeroContent] = useState({
    eyebrow: "Messages",
    title: "All Sermons",
    description: "Browse our full library of messages, videos, and audio teachings.",
    bg_image_url: "",
  });

  useEffect(() => {
    async function fetchHero() {
      // Fetch the hero settings directly from the sermons table
      const { data } = await supabase
        .from("sermons")
        .select("hero_eyebrow, hero_title, hero_description, hero_bg_image_url")
        .order("date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setHeroContent({
          eyebrow: data.hero_eyebrow || "Messages",
          title: data.hero_title || "All Sermons",
          description: data.hero_description || "Browse our full library of messages, videos, and audio teachings.",
          bg_image_url: data.hero_bg_image_url || "",
        });
      }
    }
    fetchHero();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const bgImage = heroContent.bg_image_url || defaultSermonsHero;

  return (
    <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "center 55%" }}
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
          {heroContent.eyebrow}
        </p>
        <h1
          className={`font-serif text-4xl md:text-5xl text-stone-50 transition-all duration-700 delay-150 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {heroContent.title}
        </h1>
        <p
          className={`text-stone-300 mt-4 max-w-xl mx-auto transition-all duration-700 delay-300 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {heroContent.description}
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