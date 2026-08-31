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
        className="relative pt-32 pb-24 px-6 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${contact})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-950/75" />

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-5 animate-[fadeIn_0.8s_ease-out]">
            Get In Touch
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight">
            We’re Here to
            <span className="block text-amber-500 mt-2">
              Connect With You
            </span>
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Whether you have a question, need prayer, or simply want to
            connect with us, we would love to hear from you.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-screen-xl mx-auto">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
              Reach Out to Us
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-green-950">
              We’d Love to Hear From You
            </h2>

            <p className="text-stone-600 mt-5 leading-relaxed">
              Have a question, need assistance, or want to learn more about
              our ministry? Get in touch with us through any of the channels
              below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* =================================================
                LOCATION
            ================================================== */}
            <div className="group bg-white rounded-2xl p-7 shadow-lg border border-stone-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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

            {/* =================================================
                PHONE
            ================================================== */}
            <div className="group bg-white rounded-2xl p-7 shadow-lg border border-stone-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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

            {/* =================================================
                EMAIL
            ================================================== */}
            <div className="group bg-white rounded-2xl p-7 shadow-lg border border-stone-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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

            {/* =================================================
                SERVICE TIMES
            ================================================== */}
            <div className="group bg-white rounded-2xl p-7 shadow-lg border border-stone-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">

              <div className="w-14 h-14 mx-auto rounded-full bg-green-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-7 h-7 text-amber-500"
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

              <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold mt-6 text-center">
                Worship With Us
              </p>

              <h3 className="text-green-950 font-serif text-xl mt-2 text-center">
                Service Times
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Sunday Worship
                  </span>

                  <span className="text-green-950 font-medium whitespace-nowrap">
                    9:00 AM
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Wednesday Bible Study
                  </span>

                  <span className="text-green-950 font-medium whitespace-nowrap">
                    6:30 PM
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">
                    Friday Prayer Night
                  </span>

                  <span className="text-green-950 font-medium whitespace-nowrap">
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
      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Content */}
            <div>

              <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
                Send Us a Message
              </p>

              <h2 className="font-serif text-3xl md:text-4xl text-green-950 leading-tight">
                Let’s Start a Conversation
              </h2>

              <p className="text-stone-600 mt-5 leading-relaxed max-w-lg">
                We believe every conversation matters. If you have a question,
                need information about our ministry, or simply want to reach
                out, send us a message and our team will get back to you.
              </p>

              {/* Highlight Box */}
              <div className="mt-8 bg-green-950 rounded-2xl p-7 md:p-8">

                <div className="w-12 h-px bg-amber-500 mb-6" />

                <h3 className="font-serif text-2xl text-stone-50">
                  You Are Welcome Here
                </h3>

                <p className="text-stone-400 mt-3 leading-relaxed">
                  Whether you are visiting for the first time or you have been
                  part of our ministry for years, we are always glad to connect
                  with you.
                </p>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-stone-50 rounded-2xl p-7 md:p-10 border border-stone-200 shadow-lg">

              <form className="space-y-5">

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-green-950 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-green-950 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-green-950 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-green-950 mb-2"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    defaultValue=""
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  >
                    <option value="" disabled>
                      Select a subject
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

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-green-950 mb-2"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-950 text-stone-50 py-3.5 px-6 rounded-xl font-semibold hover:bg-green-900 hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PRAYER / PASTORAL SUPPORT
      ====================================================== */}
      <section className="bg-green-950 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <p className="text-sm tracking-[0.2em] uppercase text-amber-500 font-semibold mb-4">
            Prayer & Support
          </p>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-50">
            Need Prayer?
          </h2>

          <p className="text-stone-400 max-w-2xl mx-auto mt-5 leading-relaxed">
            You don't have to walk through it alone. Share your prayer request
            with us, and our team will stand with you in prayer.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex items-center justify-center bg-amber-500 text-green-950 px-7 py-3.5 rounded-xl font-semibold hover:bg-amber-400 hover:-translate-y-0.5 shadow-lg transition-all duration-300"
          >
            Submit a Prayer Request
          </button>

          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />

        </div>
      </section>

      {/* =====================================================
          FIND US / MAP
      ====================================================== */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-screen-xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
              Find Us
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-green-950">
              Come Worship With Us
            </h2>

            <p className="text-stone-600 mt-5 leading-relaxed">
              We would be delighted to welcome you into our fellowship. Come
              and worship, connect, and grow with us.
            </p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Address */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-stone-200">

              <p className="text-amber-600 text-sm uppercase tracking-wider font-semibold">
                Our Address
              </p>

              <h3 className="font-serif text-2xl text-green-950 mt-2">
                Salvation to All Nations Ministry
              </h3>

              <p className="text-stone-500 mt-4 leading-relaxed">
                Barekese
                <br />
                Ghana
              </p>

              <a
                href="#"
                className="inline-flex items-center mt-7 bg-green-950 text-stone-50 px-6 py-3 rounded-xl font-semibold hover:bg-green-900 transition-colors duration-300"
              >
                Get Directions
              </a>

            </div>

            {/* Map Placeholder */}
            <div className="bg-green-950 rounded-2xl min-h-[300px] flex items-center justify-center overflow-hidden">

              <div className="text-center px-6">

                <div className="w-14 h-14 mx-auto rounded-full bg-amber-500 flex items-center justify-center">

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

                <h3 className="font-serif text-2xl text-stone-50 mt-5">
                  Find Us on the Map
                </h3>

                <p className="text-stone-400 mt-2">
                  Google Maps location will appear here.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL MEDIA
      ====================================================== */}
      <section className="bg-white py-20 px-6">

        <div className="max-w-3xl mx-auto text-center">

          <p className="text-sm tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
            Stay Connected
          </p>

          <h2 className="font-serif text-3xl md:text-4xl text-green-950">
            Connect With Us Online
          </h2>

          <p className="text-stone-600 mt-5 leading-relaxed">
            Follow Salvation to All Nations Ministry on social media and stay
            connected with our latest messages, events, updates, and ministry
            activities.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center items-center gap-4 mt-8">

            {/* Facebook */}
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

            {/* Instagram */}
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

            {/* YouTube */}
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
      <section className="bg-green-950 py-20 px-6">

        <div className="max-w-3xl mx-auto text-center">

          <div className="w-12 h-px bg-amber-500 mx-auto mb-8" />

          <blockquote className="font-serif text-2xl md:text-3xl text-stone-100 leading-relaxed italic">
            “Encourage one another and build each other up.”
          </blockquote>

          <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mt-5">
            1 Thessalonians 5:11
          </p>

          <p className="text-stone-400 mt-6 leading-relaxed">
            Thank you for reaching out to Salvation to All Nations Ministry.
            We look forward to connecting with you.
          </p>

          <div className="w-12 h-px bg-amber-500 mx-auto mt-8" />

        </div>

      </section>

      <Footer />
    </>
  );
}

