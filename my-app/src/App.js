import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'signup', 'dashboard'
const [user, setUser] = useState(null);
const [token, setToken] = useState(null);

useEffect(() => {
// Check if user is already logged in
const savedToken = localStorage.getItem('jwtToken');
const savedUser = localStorage.getItem('user');


if (savedToken && savedUser) {
  setToken(savedToken);
  setUser(JSON.parse(savedUser));
  setCurrentView('dashboard');
  console.log('Restored token from localStorage:', savedToken);
}
}, []);

const handleLogin = (userData, authToken) => {
setUser(userData);
setToken(authToken);
localStorage.setItem('jwtToken', authToken);
localStorage.setItem('user', JSON.stringify(userData));
setCurrentView('dashboard');


// Display token in console
console.log('=== JWT TOKEN GENERATED ===');
console.log('Token:', authToken);
console.log('User:', userData);
console.log('========================');
};

const handleLogout = () => {
setUser(null);
setToken(null);
localStorage.removeItem('jwtToken');
localStorage.removeItem('user');
setCurrentView('home');
console.log('User logged out - token cleared');
};

const renderContent = () => {
switch(currentView) {
case 'login':
return (
<LoginForm
onLogin={handleLogin}
onBack={() => setCurrentView('home')}
onSwitchToSignup={() => setCurrentView('signup')}
/>
);
case 'signup':
return (
<SignupForm
onBack={() => setCurrentView('home')}
onSwitchToLogin={() => setCurrentView('login')}
/>
);
case 'dashboard':
return (
<Dashboard
user={user}
token={token}
onLogout={handleLogout}
/>
);
default:
return (
<div className="home-content">
<div className="hero-section">
<h1>Unlimited movies, TV shows, and more.</h1>
<h2>Watch anywhere,Cancel anytime.</h2>
<p>Ready to watch? Enter your email to create or restart your membership.</p>
<div className="cta-buttons">
<button
className="btn-primary"
onClick={() => setCurrentView('signup')}
>
Get Started
</button>
          </div>
        </div>
      </div>
    );
}
};
return (
<div className="App">
<Header
currentView={currentView}
onSignIn={() => setCurrentView('login')}
onSignUp={() => setCurrentView('signup')}
onHome={() => setCurrentView('home')}
user={user}
onLogout={handleLogout}
/>
{renderContent()}
</div>
);
}
export default App; 


