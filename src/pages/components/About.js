import React, { useState, useEffect } from "react";
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
              Our <span>Story</span>
            </h2>
            <p>
              KIITGO was born from a simple observation: students, faculty, and
              staff at KIIT University spend too much time worrying about when
              the next shuttle or campus bus will arrive. What began as a small
              student-team idea quickly grew into a mission — to make campus
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
              Our project is guided by values: reliability, safety,
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
              alt="Our Story"
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
              Our platform is designed exclusively for KIIT University, keeping
              in mind the unique needs of students, faculty, and staff.
            </p>
          </div>
          <div className="why-item">
            <h3>Accuracy and Reliability</h3>
            <p>
              We use real-time GPS tracking to ensure accurate updates and
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
              We listen, adapt, and continuously improve based on your feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team">
        <h2>
          Meet Our <span>Team</span>
        </h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/assets/team_pic/rohit.jpg" alt="Rohit Gupta" />
            <h3>Rohit Gupta</h3>
            <p>Full Stack Developer</p>
          </div>
          <div className="team-member">
            <img src="/assets/team_pic/kunal.jpg" alt="Kunal Kewat" />
            <h3>Kunal Kewat</h3>
            <p>Backend Developer</p>
          </div>
          <div className="team-member">
            <img src="/assets/team_pic/sandip.jpg" alt="Sandip Kumar Sah" />
            <h3>Sandip Kumar Sah</h3>
            <p>Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src="/assets/team_pic/nawsad.jpg" alt="Nawsad Ansari" />
            <h3>Nawsad Ansari</h3>
            <p>UI Designer</p>
          </div>
          <div className="team-member">
            <img src="/assets/team_pic/ANMOL.jpg" alt="Anmol Mishra" />
            <h3>Anmol Mishra</h3>
            <p>Data Analyst</p>
          </div>
          <div className="team-member">
            <img src="/assets/team_pic/priyanka.jpg" alt="Priyanka Mondal" />
            <h3>Priyanka Mondal</h3>
            <p>Research Support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
