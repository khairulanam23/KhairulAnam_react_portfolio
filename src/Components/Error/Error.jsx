import { useRouteError } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Error() {
  const error = useRouteError();
  console.error(error);

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
      isDarkMode ? "#1e1b4b" : "#f0fdf4"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#e9d5ff" : "#166534"
    );

    // You could also set background color of body directly for immediate effect
    document.body.style.backgroundColor = isDarkMode ? "#1e1b4b" : "#f0fdf4";
    document.body.style.color = isDarkMode ? "#e9d5ff" : "#166534";
    document.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";
  }, [isDarkMode]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: isDarkMode
          ? "url('https://unsplash.com/photos/a-dark-mystical-forest-OA0qcP6GOw0')"
          : "url('https://unsplash.com/photos/a-bright-sunny-field-OA0qcP6GOw0')",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-md mx-auto text-center bg-opacity-90 p-8 rounded-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundColor: isDarkMode ? "#1e1b4b" : "#f0fdf4",
          color: isDarkMode ? "#e9d5ff" : "#166534",
        }}
      >
        <motion.div
          className="text-9xl font-bold mb-4"
          style={{ color: isDarkMode ? "#a855f7" : "#22c55e" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="glitch">404</span>
        </motion.div>
        <h1 className="text-4xl font-bold mb-6">Oops! Page Not Found</h1>
        <motion.p
          className="text-lg mb-8"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          The page you are looking for seems to have gone on a little adventure.
          Don't worry, we'll help you find your way back home.
        </motion.p>
        <motion.a
          href="/"
          className="inline-block font-semibold px-6 py-3 rounded-md transition-colors duration-300"
          style={{
            backgroundColor: isDarkMode ? "#a855f7" : "#22c55e",
            color: "white",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
          }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
