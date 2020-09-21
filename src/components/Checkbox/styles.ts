import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > input {
    display: none;

    &:checked ~ label div {
      background-color: var(--color-primary);
      color: var(--color-primary);
    }
  }

  > label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;

export const Box = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
`;

export const Label = styled.span`
  margin-left: 0.8rem;
  font-size: 1.6rem;
`;