import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import aboutus from "../../assets/aboutus.jpg";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* =========================
          HERO SECTION
      ========================== */}
      <section
        className="relative pt-32 pb-24 px-6 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${aboutus})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-950/80" />

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5 animate-[fadeIn_0.8s_ease-out]">
            About Us
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight animate-[fadeInUp_0.9s_ease-out]">
            Reaching Nations.
            <span className="block text-amber-500 mt-2">
              Transforming Lives.
            </span>
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed animate-[fadeInUp_1.1s_ease-out]">
            Discover who we are, what we believe, and our passion for
            proclaiming the Gospel of Jesus Christ to all nations.
          </p>
        </div>
      </section>

      {/* =========================
          WHO WE ARE
      ========================== */}
      <section className="bg-stone-50 py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Text */}
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
                Who We Are
              </p>

              <h2 className="font-serif text-3xl md:text-4xl text-green-950 leading-tight">
                A ministry with a heart for people and a passion for Christ
              </h2>

              <div className="w-14 h-1 bg-amber-500 mt-6 mb-7" />

              <p className="text-stone-600 leading-relaxed mb-5">
                Salvation To All Nations Ministry is a Christ-centered
                ministry committed to proclaiming the Gospel of Jesus Christ
                and reaching people from every background with the message of
                salvation, hope, faith, and transformation.
              </p>

              <p className="text-stone-600 leading-relaxed mb-5">
                We believe that the Gospel is not limited by nationality,
                culture, age, or circumstance. Our desire is to see
                individuals encounter God, grow in their relationship with
                Christ, discover their purpose, and become a positive
                influence in their families and communities.
              </p>

              <p className="text-stone-600 leading-relaxed">
                Through preaching, teaching, prayer, worship, evangelism,
                discipleship, and practical outreach, we seek to create an
                environment where people can experience God's love and be
                equipped to live lives that honor Him.
              </p>
            </div>

            {/* Highlight Card */}
            <div className="relative">
              <div className="bg-green-950 rounded-2xl p-8 md:p-10 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center mb-7">
                  <svg
                    className="w-7 h-7 text-green-950"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v18M3 12h18"
                    />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl text-stone-50 mb-5">
                  Our Heart
                </h3>

                <p className="text-stone-300 leading-relaxed">
                  Our heart is simple: to take the message of salvation to
                  all nations and point people to Jesus Christ.
                </p>

                <div className="w-12 h-px bg-amber-500 my-7" />

                <p className="text-amber-500 font-semibold tracking-wide">
                  Reaching Nations. Transforming Lives.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          MISSION & VISION
      ========================== */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-screen-xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
              Our Purpose
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-green-950">
              Mission & Vision
            </h2>

            <p className="text-stone-500 mt-5 leading-relaxed">
              Everything we do is guided by our commitment to Christ and our
              desire to see lives transformed through the Gospel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="group bg-green-950 rounded-2xl p-8 md:p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-7 h-7 text-green-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>

              <p className="text-amber-500 text-sm uppercase tracking-[0.15em] font-semibold mb-3">
                Our Mission
              </p>

              <h3 className="font-serif text-2xl text-stone-50 mb-5">
                Proclaiming Christ and making disciples
              </h3>

              <p className="text-stone-300 leading-relaxed">
                Our mission is to proclaim the Gospel of Jesus Christ, make
                disciples, strengthen believers, and bring hope and
                transformation to individuals, families, and communities.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-stone-100 border border-stone-200 rounded-2xl p-8 md:p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-green-950 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500">
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
                    d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                  />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
              </div>

              <p className="text-amber-600 text-sm uppercase tracking-[0.15em] font-semibold mb-3">
                Our Vision
              </p>

              <h3 className="font-serif text-2xl text-green-950 mb-5">
                A transformed generation
              </h3>

              <p className="text-stone-600 leading-relaxed">
                To see transformed lives and communities through the power
                of the Gospel, with people from every nation coming to know,
                follow, and serve Jesus Christ.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          CORE BELIEFS
      ========================== */}
      <section className="bg-green-950 py-24 px-6">
        <div className="max-w-screen-xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
              Our Faith
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-stone-50">
              What We Believe
            </h2>

            <p className="text-stone-400 mt-5 leading-relaxed">
              Our faith is grounded in the Word of God and centered on the
              person and work of Jesus Christ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                title: "The Word of God",
                text: "We believe the Bible is the inspired Word of God and the foundation for Christian faith and living.",
              },
              {
                title: "Jesus Christ",
                text: "We believe Jesus Christ is the Son of God who died for our sins, rose again, and is the way to salvation.",
              },
              {
                title: "Salvation",
                text: "We believe salvation is found through faith in Jesus Christ and the transforming grace of God.",
              },
              {
                title: "The Holy Spirit",
                text: "We believe in the power and presence of the Holy Spirit to guide, strengthen, empower, and transform believers.",
              },
            ].map((belief, index) => (
              <div
                key={belief.title}
                className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-amber-500/40 transition-all duration-500"
              >
                <div className="text-amber-500 font-serif text-2xl mb-5">
                  0{index + 1}
                </div>

                <h3 className="text-stone-50 font-semibold text-lg mb-3">
                  {belief.title}
                </h3>

                <p className="text-stone-400 text-sm leading-relaxed">
                  {belief.text}
                </p>
              </div>
            ))}

          </div>

          <div className="max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-amber-500/40 transition-all duration-500">
              <h3 className="text-stone-50 font-semibold text-lg mb-3">
                Prayer & Worship
              </h3>

              <p className="text-stone-400 text-sm leading-relaxed">
                We believe prayer, worship, fellowship, and spiritual growth
                are essential to the life of every believer.
              </p>
            </div>

            <div className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-amber-500/40 transition-all duration-500">
              <h3 className="text-stone-50 font-semibold text-lg mb-3">
                The Great Commission
              </h3>

              <p className="text-stone-400 text-sm leading-relaxed">
                We believe every believer is called to share the Gospel and
                make disciples.
              </p>
            </div>

            <div className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-amber-500/40 transition-all duration-500">
              <h3 className="text-stone-50 font-semibold text-lg mb-3">
                The Return of Christ
              </h3>

              <p className="text-stone-400 text-sm leading-relaxed">
                We believe in the return of Jesus Christ and the hope of
                eternal life with Him.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          LEADERSHIP
      ========================== */}
      <section className="bg-stone-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
            Leadership
          </p>

          <h2 className="font-serif text-3xl md:text-4xl text-green-950">
            Serving God's People
          </h2>

          <div className="w-14 h-1 bg-amber-500 mx-auto mt-6 mb-8" />

          <h3 className="text-green-950 text-xl font-semibold">
            Pastor Tiroug Boadzie Ebenezer
          </h3>

          <p className="text-amber-600 text-sm uppercase tracking-wider mt-2 font-medium">
            Founder & Lead Pastor
          </p>

          <p className="text-stone-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Serving God's people, proclaiming the Gospel, and helping lives
            discover their purpose in Christ.
          </p>
        </div>
      </section>

      {/* =========================
          SCRIPTURE
      ========================== */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <blockquote className="font-serif text-2xl md:text-3xl text-green-950 leading-relaxed italic">
            “Go therefore and make disciples of all nations.”
          </blockquote>

          <p className="text-amber-600 text-sm uppercase tracking-[0.2em] mt-5 font-semibold">
            Matthew 28:19
          </p>

          <p className="text-stone-500 mt-6 leading-relaxed">
            This commission reflects our desire to see the Gospel reach
            people everywhere and lives transformed through Jesus Christ.
          </p>

          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />

        </div>
      </section>

      <Footer />
    </>
  );
}