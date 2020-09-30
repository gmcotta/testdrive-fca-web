import React, { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

import { Container, ItemContainer, ItemTitle, ItemContent } from './style';

type SpecProps = {
  title: string;
  content: [string, string][];
};

type AccordionProps = {
  specs: Array<SpecProps>;
};

const AccordionItem: React.FC<SpecProps> = ({ title, content }) => {
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
          <div key={item[0]}>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
          </div>
        ))}
      </ItemContent>
    </ItemContainer>
  );
};

const Accordion: React.FC<AccordionProps> = ({ specs }) => {
  return (
    <Container>
      {specs.map(spec => (
        <AccordionItem
          key={spec.title}
          title={spec.title}
          content={spec.content}
        />
      ))}
    </Container>
  );
};

export default Accordion;
