import React from 'react';

import { Container, Box, Label } from './styles';

const Checkbox: React.FC = () => {
  return (
    <Container>
      <>
        <input type="checkbox" name="" id="teste" />
        <label htmlFor="teste">
          <Box />
          <Label>Teste</Label>
        </label>
      </>
      <span>Teste erro</span>
    </Container>
  );
};

export default Checkbox;
