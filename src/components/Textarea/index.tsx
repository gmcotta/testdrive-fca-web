import React, { useEffect, useState } from 'react';

import { Container, CharCounter } from './styles';

type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  hasCounter?: boolean;
  value: string;
};

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  name,
  value,
  minLength,
  maxLength,
  hasError,
  hasCounter,
  errorMessage,
  disabled,
  onChange,
  onBlur,
}) => {
  const [status, setStatus] = useState('min');

  useEffect(() => {
    setStatus('min');
    if (
      maxLength !== undefined &&
      minLength !== undefined &&
      value.length > minLength
    ) {
      setStatus('ok');
    }
    if (
      maxLength !== undefined &&
      value.length >= Math.floor(0.75 * maxLength)
    ) {
      setStatus('caution');
    }
    if (
      maxLength !== undefined &&
      value.length >= Math.floor(0.9 * maxLength)
    ) {
      setStatus('danger');
    }
    if (maxLength !== undefined && value.length === maxLength) {
      setStatus('max');
    }
  }, [value, maxLength, minLength]);

  return (
    <Container hasError={hasError}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        name={name}
        id={id}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <div>
        {hasError && <span>{errorMessage}</span>}
        {hasCounter && (
          <CharCounter status={status}>
            {`${value.length}/${maxLength}`}
          </CharCounter>
        )}
      </div>
    </Container>
  );
};

export default Textarea;
