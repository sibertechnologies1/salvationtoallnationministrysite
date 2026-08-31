import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import giving from "../../assets/giving.jpg";

export default function Giving() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-24 px-6 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${giving})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-950/75" />

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5 animate-[fadeIn_0.8s_ease-out]">
            Give & Support
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight">
            Your Giving Makes
            <span className="block text-amber-500 mt-2">
              a Difference
            </span>
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Your generosity helps us spread the Gospel, support ministry
            work, and reach lives with the message of Jesus Christ.
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mobile Money */}
            <div className="group bg-green-950 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-7 h-7 text-green-950"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="2"
                      strokeWidth="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M9 18h6"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-amber-500 text-sm uppercase tracking-wider font-semibold">
                    Give Digitally
                  </p>
                  <h3 className="text-stone-50 font-serif text-2xl">
                    Mobile Money
                  </h3>
                </div>
              </div>

              {/* MTN */}
              <div className="border border-white/10 rounded-xl p-5 mb-4 hover:border-amber-500/40 transition-colors duration-300">
                <p className="text-stone-400 text-sm mb-1">
                  MTN Mobile Money
                </p>

                <p className="text-stone-50 text-xl font-semibold tracking-wide">
                  054 352 9284
                </p>
              </div>

              {/* Telecel */}
              <div className="border border-white/10 rounded-xl p-5 hover:border-amber-500/40 transition-colors duration-300">
                <p className="text-stone-400 text-sm mb-1">
                  Telecel Cash
                </p>

                <p className="text-stone-50 text-xl font-semibold tracking-wide">
                  050 215 6703
                </p>
              </div>
            </div>

            {/* Bank */}
            <div className="group bg-stone-100 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-stone-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-7 h-7 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10l9-6 9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-amber-600 text-sm uppercase tracking-wider font-semibold">
                    Give Through Bank
                  </p>
                  <h3 className="text-green-950 font-serif text-2xl">
                    Bank Transfer
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Bank Name</span>
                  <span className="text-green-950 font-medium">
                    GCB
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Number</span>
                  <span className="text-green-950 font-medium">
                    XXXXXXXX
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-stone-500">Account Name</span>
                  <span className="text-green-950 font-medium text-right">
                    Tiroug Boadzie Ebenezer
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Branch</span>
                  <span className="text-green-950 font-medium">
                    Suami Magazine
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scripture / Closing */}
      <section className="bg-green-950 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <blockquote className="font-serif text-2xl md:text-3xl text-stone-100 leading-relaxed italic">
            “God loves a cheerful giver.”
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