import styled from 'styled-components';

type StepperHeaderStepsProps = {
  active?: boolean;
};

export const Container = styled.div``;

export const StepperForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 88rem;
  height: calc(100vh - 5.6rem);
  margin: 0 auto;
  padding: 0.8rem;
`;

export const StepperHeader = styled.header`
  border-bottom: 2px solid var(--color-primary);
  margin: 0.8rem 0;
  padding-bottom: 0.8rem;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span.stepper-header__steps-title {
      font-size: 2rem;
      margin-top: 0.8rem;
    }
  }
`;

export const StepperHeaderSteps = styled.span<StepperHeaderStepsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${props =>
    props.active ? 'var(--color-primary)' : 'var(--color-gray)'};
  color: ${props =>
    props.active ? 'var(--color-light)' : 'var(--color-dark)'};
  font-size: 1.6rem;
`;

export const StepperHeaderPaths = styled.div<StepperHeaderStepsProps>`
  height: 0.4rem;
  flex: 1;
  margin: 0 0.8rem;
  background-color: ${props =>
    props.active ? 'var(--color-primary)' : 'var(--color-gray)'};
`;

export const Step = styled.section`
  height: 100%;
`;

export const FormGroup = styled.div`
  margin-top: 4.8rem;
`;

export const StepperFooter = styled.footer`
  border-top: 2px solid var(--color-primary);
  padding-top: 0.8rem;
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
