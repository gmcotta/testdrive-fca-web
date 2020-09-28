import React from 'react';

import logo from '../../assets/logo.svg';

import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';

import {
  Container,
  LeftSection,
  RightSection,
  ButtonWrapper,
  HomeButton,
  Title,
  Content,
} from './styles';

const HomePage: React.FC = () => {
  return (
    <Container>
      <LeftSection>
        <img src={logo} alt="FCA logo" />
        <Title>TEST DRIVE</Title>
        <ButtonWrapper>
          <HomeButton to="/appointment">Agende um test drive</HomeButton>
          <HomeButton to="/review">Avalie seu test drive</HomeButton>
        </ButtonWrapper>
      </LeftSection>
      <RightSection>
        <Content>
          <HeadingPrimary className="light">
            Faça um test drive conosco
          </HeadingPrimary>
          <ParagraphPrimary className="light">
            A explicação técnica de um modelo é fundamental, mas jamais
            substituirá a experiência de dirigir um automóvel do grupo FCA. Por
            isso, fazemos questão de garantir aos nossos clientes uma
            demonstração dos automóveis antes da compra, através do agendamento
            de um Test Drive.
          </ParagraphPrimary>
        </Content>
      </RightSection>
    </Container>
  );
};

export default HomePage;
