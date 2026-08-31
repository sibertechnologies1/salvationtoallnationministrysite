import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import contact from "../../assets/contact.jpg";

export default function Contact() {
  return (
    <>
      <Navbar />

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section
        className="relative min-h-[520px] flex items-center pt-28 pb-20 px-6 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${contact})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-green-950/80" />

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-950/70 to-green-950/50" />

        {/* Decorative elements */}
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

      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}
      <section className="bg-stone-50 py-20 md:py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-600 font-semibold mb-4">
              Reach Out
            </p>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-green-950">
              We Are Here for You
            </h2>

            <p className="text-stone-600 mt-5 leading-relaxed">
              Connecting with our church family should be simple. Reach us
              through any of the channels below or visit us in Barekese.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* LOCATION */}
            <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
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

              <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
                Visit Us
              </p>

              <h3 className="text-green-950 font-serif text-xl mt-2">
                Our Location
              </h3>

              <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                Barekese
                <br />
                Ghana
              </p>
            </div>

            {/* PHONE */}
            <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M22 16.92v3a2 2 0 01-2.18 2
                    19.79 19.79 0 01-8.63-3.07
                    19.5 19.5 0 01-6-6
                    19.79 19.79 0 01-3.07-8.67
                    A2 2 0 014.11 2h3
                    a2 2 0 012 1.72
                    12.84 12.84 0 00.7 2.81
                    2 2 0 01-.45 2.11L8.09 9.91
                    a16 16 0 006 6l1.27-1.27
                    a2 2 0 012.11-.45
                    12.84 12.84 0 002.81.7
                    A2 2 0 0122 16.92z"
                  />
                </svg>
              </div>

              <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
                Call Us
              </p>

              <h3 className="text-green-950 font-serif text-xl mt-2">
                Phone
              </h3>

              <a
                href="tel:+233502156703"
                className="text-stone-500 text-sm mt-3 block hover:text-amber-600 transition-colors"
              >
                050 215 6703
              </a>
            </div>

            {/* EMAIL */}
            <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
                Write to Us
              </p>

              <h3 className="text-green-950 font-serif text-xl mt-2">
                Email
              </h3>

              <a
                href="mailto:info@salvationtoallnations.org"
                className="text-stone-500 text-sm mt-3 block hover:text-amber-600 transition-colors break-all"
              >
                info@salvationtoallnations.org
              </a>
            </div>

            {/* SERVICE TIMES */}
            <div className="group bg-white rounded-2xl p-7 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-950 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-amber-500 group-hover:text-green-950 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    strokeWidth="2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 7v5l3 2"
                  />
                </svg>
              </div>

              <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6">
                Worship With Us
              </p>

              <h3 className="text-green-950 font-serif text-xl mt-2">
                Service Times
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Sunday Worship
                  </span>

                  <span className="text-green-950 font-semibold whitespace-nowrap">
                    9:00 AM
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Wednesday Bible Study
                  </span>

                  <span className="text-green-950 font-semibold whitespace-nowrap">
                    6:30 PM
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Friday Prayer Night
                  </span>

                  <span className="text-green-950 font-semibold whitespace-nowrap">
                    7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}
      <section
        id="contact-form"
        className="bg-white py-20 md:py-24 px-6"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT CONTENT */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-px bg-amber-500" />

                <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold">
                  Send a Message
                </p>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-green-950 leading-tight">
                Let&apos;s Start a
                <span className="block text-amber-600">
                  Conversation
                </span>
              </h2>

              <p className="text-stone-600 mt-6 leading-relaxed max-w-lg">
                Have a question, need more information, or would like to
                connect with our ministry? Fill out the form and let us know
                how we can serve you.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-green-950 flex items-center justify-center">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-950">
                      We Listen
                    </h3>

                    <p className="text-sm text-stone-500 mt-1">
                      Your questions and concerns matter to us.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-green-950 flex items-center justify-center">
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
                        d="M12 3v18M3 12h18"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-950">
                      We Pray
                    </h3>

                    <p className="text-sm text-stone-500 mt-1">
                      We are committed to standing with you in prayer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-stone-50 rounded-3xl p-7 md:p-10 border border-stone-200 shadow-lg">
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-green-950 mb-2"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-green-950 mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-green-950 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-green-950 mb-2"
                  >
                    What Can We Help You With?
                  </label>

                  <select
                    id="subject"
                    defaultValue=""
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>

                    <option value="general">
                      General Enquiry
                    </option>

                    <option value="prayer">
                      Prayer Request
                    </option>

                    <option value="ministry">
                      Ministry Enquiry
                    </option>

                    <option value="event">
                      Event Enquiry
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-green-950 mb-2"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none resize-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-950 text-stone-50 py-4 px-6 rounded-xl font-semibold hover:bg-green-900 hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Send Message

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
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRAYER SECTION
      ====================================================== */}
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

      {/* =====================================================
          LOCATION
      ====================================================== */}
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
            {/* ADDRESS */}
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
              >
  
</iframe>
            </div>

            {/* MAP */}
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

                <p
                  className="inline-flex items-center gap-2 mt-6 text-amber-500 font-semibold hover:text-amber-400 transition-colors"
                >
                  <span>←</span>
                  That is the map at the left
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL MEDIA
      ====================================================== */}
      <section className="bg-white py-20 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-amber-600 font-semibold mb-4">
            Stay Connected
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-green-950">
            Connect With Us Online
          </h2>

          <p className="text-stone-600 mt-5 leading-relaxed">
            Stay connected with Salvation to All Nations Ministry for
            messages, events, ministry updates, and other moments from our
            fellowship.
          </p>

          <div className="flex justify-center items-center gap-4 mt-9">
            {/* FACEBOOK */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-12 h-12 rounded-full bg-green-950 text-stone-50 flex items-center justify-center hover:bg-amber-500 hover:text-green-950 hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.5 21v-8h2.75l.41-3h-3.16V8.08c0-.87.24-1.46 1.49-1.46h1.59V3.94c-.28-.04-1.25-.12-2.38-.12-2.35 0-3.96 1.43-3.96 4.05V10H7.5v3h2.74v8h3.26z" />
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-12 h-12 rounded-full bg-green-950 text-stone-50 flex items-center justify-center hover:bg-amber-500 hover:text-green-950 hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* YOUTUBE */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-12 h-12 rounded-full bg-green-950 text-stone-50 flex items-center justify-center hover:bg-amber-500 hover:text-green-950 hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING SCRIPTURE
      ====================================================== */}
      <section className="bg-green-950 py-20 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-100 leading-relaxed italic">
            “Encourage one another and build each other up.”
          </blockquote>

          <p className="text-amber-500 text-xs md:text-sm uppercase tracking-[0.2em] mt-6 font-semibold">
            1 Thessalonians 5:11
          </p>

          <p className="text-stone-400 mt-6 leading-relaxed">
            Thank you for reaching out to Salvation to All Nations Ministry.
            We look forward to connecting with you and walking alongside you
            in faith.
          </p>

          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />
        </div>
      </section>

      <Footer />
    </>
  );
}