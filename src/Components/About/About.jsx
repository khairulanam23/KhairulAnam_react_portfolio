import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
  const profileRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (profileRef.current) {
      observer.observe(profileRef.current);
    }
    
    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[var(--bg-color)] to-[color-mix(in_srgb,var(--bg-color),#000000_10%)] text-[var(--text-color)] transition-colors duration-500">
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
            <div className="relative w-full max-w-[350px] md:max-w-none" ref={profileRef}>
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
                I am <span className="text-[var(--primary-light),#000000_10%] font-semibold">Mohammad Khairul Anam</span>, a passionate Full Stack Developer specializing in building scalable
                and high-performance web applications. I am dedicated to leveraging advanced technologies to
                create impactful user experiences and deliver innovative solutions to complex challenges.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-6 leading-relaxed opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Currently pursuing my Bachelor's degree in Computer Science and Engineering at <span className="text-[var(--primary-color)] font-bold">BRAC University</span>,
                I've been actively honing my skills in web development and software engineering. My expertise
                includes the <span className="text-[var(--primary-color)] font-bold">MERN stack</span> (MongoDB, Express, React, Node.js), along with additional proficiency in
                Python, TypeScript, and other modern technologies.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-8 leading-relaxed opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                I'm constantly exploring new technologies and methodologies to enhance my skills and stay ahead
                in this rapidly evolving field. My goal is to create impactful digital experiences that solve
                real-world problems while contributing to open-source projects and fostering community
                collaboration.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <a 
                  href="#" 
                  className="px-6 py-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] rounded-full text-white font-semibold flex items-center gap-2 hover:from-[var(--primary-dark)] hover:to-[var(--primary-dark)] transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <FaDownload className="text-lg" />
                  Download CV
                </a>
                <a 
                  href="#" 
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
                  <p className="text-xl font-bold">10+</p>
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
  );
};

export default About;