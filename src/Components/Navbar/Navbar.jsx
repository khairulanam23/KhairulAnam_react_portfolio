import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  // Check for user's preferred theme or saved preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // If no saved preference, check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Apply theme to entire document whenever theme changes
  useEffect(() => {
    // Apply theme class to html element (for Tailwind dark mode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Water theme colors - inspired by the image
    const lightPrimary = "#39B7FF";
    const lightSecondary = "#74D0FF";
    const lightBg = "#E8F7FF";
    const lightText = "#0F4C75";

    const darkPrimary = "#1E90FF";
    const darkSecondary = "#0078D7";
    const darkBg = "#0A1929";
    const darkText = "#E8F7FF";

    // Update CSS variables for global theme access
    document.documentElement.style.setProperty(
      "--primary-color",
      isDarkMode ? darkPrimary : lightPrimary
    );
    document.documentElement.style.setProperty(
      "--primary-light",
      isDarkMode ? darkSecondary : lightSecondary
    );
    document.documentElement.style.setProperty(
      "--primary-dark",
      isDarkMode ? "#0062B1" : "#0098E3"
    );
    document.documentElement.style.setProperty(
      "--bg-color",
      isDarkMode ? darkBg : lightBg
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? darkText : lightText
    );
    document.documentElement.style.setProperty(
      "--font-color",
      isDarkMode ? darkText : lightText
    );
    document.body.style.backgroundColor = isDarkMode ? darkBg : lightBg;
    document.body.style.color = isDarkMode ? darkText : lightText;
    document.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";
  }, [isDarkMode]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? isDarkMode
            ? "bg-blue-900/80 backdrop-blur-md shadow-lg shadow-blue-500/20"
            : "bg-blue-100/80 backdrop-blur-md shadow-lg shadow-blue-300/30"
          : isDarkMode
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div
              className={`flex items-center font-bold text-2xl transition-all duration-300 ${
                isDarkMode
                  ? "text-blue-300 hover:text-blue-200"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline-block">Khairul Anam</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "text-blue-200 hover:text-white hover:bg-blue-800/50"
                    : "text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                }`}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-3 p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-blue-800 hover:bg-blue-700 focus:ring-blue-500 text-blue-100"
                  : "bg-blue-100 hover:bg-blue-200 focus:ring-blue-300 text-blue-600"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            
            {/* Resume Button */}
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href =
                  "https://drive.google.com/file/d/1CdqAMUKVus0g03cOEc1oDXLiCA0yf-Xo/view?usp=sharing";
                link.download = "Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className={`ml-4 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-400/30"
              }`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Resume
              </span>
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-blue-800 text-blue-100"
                  : "bg-blue-100 text-blue-600"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-300 ${
                isDarkMode ? "text-blue-200" : "text-blue-700"
              }`}
              aria-expanded={isOpen}
              aria-label="Main menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-blue-200" : "bg-blue-600"
                  } ${isOpen ? "rotate-45 translate-y-2" : "translate-y-0"}`}
                />
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-blue-200" : "bg-blue-600"
                  } ${isOpen ? "opacity-0" : "opacity-100"} top-2`}
                />
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-blue-200" : "bg-blue-600"
                  } ${isOpen ? "-rotate-45 translate-y-2" : "translate-y-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, animated slide down and fade */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          isDarkMode
            ? "bg-blue-900/90 backdrop-blur-md"
            : "bg-blue-50/90 backdrop-blur-md"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isDarkMode
                  ? "text-blue-200 hover:text-white hover:bg-blue-800/50"
                  : "text-blue-700 hover:text-blue-900 hover:bg-blue-100"
              }`}
              onClick={() => setIsOpen(false)}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isOpen ? 1 : 0,
                transition: `opacity 500ms ease ${
                  index * 100
                }ms, transform 300ms ease`,
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href =
                "https://drive.google.com/file/d/1CdqAMUKVus0g03cOEc1oDXLiCA0yf-Xo/view?usp=sharing";
              link.download = "Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setIsOpen(false);
            }}
            className={`w-full mt-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-center ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;