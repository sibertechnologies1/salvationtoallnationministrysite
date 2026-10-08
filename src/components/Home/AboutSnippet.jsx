import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import aboutImage from "../../assets/about.jpg"; 

export default function AboutSnippet() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState({
    about_title: "A family bound by faith, not by borders.",
    about_text: "Salvation To All Nations exists to bring the hope of Christ to every tribe, tongue, and nation. Since our founding, we've grown into a community rooted in worship, discipleship, and service, welcoming anyone who seeks a place to belong."
  });

  useEffect(() => {
    async function fetchAboutContent() {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('about_title, about_text')
        .limit(1)
        .single();

      if (!error && data) {
        setContent(data);
      }
    }
    fetchAboutContent();
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

  return (
    <section ref={sectionRef} className="flex flex-col md:flex-row min-h-[560px]">
      {/* Image side */}
      <div
        className="flex-1 min-h-[320px] md:min-h-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImage})`, backgroundPosition: "center 30%" }}
      />

      {/* Text side */}
      <div className="flex-1 bg-green-900 flex items-center px-8 py-16 md:px-16 md:py-20">
        <div
          className={`max-w-lg transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5">
            Who We Are
          </p>

          <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-stone-50 mb-6">
            {content.about_title}
          </h2>

          <p className="text-stone-300 leading-relaxed mb-9">
            {content.about_text}
          </p>

          <a
            href="/about"
            className="group inline-flex items-center gap-2 bg-amber-500 text-green-950 font-semibold text-sm px-8 py-4 rounded transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Learn more about us
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}