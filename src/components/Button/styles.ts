import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: 2.4rem;
  text-transform: uppercase;
  text-decoration: none;
  background-color: var(--color-primary);
  color: var(--color-light);

  &:hover {
    font-weight: 700;
    transform: translateY(-4px);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  }
`;
