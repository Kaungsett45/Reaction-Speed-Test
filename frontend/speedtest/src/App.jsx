import React, { useState } from "react";
import Navigation from "./components/Navigation";
import TestPage from "./pages/TestPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  const [currentPage, setCurrentPage] = useState('test');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleScoreSubmitted = () => {
    setRefreshKey(k => k + 1);
    // Don't auto-redirect, just refresh leaderboard data
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'test' && (
        <TestPage onScoreSubmitted={handleScoreSubmitted} />
      )}
      
      {currentPage === 'leaderboard' && (
        <div key={refreshKey}>
          <LeaderboardPage />
        </div>
      )}
    </div>
  );
}

export default App;
