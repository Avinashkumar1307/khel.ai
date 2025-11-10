// @ts-nocheck
import React, { useState, useEffect } from "react";
import { GlobeDemo } from "../components/GlobeDemo";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const globeTransform = Math.min(scrollY * 0.5, 400);

  return (
    <div className="app-container overflow-hidden">
      {/* Hero Section with Globe */}
      <div style={{ transform: `translateY(-${globeTransform}px)` }}>
        <GlobeDemo />
      </div>

      {/* Content Sections */}
      <div className="content-wrapper">
        {/* Ecosystem Section */}
        <section className="section ecosystem-section">
          <div className="section-content">
            <h2>🌎 ECOSYSTEM</h2>
            <p>
              We bridge sports, gaming, and lifestyle by transforming
              collectibles into dynamic, cross-platform assets across mobile
              games.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="section features-section">
          <div className="section-content">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎮</div>
                <h3>Gaming Integration</h3>
                <p>
                  Seamlessly integrate your digital assets across multiple
                  gaming platforms and experiences.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>Athlete Tracking</h3>
                <p>
                  Real-time tracking of athlete performance and their digital
                  asset valuations worldwide.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Analytics Dashboard</h3>
                <p>
                  Comprehensive analytics and insights into your portfolio's
                  performance and growth.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔗</div>
                <h3>Cross-Platform</h3>
                <p>
                  Your assets work everywhere - from mobile games to desktop
                  applications seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section stats-section">
          <div className="section-content">
            <h2>Global Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Athletes Tracked</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Digital Assets</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Game Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section how-it-works-section">
          <div className="section-content">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">01</div>
                <h3>Select Athletes</h3>
                <p>
                  Browse our global database of athletes from various sports and
                  leagues.
                </p>
              </div>
              <div className="step-connector">→</div>
              <div className="step">
                <div className="step-number">02</div>
                <h3>Acquire Assets</h3>
                <p>
                  Convert athlete profiles into dynamic digital collectibles.
                </p>
              </div>
              <div className="step-connector">→</div>
              <div className="step">
                <div className="step-number">03</div>
                <h3>Use Everywhere</h3>
                <p>
                  Deploy your assets across games, platforms, and experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="section-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of users already transforming sports into digital
              experiences.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Start Now</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Global Assets Tracker</h4>
              <p>
                Bridging sports, gaming, and lifestyle through dynamic digital
                assets.
              </p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Athletes</li>
                <li>Games</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Global Dynamic Assets Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          background: #000000;
          overflow-x: hidden;
        }

        .app-container {
          min-height: 100vh;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
          background: #000000;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.1s ease-out;
        }

        .header-title {
          padding: 30px 20px 10px;
          margin: 0;
          text-align: center;
          font-weight: 300;
          font-size: 2.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff 0%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 10;
        }

        .header-subtitle {
          text-align: center;
          color: #888;
          font-size: 1.1rem;
          margin: 0 0 20px 0;
          letter-spacing: 1px;
        }

        .canvas-wrapper {
          height: 100vw;
          width: 100vw;
          // max-width: 800px;
          // max-height: 800px;
          position: relative;
          margin: 0 auto;
          background: radial-gradient(
            circle at center,
            #0a0a0a 0%,
            #000000 100%
          );
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #888;
          font-size: 0.9rem;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          font-size: 2rem;
          color: #ff4500;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          background: linear-gradient(
            180deg,
            #000000 0%,
            #0a0a0a 50%,
            #000000 100%
          );
        }

        .section {
          padding: 80px 20px;
          width: 100%;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 50px;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .ecosystem-section {
          text-align: center;
          border-top: 1px solid rgba(255, 69, 0, 0.2);
        }

        .ecosystem-section p {
          color: #cccccc;
          line-height: 1.8;
          font-size: 1.1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .features-section {
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .feature-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(255, 69, 0, 0.2);
          border-radius: 15px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 69, 0, 0.5);
          box-shadow: 0 10px 40px rgba(255, 69, 0, 0.2);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #fff;
        }

        .feature-card p {
          color: #aaa;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .stats-section {
          background: radial-gradient(
            circle at center,
            #ff450020 0%,
            transparent 70%
          );
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-top: 50px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ff4500;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .how-it-works-section {
          background: #000000;
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 60px;
          flex-wrap: wrap;
        }

        .step {
          flex: 1;
          min-width: 250px;
          text-align: center;
          padding: 30px;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 700;
          color: #ff4500;
          margin-bottom: 20px;
          opacity: 0.3;
        }

        .step h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff;
        }

        .step p {
          color: #aaa;
          line-height: 1.6;
        }

        .step-connector {
          font-size: 2rem;
          color: #ff4500;
          opacity: 0.5;
        }

        .cta-section {
          text-align: center;
          padding: 100px 20px;
          background: radial-gradient(
            circle at center,
            #ff450030 0%,
            transparent 70%
          );
        }

        .cta-section h2 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .cta-section p {
          font-size: 1.2rem;
          color: #aaa;
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 40px;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: #ff4500;
          color: white;
        }

        .btn-primary:hover {
          background: #ff6b35;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 69, 0, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #ff4500;
          border: 2px solid #ff4500;
        }

        .btn-secondary:hover {
          background: rgba(255, 69, 0, 0.1);
          transform: translateY(-3px);
        }

        .footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(255, 69, 0, 0.2);
          padding: 60px 20px 20px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h4 {
          color: #ff4500;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .footer-section p {
          color: #888;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          color: #888;
          margin-bottom: 10px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-section ul li:hover {
          color: #ff4500;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 69, 0, 0.1);
          color: #666;
          font-size: 0.9rem;
        }

        :global(.info-card) {
          background: rgba(15, 15, 15, 0.95);
          border: 1px solid rgba(255, 69, 0, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(255, 69, 0, 0.3),
            0 0 20px rgba(255, 69, 0, 0.2);
          width: 240px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease-out;
          pointer-events: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.card-image-wrapper) {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }

        :global(.card-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        :global(.card-overlay) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(15, 15, 15, 1), transparent);
        }

        :global(.card-content) {
          padding: 10px;
        }

        :global(.card-name) {
          margin: 0 0 2px 0;
          font-size: 10px;
          font-weight: 600;
          color: #ffffff;
        }

        :global(.card-details) {
          margin: 0 0 10px 0;
          font-size: 15px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        :global(.card-location) {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #ff4500;
          margin-top: 8px;
        }

        :global(.location-icon) {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 1.8rem;
          }

          .header-subtitle {
            font-size: 0.95rem;
          }

          .canvas-wrapper {
            height: 90vw;
            width: 90vw;
            // max-width: 600px;
            // max-height: 600px;
          }

          .section {
            padding: 60px 20px;
          }

          .section h2 {
            font-size: 2rem;
          }

          .steps-container {
            flex-direction: column;
          }

          .step-connector {
            transform: rotate(90deg);
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
