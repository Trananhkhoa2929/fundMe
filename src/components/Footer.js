import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>CryptoGive</h3>
            <p>
              Empowering charitable giving through blockchain technology.
              Transparent, secure, and decentralized donations for a better world.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <div className="footer-links">
              <a href="#causes" className="footer-link">Browse Causes</a>
              <a href="#how-it-works" className="footer-link">How It Works</a>
              <a href="#" className="footer-link">Start Campaign</a>
              <a href="#" className="footer-link">Success Stories</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Smart Contracts</a>
              <a href="#" className="footer-link">Blog</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <div className="footer-links">
              <a href="#about" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 CryptoGive. Built with ♥ on Ethereum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
