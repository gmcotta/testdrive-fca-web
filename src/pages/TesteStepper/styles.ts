import styled from 'styled-components';

export const StepperFooter = styled.footer`
  border-top: 1px solid var(--color-primary);
  padding-top: 1.6rem;
  display: flex;
  justify-content: space-between;

  > button {
    padding: 0.8rem;
    text-transform: uppercase;
    border: 0;
    border-radius: 4px;
    background-color: var(--color-primary);
    color: var(--color-light);

    &:not(:disabled):hover {
      font-weight: 700;
    }

    &:disabled {
      background-color: var(--color-gray);
      color: var(--color-gray-dark);
      cursor: not-allowed;
    }
  }
`;
