import styled from 'styled-components';

type ItemContentProps = {
  isActive: boolean;
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;

export const ItemContainer = styled.div`
  margin-bottom: 0.8rem;
`;

export const ItemTitle = styled.div`
  display: flex;
  flex: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid var(--color-primary);
`;

export const ItemContent = styled.div<ItemContentProps>`
  display: ${props => (props.isActive ? 'block' : 'none')};
  margin-top: 0.8rem;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;

    & span:nth-child(2) {
      font-weight: 700;
    }
  }

  & div:nth-child(odd) {
    background-color: var(--color-gray-light);
  }
`;
