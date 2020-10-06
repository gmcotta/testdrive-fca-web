import React from 'react';
import { MdCheck } from 'react-icons/md';

import { Container, Wrapper, Box, Label, ErrorMessage } from './styles';

type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  touched?: boolean;
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
      <Wrapper hasError={hasError}>
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
          <Box hasError={hasError}>
            <span>
              <MdCheck color="var(--color-white)" size={12} />
            </span>
          </Box>
          <Label>{label}</Label>
        </label>
      </Wrapper>
      {hasError && (
        <ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default Checkbox;
