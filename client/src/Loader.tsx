import React from 'react';

import './App.css';

import roll from './toilet-roll.png'

const Loader = () => {
  return (
    <div className="App-loader-wrapper">
      <img src={roll} className="App-loader" alt="loader" />
    </div>
  );
};

export default Loader;