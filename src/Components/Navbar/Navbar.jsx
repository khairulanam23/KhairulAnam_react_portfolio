import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Home from "../Home/Home";

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

    // Update CSS variables for global theme access
    document.documentElement.style.setProperty(
      "--primary-color",
      isDarkMode ? "#a855f7" : "#22c55e"
    );
    document.documentElement.style.setProperty(
      "--primary-light",
      isDarkMode ? "#c084fc" : "#4ade80"
    );
    document.documentElement.style.setProperty(
      "--primary-dark",
      isDarkMode ? "#7e22ce" : "#15803d"
    );
    document.documentElement.style.setProperty(
      "--bg-color",
      isDarkMode ? "#1e1b4b" : "#CCFFCC"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#e9d5ff" : "#166534"
    );
    document.body.style.backgroundColor = isDarkMode ? "#1e1b4b" : "#CCFFCC";
    document.body.style.color = isDarkMode ? "#e9d5ff" : "#166534";
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
    { name: "Home", href: "/home" },
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
            ? "bg-purple-900/60 backdrop-blur-md shadow-lg shadow-purple-500/20"
            : "bg-green-200/60 backdrop-blur-md shadow-lg shadow-green-500/20"
          : isDarkMode
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isScrolled ? "" : "mt-5"
        }`}
      >
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span
              className={`font-bold text-3xl hover:text-4xl tracking-tight transition-all duration-500 ${
                isDarkMode
                  ? "text-purple-300 hover:text-red-500"
                  : "text-green-600 hover:text-blue-700"
              }`}
            >
              <span className="inline-block animate-bounce ">Khairul Anam</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={`px-3 py-2 rounded-md text-md font-medium transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? "text-purple-200 hover:text-red-500 hover:bg-purple-300"
                    : "text-green-700 hover:text-blue-900 hover:bg-green-100"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-3 p-2 rounded-full transition-all duration-500 transform hover:scale-110 hover:animate-pulse focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "bg-purple-700 hover:bg-purple-600 focus:ring-purple-400 text-purple-100"
                  : "bg-green-200 hover:bg-green-300 focus:ring-green-400 text-green-800"
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              ) : null}
            </button>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href =
                  "https://drive.google.com/file/d/1AewVXgJljlpH8V5W66kFpDL3cQb613yq/view?usp=sharing"; // Replace with your actual PDF link
                link.download = "Resume.pdf"; // The name of the downloaded file
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className={`ml-4 px-4 py-2 rounded-md text-md font-medium transition-all duration-300 transform hover:scale-125 hover:shadow-lg ${
                isDarkMode
                  ? "bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/50"
                  : "bg-green-500 hover:bg-green-400 text-white shadow-green-500/50"
              }`}
            >
              Resume
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-500 transform hover:scale-110 ${
                isDarkMode
                  ? "bg-purple-700 text-purple-100"
                  : "bg-green-200 text-green-800"
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
                  ></path>
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
                  ></path>
                </svg>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300 ${
                isDarkMode ? "text-purple-200" : "text-green-700"
              }`}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-purple-200" : "bg-green-700"
                  } ${isOpen ? "rotate-45 translate-y-2" : "translate-y-0"}`}
                />
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-purple-200" : "bg-green-700"
                  } ${isOpen ? "opacity-0" : "opacity-100"} top-2`}
                />
                <span
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
                    isDarkMode ? "bg-purple-200" : "bg-green-700"
                  } ${isOpen ? "-rotate-45 translate-y-2" : "translate-y-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, animated slide down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          isDarkMode
            ? "bg-purple-900/95 backdrop-blur-md"
            : "bg-green-50/95 backdrop-blur-md"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform ${
                isDarkMode
                  ? "text-purple-200 hover:text-white hover:bg-purple-800 hover:translate-x-2"
                  : "text-green-700 hover:text-green-900 hover:bg-green-100 hover:translate-x-2"
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
            className={`w-full mt-3 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-purple-500 hover:bg-purple-400 text-white"
                : "bg-green-500 hover:bg-green-400 text-white"
            }`}
          >
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;