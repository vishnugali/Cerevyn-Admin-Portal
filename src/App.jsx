import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import Navbar from './components/ui/Navbar';
import Dashboard from './pages/Dashboard';
import JobOpenings from './pages/JobOpenings';
import Applicants from './pages/Applicants';
import Blog from './pages/Blog';
import Tutorials from './pages/Tutorials';
import Login from './pages/Login';

export default function App() {
  // Set this back to false so the Admin Portal Login page shows up first
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Handle routing between the different sidebar panels
  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobOpenings />;
      case 'applicants':
        return <Applicants />;
      case 'blog':
        return <Blog />;
      case 'tutorials':
        return <Tutorials />;
      default:
        return <Dashboard />;
    }
  };

  // If the user hasn't typed their password, show the login interface screen
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-shell app-container">
      {/* Navigation on the left */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLogout={() => setIsAuthenticated(false)}
      />
      
      {/* Dashboard or Panel View workspace content on the right */}
      <div className="content-surface">
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
}