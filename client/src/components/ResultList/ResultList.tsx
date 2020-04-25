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
        <div>JOU</div>
      ))}
    </div>
  );
};

export default ResultList;
