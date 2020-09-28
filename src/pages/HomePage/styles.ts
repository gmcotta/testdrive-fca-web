import styled from 'styled-components';

import Button from '../../components/Button';

import homeImage from '../../assets/home-page.png';

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
  max-width: min(40rem, 30vw);
  padding: 0 1.6rem;
`;

export const RightSection = styled.aside`
  background: url(${homeImage}) no-repeat;
  background-position: right 35% top;
  background-size: cover;
  width: 70vw;
  display: flex;
`;

export const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 6.4rem;
  text-align: center;

  & p {
    margin-top: 1.6rem;
  }
`;

export const ButtonWrapper = styled.div`
  & a:first-child {
    margin-bottom: 1.6rem;
  }
`;

export const HomeButton = styled(Button)`
  height: 5.6rem;
`;

export const Title = styled.h1`
  font-weight: 100;
  color: var(--color-gray-dark);
  font-size: 10rem;
  text-align: center;
`;
