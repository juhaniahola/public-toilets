import React from 'react';

import image from './empty-roll.png';

import './NoResults.scss';

const NoResults = () => {
  return (
    <div className="no-results">
      <img src={image} alt="empty-roll" />
      <p>Voi ei... Ei yleisiä vessoja lähialueella :(</p>
    </div>
  );
};

export default NoResults;
