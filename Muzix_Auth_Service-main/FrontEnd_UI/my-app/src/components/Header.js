import React, { useState } from 'react';

const Header = ({ currentView, onSignIn, onSignUp, onHome, user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onHome}>
          <h1>NETFLIX</h1>
        </div>
        <div className="header-buttons">
          {user ? (
            <div className="user-menu">
              <div className="profile-dropdown">
                <button className="profile-button" onClick={toggleDropdown}>
                  {user.email} ▼
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={onLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Only show Sign In button when NOT on home page or login page */}
              {currentView !== 'login' && currentView !== 'home' && (
                <button className="btn-signin" onClick={onSignIn}>
                  Sign In
                </button>
              )}
              {/* Only show Sign Up button when on login page */}
              {currentView === 'login' && (
                <button className="btn-signup" onClick={onSignUp}>
                  Sign Up
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;