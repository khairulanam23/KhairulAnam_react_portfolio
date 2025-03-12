import React from "react";
import { motion } from "framer-motion";
import { Send, Code } from "lucide-react";
import { FaTrophy, FaGraduationCap, FaAward } from "react-icons/fa";

const ThemedWaveAnimation = ({ isDarkMode }) => {
  // Generate multiple wave paths with varying frequencies and amplitudes
  const generateWavePath = (baseY, amplitude, frequency) => {
    let path = `M0,${baseY} `;

    for (let i = 0; i <= 1200; i += 20) {
      const y = baseY + Math.sin(i * frequency) * amplitude;
      path += `L${i},${y} `;
    }

    path += "L1200,120 L0,120 Z";
    return path;
  };

  // Generate an array of wave configurations
  const waves = Array.from({ length: 15 }, (_, i) => ({
    baseY: 40 + i * 5,
    amplitude: 5 + i * 0.8,
    frequency: 0.01 + i * 0.002,
    duration: 20 + i * 0.5,
    delay: i * 0.2,
    opacity: 0.05 + i * 0.02,
  }));

  // Get the primary color based on the theme
  const getWaveColor = (index, totalWaves) => {
    // For dark mode: gradient from primary-light to a slightly darker shade
    // For light mode: gradient from primary-color to a slightly lighter shade
    if (isDarkMode) {
      return `var(--primary-light)`;
    } else {
      return `var(--primary-color)`;
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: "var(--bg-color)" }} // Use theme background color
    >
      {waves.map((wave, index) => (
        <motion.div
          key={index}
          className="absolute w-full h-full"
          style={{
            y: 0,
            zIndex: -1,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <motion.path
              d={generateWavePath(wave.baseY, wave.amplitude, wave.frequency)}
              fill="transparent"
              stroke={getWaveColor(index, waves.length)}
              strokeWidth="1"
              strokeOpacity={wave.opacity}
              initial={{ x: "-5%" }}
              animate={{
                x: ["0%", "5%", "0%", "-5%", "0%"],
              }}
              transition={{
                duration: wave.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: wave.delay,
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Home = ({ isDarkMode }) => {
  return (
    <>
      <div
        className="min-h-screen flex items-center relative"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          overflow: "hidden",
        }}
      >
        <ThemedWaveAnimation isDarkMode={isDarkMode} />

        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl font-medium"
              style={{
                color: isDarkMode
                  ? "var(--primary-light)"
                  : "var(--primary-color)",
              }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold"
              style={{ color: "var(--primary-color)" }}
            >
              Mohammad Khairul Anam
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-semibold"
              style={{
                color: isDarkMode
                  ? "var(--primary-light)"
                  : "var(--primary-dark)",
              }}
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg leading-relaxed text-justify"
            >
              I specialize in building scalable and high-performance web
              applications using the MERN stack. With a passion for creating
              impactful user experiences, I deliver innovative solutions to
              complex challenges.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8"
            >
              <a
                href="/projects"
                className="font-bold inline-flex items-center justify-center gap-2 px-6 py-3 
                rounded-lg 
                shadow-lg
                hover:shadow-xl
                transition duration-300 
                transform hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <Code className="w-5 h-5" />
                View My Work
              </a>
              <a
                href="/contact"
                className="font-bold inline-flex items-center justify-center gap-2 px-6 py-3 
                rounded-lg 
                shadow-md
                hover:shadow-lg
                transition duration-300 
                transform hover:-translate-y-1"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(168, 85, 247, 0.2)"
                    : "rgba(34, 197, 94, 0.2)",
                  color: "var(--primary-color)",
                }}
              >
                <Send className="w-5 h-5" />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end items-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full opacity-75 blur-xl animate-pulse"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(168, 85, 247, 0.5)"
                    : "rgba(34, 197, 94, 0.5)",
                }}
              ></div>
              <img
                src="https://i.ibb.co.com/ZJtWmG6/277778447-3181088082162951-5751592929606037984-n.jpg"
                alt="Mohammad Khairul Anam"
                className="relative w-64 h-64 md:w-[20rem] md:h-[20rem] lg:w-[28rem] lg:h-[28rem] object-cover rounded-full
                border-4 
                hover:scale-105 transition duration-300"
                style={{
                  borderColor: isDarkMode
                    ? "var(--primary-light)"
                    : "var(--primary-color)",
                  boxShadow: isDarkMode
                    ? "0 0 20px rgba(168, 85, 247, 0.3)"
                    : "0 0 20px rgba(34, 197, 94, 0.3)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;