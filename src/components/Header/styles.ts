import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeadingPrimary } from '../Typography';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 5.6rem;
  background-color: var(--color-white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  & h1 {
    color: var(--color-gray-dark);
    font-weight: 100;
    font-size: 2.8rem;
    text-transform: uppercase;
  }
`;

export const Description = styled(HeadingPrimary)`
  color: var(--color-primary);
`;
