import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Giving", href: "/giving" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Adds a subtle shadow/background once the user scrolls, so the navbar
  // doesn't look flat when it's sitting over hero content
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("Navbar isScrolled:", isScrolled);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-transparent"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 group">
          {/* Swap this for the ministry's actual logo once available */}
          <span className="self-center text-xl text-green-800 font-semibold whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
            Salvation To All Nations
          </span>
        </a>

        {/* Animated hamburger -> X */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-transform duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-gray-700 rounded transition-transform duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile menu: animated height/opacity instead of an instant show/hide */}
        <div
          className={`w-full md:flex md:w-auto overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-0"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-800 md:p-0 transition-colors duration-200
                    after:content-[''] after:absolute after:left-3 after:right-3 md:after:left-0 md:after:right-0 after:bottom-0 after:h-0.5 after:bg-green-700
                    after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}