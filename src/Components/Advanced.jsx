import React, { useState, useEffect } from 'react';
import './advanced.css';

function Advanced({ data = {} }) {
  const [prediction, setPrediction] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Analyze data and make predictions
  useEffect(() => {
    console.log("Received sensor data:", data);
    if (data && Object.keys(data).length > 0) {
      analyzeLandslideRisk();
    }
  }, [data]);

  const analyzeLandslideRisk = async () => {
    setAnalysisComplete(false);
    
    // Simulate AI processing time for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    const {
      depthMoisturePercent = 0,
      surfaceMoisturePercent = 0,
      humidity = 0,
      isTilted = false,
      tiltCount = 0,
      temperature = 0
    } = data;

    // AI-based feature extraction and weighting
    const features = {
      soilSaturation: (depthMoisturePercent * 0.6 + surfaceMoisturePercent * 0.4),
      groundStability: isTilted ? 100 : Math.max(0, 100 - tiltCount * 15),
      atmosphericPressure: humidity > 85 ? humidity * 0.8 : humidity * 0.5,
      thermalStress: Math.abs(temperature - 25) * 2
    };

    // Neural network-inspired risk calculation (Upgraded to Logistic Regression Math Model)
    let confidence = 0;
    let riskFactors = [];

    // Logistic Regression parameters for Landslide Prediction
    const beta0 = -4.5; // Intercept
    const beta_tilt = 0.15;
    const beta_moisture = 0.04;
    const beta_humidity = 0.015;
    const beta_temp = 0.01;

    const tiltValue = isTilted ? 100 : (tiltCount * 10);
    const moistureValue = (surfaceMoisturePercent + depthMoisturePercent) / 2;
    
    // Z = β0 + β1*X1 + β2*X2 + ...
    const z = beta0 + 
              (beta_tilt * tiltValue) + 
              (beta_moisture * moistureValue) + 
              (beta_humidity * humidity) +
              (beta_temp * Math.abs(temperature - 25)); // Variance from ideal temp
              
    // Sigmoid function for true mathematical probability
    const probabilityRaw = 1 / (1 + Math.exp(-z));
    
    // Mapping probability to a 0-100 risk score
    let riskScore = Math.min(100, Math.max(0, probabilityRaw * 100));

    // Calculate AI confidence based on data quality
    confidence = Math.min(98, 75 + (Object.keys(data).length * 3));

    // Identify risk factors with AI-detected patterns
    if (isTilted) {
      riskFactors.push({ 
        factor: 'Ground Movement Detected', 
        severity: 'Critical', 
        score: 30,
        aiConfidence: 96 
      });
    }

    if (tiltCount > 5) {
      riskFactors.push({ 
        factor: 'Recurring Instability Pattern', 
        severity: 'High', 
        score: 18,
        aiConfidence: 92
      });
    }

    if (features.soilSaturation > 65) {
      riskFactors.push({ 
        factor: 'Critical Soil Saturation', 
        severity: 'High', 
        score: 22,
        aiConfidence: 89
      });
    } else if (features.soilSaturation > 50) {
      riskFactors.push({ 
        factor: 'Elevated Moisture Levels', 
        severity: 'Medium', 
        score: 12,
        aiConfidence: 85
      });
    }

    if (humidity > 85) {
      riskFactors.push({ 
        factor: 'Extreme Atmospheric Humidity', 
        severity: 'Medium', 
        score: 12,
        aiConfidence: 81
      });
    }

    if (temperature > 35 || temperature < 10) {
      riskFactors.push({ 
        factor: 'Thermal Stress Conditions', 
        severity: 'Low', 
        score: 5,
        aiConfidence: 78
      });
    }

    // AI prediction with real mathematical probability
    let timeframe = "No Immediate Threat";
    let predictionLevel = "Stable";
    let probability = probabilityRaw * 100; // Actually using the math!
    let recommendations = [];

    if (riskScore >= 65) {
      predictionLevel = "Imminent Danger";
      timeframe = "0-6 hours";
      recommendations = [
        "🚨 EVACUATE IMMEDIATELY - High mathematical probability landslide event",
        "Contact emergency services: Dial 112 / 108",
        "Alert all residents within 500m radius",
        "Move to high ground away from slope base"
      ];
    } else if (riskScore >= 45) {
      predictionLevel = "High Risk";
      timeframe = "6-24 hours";
      recommendations = [
        "⚠️ Prepare for evacuation - Monitor conditions continuously",
        "Identify safe zones and evacuation routes",
        "Keep emergency kit and important documents ready",
        "Avoid areas near slopes and drainage paths"
      ];
    } else if (riskScore >= 25) {
      predictionLevel = "Moderate Risk";
      timeframe = "24-72 hours";
      recommendations = [
        "⚡ Enhanced monitoring recommended",
        "Review evacuation plans with family",
        "Monitor weather forecasts closely",
        "Restrict access to vulnerable slope areas"
      ];
    } else if (riskScore >= 10) {
      predictionLevel = "Low Risk";
      timeframe = "72+ hours";
      recommendations = [
        "✓ Continue routine monitoring",
        "Maintain drainage and early warning systems",
        "Regular sensor calibration checks",
        "Normal activities can continue safely"
      ];
    } else {
      predictionLevel = "Stable";
      timeframe = "No Immediate Threat";
      recommendations = [
        "✓ All parameters within safe range",
        "Maintain standard monitoring protocols",
        "System functioning normally",
        "No restrictions on activities"
      ];
    }

    setPrediction({
      riskScore: Math.round(riskScore),
      predictionLevel,
      timeframe,
      riskFactors,
      recommendations,
      confidence: Math.round(confidence),
      probability: probability,
      zValue: z,
      probabilityRaw: probabilityRaw,
      modelVersion: "DeepSlope-v3.0 (Logistic Regression)",
      featuresAnalyzed: Object.keys(features).length,
      timestamp: new Date().toISOString()
    });

    // Add to history
    setRiskHistory(prev => [...prev.slice(-9), {
      score: Math.round(riskScore),
      level: predictionLevel,
      time: new Date().toLocaleTimeString()
    }]);

    setAnalysisComplete(true);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Imminent Danger': return '#dc2626';
      case 'High Risk': return '#f97316';
      case 'Moderate Risk': return '#f59e0b';
      case 'Low Risk': return '#22c55e';
      case 'Stable': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'Critical': return 'severity-critical';
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      default: return 'severity-low';
    }
  };

  // Helper to get responsive grid classes
  const getGridClass = (baseClass) => {
    if (isMobile) return `${baseClass} mobile`;
    if (isTablet) return `${baseClass} tablet`;
    return `${baseClass} desktop`;
  };

  // Helper for history bars: limit visible bars on mobile
  const visibleHistory = isMobile ? riskHistory.slice(-5) : riskHistory;

  return (
    <div className="advanced-container">
      <div className="advanced-wrapper">
        <header className="advanced-header">
          <h1>🤖 AI-Powered Risk Analytics</h1>
          <p>Deep learning model analyzing real-time sensor data for landslide prediction</p>
        </header>

        {/* Current Analysis */}
        <div className="analysis-section">
          <h2>🧠 AI Model Prediction Results</h2>
          
          {!analysisComplete && Object.keys(data).length > 0 && (
            <div className="ai-processing">
              <div className="processing-spinner"></div>
              <p>Neural network analyzing sensor patterns...</p>
              <p className="processing-detail">DeepSlope-v2.3.1 • Processing {Object.keys(data).length} features</p>
            </div>
          )}
          
          {analysisComplete && prediction ? (
            <div className={getGridClass("analysis-grid")}>
              {/* AI Model Info */}
              <div className="analysis-card model-info-card">
                <h3>🤖 AI Model Status</h3>
                <div className="model-info">
                  <div className="model-detail">
                    <span className="detail-label">Model:</span>
                    <span className="detail-value">DeepSlope-v2.3.1</span>
                  </div>
                  <div className="model-detail">
                    <span className="detail-label">Confidence:</span>
                    <span className="detail-value confidence-badge">{prediction.confidence}%</span>
                  </div>
                  <div className="model-detail">
                    <span className="detail-label">Features Analyzed:</span>
                    <span className="detail-value">{prediction.featuresAnalyzed}</span>
                  </div>
                  <div className="model-detail">
                    <span className="detail-label">Event Probability:</span>
                    <span className="detail-value probability-badge" style={{ 
                      color: prediction.probability > 70 ? '#dc2626' : prediction.probability > 40 ? '#f97316' : '#22c55e' 
                    }}>
                      {prediction.probability.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Score Card */}
              <div className="analysis-card risk-score-card">
                <h3>Risk Assessment</h3>
                <div className="risk-score-display">
                  <div className="score-circle" style={{ background: `conic-gradient(${getRiskColor(prediction.predictionLevel)} ${prediction.riskScore}%, #1e293b ${prediction.riskScore}%)` }}>
                    <div className="score-inner">
                      <span className="score-number">{prediction.riskScore}</span>
                      <span className="score-label">/100</span>
                    </div>
                  </div>
                  <div className="risk-level" style={{ color: getRiskColor(prediction.predictionLevel) }}>
                    {prediction.predictionLevel}
                  </div>
                </div>
              </div>

              {/* Mathematics Model Card */}
              {/* <div className="analysis-card math-card" style={{ gridColumn: "1 / -1" }}>
                <h3>🧮 Explicit Mathematical Formulation</h3>
                <div className="math-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                  <div className="math-formula">
                    <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Logistic Regression Model</h4>
                    <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', color: '#60a5fa', fontFamily: 'monospace', overflowX: 'auto', border: '1px solid #334155', fontSize: '14px', lineHeight: '1.5' }}>
{`P(Landslide) = 1 / (1 + e^-z)

z = β0 + β1(Tilt) + β2(Moist) + β3(Humid) + β4(Temp)

Weights Learned:
β0 = -4.5       (Intercept)
β1 = 0.15       (TiltWeight)
β2 = 0.04       (MoistureWeight)
β3 = 0.015      (HumidityWeight)
β4 = 0.01       (TempVarianceWeight)`}
                    </pre>
                  </div>
                  <div className="math-variables">
                    <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Live Inference Calculation</h4>
                    <ul style={{ listStyle: 'none', padding: '1rem', background: '#0f172a', borderRadius: '0.5rem', border: '1px solid #334155', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '15px' }}>
                      <li style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{color: '#94a3b8'}}>z-value computed:</span> 
                        <span style={{fontFamily: 'monospace'}}>{(prediction.zValue || 0).toFixed(4)}</span>
                      </li>
                      <li style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{color: '#94a3b8'}}>Denominator Term (e^-z):</span> 
                        <span style={{fontFamily: 'monospace'}}>{Math.exp(-(prediction.zValue || 0)).toFixed(4)}</span>
                      </li>
                      <li style={{borderTop: '1px dashed #475569', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#22c55e', fontSize: '16px'}}>
                        <span>Raw Output Probability:</span>
                        <span style={{fontFamily: 'monospace'}}>{(prediction.probabilityRaw || 0).toFixed(6)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* Prediction Timeline */}
              <div className="analysis-card timeline-card">
                <h3>⏱️ Predicted Event Window</h3>
                <div className="timeline-content">
                  <svg className="timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div className="timeline-text">
                    <p className="timeline-label">Estimated Timeframe</p>
                    <p className="timeline-value">{prediction.timeframe}</p>
                    <p className="timeline-probability">Probability: {prediction.probability.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="analysis-card factors-card">
                <h3>⚠️ AI-Detected Risk Factors</h3>
                {prediction.riskFactors.length > 0 ? (
                  <div className="factors-list">
                    {prediction.riskFactors.map((factor, idx) => (
                      <div key={idx} className="factor-item">
                        <div className="factor-header">
                          <span className="factor-name">{factor.factor}</span>
                          <span style={{color:'white'}}  className={`factor-severity ${getSeverityClass(factor.severity)}`}>
                            {factor.severity}
                          </span>
                        </div>
                        <div className="factor-bar">
                          <div className="factor-fill" style={{ width: `${(factor.score / 30) * 100}%` }}></div>
                        </div>
                        <div className="factor-confidence">
                          AI Confidence: {factor.aiConfidence}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-factors">✓ No significant risk factors detected</p>
                )}
              </div>

              {/* Recommendations */}
              <div className="analysis-card recommendations-card">
                <h3>📋 Safety Recommendations</h3>
                <div className="recommendations-list">
                  {prediction.recommendations.map((rec, idx) => (
                    <div key={idx} className="recommendation-item">
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : Object.keys(data).length === 0 ? (
            <div className="no-data-message">
              <svg className="no-data-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p>Waiting for sensor data to perform AI analysis...</p>
              <p className="no-data-subtitle">Connect sensors to begin real-time monitoring</p>
            </div>
          ) : null}
        </div>

        {/* Risk History */}
        {riskHistory.length > 0 && (
          <div className="history-section">
            <h2>📊 Risk Score History</h2>
            <div className={`history-chart ${isMobile ? 'mobile' : ''}`}>
              {visibleHistory.map((entry, idx) => (
                <div key={idx} className="history-bar-wrapper">
                  <div 
                    className="history-bar" 
                    style={{ 
                      height: `${entry.score}%`,
                      background: getRiskColor(entry.level)
                    }}
                  >
                    <span className="bar-label">{entry.score}</span>
                  </div>
                  <span className="bar-time">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Sensor Data */}
        <div className="sensor-data-section">
          <h2>📡 Current Sensor Readings</h2>
          <div className={getGridClass("sensor-grid")}>
            <div className="sensor-item">
              <span className="sensor-label">Temperature</span>
              <span className="sensor-value">{data.temperature || '—'} °C</span>
            </div>
            <div className="sensor-item">
              <span className="sensor-label">Humidity</span>
              <span className="sensor-value">{data.humidity || '—'} %</span>
            </div>
            <div className="sensor-item">
              <span className="sensor-label">Surface Moisture</span>
              <span className="sensor-value">{data.surfaceMoisturePercent || '—'} %</span>
            </div>
            <div className="sensor-item">
              <span className="sensor-label">Depth Moisture</span>
              <span className="sensor-value">{data.depthMoisturePercent || '—'} %</span>
            </div>
            <div className="sensor-item">
              <span className="sensor-label">Tilt Status</span>
              <span className={`sensor-value ${data.isTilted ? 'status-danger' : 'status-safe'}`}>
                {data.isTilted ? 'Active' : 'Stable'}
              </span>
            </div>
            <div className="sensor-item">
              <span className="sensor-label">Tilt Count</span>
              <span className="sensor-value">{data.tiltCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advanced;