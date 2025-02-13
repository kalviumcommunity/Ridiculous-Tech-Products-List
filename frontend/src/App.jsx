import React from "react";
import "./App.css";
import { FaRobot, FaRocket, FaMicrochip } from "react-icons/fa";

const App = () => {
  return (
    <div className="landing-container">
      {/* Floating Dots Background */}
      <div className="floating-dots">
        {[...Array(10)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      {/* Content */}
      <header>
        <h1 className="landing-title">Ridiculous Tech Products Ever</h1>
        <p className="landing-description">Exploring the most bizarre and futuristic tech innovations.</p>
      </header>
      <section className="icons">
        <FaRobot className="icon" />
        <FaRocket className="icon" />
        <FaMicrochip className="icon" />
      </section>
      <button className="explore-btn">Explore Now</button>
    </div>
  );
};

export default App;