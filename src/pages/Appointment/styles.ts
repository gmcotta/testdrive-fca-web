import styled from 'styled-components';

export const Container = styled.div``;

export const StepperForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 88rem;
  max-height: calc(100% - 5.6rem - 0.8rem);
  margin: 0.8rem auto 0;
  padding: 0.8rem;
`;

export const Step = styled.section`
  height: 100%;
`;

export const FormGroup = styled.div`
  margin-top: 4.8rem;
`;

export const StepperFooter = styled.footer`
  border-top: 2px solid var(--color-primary);
  padding-top: 1.6rem;
  margin-bottom: 1.6rem;
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
      cursor: pointer;
    }

    &:disabled {
      background-color: var(--color-gray);
      color: var(--color-gray-dark);
      cursor: not-allowed;
    }
  }
`;
