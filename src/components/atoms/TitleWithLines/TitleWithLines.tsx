import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  h4 {
    /* border-top: 1px solid black;
    border-bottom: 1px solid black; */
    margin: 0;
    padding: 0;
    //width: max-content;
    //margin: 0 auto;
    text-align: center;
  }
`;

interface Title {
  text: string;
}

function TitleWithLines({ text }: Title) {
  return (
    <Container>
      <h4>{text}</h4>
    </Container>
  );
}

export default TitleWithLines;
