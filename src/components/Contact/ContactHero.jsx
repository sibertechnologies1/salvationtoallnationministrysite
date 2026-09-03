  import contact from "../../assets/contact.jpg";
  
  export default function ContactHero() {
    return (
         <section
        className="relative min-h-[520px] flex items-center pt-28 pb-20 px-6 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${contact})` }}
      >
        <div className="absolute inset-0 bg-green-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-950/70 to-green-950/50" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-amber-500" />
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-500 font-semibold">
              Get In Touch
            </p>
            <span className="w-10 h-px bg-amber-500" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-50 leading-[1.1]">
            We Would Love to
            <span className="block text-amber-500 mt-3">
              Hear From You
            </span>
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto mt-7 text-base md:text-lg leading-relaxed">
            Whether you have a question, need prayer, want to learn more
            about the ministry, or simply want to connect, we are here for
            you.
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
    )}
 