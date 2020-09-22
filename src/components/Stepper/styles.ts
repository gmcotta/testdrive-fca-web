import styled from 'styled-components';

export const Container = styled.div``;

export const StepperHeader = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 1.6rem;
`;

export const HeaderStep = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  > div {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    color: var(--color-light);
    font-size: 2.4rem;

    &.next {
      background-color: var(--color-gray-light);
      color: var(--color-dark);
    }

    > span.checkmark {
      display: flex;
      align-items: center;
    }
  }
`;

export const ProgressLine = styled.div`
  display: flex;
  flex: auto;
  align-items: center;

  > span {
    display: flex;
    flex: auto;
    height: 2px;
    background-color: var(--color-gray-light);
    margin: 0 1.6rem;

    &.passed {
      background-color: var(--color-primary);
    }
  }
`;

export const StepperFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid var(--color-primary);
  padding-top: 1.6rem;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 2rem;
    text-transform: uppercase;
    text-decoration: none;
    background-color: var(--color-primary);
    color: var(--color-light);

    &:hover {
      font-weight: 700;
    }

    &:disabled {
      opacity: 0;
      cursor: default;
    }
  }
`;
