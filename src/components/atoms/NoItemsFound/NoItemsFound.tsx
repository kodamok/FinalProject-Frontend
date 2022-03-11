import React from 'react';
import styled from 'styled-components';

interface PStyleI {
  textAlign?: string;
}

const PStyle = styled.p<PStyleI>`
  text-align: ${({ textAlign }) => textAlign && textAlign};
`;

interface NoItems {
  text: string;
  textAlign?: string;
}

function NoItemsFound({ text, textAlign }: NoItems) {
  return <PStyle textAlign={textAlign}>No {text} Found</PStyle>;
}

NoItemsFound.defaultProps = {
  textAlign: 'center'
};

export default NoItemsFound;
