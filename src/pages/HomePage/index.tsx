import React from 'react';

import { HeadingPrimary, ParagraphPrimary } from '../../components/Typography';
import Button from '../../components/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeadingPrimary className="light">
        Faça um test drive conosco
      </HeadingPrimary>
      <ParagraphPrimary className="light text--center">
        A explicação técnica de um modelo é fundamental, mas jamais substituirá
        a experiência de dirigir um automóvel do grupo FCA. Por isso, fazemos
        questão de garantir aos nossos clientes uma demonstração dos automóveis
        antes da compra, através do agendamento de um Test Drive.
      </ParagraphPrimary>
      <Button>Agende um test drive</Button>
    </div>
  );
};

export default HomePage;
