import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import aboutHeroImage from "../../assets/aboutus.jpg"; // adjust path to wherever you place the image
import pastorPhoto from "../../assets/pastor.jpg"; // TODO: replace with real leader photo

const coreValues = [
  {
    title: "Worship",
    description: "We gather to honor God with all our heart, in spirit and in truth.",
  },
  {
    title: "Community",
    description: "We are family, gathered from every background, walking life together.",
  },
  {
    title: "Discipleship",
    description: "We grow in faith through the Word, prayer, and one another.",
  },
  {
    title: "Service",
    description: "We serve our city and the nations with the love of Christ.",
  },
];

export default function About() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll-triggered fade-in for the Our Story section, same pattern as
  // the Home page's Welcome strip and About snippet
  const storyRef = useRef(null);
  const [storyVisible, setStoryVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (storyRef.current) observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Animated hero banner — consistent with Sermons and Events pages */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${aboutHeroImage})`, backgroundPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.5) 35%, rgba(11,26,19,0.28) 100%), linear-gradient(180deg, rgba(15,36,27,0.35) 0%, rgba(15,36,27,0.2) 100%)",
          }}
        />
        <div className="relative">
          <p
            className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4 transition-all duration-700 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Who We Are
          </p>
          <h1
            className={`font-serif text-4xl md:text-5xl text-stone-50 transition-all duration-700 delay-150 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Our Story
          </h1>
          <p
            className={`text-stone-300 mt-4 max-w-xl mx-auto transition-all duration-700 delay-300 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Rooted in faith, growing in community, reaching every nation.
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

      {/* Our Story */}
      <section ref={storyRef} className="bg-stone-50 py-24 px-6">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-12 h-[3px] bg-amber-500 mx-auto mb-8 rounded-full" />
          {/* TODO: replace with the ministry's real founding story once provided */}
          <p className="text-lg leading-relaxed text-stone-600">
            Salvation To All Nations began as a small gathering of believers
            with one conviction: that the hope of Christ belongs to every
            tribe, tongue, and nation. What started as a handful of people
            praying together has grown into a community rooted in worship,
            discipleship, and service, welcoming anyone who seeks a place to
            belong. We remain committed to the same mission we started
            with, reaching our city and the nations with the love of God.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-green-950 py-24 px-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
              What We Believe
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-50">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-green-900 rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800"
              >
                <h3 className="font-serif text-xl text-amber-500 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-screen-md mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
            Leadership
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-green-950 mb-14">
            Meet Our Pastor
          </h2>

          <img
            src={pastorPhoto}
            alt="Lead Pastor" // TODO: replace with the real name once provided
            className="w-40 h-40 rounded-full object-cover mx-auto mb-6 shadow-lg"
          />
          {/* TODO: replace name and bio with real details once provided */}
          <h3 className="font-serif text-2xl text-green-950 mb-3">
            Pastor Tiroug Boadzie Ebenezer
          </h3>
          <p className="text-stone-600 leading-relaxed max-w-xl mx-auto">
            Pastor Tiroug Boadzie Ebenezer has led Salvation To All Nations with a heart
            for discipleship and community, believing that every person
            deserves a place to belong and grow in faith.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-amber-500 py-20 px-6 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-green-950 mb-6">
          We'd love to have you join us
        </h2>
        <a
          href="/contact"
          className="group inline-flex items-center gap-2 bg-green-950 text-stone-50 font-semibold text-sm px-9 py-4 rounded transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Plan your visit
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </section>

      <Footer />
    </>
  );
}