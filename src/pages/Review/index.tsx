import React from 'react';

import Header from '../../components/Header';
import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';

import { Content } from './styles';

const Review: React.FC = () => {
  return (
    <>
      <Header description="Avaliação" />
      <Content>
        <HeadingPrimary>Identificação</HeadingPrimary>
        <ParagraphPrimary>
          Digite seu código de identificação emitido no agendamento.
        </ParagraphPrimary>
        <ParagraphPrimary>
          Caso queira, também pode fazer a avaliação de maneira anônima.
        </ParagraphPrimary>
      </Content>
    </>
  );
};

export default Review;
