import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./About.css"; // Move inline styles to About.css for better practice

const About = () => {
  // Typing animation state
  const fullText = "Welcome to KIITGO";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + fullText[index]);
        setIndex(index + 1);
      }, 150); // typing speed in milliseconds
      return () => clearTimeout(timeout);
    }
  }, [index, displayText]);

  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content-img">
          <img src="/assets/Loginbackground1.png" alt="Background" />*
        </div>
        <div className="hero-content-txt">
          <h1>
            {displayText.split("KIITGO").map((part, idx) =>
              idx === 1 ? (
                <span key={idx}>KIITGO</span> 
              ) : (
                part
              )
            )}
            <span className="cursor"></span>
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="about">
        <div className="about-container">
          <div className="about-text">
            <h2>
              My <span>Story</span>
            </h2>
            <p>
              KIITGO was born from a simple observation: students, faculty, and
              the next shuttle or campus bus will arrive. What began as a single
              student's idea quickly grew into a mission — to make campus
              transportation predictable, safe, and efficient for everyone.
            </p>
            <p>
              Before KIITGO, transportation on campus was fragmented —
              inconsistent schedules, unclear routes, crowded stops, and no
              single place to check vehicle locations. These issues wasted time,
              caused stress during tight class schedules, and created avoidable
              safety and accessibility gaps.
            </p>
            <p>
              KIITGO solves these problems with a simple, user-focused platform:
              real-time vehicle tracking, route maps, estimated arrival times,
              digital schedules, push notifications, and easy issue reporting.
            </p>
            <p>
              My project is guided by core values: reliability, safety,
              sustainability, and community. KIITGO lowers fuel use, improves
              safety, and saves students time.
            </p>
            <p>
              Looking ahead, KIITGO aims to evolve with feedback, integrate
              clean-energy vehicles, and open APIs for student developers to
              build new services.
            </p>
          </div>
          <div className="about-image">
            <img
              src="/assets/team_pic/OURSTORY/OURSTORY.png"
              alt="My Story"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>
          Why <span>KIITGO</span> is the Smarter Choice?
        </h2>
        <p></p>
        <div className="why-grid">
          <div className="why-item">
            <h3>Campus-Focused Innovation</h3>
            <p>
              This platform is designed exclusively for KIIT University, keeping
              in mind the unique needs of students, faculty, and staff.
            </p>
          </div>
          <div className="why-item">
            <h3>Accuracy and Reliability</h3>
            <p>
              I use real-time tracking techniques to ensure accurate updates and
              estimated arrival times.
            </p>
          </div>
          <div className="why-item">
            <h3>Safety First</h3>
            <p>
              Safety is at the core of KIITGO. Instant alerts ensure secure and
              transparent travel.
            </p>
          </div>
          <div className="why-item">
            <h3>Eco-Friendly and Future-Ready</h3>
            <p>
              By optimizing routes and reducing waiting times, KIITGO supports
              sustainability and green initiatives.
            </p>
          </div>
          <div className="why-item">
            <h3>Commitment to the KIIT Community</h3>
            <p>
              I listen, adapt, and continuously improve the system based on your feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Developed By */}
      <section className="team">
        <h2>
          Developed <span>By</span>
        </h2>
        <div className="team-grid" style={{ display: "flex", justifyContent: "center" }}>
          <div className="team-member">
            <img src="/assets/team_pic/sandip.jpg" alt="Sandip Kumar Sah" />
            <h3>Sandip Kumar Sah</h3>
            <p>Full Stack Developer (MERN Stack)</p>
            <div className="social-links">
              <a href="https://github.com/Sandip4083" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://linkedin.com/in/Sandip4083" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://x.com/sandip4083" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
