import styled from 'styled-components';

type CheckboxProps = {
  hasError?: boolean;
};

export const Container = styled.div`
  display: inline-block;
  margin: 0.8rem 0;
`;

export const Wrapper = styled.div<CheckboxProps>`
  display: flex;
  flex-direction: column;

  > input {
    z-index: -1000;
    position: absolute;

    ~ label div {
      background-color: var(--color-white);
    }

    &:checked ~ label div {
      background-color: var(--color-primary);

      & span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &:disabled ~ label {
      cursor: not-allowed;
    }

    &:disabled ~ label div {
      background-color: var(--color-gray-light);
      border-color: var(--color-gray);
    }
  }

  > label {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${props =>
      props.hasError ? 'var(--color-red)' : 'var(--color-dark)'};
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;

export const Box = styled.div<CheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid
    ${props => (props.hasError ? 'var(--color-red)' : 'var(--color-primary)')};
  border-radius: 4px;

  & span {
    display: none;
    color: var(--color-light);
  }
`;

export const Label = styled.span`
  margin-left: 0.8rem;
  font-size: 1.2rem;
`;
