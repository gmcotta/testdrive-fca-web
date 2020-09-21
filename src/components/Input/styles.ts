import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: var(--color-dark);
    font-size: 2rem;
    font-weight: 500;
  }

  > input {
    background-color: var(--color-light);
    height: 3.2rem;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
    margin-top: 0.8rem;
    padding-left: 1.6rem;
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;
