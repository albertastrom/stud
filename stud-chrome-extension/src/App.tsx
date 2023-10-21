import React from 'react';
import './App.css';
import stud from './assets/logo128.png';




const App: React.FC = () => {
  return (

    <div className="app-container">
      <div className="rounded-box"><img src={stud} alt="STUD Logo" /><h1>STUD6</h1></div>
    </div>
  );
};

export default App;
