import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import giving from "../../assets/giving.jpg";

export default function Giving() {
  // Staggered hero entrance — same pattern as Sermons/Events/About
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll-triggered fade-in for the closing scripture section
  const closingRef = useRef(null);
  const [closingVisible, setClosingVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setClosingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (closingRef.current) observer.observe(closingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section — Ken Burns + staggered entrance, consistent with other pages */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${giving})`, backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.55) 35%, rgba(11,26,19,0.35) 100%), linear-gradient(180deg, rgba(15,36,27,0.4) 0%, rgba(15,36,27,0.25) 100%)",
          }}
        />

        {/* Decorative glow — kept from your original, sits above the overlay for a subtle bonus effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <p
            className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5 transition-all duration-700 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Give & Support
          </p>

          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight transition-all duration-700 delay-150 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Your Giving Makes
            <span className="block text-amber-500 mt-2">a Difference</span>
          </h1>

          <p
            className={`text-stone-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed transition-all duration-700 delay-300 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Your generosity helps us spread the Gospel, support ministry
            work, and reach lives with the message of Jesus Christ.
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

      {/* Giving Introduction */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
            Partner With Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-green-950">
            Give With a Willing Heart
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mt-5 leading-relaxed">
            We are grateful for every gift and every person who chooses to
            partner with this ministry. Your giving enables us to continue
            serving God, reaching communities, and sharing His Word.
          </p>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mobile Money — MTN, Telecel (yours) + AirtelTigo (new placeholder) */}
            <div className="group bg-green-950 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" />
                    <path strokeLinecap="round" strokeWidth="2" d="M9 18h6" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-500 text-sm uppercase tracking-wider font-semibold">
                    Give Digitally
                  </p>
                  <h3 className="text-stone-50 font-serif text-2xl">Mobile Money</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">MTN Mobile Money</p>
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">054 352 1234</p>
                  <p className="text-stone-400 text-sm mt-1">Tiroug Boadzie Ebenezer</p>
                </div>

                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">Telecel Cash</p>
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">050 215 1234</p>
                  <p className="text-stone-400 text-sm mt-1">Tiroug Boadzie Ebenezer</p>
                </div>

                {/* TODO: replace with the real AirtelTigo Money number once available */}
                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">AirtelTigo Money</p>
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">026 820 1234</p>
                  <p className="text-stone-400 text-sm mt-1">Tiroug Boadzie Ebenezer</p>
                </div>
              </div>
            </div>

            {/* Bank Transfer (yours, unchanged) */}
            <div className="group bg-stone-100 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-stone-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l9-6 9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-600 text-sm uppercase tracking-wider font-semibold">
                    Give Through Bank
                  </p>
                  <h3 className="text-green-950 font-serif text-2xl">Bank Transfer</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Bank Name</span>
                  <span className="text-green-950 font-medium">GCB</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Number</span>
                  <span className="text-green-950 font-medium">XXXXXXXX</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Name</span>
                  <span className="text-green-950 font-medium text-right">Tiroug Boadzie Ebenezer</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Branch</span>
                  <span className="text-green-950 font-medium">Suami Magazine</span>
                </div>
              </div>
            </div>

            {/* In-Person Giving — new */}
            <div className="group bg-stone-100 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-stone-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-600 text-sm uppercase tracking-wider font-semibold">
                    Give In Person
                  </p>
                  <h3 className="text-green-950 font-serif text-2xl">At a Service</h3>
                </div>
              </div>

              {/* TODO: keep in sync with the real service times in Footer.jsx */}
              <div className="space-y-4">
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Sunday Worship</span>
                  <span className="text-green-950 font-medium">9:00 AM</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Wednesday Bible Study</span>
                  <span className="text-green-950 font-medium">6:30 PM</span>
                </div>
                  <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Friday Prayer Meeting</span>
                  <span className="text-green-950 font-medium">6:30 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Location</span>
                  <span className="text-green-950 font-medium">Barekese, Kumasi</span>
                </div>
              </div>
            </div>

            {/* International / Diaspora Giving — new, ties to the "All Nations" mission */}
            <div className="group bg-green-950 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7 text-green-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeWidth="2" d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-500 text-sm uppercase tracking-wider font-semibold">
                    Giving From Abroad
                  </p>
                  <h3 className="text-stone-50 font-serif text-2xl">International</h3>
                </div>
              </div>

              {/* TODO: confirm which service the ministry actually wants to use (Wise, Western Union, etc.) */}
              <div className="space-y-4">
                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">Wise / Bank Wire</p>
                  <p className="text-stone-50 text-lg font-semibold tracking-wide">Details on request</p>
                </div>
                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">Contact for Diaspora Giving</p>
                  <p className="text-stone-50 text-lg font-semibold tracking-wide">info@salvationtoallnations.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture / Closing — now fades in on scroll, matching other pages */}
      <section ref={closingRef} className="bg-green-950 py-20 px-6">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            closingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />
          <blockquote className="font-serif text-2xl md:text-3xl text-stone-100 leading-relaxed italic">
            "God loves a cheerful giver."
          </blockquote>
          <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mt-5">
            2 Corinthians 9:7
          </p>
          <p className="text-stone-400 mt-6 leading-relaxed">
            Thank you for partnering with us. May God richly bless you for
            your generosity and faithfulness.
          </p>
          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />
        </div>
      </section>

      <Footer />
    </>
  );
}