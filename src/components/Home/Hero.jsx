import home_hero from "../../assets/home_hero.jpg";

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
  return (
    <section className="relative min-h-[100svh] md:h-[85vh] md:min-h-[600px] w-full overflow-hidden flex flex-col justify-end">

      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-[center_35%]
          sm:bg-center
        "
        style={{
          backgroundImage: `url(${home_hero})`,
        }}
      />

      {/* =====================================================
          DARK GREEN OVERLAY
      ====================================================== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,26,19,0.96) 0%, rgba(11,26,19,0.88) 40%, rgba(11,26,19,0.48) 75%, rgba(11,26,19,0.25) 100%), linear-gradient(0deg, #0B1A13 0%, rgba(11,26,19,0.65) 30%, rgba(11,26,19,0.25) 60%, rgba(11,26,19,0.45) 100%)",
        }}
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}
      <div
        className="
          relative
          max-w-screen-xl
          mx-auto
          w-full
          px-5
          sm:px-6
          md:px-12
          pt-28
          pb-14
          sm:pb-16
          md:pb-24
        "
      >

        {/* Eyebrow */}
        <p className="text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4 sm:mb-6 animate-[fadeIn_0.6s_ease-out]">
          Salvation To All Nations
        </p>

        {/* Main Heading */}
        <h1 className="font-serif text-[2.15rem] leading-[1.15] sm:text-4xl sm:leading-tight md:text-6xl max-w-3xl text-stone-50 animate-[fadeInUp_0.7s_ease-out]">
          Light for every nation,{" "}
          <em className="italic font-medium text-amber-500">
            hope for every heart.
          </em>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-stone-200 max-w-xl mt-5 sm:mt-7 mb-8 sm:mb-11 leading-relaxed animate-[fadeInUp_0.7s_ease-out_0.1s_both]">
          A community gathered from every tribe and tongue, walking together
          in faith, worship, and service to Christ.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-[fadeInUp_0.7s_ease-out_0.2s_both]">

          {/* Latest Sermon */}
          <a
            href="/sermons"
            className="
              group
              w-full
              sm:w-auto
              justify-center
              bg-amber-500
              text-green-950
              font-semibold
              text-sm
              px-6
              sm:px-8
              py-3.5
              sm:py-4
              rounded
              transition-transform
              duration-200
              hover:scale-105
              active:scale-95
              flex
              items-center
              gap-2
            "
          >
            Watch latest sermon

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* Begin Journey */}
          <a
            href="/contact"
            className="
              group
              w-full
              sm:w-auto
              justify-center
              border
              border-stone-50/35
              text-stone-50
              font-medium
              text-sm
              px-6
              sm:px-8
              py-3.5
              sm:py-4
              rounded
              transition-all
              duration-200
              hover:bg-stone-50/10
              hover:border-stone-50/60
              flex
              items-center
              gap-2
            "
          >
            Begin Your Journey

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

        </div>
      </div>

      {/* =====================================================
          MULTILINGUAL WELCOME RIBBON
      ====================================================== */}
      <div className="relative bg-green-950 border-t border-amber-500/25 py-3 sm:py-4 overflow-hidden whitespace-nowrap">

        <div className="flex animate-[marquee_28s_linear_infinite] w-max">

          {[...welcomeWords, ...welcomeWords, ...welcomeWords].map(
            (word, i) => (
              <span
                key={i}
                className="font-serif italic text-lg sm:text-xl text-amber-500 mx-5 sm:mx-8"
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

