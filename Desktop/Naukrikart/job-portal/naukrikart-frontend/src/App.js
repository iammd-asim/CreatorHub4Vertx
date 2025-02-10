import React from "react";
import JobList from "./components/JobList";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"; // Importing Icons
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">NaukriKart</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Job Listings */}
      <JobList />

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What We Are Doing?</h2>
        <p className="testimonial">NaukriKart ensures that all job postings are genuine and verified before they go live.</p>
        <p className="testimonial">This adds trust and reliability, making it different from other job portals filled with scams and fake listings.</p>
        <p className="testimonial">Don’t just browse—APPLY! Because the real journey begins when you take that first step.</p>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} NaukriKart. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon youtube" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
