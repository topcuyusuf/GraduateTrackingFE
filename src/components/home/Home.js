import React from 'react';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <h2>Welcome to the Graduate Tracking System!</h2>
      </div>
      <div className="row">
        <p>-Hoşgeldiniz</p>
      </div>
      <div className="row">
        <button className="btn btn-primary" onClick={() => console.log('Navigating to another page...')}>
          Explore
        </button>
      </div>
    </div>
  );
}

export default Home;
