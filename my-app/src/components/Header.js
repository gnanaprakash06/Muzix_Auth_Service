import React from 'react';

const Header = ({ currentView, onSignIn, onSignUp, onHome, user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onHome}>
          <h1>NETFLIX</h1>
        </div>
        <div className="header-buttons">
          {user ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.email}</span>
              <button className="btn-logout" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {currentView !== 'login' && (
                <button className="btn-signin" onClick={onSignIn}>
                  Sign In
                </button>
              )}
              {currentView !== 'signup' && (
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