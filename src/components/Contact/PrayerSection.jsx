 export default function PrayerSection() {
  return (
     <section className="relative bg-green-950 py-20 md:py-24 px-6 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-500 font-semibold mb-4">
            Prayer & Support
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-50">
            You Don&apos;t Have to Walk Alone
          </h2>

          <p className="text-stone-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Whatever you are facing, we believe there is power in prayer.
            Share your prayer request with us and our team will stand with
            you in faith.
          </p>

          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 mt-8 bg-amber-500 text-green-950 px-7 py-3.5 rounded-xl font-semibold hover:bg-amber-400 hover:-translate-y-1 shadow-lg transition-all duration-300"
          >
            Submit a Prayer Request
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
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </a>

          <div className="w-12 h-px bg-amber-500 mx-auto mt-10" />
        </div>
      </section>
  )}
 
