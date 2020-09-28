import styled from 'styled-components';

type InputProps = {
  hasError?: boolean;
};

export const Container = styled.div<InputProps>`
  display: flex;
  flex-direction: column;

  > label {
    color: ${props =>
      props.hasError ? 'var(--color-red)' : 'var(--color-dark)'};
    font-size: 2rem;
    font-weight: 500;
  }

  > input {
    background-color: var(--color-white);
    height: 3.2rem;
    border: 1px solid
      ${props => (props.hasError ? 'var(--color-red)' : 'var(--color-primary)')};
    border-radius: 4px;
    margin-top: 0.8rem;
    padding-left: 1.6rem;

    &:disabled {
      background-color: var(--color-gray-light);
      border-color: var(--color-gray);
      cursor: not-allowed;
    }
  }

  > span {
    font-size: 1.2rem;
    color: var(--color-red);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;
