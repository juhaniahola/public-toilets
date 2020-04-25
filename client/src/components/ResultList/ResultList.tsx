import React from 'react';
import './ResultList.scss';
import { IToilet } from '../../types/toilet.interface';

interface IProps {
  results: IToilet[];
}

const ResultList = ({ results }: IProps) => {
  return (
    <div className="result-list">
      {results.map((result) => (
        <div className="result-list__item" key={result._id}>
          <p className="result-list__item-text">{result.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
