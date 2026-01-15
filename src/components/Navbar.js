import React, { useState, useEffect } from 'react';
import '../styles/Navbar.scss';
import logo from '../assets/logo/logo.png';

const Navbar = ({ account, connectWallet, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={logo} alt="CryptoGive Logo" className="logo-icon" />
            <span className="logo-text">CryptoGive</span>
          </div>

          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('causes')} className="nav-link">
              Causes
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
              How It Works
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>

            {account ? (
              <div className="wallet-connected">
                <div className="wallet-indicator"></div>
                <span className="wallet-address">{formatAddress(account)}</span>
              </div>
            ) : (
              <button 
                onClick={connectWallet} 
                className="btn btn-primary btn-connect"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                    Connect Wallet
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;