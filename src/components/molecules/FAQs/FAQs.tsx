import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export function Faq() {
  const data = [
    {
      title: 'Alpaca',
      description: 'Alpaca Description',
      id: 1
    },
    {
      title: 'Alpaca2',
      description: 'Alpaca Description2',
      id: 2
    },
    {
      title: 'Alpaca3',
      description: 'Alpaca Description3',
      id: 3
    }
  ];

  return (
    <Container>
      <div>
        {data.map((item) => (
          <AccordionItem key={item.id} itemToDisplay={item} />
        ))}
      </div>
    </Container>
  );
}

function AccordionItem({ itemToDisplay }: any) {
  const [showDescription, setShowDescription1] = useState(false);

  const handleOpenDescription = () => {
    setShowDescription1((prev) => !prev);
  };

  return (
    <Container>
      <div>
        <p onClick={handleOpenDescription}>{itemToDisplay.title}</p>
        {showDescription && <p>{itemToDisplay.description}</p>}
      </div>
    </Container>
  );
}
