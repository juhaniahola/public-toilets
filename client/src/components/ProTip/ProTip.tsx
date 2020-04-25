import React from 'react';

import proTips from './proTips';

import './ProTip.scss';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const ProTip = () => {
  const tip = proTips[getRandomInt(proTips.length)];

  return (
    <div className="pro-tip">
      <h3>Pro tip</h3>
      <p>{tip}</p>
    </div>
  );
};

export default ProTip;
