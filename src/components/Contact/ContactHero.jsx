import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import defaultContactBg from "../../assets/contact.jpg";

export default function ContactHero() {
  const [heroData, setHeroData] = useState({
    eyebrow: "Get In Touch",
    titleLine1: "We Would Love to",
    titleLine2: "Hear From You",
    description:
      "Whether you have a question, need prayer, want to learn more about the ministry, or simply want to connect, we are here for you.",
    bg_image: "",
  });

  useEffect(() => {
    async function fetchHeroData() {
      const { data, error } = await supabase
        .from("contact")
        .select("hero_eyebrow, hero_title, hero_description, hero_bg_image_url")
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        const fullTitle = data.hero_title || "We Would Love to Hear From You";
        
        // Split title into two lines if it contains multiple words for consistent dual-color rendering
        const words = fullTitle.trim().split(" ");
        let line1 = fullTitle;
        let line2 = "";

        if (words.length > 3) {
          const midIndex = Math.ceil(words.length / 2);
          line1 = words.slice(0, midIndex).join(" ");
          line2 = words.slice(midIndex).join(" ");
        }

        setHeroData({
          eyebrow: data.hero_eyebrow || "Get In Touch",
          titleLine1: line1,
          titleLine2: line2,
          description:
            data.hero_description ||
            "Whether you have a question, need prayer, want to learn more about the ministry, or simply want to connect, we are here for you.",
          bg_image: data.hero_bg_image_url || "",
        });
      }
    }

    fetchHeroData();
  }, []);

  const bgStyleImage = heroData.bg_image || defaultContactBg;

  return (
    <section
      className="relative min-h-[520px] flex items-center pt-28 pb-20 px-6 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgStyleImage})` }}
    >
      <div className="absolute inset-0 bg-green-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-950/70 to-green-950/50" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-10 h-px bg-amber-500" />
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-500 font-semibold">
            {heroData.eyebrow}
          </p>
          <span className="w-10 h-px bg-amber-500" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-50 leading-[1.1]">
          {heroData.titleLine1}
          {heroData.titleLine2 && (
            <span className="block text-amber-500 mt-3">
              {heroData.titleLine2}
            </span>
          )}
        </h1>

        <p className="text-stone-300 max-w-2xl mx-auto mt-7 text-base md:text-lg leading-relaxed">
          {heroData.description}
        </p>

        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 mt-9 bg-amber-500 text-green-950 px-7 py-3.5 rounded-xl font-semibold hover:bg-amber-400 hover:-translate-y-1 shadow-lg transition-all duration-300"
        >
          Contact Us
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}