import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function WelcomeStrip() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState({
    welcome_heading: "You are welcome here",
    welcome_text: "Salvation To All Nations is a family gathered from every background and nation, united in faith. Whether you're taking your first step toward God or you've walked with Him for years, there's a place for you at our table.",
    stat_1_number: "12+",
    stat_1_label: "Years Active",
    stat_2_number: "30+",
    stat_2_label: "Nations Reached",
    stat_3_number: "500+",
    stat_3_label: "Members"
  });

  useEffect(() => {
    async function fetchWelcomeContent() {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('welcome_heading, welcome_text, stat_1_number, stat_1_label, stat_2_number, stat_2_label, stat_3_number, stat_3_label')
        .limit(1)
        .single();

      if (!error && data) {
        setContent(data);
      }
    }
    fetchWelcomeContent();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: content.stat_1_number, label: content.stat_1_label },
    { number: content.stat_2_number, label: content.stat_2_label },
    { number: content.stat_3_number, label: content.stat_3_label },
  ];

  return (
    <section ref={sectionRef} className="bg-stone-50 py-24 md:py-32 px-6">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-12 h-[3px] bg-amber-500 mx-auto mb-8 rounded-full" />

        <h2 className="font-serif text-3xl md:text-[34px] text-green-950 mb-5">
          {content.welcome_heading}
        </h2>

        <p className="text-lg leading-relaxed text-stone-600">
          {content.welcome_text}
        </p>

        <div className="flex justify-center flex-wrap gap-x-16 gap-y-8 mt-16">
          {stats.map((stat, i) => (
            <div
              key={i}
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