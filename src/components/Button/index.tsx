import React from 'react';

import { Wrapper } from './styles';

const Button: React.FC = ({ children }) => {
  return <Wrapper to="/">{children}</Wrapper>;
};

export default Button;
