import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import projectsData from "../../assets/db.json";

const Projects = ({ isDarkMode }) => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    // Set projects from imported JSON
    setProjects(projectsData.projects);
    setFilteredProjects(projectsData.projects);

    // Extract unique technologies for filter categories
    const allTechnologies = new Set(["all"]);
    projectsData.projects.forEach((project) => {
      project.technologies.forEach((tech) => allTechnologies.add(tech));
    });
    setCategories(Array.from(allTechnologies));
  }, []);

  const filterProjects = (category) => {
    setActiveFilter(category);

    if (category === "all") {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) =>
      project.technologies.includes(category)
    );
    setFilteredProjects(filtered);
  };

  return (
    <section
      id="projects"
      className="py-16 transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="section-title text-5xl font-bold mb-4 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            My Projects
          </h2>
          <p
            className="section-subtitle text-xl mb-12 text-center max-w-2xl mx-auto"
            style={{ color: "var(--primary-light)" }}
          >
            Explore my portfolio of recent work showcasing my skills and
            creative approach
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="filter-container flex flex-wrap justify-center gap-2 mb-12">
          {categories.slice(0, 8).map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "shadow-lg"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  activeFilter === category
                    ? "var(--primary-color)"
                    : isDarkMode
                    ? "rgba(126, 34, 206, 0.2)"
                    : "rgba(21, 128, 61, 0.1)",
                color:
                  activeFilter === category ? "#ffffff" : "var(--primary-dark)",
                transform:
                  activeFilter === category ? "scale(1.05)" : "scale(1)",
              }}
              onClick={() => filterProjects(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className={`project-card rounded-xl overflow-hidden shadow-xl transition-all duration-500 ${
                  isDarkMode
                    ? "bg-gray-800/90 backdrop-blur-sm"
                    : "bg-white/90 backdrop-blur-sm"
                }`}
                style={{
                  boxShadow: `0 10px 30px -10px ${
                    isDarkMode
                      ? "rgba(126, 34, 206, 0.3)"
                      : "rgba(21, 128, 61, 0.2)"
                  }`,
                }}
              >
                <div className="project-image relative overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(to top, rgba(126, 34, 206, 0.8), rgba(126, 34, 206, 0.2))"
                        : "linear-gradient(to top, rgba(21, 128, 61, 0.8), rgba(21, 128, 61, 0.2))",
                    }}
                  ></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-4">
                      <a
                        href={project.links.github}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github text-white text-xl"></i>
                      </a>
                      <a
                        href={project.links.live_demo}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt text-white text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content p-6">
                  <h3
                    className="project-title text-2xl font-bold mb-3"
                    style={{ color: "var(--primary-dark)" }}
                  >
                    {project.name}
                  </h3>

                  <div className="project-tags flex flex-wrap mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="project-tag text-xs px-3 py-1 rounded-full mr-2 mb-2"
                        style={{
                          backgroundColor: "var(--primary-light)",
                          color: "#ffffff",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className="project-tag text-xs px-3 py-1 rounded-full mr-2 mb-2"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(126, 34, 206, 0.3)"
                            : "rgba(21, 128, 61, 0.3)",
                          color: isDarkMode ? "#e9d5ff" : "#dcfce7",
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <p
                    className="project-description mb-6 text-sm"
                    style={{ color: isDarkMode ? "#e9d5ff" : "#166534" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex justify-center gap-4 mt-4">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(126, 34, 206, 0.2)"
                          : "rgba(21, 128, 61, 0.1)",
                        color: "var(--primary-color)",
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: isDarkMode
                          ? "rgba(126, 34, 206, 0.4)"
                          : "rgba(21, 128, 61, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-github mr-2"></i>
                      Source Code
                    </motion.a>

                    <motion.a
                      href={project.links.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "#ffffff",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: isDarkMode
                          ? "0 0 15px rgba(126, 34, 206, 0.5)"
                          : "0 0 15px rgba(21, 128, 61, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div
                className="inline-block p-6 rounded-lg mb-4"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(126, 34, 206, 0.1)"
                    : "rgba(21, 128, 61, 0.1)",
                }}
              >
                <i
                  className="fas fa-search text-4xl"
                  style={{ color: "var(--primary-color)" }}
                ></i>
              </div>
              <p
                className="text-xl font-medium"
                style={{ color: "var(--primary-dark)" }}
              >
                No projects found matching "{activeFilter}"
              </p>
              <button
                onClick={() => filterProjects("all")}
                className="mt-4 px-6 py-2 rounded-full text-white text-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Show all projects
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;