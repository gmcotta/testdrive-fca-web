import styled, { css } from 'styled-components';

type ItemContentProps = {
  isActive: boolean;
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.8rem;
  background-color: var(--color-white);
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid var(--color-primary);
`;

export const ItemContainer = styled.div`
  margin-bottom: 0.8rem;
  background-color: var(--color-white);
`;

export const ItemTitle = styled.div`
  display: flex;
  flex: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-primary);

  & h1 {
    font-size: 1.8rem;
  }
`;

export const ItemContent = styled.div<ItemContentProps>`
  display: ${props => (props.isActive ? 'block' : 'none')};
  margin-top: 0.8rem;
  transform: ${props =>
    props.isActive ? 'translateY(0)' : 'translateY(calc(-100% - 20px))'};
  opacity: ${props => (props.isActive ? '1' : '0')};
  transition: 0.4s;
  background-color: var(--color-white);

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    padding: 0 0.8rem;

    & span:nth-child(2) {
      font-weight: 700;
      margin-left: 1.6rem;
    }
  }

  & div:nth-child(odd) {
    background-color: var(--color-gray-light);
  }
`;
