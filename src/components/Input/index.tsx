import React from 'react';

import { Container } from './styles';

type InputProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  placeholder,
  error,
}) => {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <input type="text" name={name} id={id} placeholder={placeholder} />
      <span>{error}</span>
    </Container>
  );
};

export default Input;
