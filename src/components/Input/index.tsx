import React from 'react';

import { Container } from './styles';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  touched?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  value,
  placeholder,
  hasError,
  errorMessage,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <Container hasError={hasError}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {hasError && <span>{errorMessage}</span>}
    </Container>
  );
};

export default Input;
