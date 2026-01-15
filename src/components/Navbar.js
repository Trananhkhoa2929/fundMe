import React, { useState, useEffect } from 'react';
import '../styles/Navbar.scss';

const Navbar = ({ account, connectWallet, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window. scrollY > 20);
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
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">CryptoGive</span>
          </div>

          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(! mobileMenuOpen)}
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

            {account ?  (
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 7V17M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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