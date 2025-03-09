import React, { useEffect, useState } from 'react';
// Import JSON directly
import projectsData from "../../assets/db.json";

const Projects = ({ isDarkMode }) => {
  const [projects, setProjects] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Set projects from imported JSON
    setProjects(projectsData.projects);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section 
      id="projects" 
      className="py-12 transition-colors duration-500"
      style={{ 
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="section-title text-4xl font-bold mb-4 text-center"
          style={{ color: 'var(--primary-color)' }}
        >
          My Projects
        </h2>
        <p 
          className="section-subtitle text-lg mb-8 text-center"
          style={{ color: 'var(--primary-light)' }}
        >
          Recent work I've completed
        </p>
        
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                style={{ 
                  transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: hoveredCard === index 
                    ? `0 10px 25px -5px ${isDarkMode ? 'rgba(168, 85, 247, 0.4)' : 'rgba(34, 197, 94, 0.3)'}` 
                    : `0 4px 6px -1px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleMouseEnter(index)}
                onTouchEnd={handleMouseLeave}
              >
                <div className="project-image relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-48 object-cover transition-transform duration-500"
                    style={{ 
                      transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t transition-opacity duration-500"
                    style={{ 
                      opacity: hoveredCard === index ? 0.7 : 0,
                      background: isDarkMode 
                        ? 'linear-gradient(to top, rgba(126, 34, 206, 0.7), transparent)'
                        : 'linear-gradient(to top, rgba(21, 128, 61, 0.7), transparent)'
                    }}
                  ></div>
                </div>
                
                <div className="project-content p-6">
                  <h3 
                    className="project-title text-2xl font-semibold mb-2"
                    style={{ color: 'var(--primary-dark)' }}
                  >
                    {project.name}
                  </h3>
                  
                  <div className="project-tags flex flex-wrap mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="project-tag text-sm px-3 py-1 rounded-full mr-2 mb-2"
                        style={{ 
                          backgroundColor: 'var(--primary-light)',
                          color: isDarkMode ? '#ffffff' : '#ffffff'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p 
                    className="project-description mb-4"
                    style={{ color: isDarkMode ? '#e9d5ff' : '#145229' }}
                  >
                    {project.description}
                  </p>
                  
                  <div className="project-links flex flex-wrap space-x-2 sm:space-x-4">
                    <a 
                      href={project.links.github} 
                      className="project-link hover:underline flex items-center mb-2 sm:mb-0"
                      style={{ color: 'var(--primary-color)' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github mr-2"></i> View Code
                    </a>
                    <a 
                      href={project.links.live_demo} 
                      className="project-link hover:underline flex items-center"
                      style={{ color: 'var(--primary-color)' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl" style={{ color: 'var(--text-color)' }}>No projects found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;