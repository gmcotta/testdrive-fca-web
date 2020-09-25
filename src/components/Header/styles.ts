import styled from 'styled-components';
import { HeadingPrimary } from '../Typography';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 5.6rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  > h1 {
    color: var(--color-gray-dark);
    font-weight: 100;
    font-size: 2.8rem;
    text-transform: uppercase;
  }
`;

export const Description = styled(HeadingPrimary)`
  color: var(--color-primary);
`;
