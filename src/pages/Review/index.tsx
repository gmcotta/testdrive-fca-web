import React from 'react';

import Header from '../../components/Header';
import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

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

        {/* <Input
          id="identification"
          name="identification"
          label="Identificação"
          error="Teste erro"
        /> */}

        <Checkbox
          id="anonymous"
          name="anonymous"
          label="Quero avaliar anonimamente"
          error="Teste erro checkbox"
        />
      </Content>
    </>
  );
};

export default Review;
