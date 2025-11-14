import React from 'react';
import { FaMountain, FaExclamationTriangle, FaChartLine, FaCogs, FaDatabase } from 'react-icons/fa';
import { GiEarthCrack, GiLandMine } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './home.css';

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Landslide Detection & Monitoring System</h1>
            <p className="subtitle">IoT-powered early warning system using environmental sensors and tilt detection</p>
            <div className="hero-buttons-center">
              <Link to="/dashboard" className="get-started-button">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <FaMountain className="mountain-icon" />
          <div className="alert-pulse"></div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="feature-icon">
              <GiEarthCrack />
            </div>
            <h3>Real-time Tilt Detection</h3>
            <p>Continuously monitors ground movement and tilt angles using advanced sensors</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="feature-icon">
              <FaDatabase />
            </div>
            <h3>Cloud Monitoring</h3>
            <p>Firebase integration for real-time data logging and remote access</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="feature-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Two-Stage Alert System</h3>
            <p>Warning and critical alerts based on multiple risk factors for early evacuation</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How Our System Works</h2>
        <div className="steps-container">
          <motion.div 
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Sensors Monitor Environment</h3>
              <p>DHT11 measures temperature and humidity, soil moisture sensors track surface and depth moisture levels</p>
            </div>
          </motion.div>

          <motion.div 
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Tilt Sensor Detects Movement</h3>
              <p>SW-520D tilt sensor continuously monitors ground angle changes and instability</p>
            </div>
          </motion.div>

          <motion.div 
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Risk Analysis Algorithm</h3>
              <p>System analyzes multiple parameters to calculate danger score and determine alert level</p>
            </div>
          </motion.div>

          <motion.div 
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Alerts & Data Logging</h3>
              <p>Real-time alerts sent to dashboard, all metrics stored in Firebase for analysis</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Monitor Landslide Risk in Real-Time</h2>
          <p>Access live environmental data, tilt status, and risk assessment</p>
          <Link to="/dashboard" className="primary-button">
            Go to Dashboard
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;