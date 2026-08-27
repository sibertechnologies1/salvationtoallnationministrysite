import { useEffect, useState } from "react";
import home_hero from "../../assets/home_hero.jpg"; // adjust path to wherever you place the image

const welcomeWords = [
  "Welcome",
  "Akwaaba",
  "Bienvenue",
  "Karibu",
  "Bienvenido",
  "欢迎",
  "مرحبا",
];

export default function Hero() {
  // Controls the entrance animation: content is invisible/offset on first
  // render, then animates in once the component mounts. This avoids
  // animating on every re-render, just the initial page load.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex flex-col justify-end">
      {/* Background photo with a slow, subtle zoom (Ken Burns effect) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${home_hero})` }}
      />

      {/* Dark green overlay so text stays readable over busy photo lighting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,26,19,0.94) 0%, rgba(11,26,19,0.82) 32%, rgba(11,26,19,0.35) 62%, rgba(11,26,19,0.15) 100%), linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.55) 35%, rgba(11,26,19,0.2) 55%, rgba(11,26,19,0.45) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative max-w-screen-xl mx-auto w-full px-6 md:px-12 pb-24">
        <p
          className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-6 transition-all duration-700 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Salvation To All Nations
        </p>

        <h1
          className={`font-serif text-4xl md:text-6xl leading-tight text-stone-50 max-w-3xl transition-all duration-700 delay-150 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Light for every nation,{" "}
          <em className="italic font-medium text-amber-500 not-italic md:italic">
            hope for every heart.
          </em>
        </h1>

        <p
          className={`text-lg text-stone-200 max-w-xl mt-7 mb-11 transition-all duration-700 delay-300 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          A community gathered from every tribe and tongue, walking together
          in faith, worship, and service to Christ.
        </p>

        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
            hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="/sermons"
            className="group bg-amber-500 text-green-950 font-semibold text-sm px-8 py-4 rounded transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Watch latest sermon
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="/contact"
            className="border border-stone-50/35 text-stone-50 font-medium text-sm px-8 py-4 rounded transition-colors duration-200 hover:bg-stone-50/10"
          >
            Plan your visit
          </a>
        </div>
      </div>

      {/* Signature element: scrolling multilingual welcome ribbon */}
      <div className="relative bg-green-950 border-t border-amber-500/25 py-4 overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_28s_linear_infinite] w-max">
          {[...welcomeWords, ...welcomeWords, ...welcomeWords].map(
            (word, i) => (
              <span
                key={i}
                className="font-serif italic text-xl text-amber-500 mx-8"
              >
                {word}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}