import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Wrapper } from './styles';

const Button: React.FC<LinkProps> = ({ to, children }) => {
  return <Wrapper to={to}>{children}</Wrapper>;
};

export default Button;
