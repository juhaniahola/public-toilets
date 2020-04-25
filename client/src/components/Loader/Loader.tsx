import React from 'react';
import roll from './toilet-roll.png';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img src={roll} className="loader" alt="loader" />
    </div>
  );
};

export default Loader;
