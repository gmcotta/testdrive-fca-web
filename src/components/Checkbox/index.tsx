import React from 'react';

import { Container, Box, Label } from './styles';

type CheckboxTypes = {
  id: string;
  name: string;
  label: string;
  error?: string;
};

const Checkbox: React.FC<CheckboxTypes> = ({ id, name, label, error }) => {
  return (
    <Container>
      <>
        <input type="checkbox" name={name} id={id} />
        <label htmlFor={id}>
          <Box>
            <span>&#10003;</span>
          </Box>
          <Label>{label}</Label>
        </label>
      </>
      <span>{error}</span>
    </Container>
  );
};

export default Checkbox;
