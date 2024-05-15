import React from 'react'
import Dashboard from './Dashboard/Dashboard'

function Home() {
  return (
    <>
      <Dashboard />
      <div className="role-container">
        {" "}
        {/* Apply CSS class for centering */}
        <h1>Home</h1> {/* Your Role content */}
      </div>
    </>
  );
}

export default Home