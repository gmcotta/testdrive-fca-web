import React from 'react';

import logo from '../../assets/logo.svg';
import argo from '../../assets/argo1.png';
import renegade from '../../assets/renegade1.png';

import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';

import {
  Container,
  LeftSection,
  RightSection,
  ButtonWrapper,
  HomeButton,
  Title,
  ImageWrapper,
  Shape,
  Content,
} from './styles';

const HomePage: React.FC = () => {
  return (
    <Container>
      <LeftSection>
        <img src={logo} alt="FCA logo" />
        <Title>TEST DRIVE</Title>
        <ButtonWrapper>
          <HomeButton>Agende um test drive</HomeButton>
          <HomeButton>Avalie seu test drive</HomeButton>
        </ButtonWrapper>
      </LeftSection>
      <RightSection>
        <Shape />
        <ParagraphPrimary>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          assumenda minima quisquam officia aspernatur consequatur, maxime nemo
          iusto dolore non perspiciatis suscipit fuga adipisci, ullam, qui
          repellendus a alias nihil. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quia assumenda minima quisquam officia aspernatur
          consequatur, maxime nemo iusto dolore non perspiciatis suscipit fuga
          adipisci, ullam, qui repellendus a alias nihil. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quia assumenda minima quisquam
          officia aspernatur consequatur, maxime nemo iusto dolore non
          perspiciatis suscipit fuga adipisci, ullam, qui repellendus a alias
          nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          assumenda minima quisquam officia aspernatur consequatur, maxime nemo
          iusto dolore non perspiciatis suscipit fuga adipisci, ullam, qui
          repellendus a alias nihil. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quia assumenda minima quisquam officia aspernatur
          consequatur, maxime nemo iusto dolore non perspiciatis suscipit fuga
          adipisci, ullam, qui repellendus a alias nihil.
        </ParagraphPrimary>

        {/* <Content>
          <HeadingPrimary className="light">
            Faça um test drive conosco
          </HeadingPrimary>
          <ImageWrapper>
            <img src={argo} alt="Fiat Argo" />
            <img src={renegade} alt="Jeep Renegade" />
          </ImageWrapper>
          <ParagraphPrimary className="light">
            A explicação técnica de um modelo é fundamental, mas jamais
            substituirá a experiência de dirigir um automóvel do grupo FCA. Por
            isso, fazemos questão de garantir aos nossos clientes uma
            demonstração dos automóveis antes da compra, através do agendamento
            de um Test Drive.
          </ParagraphPrimary>
        </Content> */}
      </RightSection>
    </Container>
  );
};

export default HomePage;
