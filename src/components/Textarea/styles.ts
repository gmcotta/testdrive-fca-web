import styled from 'styled-components';

type TextareaProps = {
  hasError?: boolean;
};

type CounterProps = {
  status?: string;
};

type StatusProps = {
  [key: string]: string;
};

export const Container = styled.div<TextareaProps>`
  display: flex;
  max-width: 100%;
  flex-direction: column;

  > label {
    color: ${props =>
      props.hasError ? 'var(--color-red)' : 'var(--color-dark)'};
    font-size: 2rem;
    font-weight: 500;
  }

  > textarea {
    resize: none;
    height: 8.8rem;
    background-color: var(--color-white);
    border: 1px solid
      ${props => (props.hasError ? 'var(--color-red)' : 'var(--color-primary)')};
    border-radius: 4px;
    margin: 0.8rem 0;
    padding: 0.8rem;

    &:disabled {
      background-color: var(--color-gray-light);
      border-color: var(--color-gray);
      cursor: not-allowed;
    }
  }

  & span {
    font-size: 1.2rem;
    color: var(--color-red);
    font-weight: 500;
    clear: both;
  }
`;

const statusColors: StatusProps = {
  ok: 'var(--color-dark)',
  caution: 'var(--color-yellow)',
  danger: 'var(--color-orange)',
  full: 'var(--color-red)',
};

export const CharCounter = styled.div<CounterProps>`
  color: ${props => props.status !== undefined && statusColors[props.status]};
  text-align: right;
  font-size: 1.2rem;
  float: right;
`;
