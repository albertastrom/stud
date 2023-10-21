import React from 'react';
import './App.css';
import './Title';
import stud from './IMG_0095.jpeg';




const App: React.FC = () => {
  return (

    <div className="app-container">
      <img src={stud} alt="STUD Logo" />
      <div className="rounded-box"><h1>STUD</h1></div>
    </div>
  );
};

export default App;
