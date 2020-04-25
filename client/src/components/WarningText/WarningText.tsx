import React from 'react';

import './WarningText.scss';

interface IProps {
  text: string;
}

const WarningText = ({ text }: IProps) => {
  return <p className="warning-text">{text}</p>;
};

export default WarningText;
