import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTrophy,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";

const AboutAndExperience = () => {
  const profileRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (profileRef.current) {
      observer.observe(profileRef.current);
    }

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-[var(--bg-color)] to-[color-mix(in_srgb,var(--bg-color),#000000_10%)] text-[var(--text-color)] transition-colors duration-500"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Part */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)]">
              About Me
            </h2>
            <p className="text-xl opacity-80">Get to know me better</p>
            <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-28">
            {/* Image Part */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-2/5 w-full flex justify-center"
            >
              <div
                className="relative w-full max-w-[350px] md:max-w-none"
                ref={profileRef}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-color)] to-[var(--primary-dark)] rounded-lg transform rotate-6 scale-105 opacity-75"></div>
                <img
                  src="https://i.ibb.co/gLDnYFgF/profile.jpg"
                  alt="Mohammad Khairul Anam"
                  className="rounded-lg shadow-xl w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-300 aspect-square md:aspect-auto max-w-[350px] md:max-w-none"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--primary-light)] rounded-full opacity-20 z-0"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--primary-dark)] rounded-full opacity-20 z-0"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:w-3/5"
            >
              <div className="bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] text-justify p-8 rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] transition-all duration-300 dark:bg-opacity-50">
                <motion.p
                  className="text-lg mb-6 leading-relaxed opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  I am{" "}
                  <span className="text-[var(--primary-light)] font-semibold">
                    Mohammad Khairul Anam
                  </span>
                  , a passionate Full Stack Developer specializing in building
                  scalable and high-performance web applications. I am dedicated
                  to leveraging advanced technologies to create impactful user
                  experiences and deliver innovative solutions to complex
                  challenges.
                </motion.p>

                <motion.p
                  className="text-lg mb-6 leading-relaxed opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Currently pursuing my Bachelor's degree in Computer Science
                  and Engineering at{" "}
                  <span className="text-[var(--primary-color)] font-bold">
                    BRAC University
                  </span>
                  , I've been actively honing my skills in web development and
                  software engineering. My expertise includes the{" "}
                  <span className="text-[var(--primary-color)] font-bold">
                    MERN stack
                  </span>{" "}
                  (MongoDB, Express, React, Node.js), along with additional
                  proficiency in Python, TypeScript, and other modern
                  technologies.
                </motion.p>

                <motion.p
                  className="text-lg mb-8 leading-relaxed opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  I'm constantly exploring new technologies and methodologies to
                  enhance my skills and stay ahead in this rapidly evolving
                  field. My goal is to create impactful digital experiences that
                  solve real-world problems while contributing to open-source
                  projects and fostering community collaboration.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <a
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href =
                        "https://drive.google.com/file/d/1AewVXgJljlpH8V5W66kFpDL3cQb613yq/view?usp=sharing";
                      link.download = "Resume.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full text-white font-semibold flex items-center gap-2 hover:from-[var(--primary-dark)] hover:to-[var(--primary-dark)] transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                  >
                    <FaDownload className="text-lg" />
                    Download CV
                  </a>
                  <a
                    href="https://www.github.com/khairulanam23" target="_blank"
                    className="px-6 py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-full font-semibold flex items-center gap-2 hover:bg-[var(--primary-color)] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaGithub className="text-lg" />
                    GitHub
                  </a>
                </motion.div>

                <motion.div
                  className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="bg-[color-mix(in_srgb,var(--bg-color),#000000_10%)] p-3 rounded-lg text-center hover:bg-[var(--primary-color)] hover:bg-opacity-20 transition-all duration-300">
                    <p className="text-sm opacity-70">Experience</p>
                    <p className="text-xl font-bold">1+ Years</p>
                  </div>
                  <div className="bg-[color-mix(in_srgb,var(--bg-color),#000000_10%)] p-3 rounded-lg text-center hover:bg-[var(--primary-color)] hover:bg-opacity-20 transition-all duration-300">
                    <p className="text-sm opacity-70">Projects</p>
                    <p className="text-xl font-bold">5+</p>
                  </div>
                  <div className="bg-[color-mix(in_srgb,var(--bg-color),#000000_10%)] p-3 rounded-lg text-center hover:bg-[var(--primary-color)] hover:bg-opacity-20 transition-all duration-300">
                    <p className="text-sm opacity-70">Clients</p>
                    <p className="text-xl font-bold">5+</p>
                  </div>
                  <div className="bg-[color-mix(in_srgb,var(--bg-color),#000000_10%)] p-3 rounded-lg text-center hover:bg-[var(--primary-color)] hover:bg-opacity-20 transition-all duration-300">
                    <p className="text-sm opacity-70">Satisfaction</p>
                    <p className="text-xl font-bold">95%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section
        id="experience"
        className="hidden md:flex py-20 bg-gradient-to-b from-[color-mix(in_srgb,var(--bg-color),#000000_10%)] to-[color-mix(in_srgb,var(--bg-color),#000000_5%)] text-[var(--text-color)] transition-colors duration-500"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)]">
              Experience & Education
            </h2>
            <p className="text-xl opacity-80">My professional journey</p>
            <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="relative" ref={timelineRef}>
            {/* Vertical line - hidden on small screens */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[var(--primary-light)] to-[var(--primary-dark)] rounded-full"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {/* First timeline item */}
              <div className="relative md:flex md:items-center md:justify-between">
                {/* Content for medium+ screens (side by side layout) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden md:block md:w-5/12 mr-auto p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                    2021 - 2025
                  </span>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Bachelor of Science in Computer Science and Engineering
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    BRAC University, Dhaka
                  </h4>
                  <p className="opacity-90">
                    Currently pursuing my BSc in Computer Science with a focus
                    on software development and web technologies. Maintaining a
                    CGPA of 3.4 out of 4.0. Participating in coding competitions
                    and technology clubs.
                  </p>
                </motion.div>

                {/* Content for small screens (stacked layout) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="md:hidden w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--primary-color)] mr-3"></div>
                    <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                      2021 - 2025
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Bachelor of Science in Computer Science and Engineering
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    BRAC University, Dhaka
                  </h4>
                  <p className="opacity-90">
                    Currently pursuing my BSc in Computer Science with a focus
                    on software development and web technologies. Maintaining a
                    CGPA of 3.4 out of 4.0. Participating in coding competitions
                    and technology clubs.
                  </p>
                </motion.div>

                {/* Center dot for md+ screens */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--primary-color)] border-4 border-[color-mix(in_srgb,var(--bg-color),#FFFFFF_10%)] z-10 shadow-lg"
                ></motion.div>
              </div>

              {/* Second timeline item */}
              <div className="relative md:flex md:items-center md:justify-between">
                {/* Content for medium+ screens (side by side layout) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hidden md:block md:w-5/12 ml-auto p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                    2019 - 2021
                  </span>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Higher Secondary Certificate
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    Notre Dame College
                  </h4>
                  <p className="opacity-90">
                    Completed HSC in Science with a perfect GPA of 5.00.
                    Participated in programming contests and tech exhibitions.
                    Developed a strong foundation in mathematics and physics.
                  </p>
                </motion.div>

                {/* Content for small screens (stacked layout) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="md:hidden w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--primary-color)] mr-3"></div>
                    <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                      2019 - 2021
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Higher Secondary Certificate
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    Notre Dame College
                  </h4>
                  <p className="opacity-90">
                    Completed HSC in Science with a perfect GPA of 5.00.
                    Participated in programming contests and tech exhibitions.
                    Developed a strong foundation in mathematics and physics.
                  </p>
                </motion.div>

                {/* Center dot for md+ screens */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--primary-color)] border-4 border-[color-mix(in_srgb,var(--bg-color),#FFFFFF_10%)] z-10 shadow-lg"
                ></motion.div>
              </div>

              {/* Third timeline item */}
              <div className="relative md:flex md:items-center md:justify-between">
                {/* Content for medium+ screens (side by side layout) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="hidden md:block md:w-5/12 mr-auto p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                    2019
                  </span>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Secondary School Certificate
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    St. Gregory's High School and College
                  </h4>
                  <p className="opacity-90">
                    Achieved GPA 5.00 in SSC examination. Was an active member
                    of the school's computer club and participated in various
                    programming competitions.
                  </p>
                </motion.div>

                {/* Content for small screens (stacked layout) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="md:hidden w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--primary-color)] mr-3"></div>
                    <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                      2019
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                    Secondary School Certificate
                  </h3>
                  <h4 className="text-md font-medium mb-3 opacity-80">
                    St. Gregory's High School and College
                  </h4>
                  <p className="opacity-90">
                    Achieved GPA 5.00 in SSC examination. Was an active member
                    of the school's computer club and participated in various
                    programming competitions.
                  </p>
                </motion.div>

                {/* Center dot for md+ screens */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--primary-color)] border-4 border-[color-mix(in_srgb,var(--bg-color),#FFFFFF_10%)] z-10 shadow-lg"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== */}
      <section
        id="experience"
        className="md:hidden py-20 bg-gradient-to-b from-[color-mix(in_srgb,var(--bg-color),#000000_10%)] to-[color-mix(in_srgb,var(--bg-color),#000000_5%)] text-[var(--text-color)] transition-colors duration-500"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)]">
              Experience & Education
            </h2>
            <p className="text-xl opacity-80">My professional journey</p>
            <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          {/* Stacked Timeline Items */}
          <div className="space-y-10">
            {/* Timeline Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                2021 - 2025
              </span>
              <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                Bachelor of Science in Computer Science and Engineering
              </h3>
              <h4 className="text-md font-medium mb-3 opacity-80">
                BRAC University, Dhaka
              </h4>
              <p className="opacity-90">
                Currently pursuing my BSc in Computer Science with a focus on
                software development and web technologies. Maintaining a CGPA of
                3.4 out of 4.0. Participating in coding competitions and
                technology clubs.
              </p>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                2019 - 2021
              </span>
              <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                Higher Secondary Certificate
              </h3>
              <h4 className="text-md font-medium mb-3 opacity-80">
                Notre Dame College
              </h4>
              <p className="opacity-90">
                Completed HSC in Science with a perfect GPA of 5.00.
                Participated in programming contests and tech exhibitions.
                Developed a strong foundation in mathematics and physics.
              </p>
            </motion.div>

            {/* Timeline Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="w-full p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full">
                2019
              </span>
              <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                Secondary School Certificate
              </h3>
              <h4 className="text-md font-medium mb-3 opacity-80">
                St. Gregory's High School and College
              </h4>
              <p className="opacity-90">
                Achieved GPA 5.00 in SSC examination. Was an active member of
                the school's computer club and participated in various
                programming competitions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* =========================== */}

      {/* Achievements Section */}
      <section
        id="achievements"
        className="py-20 bg-gradient-to-b from-[color-mix(in_srgb,var(--bg-color),#000000_5%)] to-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)]">
              Achievements
            </h2>
            <p className="text-xl opacity-80">Recognition and milestones</p>
            <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AchievementCard
              icon={<FaTrophy className="text-yellow-500" />}
              title="HackerRank Problem Solving"
              description="Ranked 1203119 on HackerRank, demonstrating strong problem-solving skills and algorithm proficiency across various programming challenges."
              delay={0.3}
            />

            <AchievementCard
              icon={<FaGraduationCap className="text-blue-500" />}
              title="Academic Excellence"
              description="Maintained consistent academic performance with a CGPA of 3.4 in Computer Science and Engineering at BRAC University."
              delay={0.5}
            />

            <AchievementCard
              icon={<FaAward className="text-purple-500" />}
              title="Perfect GPA in HSC & SSC"
              description="Achieved perfect GPA 5.00 in both Higher Secondary Certificate and Secondary School Certificate examinations."
              delay={0.7}
            />
          </div>
        </div>
      </section>
    </>
  );
};

// Achievement Card Component
const AchievementCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_5%)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[color-mix(in_srgb,var(--bg-color),#000000_15%)] hover:border-[var(--primary-color)]"
    >
      <div className="w-16 h-16 flex items-center justify-center mb-4 bg-[color-mix(in_srgb,var(--bg-color),#FFFFFF_2%)] rounded-full text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">
        {title}
      </h3>
      <p className="opacity-90">{description}</p>
    </motion.div>
  );
};

export default AboutAndExperience;
