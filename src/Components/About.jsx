import React from 'react';
import { FaShip, FaMicrochip, FaFire, FaTachometerAlt, FaBalanceScale, FaChartLine } from 'react-icons/fa';
import { GiWaterSplash, GiShipWheel } from 'react-icons/gi';
import { IoMdSpeedometer } from 'react-icons/io';
import { motion } from 'framer-motion';
import './about.css';

function About() {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-header">
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          <FaShip className="header-icon" />
        </motion.div>
        <h1>Self-Stabilizing Boat System</h1>
        <p>IoT Solution for Marine Stability</p>
      </div>

      <div className="about-content">
        <section className="system-overview">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.03 }}
          >
            <div className="card-header">
              <FaMicrochip className="card-icon" />
              <h2>System Overview</h2>
            </div>
            <p>
              Our autonomous stabilization system uses real-time tilt data from an accelerometer
              to automatically adjust the boat's position, maintaining optimal balance even
              in rough waters.
            </p>
          </motion.div>
        </section>

        <section className="components">
          <h2>Key Components</h2>
          <div className="components-grid">
            <motion.div 
              className="component-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="component-icon">
                <IoMdSpeedometer />
              </div>
              <h3>MPU6050 Accelerometer</h3>
              <p>Measures tilt angles (roll and pitch) with high precision</p>
            </motion.div>

            <motion.div 
              className="component-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="component-icon">
                <FaMicrochip />
              </div>
              <h3>NodeMCU ESP8266</h3>
              <p>Processes sensor data and controls stabilization mechanisms</p>
            </motion.div>

            <motion.div 
              className="component-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="component-icon">
                <FaFire />
              </div>
              <h3>Firebase Realtime DB</h3>
              <p>Stores and syncs sensor data across devices in real-time</p>
            </motion.div>
          </div>
        </section>
        <br /><br />
        <section className="how-it-works">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.03 }}
          >
          
            <div className="card-header">
              <GiShipWheel className="card-icon" />
              <h2>How It Works</h2>
            </div>
            <ol className="process-steps">
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>1</span>
                <p>The accelerometer continuously monitors the boat's tilt angles</p>
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>2</span>
                <p>NodeMCU processes the data and determines necessary corrections</p>
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>3</span>
                <p>Actuators adjust counterweights or stabilizers to compensate</p>
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span>4</span>
                <p>All data is synced to Firebase for remote monitoring</p>
              </motion.li>
            </ol>
          </motion.div>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <FaBalanceScale />
              </div>
              <h3>Auto-Stabilization</h3>
              <p>Maintains balance automatically in rough conditions</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Real-time Monitoring</h3>
              <p>View live tilt data and stabilization metrics</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <GiWaterSplash />
              </div>
              <h3>Water Resistance</h3>
              <p>Protected components for marine environments</p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default About;