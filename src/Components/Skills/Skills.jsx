import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaCss3Alt,
  FaCodeBranch,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiRedux } from "react-icons/si";

const SkillsCarousel = ({ isDarkMode }) => {
  const skills = [
    {
      icon: <FaJs />,
      title: "JavaScript & TypeScript",
      description:
        "Proficient in modern JavaScript and TypeScript, building interactive and dynamic web applications with strong type safety and scalable architecture.",
      proficiency: 90,
    },
    {
      icon: <FaReact />,
      title: "React.js",
      description:
        "Experienced in developing responsive and interactive user interfaces using React.js, with expertise in hooks, context API, and state management.",
      proficiency: 85,
    },
    {
      icon: <FaNodeJs />,
      title: "Node.js & Express",
      description:
        "Building robust server-side applications and RESTful APIs using Node.js and Express framework for efficient back-end development.",
      proficiency: 80,
    },
    {
      icon: <FaDatabase />,
      title: "MongoDB & MySQL",
      description:
        "Working with both SQL and NoSQL databases to design efficient data models and implement database operations for web applications.",
      proficiency: 75,
    },
    {
      icon: <FaPython />,
      title: "Python",
      description:
        "Proficient in Python programming for web development with Flask, along with experience in data processing and automation scripts.",
      proficiency: 70,
    },
    {
      icon: <FaCss3Alt />,
      title: "Tailwind CSS",
      description:
        "Creating responsive and modern user interfaces with Tailwind CSS and DaisyUI for efficient and consistent styling across applications.",
      proficiency: 85,
    },
    {
      icon: <FaCodeBranch />,
      title: "Git & Version Control",
      description:
        "Experienced in Git workflow, collaborating with teams using version control best practices for efficient code management.",
      proficiency: 90,
    },
    {
      icon: <FaFire />,
      title: "Firebase",
      description:
        "Implementing authentication, real-time databases, and cloud functions using Firebase for seamless user experiences.",
      proficiency: 75,
    },
    {
      icon: <SiRedux />,
      title: "Redux",
      description:
        "Experienced in managing complex state in React applications using Redux for predictable state management and enhanced scalability.",
      proficiency: 80,
    },
    {
      icon: <RiNextjsLine />,
      title: "Next.js",
      description:
        "Building server-side rendered and static websites with Next.js, leveraging its powerful features like file-based routing and server-side rendering.",
      proficiency: 80,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState("lg");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Define skill categories
  const skillCategories = {
    Frontend: [
      "JavaScript & TypeScript",
      "React.js",
      "Tailwind CSS",
      "Redux",
      "Next.js",
    ],
    Backend: ["Node.js & Express", "MongoDB & MySQL", "Firebase", "Python"],
    Tools: ["Git & Version Control"],
    Languages: ["JavaScript & TypeScript", "Python"],
  };

  // Filter skills based on the active filter
  const filteredSkills =
    activeFilter === "All"
      ? skills
      : skills.filter((skill) =>
          skillCategories[activeFilter].includes(skill.title)
        );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const play = () => {
      if (!isPaused) {
        nextSlide();
      }
    };
    autoPlayRef.current = play;
  }, [currentIndex, isPaused, filteredSkills.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current && !isAnimating) {
        autoPlayRef.current();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Reset currentIndex when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Clean up any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating || filteredSkills.length <= 1) return;

    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSkills.length);

    // Delay to allow animation to complete
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating || filteredSkills.length <= 1) return;

    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredSkills.length) % filteredSkills.length
    );

    // Delay to allow animation to complete
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    setIsAnimating(true);
    setActiveFilter(filter);

    // Delay to allow animation to complete
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const getVisibleCount = () => {
    if (screenSize === "sm") return 1;
    if (screenSize === "md") return 2;
    return 3;
  };

  const getVisibleSkills = () => {
    const count = getVisibleCount();
    const result = [];

    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % filteredSkills.length;
      result.push({
        ...filteredSkills[index],
        index,
      });
    }

    return result;
  };

  const visibleSkills = getVisibleSkills();

  // Water-themed colors
  const accentColor = isDarkMode ? "#1E90FF" : "#39B7FF";
  const textColor = isDarkMode ? "#E8F7FF" : "#0F4C75";
  const secondaryTextColor = isDarkMode ? "#A7D8FF" : "#3A7CA5";
  const cardBgColor = isDarkMode ? "#0D2137" : "#FFFFFF";

  // Animation variants for the card
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
      },
    }),
  };

  // Water-themed progress bar component with wave effect
  const ProgressBar = ({ value }) => (
    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${accentColor} 0%, ${
            isDarkMode ? "#39B7FF" : "#74D0FF"
          } 100%)`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Add subtle wave effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' width='100' height='8' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4 V 8 H 0 Z' fill='%23FFFFFF' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 8px",
            animation: "wave 2s linear infinite",
          }}
        />
      </motion.div>
    </div>
  );

  // Animation for filter buttons
  const filterButtonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: isDarkMode
        ? "rgba(30, 144, 255, 0.2)"
        : "rgba(57, 183, 255, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      backgroundColor: isDarkMode
        ? "rgba(30, 144, 255, 0.3)"
        : "rgba(57, 183, 255, 0.3)",
      transition: {
        duration: 0.1,
      },
    },
    active: {
      backgroundColor: isDarkMode
        ? "rgba(30, 144, 255, 0.4)"
        : "rgba(57, 183, 255, 0.4)",
      borderColor: accentColor,
      color: accentColor,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Navigation button animations
  const navButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: isDarkMode
        ? "rgba(30, 144, 255, 0.2)"
        : "rgba(57, 183, 255, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
      backgroundColor: isDarkMode
        ? "rgba(30, 144, 255, 0.3)"
        : "rgba(57, 183, 255, 0.3)",
      transition: {
        duration: 0.1,
      },
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

  // Category filter buttons
  const renderFilterButtons = () => {
    const filters = ["All", ...Object.keys(skillCategories)];
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === filter
                ? `border-${accentColor.replace(
                    "#",
                    ""
                  )} text-${accentColor.replace("#", "")}`
                : "border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => handleFilterChange(filter)}
            variants={filterButtonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={activeFilter === filter ? "active" : {}}
            disabled={isAnimating}
            style={{
              borderColor: activeFilter === filter ? accentColor : "",
              color: activeFilter === filter ? accentColor : textColor,
            }}
          >
            {filter}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4" style={{ color: textColor }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl font-bold mb-3"
            style={{ color: accentColor }}
          >
            My Skills
          </h2>
          <p className="text-xl mb-4">What I bring to the table</p>

          {/* Water droplet divider */}
          <div className="flex justify-center items-center mb-6">
            <div
              className="w-16 h-1 mx-2 rounded-full"
              style={{ backgroundColor: `${accentColor}40` }}
            ></div>
            <div className="relative">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={accentColor}
              >
                <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
              </svg>
              <div
                className="absolute inset-0 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                }}
              ></div>
            </div>
            <div
              className="w-16 h-1 mx-2 rounded-full"
              style={{ backgroundColor: `${accentColor}40` }}
            ></div>
          </div>
        </motion.div>

        {/* Use the renderFilterButtons function instead of duplicating code */}
        {renderFilterButtons()}

        {/* Skills cards container */}
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden py-4">
            <div className="flex gap-6 mx-auto justify-center flex-wrap">
              <AnimatePresence mode="wait">
                {visibleSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.index}
                    className="w-full sm:w-64 md:w-80 lg:w-96 rounded-xl overflow-hidden shadow-lg"
                    style={{
                      backgroundColor: cardBgColor,
                      border: `1px solid ${
                        isDarkMode
                          ? "rgba(57, 183, 255, 0.2)"
                          : "rgba(57, 183, 255, 0.1)"
                      }`,
                      boxShadow: `0 10px 25px -5px ${accentColor}20`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {/* Card header with wave pattern background */}
                    <div
                      className="relative p-4 overflow-hidden"
                      style={{
                        background: `linear-gradient(180deg, ${accentColor}20 0%, ${accentColor}05 100%)`,
                      }}
                    >
                      {/* Subtle wave background */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 20 5, 40 20 T 80 20 T 120 20 T 160 20 T 200 20' stroke='${accentColor.replace(
                            "#",
                            "%23"
                          )}' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
                          backgroundSize: "200px 40px",
                          backgroundPosition: "center",
                        }}
                      />

                      <div className="flex justify-between items-center relative z-10">
                        <div
                          className="w-16 h-16 flex items-center justify-center rounded-full text-2xl"
                          style={{
                            backgroundColor: isDarkMode ? "#0F2942" : "#FFFFFF",
                            color: accentColor,
                            boxShadow: `0 4px 15px -2px ${accentColor}40`,
                          }}
                        >
                          {skill.icon}
                        </div>
                        <div
                          className="text-sm font-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: accentColor,
                            color: "#FFFFFF",
                          }}
                        >
                          {skill.proficiency}% proficiency
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: isDarkMode ? accentColor : "#0F4C75" }}
                      >
                        {skill.title}
                      </h3>
                      <p
                        className="mb-4 text-sm"
                        style={{ color: secondaryTextColor }}
                      >
                        {skill.description}
                      </p>

                      {/* Proficiency bar */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="text-xs font-medium"
                            style={{ color: secondaryTextColor }}
                          >
                            Proficiency
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: accentColor }}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>
                        <ProgressBar value={skill.proficiency} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation arrows */}
          {filteredSkills.length > getVisibleCount() && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(30, 144, 255, 0.1)"
                    : "rgba(57, 183, 255, 0.1)",
                  color: accentColor,
                }}
                aria-label="Previous slide"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(30, 144, 255, 0.1)"
                    : "rgba(57, 183, 255, 0.1)",
                  color: accentColor,
                }}
                aria-label="Next slide"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Skills overview section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10"
          >
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: accentColor }}
            >
              Skills Overview
            </h3>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: accentColor }}
            ></div>
          </motion.div>

          {/* Skills overview categories with water-themed graphics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDarkMode ? "#0D2137" : "#FFFFFF",
                boxShadow: `0 10px 25px -5px ${accentColor}20`,
                border: `1px solid ${
                  isDarkMode
                    ? "rgba(57, 183, 255, 0.2)"
                    : "rgba(57, 183, 255, 0.1)"
                }`,
              }}
            >
              <div className="relative h-20 w-20 mx-auto mb-4">
                {/* Water drop with FE icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                  fill={accentColor}
                >
                  <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <FaReact size={28} />
                </div>
              </div>
              <h4
                className="text-lg font-bold mb-3 text-center"
                style={{ color: isDarkMode ? "#FFFFFF" : "#0F4C75" }}
              >
                Frontend Development
              </h4>
              <ul className="space-y-2">
                {skillCategories.Frontend.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDarkMode ? "#0D2137" : "#FFFFFF",
                boxShadow: `0 10px 25px -5px ${accentColor}20`,
                border: `1px solid ${
                  isDarkMode
                    ? "rgba(57, 183, 255, 0.2)"
                    : "rgba(57, 183, 255, 0.1)"
                }`,
              }}
            >
              <div className="relative h-20 w-20 mx-auto mb-4">
                {/* Water drop with BE icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                  fill={accentColor}
                >
                  <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <FaNodeJs size={28} />
                </div>
              </div>
              <h4
                className="text-lg font-bold mb-3 text-center"
                style={{ color: isDarkMode ? "#FFFFFF" : "#0F4C75" }}
              >
                Backend Development
              </h4>
              <ul className="space-y-2">
                {skillCategories.Backend.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDarkMode ? "#0D2137" : "#FFFFFF",
                boxShadow: `0 10px 25px -5px ${accentColor}20`,
                border: `1px solid ${
                  isDarkMode
                    ? "rgba(57, 183, 255, 0.2)"
                    : "rgba(57, 183, 255, 0.1)"
                }`,
              }}
            >
              <div className="relative h-20 w-20 mx-auto mb-4">
                {/* Water drop with tools icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                  fill={accentColor}
                >
                  <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <FaCodeBranch size={28} />
                </div>
              </div>
              <h4
                className="text-lg font-bold mb-3 text-center"
                style={{ color: isDarkMode ? "#FFFFFF" : "#0F4C75" }}
              >
                Development Tools
              </h4>
              <ul className="space-y-2">
                {skillCategories.Tools.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDarkMode ? "#0D2137" : "#FFFFFF",
                boxShadow: `0 10px 25px -5px ${accentColor}20`,
                border: `1px solid ${
                  isDarkMode
                    ? "rgba(57, 183, 255, 0.2)"
                    : "rgba(57, 183, 255, 0.1)"
                }`,
              }}
            >
              <div className="relative h-20 w-20 mx-auto mb-4">
                {/* Water drop with language icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                  fill={accentColor}
                >
                  <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <FaJs size={28} />
                </div>
              </div>
              <h4
                className="text-lg font-bold mb-3 text-center"
                style={{ color: isDarkMode ? "#FFFFFF" : "#0F4C75" }}
              >
                Programming Languages
              </h4>
              <ul className="space-y-2">
                {skillCategories.Languages.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mr-2"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div
            className="p-8 rounded-xl max-w-3xl mx-auto relative overflow-hidden"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(13, 33, 55, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              border: `1px solid ${
                isDarkMode
                  ? "rgba(57, 183, 255, 0.3)"
                  : "rgba(57, 183, 255, 0.2)"
              }`,
              boxShadow: `0 15px 30px -10px ${accentColor}30`,
            }}
          >
            {/* Decorative water wave background */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50' stroke='${accentColor.replace(
                  "#",
                  "%23"
                )}' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
                backgroundSize: "350px 50px",
                backgroundPosition: "center",
                animation: "wave-slide 20s linear infinite",
              }}
            />

            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              Ready to Collaborate?
            </h3>
            <p
              className="mb-6 max-w-xl mx-auto"
              style={{ color: secondaryTextColor }}
            >
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            <button
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${accentColor} 0%, ${
                  isDarkMode ? "#39B7FF" : "#74D0FF"
                } 100%)`,
                color: "#FFFFFF",
                boxShadow: `0 4px 15px -3px ${accentColor}50`,
              }}
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Me
              </span>
            </button>

            {/* Floating water drops decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-20 pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full"
                fill={accentColor}
              >
                <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
              </svg>
            </div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16 opacity-15 pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full"
                fill={accentColor}
              >
                <path d="M12,1.85L10.15,3.7C7.8,6.05 4,12.35 4,16C4,20.4 7.6,24 12,24C16.4,24 20,20.4 20,16C20,12.35 16.2,6.05 13.85,3.7L12,1.85M12,5.35C13.95,7.3 18,13.15 18,16C18,19.3 15.3,22 12,22C8.7,22 6,19.3 6,16C6,13.15 10.05,7.3 12,5.35Z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Water-themed animation keyframes */}
      <style jsx>{`
        @keyframes wave {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 0;
          }
        }

        @keyframes wave-slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsCarousel;
