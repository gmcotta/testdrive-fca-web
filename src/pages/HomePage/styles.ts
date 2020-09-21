import styled from 'styled-components';

import Button from '../../components/Button';

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const LeftSection = styled.main`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  max-width: min(40rem, 30%);
  padding-left: 3.2rem;
`;

export const RightSection = styled.aside`
  background-color: var(--color-primary);
  width: 70%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);
  display: flex;
  position: relative;
`;

export const Shape = styled.div`
  float: left;
  width: 2000px;
  shape-outside: polygon(0 0, 100% 100%, 0 100%);
`;

export const Content = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
`;

export const ButtonWrapper = styled.div`
  > a:first-child {
    margin-bottom: 1.6rem;
  }
`;

export const HomeButton = styled(Button)`
  height: 56px;
`;

export const Title = styled.h1`
  font-weight: 100;
  color: var(--color-gray-dark);
  font-size: 10rem;
  text-align: center;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > img {
    width: 50%;
  }
`;
