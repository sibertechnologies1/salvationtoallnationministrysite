import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Giving", href: "/giving" },
  { label: "Contact", href: "/contact" },
];

// TODO: replace with the ministry's real service times before launch
const serviceTimes = [
  "Sunday Worship — 9:00 AM",
  "Wednesday Bible Study — 6:30 PM",
  "Friday Prayer Night — 7:00 PM",
];

// TODO: replace with the ministry's real contact details before launch
const contactDetails = [
  "Barekese, Kumasi",
  "+233 50 215 6703",
  "info@salvationtoallnations.org",
];

// Swap "#" for the ministry's real social links once they have them
const socialLinks = [
  { label: "Facebook", href: "#", icon: <FaFacebook />, title: 'facebook' },
  { label: "Instagram", href: "#", icon: <FaInstagram /> , title: 'instagram' },
  { label: "YouTube", href: "#", icon: <FaYoutube />, title: 'youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1A13] px-6 md:px-16 pt-16 md:pt-20 pb-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap gap-12 md:gap-8 justify-between pb-14 border-b border-stone-50/10">
          {/* Ministry name + tagline + socials */}
          <div className="w-full md:w-auto md:max-w-xs">
            <div className="font-serif text-xl text-stone-50 mb-4">
              Salvation To All Nations Ministry
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              A family gathered from every nation, walking together in
              faith, worship, and service to Christ.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-stone-50/[0.08] flex items-center justify-center text-amber-500 text-xs font-semibold hover:bg-stone-50/[0.15] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs tracking-wider uppercase text-amber-500 font-bold mb-5">
              Quick Links
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-300 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <div className="text-xs tracking-wider uppercase text-amber-500 font-bold mb-5">
              Service Times
            </div>
            <ul className="space-y-3">
              {serviceTimes.map((time) => (
                <li key={time} className="text-sm text-stone-300">
                  {time}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-wider uppercase text-amber-500 font-bold mb-5">
              Contact
            </div>
            <ul className="space-y-3">
              {contactDetails.map((detail) => (
                <li key={detail} className="text-sm text-stone-300">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Salvation To All Nations. All
            rights reserved.
          </p>
          <p>
            Website by{" "}
            <a
              href="#"
              className="text-stone-400 hover:text-amber-500 transition-colors"
            >
              Ebenezer Boadzie Tiroug
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}