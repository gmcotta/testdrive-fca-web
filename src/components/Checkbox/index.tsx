import React from 'react';

import { Container, Wrapper, Box, Label } from './styles';

type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  name,
  checked,
  hasError,
  errorMessage,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <Container>
      <Wrapper>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        <label htmlFor={id}>
          <Box>
            <span>&#10003;</span>
          </Box>
          <Label>{label}</Label>
        </label>
      </Wrapper>
      {hasError && <span>{errorMessage}</span>}
    </Container>
  );
};

export default Checkbox;
