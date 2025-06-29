import './App.css'
import React, { useState, useEffect } from 'react';
import Solar from './Solar';
import WelcomeScreen from './components/WelcomeScreen';
import RocketLoader from './RocketLoader';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('orbix-visited');
    if (visited) {
      setHasVisited(true);
      setShowWelcome(false);
    }
  }, []);

  const handleStart = () => {
    setIsLoading(true);
    // Show loading for 3 seconds to display the RocketLoader
    setTimeout(() => {
      setShowWelcome(false);
      setIsLoading(false);
      // Mark as visited
      localStorage.setItem('orbix-visited', 'true');
    }, 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('orbix-visited');
    setShowWelcome(true);
    setIsLoading(false);
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen onStart={handleStart} />
      ) : isLoading ? (
        <RocketLoader />
      ) : (
        <div className="relative">
          <Solar />
          {/* Reset button for development */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={handleReset}
              className="fixed bottom-4 right-4 z-50 bg-red-600/80 hover:bg-red-700/80 
                       text-white px-3 py-2 rounded-lg text-sm transition-colors backdrop-blur-sm"
            >
              Reset Welcome
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;
