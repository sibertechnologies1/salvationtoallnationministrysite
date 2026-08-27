import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "12+", label: "Years Active" },
  { number: "30+", label: "Nations Reached" },
  { number: "500+", label: "Members" },
];

export default function WelcomeStrip() {
  // Fades/slides the section in once it scrolls into view, rather than on
  // page load, since this section sits below the fold.
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-stone-50 py-24 md:py-32 px-6">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-12 h-[3px] bg-amber-500 mx-auto mb-8 rounded-full" />

        <h2 className="font-serif text-3xl md:text-[34px] text-green-950 mb-5">
          You are welcome here
        </h2>

        <p className="text-lg leading-relaxed text-stone-600">
          Salvation To All Nations is a family gathered from every background
          and nation, united in faith. Whether you're taking your first step
          toward God or you've walked with Him for years, there's a place
          for you at our table.
        </p>

        {/* TODO: replace with real ministry figures before launch */}
        <div className="flex justify-center flex-wrap gap-x-16 gap-y-8 mt-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? `${150 + i * 120}ms` : "0ms" }}
            >
              <div className="font-serif text-4xl md:text-[44px] text-green-800">
                {stat.number}
              </div>
              <div className="text-xs tracking-wider uppercase text-stone-400 font-semibold mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}