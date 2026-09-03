    export default function LocationSection() {
  return (
     <section className="bg-stone-50 py-20 md:py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-600 font-semibold mb-4">
              Find Us
            </p>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-green-950">
              Come Worship With Us
            </h2>

            <p className="text-stone-600 mt-5 leading-relaxed">
              We would be delighted to welcome you into our fellowship.
              Come worship, connect, grow, and experience the presence of
              God with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-200 shadow-sm">
              <p className="text-amber-600 text-xs uppercase tracking-[0.2em] font-semibold">
                Our Address
              </p>

              <h3 className="font-serif text-2xl md:text-3xl text-green-950 mt-3">
                Salvation to All Nations Ministry
              </h3>

              <div className="mt-6 flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-green-950 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21s8-7.2 8-12a8 8 0 10-16 0c0 4.8 8 12 8 12z"
                    />
                    <circle
                      cx="12"
                      cy="9"
                      r="2.5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-stone-600 leading-relaxed">
                    Barekese
                    <br />
                    Ghana
                  </p>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31690.52219077371!2d-1.7139529999999998!3d6.852761200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdba460a71cb585%3A0xe71e6202af929219!2sBarekese!5e0!3m2!1sen!2sgh!4v1788211370471!5m2!1sen!2sgh"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="rounded-xl mt-8"
              />
            </div>

            <div className="bg-green-950 rounded-3xl min-h-[320px] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
              </div>

              <div className="relative text-center px-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-green-950"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21s8-7.2 8-12a8 8 0 10-16 0c0 4.8 8 12 8 12z"
                    />
                    <circle
                      cx="12"
                      cy="9"
                      r="2.5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-stone-50 mt-6">
                  We Are in Barekese
                </h3>

                <p className="text-stone-400 mt-3 max-w-sm mx-auto">
                  Use the directions button to find our location on Google
                  Maps.
                </p>

                <p className="inline-flex items-center gap-2 mt-6 text-amber-500 font-semibold hover:text-amber-400 transition-colors">
                  <span className="hidden lg:block">←</span>
                  <span className="block lg:hidden">↑</span>
                  <span className="hidden lg:block"> That is the map at the Left</span>
                  <span className="lg:hidden block"> That is the map Above</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )}
    
   