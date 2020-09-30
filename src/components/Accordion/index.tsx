import React, { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

import { Container, ItemContainer, ItemTitle, ItemContent } from './style';

import './style.css';

type AccordionItemProps = {
  title: string;
  content: string[][];
};

type AccordionProps = {
  titles: string[];
  contents: string[][][];
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <ItemContainer>
      <ItemTitle
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <h1>{title}</h1>
        {isActive ? <MdRemove size={20} /> : <MdAdd size={20} />}
      </ItemTitle>
      <ItemContent isActive={isActive}>
        {content.map(item => (
          <div>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
          </div>
        ))}
      </ItemContent>
    </ItemContainer>
  );
};

const Accordion: React.FC<AccordionProps> = ({ titles, contents }) => {
  return (
    <Container>
      {JSON.stringify(titles, null, 2)}
      {JSON.stringify(contents, null, 2)}
      {/* <AccordionItem title={titles} content={content} /> */}
      {/* <AccordionItem
        title="Consumo"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      />
      <AccordionItem
        title="Segurança"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      />
      <AccordionItem
        title="Manutenção"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      />
      <AccordionItem
        title="Conforto"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      />
      <AccordionItem
        title="Design"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      />
      <AccordionItem
        title="Acessórios"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, possimus exercitationem consequuntur nostrum soluta excepturi amet necessitatibus, asperiores blanditiis ratione consequatur recusandae"
      /> */}
    </Container>
  );
};

export default Accordion;
