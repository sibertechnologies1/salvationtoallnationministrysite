import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../lib/supabaseClient";
import givingImage from "../../assets/giving.jpg";

export default function Giving() {
  const [hasMounted, setHasMounted] = useState(false);
  const [pageData, setPageData] = useState({
    hero_eyebrow: "Give & Support",
    hero_title: "Your Giving Makes a Difference",
    hero_description: "Your generosity helps us spread the Gospel, support ministry work, and reach lives with the message of Jesus Christ.",
    hero_bg_image_url: "",
    intro_eyebrow: "Partner With Us",
    intro_title: "Give With a Willing Heart",
    intro_description: "We are grateful for every gift and every person who chooses to partner with this ministry.",
    momo_mtn_number: "054 352 1234",
    momo_mtn_name: "Tiroug Boadzie Ebenezer",
    momo_telecel_number: "050 215 1234",
    momo_telecel_name: "Tiroug Boadzie Ebenezer",
    momo_airteltigo_number: "026 820 1234",
    momo_airteltigo_name: "Tiroug Boadzie Ebenezer",
    bank_name: "GCB",
    bank_account_number: "XXXXXXXX",
    bank_account_name: "Tiroug Boadzie Ebenezer",
    bank_branch: "Suami Magazine",
    scripture_quote: "God loves a cheerful giver.",
    scripture_ref: "2 Corinthians 9:7",
  });

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function fetchGivingData() {
      // Query ALL columns from the giving table
      const { data, error } = await supabase
        .from("giving")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        setPageData({
          hero_eyebrow: data.hero_eyebrow || "Give & Support",
          hero_title: data.hero_title || "Your Giving Makes a Difference",
          hero_description: data.hero_description || "",
          hero_bg_image_url: data.hero_bg_image_url || "",
          intro_eyebrow: data.intro_eyebrow || "Partner With Us",
          intro_title: data.intro_title || "Give With a Willing Heart",
          intro_description: data.intro_description || "",
          momo_mtn_number: data.momo_mtn_number || "",
          momo_mtn_name: data.momo_mtn_name || "",
          momo_telecel_number: data.momo_telecel_number || "",
          momo_telecel_name: data.momo_telecel_name || "",
          momo_airteltigo_number: data.momo_airteltigo_number || "",
          momo_airteltigo_name: data.momo_airteltigo_name || "",
          bank_name: data.bank_name || "",
          bank_account_number: data.bank_account_number || "",
          bank_account_name: data.bank_account_name || "",
          bank_branch: data.bank_branch || "",
          scripture_quote: data.scripture_quote || "God loves a cheerful giver.",
          scripture_ref: data.scripture_ref || "2 Corinthians 9:7",
        });
      }
    }
    fetchGivingData();
  }, []);

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

  const bgImage = pageData.hero_bg_image_url || givingImage;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.55) 35%, rgba(11,26,19,0.35) 100%), linear-gradient(180deg, rgba(15,36,27,0.4) 0%, rgba(15,36,27,0.25) 100%)",
          }}
        />

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <p
            className={`text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5 transition-all duration-700 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {pageData.hero_eyebrow}
          </p>

          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight transition-all duration-700 delay-150 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {pageData.hero_title}
          </h1>

          <p
            className={`text-stone-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed transition-all duration-700 delay-300 ${
              hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {pageData.hero_description}
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
            {pageData.intro_eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-green-950">
            {pageData.intro_title}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mt-5 leading-relaxed">
            {pageData.intro_description}
          </p>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mobile Money */}
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
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">{pageData.momo_mtn_number}</p>
                  <p className="text-stone-400 text-sm mt-1">{pageData.momo_mtn_name}</p>
                </div>

                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">Telecel Cash</p>
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">{pageData.momo_telecel_number}</p>
                  <p className="text-stone-400 text-sm mt-1">{pageData.momo_telecel_name}</p>
                </div>

                <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                  <p className="text-stone-400 text-sm mb-1">AirtelTigo Money</p>
                  <p className="text-stone-50 text-xl font-semibold tracking-wide">{pageData.momo_airteltigo_number}</p>
                  <p className="text-stone-400 text-sm mt-1">{pageData.momo_airteltigo_name}</p>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
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
                  <span className="text-green-950 font-medium">{pageData.bank_name}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Number</span>
                  <span className="text-green-950 font-medium">{pageData.bank_account_number}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Name</span>
                  <span className="text-green-950 font-medium text-right">{pageData.bank_account_name}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Branch</span>
                  <span className="text-green-950 font-medium">{pageData.bank_branch}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture / Closing */}
      <section ref={closingRef} className="bg-green-950 py-20 px-6">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            closingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />
          <blockquote className="font-serif text-2xl md:text-3xl text-stone-100 leading-relaxed italic">
            "{pageData.scripture_quote}"
          </blockquote>
          <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mt-5">
            {pageData.scripture_ref}
          </p>
          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />
        </div>
      </section>

      <Footer />
    </>
  );
}