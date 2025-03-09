import React, { useState, useEffect } from "react";

const Contact = ({ isDarkMode }) => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
    isLoading: false,
  });

  // Check for element visibility to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Handle random animations for contact info items
  useEffect(() => {
    if (isVisible) {
      const animationTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 3);
        setActiveAnimation(randomIndex);

        setTimeout(() => {
          setActiveAnimation(null);
        }, 1000);
      }, 3000);

      return () => clearInterval(animationTimer);
    }
  }, [isVisible]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isLoading: true });

    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! I will get back to you soon.",
        isLoading: false,
      });

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setFormStatus({
          submitted: false,
          success: false,
          message: "",
          isLoading: false,
        });
      }, 5000);
    }, 1500);
  };

  // Animations for form inputs
  const getInputAnimation = (index) => {
    if (!isVisible) return {};

    return {
      opacity: 1,
      transform: "translateX(0)",
      transition: `opacity 0.5s ease, transform 0.5s ease ${
        0.1 + index * 0.1
      }s`,
    };
  };

  return (
    <section
      id="contact"
      className="py-16 transition-colors duration-500 relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: "var(--primary-color)",
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.1,
              transform: `scale(${isVisible ? 1 : 0})`,
              transition: `transform 1.5s ease ${i * 0.2}s`,
              animation: isVisible
                ? `float ${10 + Math.random() * 10}s infinite ease-in-out`
                : "none",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <h2
          className="section-title text-4xl font-bold mb-4 text-center"
          style={{
            color: "var(--primary-color)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          Contact Me
        </h2>
        <p
          className="section-subtitle text-lg mb-12 text-center"
          style={{
            color: "var(--primary-light)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease 0.1s",
          }}
        >
          Let's get in touch
        </p>

        <div className="contact-container flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            className="contact-form w-full lg:w-3/5 p-8 rounded-lg shadow-lg transition-all duration-500"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(30, 27, 75, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              boxShadow: `0 10px 25px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.3)"
                  : "rgba(21, 128, 61, 0.2)"
              }`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
              transition:
                "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onSubmit={handleSubmit}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 15px 30px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.5)"
                  : "rgba(21, 128, 61, 0.3)"
              }`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 25px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.3)"
                  : "rgba(21, 128, 61, 0.2)"
              }`;
            }}
          >
            {formStatus.submitted && (
              <div
                className="form-status mb-6 p-4 rounded-lg text-center"
                style={{
                  backgroundColor: formStatus.success
                    ? isDarkMode
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(16, 185, 129, 0.1)"
                    : isDarkMode
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(239, 68, 68, 0.1)",
                  color: formStatus.success
                    ? isDarkMode
                      ? "#10b981"
                      : "#047857"
                    : isDarkMode
                    ? "#ef4444"
                    : "#b91c1c",
                  animation: "fadeInDown 0.5s ease",
                }}
              >
                {formStatus.message}
              </div>
            )}

            <div className="form-group mb-6" style={getInputAnimation(0)}>
              <label
                htmlFor="name"
                className="form-label block mb-2 font-medium"
                style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full p-3 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderColor: isDarkMode ? "#7e22ce" : "#15803d",
                  color: isDarkMode ? "#e9d5ff" : "#145229",
                  outline: "none",
                }}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group mb-6" style={getInputAnimation(1)}>
              <label
                htmlFor="email"
                className="form-label block mb-2 font-medium"
                style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full p-3 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderColor: isDarkMode ? "#7e22ce" : "#15803d",
                  color: isDarkMode ? "#e9d5ff" : "#145229",
                  outline: "none",
                }}
                placeholder="Your email"
                required
              />
            </div>

            <div className="form-group mb-6" style={getInputAnimation(2)}>
              <label
                htmlFor="subject"
                className="form-label block mb-2 font-medium"
                style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input w-full p-3 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderColor: isDarkMode ? "#7e22ce" : "#15803d",
                  color: isDarkMode ? "#e9d5ff" : "#145229",
                  outline: "none",
                }}
                placeholder="Subject"
                required
              />
            </div>

            <div className="form-group mb-6" style={getInputAnimation(3)}>
              <label
                htmlFor="message"
                className="form-label block mb-2 font-medium"
                style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea w-full p-3 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderColor: isDarkMode ? "#7e22ce" : "#15803d",
                  color: isDarkMode ? "#e9d5ff" : "#145229",
                  outline: "none",
                  minHeight: "150px",
                  resize: "vertical",
                }}
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 w-full sm:w-auto relative overflow-hidden"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "#ffffff",
                transform: "translateY(0)",
                opacity: isVisible ? 1 : 0,
                transition:
                  "opacity 0.5s ease 0.4s, transform 0.3s ease, background-color 0.3s ease",
              }}
              disabled={formStatus.isLoading}
            >
              {formStatus.isLoading ? (
                <span className="loading-spinner inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}

              {formStatus.isLoading ? "Sending..." : "Send Message"}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="absolute top-0 left-0 w-full h-full">
                <span
                  className="absolute inset-0 w-full h-full bg-white rounded-lg"
                  style={{
                    transform: "scale(0)",
                    opacity: 0.3,
                    animation: "ripple 0.6s linear",
                  }}
                ></span>
              </div>
            </button>
          </form>

          {/* Contact Info */}
          <div
            className="contact-info w-full lg:w-2/5 p-8 rounded-lg shadow-lg transition-all duration-500 flex flex-col justify-between"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(30, 27, 75, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              boxShadow: `0 10px 25px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.3)"
                  : "rgba(21, 128, 61, 0.2)"
              }`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition:
                "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 15px 30px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.5)"
                  : "rgba(21, 128, 61, 0.3)"
              }`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 25px -5px ${
                isDarkMode
                  ? "rgba(126, 34, 206, 0.3)"
                  : "rgba(21, 128, 61, 0.2)"
              }`;
            }}
          >
            <div className="space-y-8">
              <div
                className="contact-item flex items-start space-x-4 p-4 rounded-lg transition-all duration-500"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.5)"
                    : "rgba(209, 255, 232, 0.5)",
                  transform:
                    activeAnimation === 0
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  boxShadow:
                    activeAnimation === 0
                      ? `0 10px 15px -3px ${
                          isDarkMode
                            ? "rgba(126, 34, 206, 0.3)"
                            : "rgba(21, 128, 61, 0.2)"
                        }`
                      : "none",
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible
                    ? "fadeInRight 0.5s ease 0.1s forwards"
                    : "none",
                }}
              >
                <div
                  className="contact-icon w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    animation:
                      activeAnimation === 0 ? "pulse 1s ease infinite" : "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--primary-dark)" }}
                  >
                    Email
                  </h3>
                  <a
                    href="mailto:mka.rifat.24@gmail.com"
                    className="transition-colors duration-300 hover:underline"
                    style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}
                  >
                    mka.rifat.24@gmail.com
                  </a>
                </div>
              </div>

              <div
                className="contact-item flex items-start space-x-4 p-4 rounded-lg transition-all duration-500"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.5)"
                    : "rgba(209, 255, 232, 0.5)",
                  transform:
                    activeAnimation === 1
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  boxShadow:
                    activeAnimation === 1
                      ? `0 10px 15px -3px ${
                          isDarkMode
                            ? "rgba(126, 34, 206, 0.3)"
                            : "rgba(21, 128, 61, 0.2)"
                        }`
                      : "none",
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible
                    ? "fadeInRight 0.5s ease 0.2s forwards"
                    : "none",
                }}
              >
                <div
                  className="contact-icon w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    animation:
                      activeAnimation === 1 ? "pulse 1s ease infinite" : "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--primary-dark)" }}
                  >
                    Phone
                  </h3>
                  <p style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}>
                    +880 1886-584718
                  </p>
                </div>
              </div>

              <div
                className="contact-item flex items-start space-x-4 p-4 rounded-lg transition-all duration-500"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(20, 17, 45, 0.5)"
                    : "rgba(209, 255, 232, 0.5)",
                  transform:
                    activeAnimation === 2
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  boxShadow:
                    activeAnimation === 2
                      ? `0 10px 15px -3px ${
                          isDarkMode
                            ? "rgba(126, 34, 206, 0.3)"
                            : "rgba(21, 128, 61, 0.2)"
                        }`
                      : "none",
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible
                    ? "fadeInRight 0.5s ease 0.3s forwards"
                    : "none",
                }}
              >
                <div
                  className="contact-icon w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    animation:
                      activeAnimation === 2 ? "pulse 1s ease infinite" : "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--primary-dark)" }}
                  >
                    Location
                  </h3>
                  <p style={{ color: isDarkMode ? "#e9d5ff" : "#145229" }}>
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div
              className="social-links mt-8 flex justify-center space-x-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
              }}
            >
              <a
                href="https://github.com/khairulanam23"
                className="social-link w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "#ffffff",
                  transform: "translateY(0)",
                }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) rotate(10deg)";
                  e.currentTarget.style.backgroundColor = "var(--primary-dark)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) rotate(0deg)";
                  e.currentTarget.style.backgroundColor =
                    "var(--primary-light)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/khairulanam23"
                className="social-link w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "#ffffff",
                  transform: "translateY(0)",
                }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) rotate(-10deg)";
                  e.currentTarget.style.backgroundColor = "var(--primary-dark)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) rotate(0deg)";
                  e.currentTarget.style.backgroundColor =
                    "var(--primary-light)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/khairulanam23"
                className="social-link w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "#ffffff",
                  transform: "translateY(0)",
                }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) rotate(10deg)";
                  e.currentTarget.style.backgroundColor = "var(--primary-dark)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0) rotate(0deg)";
                  e.currentTarget.style.backgroundColor =
                    "var(--primary-light)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.22.084 4.92 4.92 0 004.59 3.41 9.87 9.87 0 01-6.1 2.1 10.03 10.03 0 01-1.175-.067 13.92 13.92 0 007.55 2.21c9.02 0 13.97-7.49 13.97-13.97 0-.212-.005-.424-.015-.633a9.94 9.94 0 002.45-2.54z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

<style jsx global>{`
  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`}</style>;
