import { useState } from "react";

export default function ContactForm() {
      const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "93b8f36f-c72b-4877-968a-fa51efca540c", 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.subject || "General Enquiry",
          message: formData.message,
          from_name: "Salvation to All Nations Site",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: err.message || "Something went wrong. Please try again.",
      });
    }
  };
 return (
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {status.success && (
                  <div className="p-4 rounded-xl bg-green-100 border border-green-300 text-green-900 text-sm font-medium">
                    {status.message}
                  </div>
                )}

                {status.error && (
                  <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-900 text-sm font-medium">
                    {status.message}
                  </div>
                )}

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
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                      required
                      value={formData.email}
                      onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Prayer Request">Prayer Request</option>
                    <option value="Ministry Enquiry">Ministry Enquiry</option>
                    <option value="Event Enquiry">Event Enquiry</option>
                    <option value="Other">Other</option>
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
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none resize-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full flex items-center justify-center gap-2 bg-green-950 text-stone-50 py-4 px-6 rounded-xl font-semibold hover:bg-green-900 hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.submitting ? "Sending..." : "Send Message"}

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
 )
}