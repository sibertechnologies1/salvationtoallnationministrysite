export default function GivingCTA() {
  return (
    <section className="bg-amber-500 py-24 px-6 text-center">
      <div className="max-w-screen-sm mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase text-green-950/75 font-bold mb-5">
          Give
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-green-950 mb-5">
          Your generosity fuels the mission
        </h2>

        {/* TODO: replace with the ministry's real giving message once provided */}
        <p className="text-green-950/85 leading-relaxed mb-9">
          Every gift helps us reach more nations, disciple more believers,
          and serve our community with the love of Christ. Thank you for
          partnering with us, we really appreciate your support.
        </p>

        <a
          href="/giving"
          className="group inline-flex items-center gap-2 bg-green-950 text-stone-50 font-semibold text-sm px-9 py-4 rounded transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          See how to give
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}