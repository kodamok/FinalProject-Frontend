import React from 'react';
import styled from 'styled-components';
import HeroSection from '../../organisms/HeroSection/HeroSection';
import SectionProductDesc1 from '../../organisms/SectionProductDesc1/SectionProductDesc1';
import SectionProductDesc2 from '../../organisms/SectionProductDesc2/SectionProductDesc2';
import SectionProductDesc3 from '../../organisms/SectionProductDesc3/SectionProductDesc3';

// EXAMPLE - using media queries from our theme

// const ContainerSections = styled.div(
//   ({ theme: { up, down, between, breakpoint: b } }) => `
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 0 auto;
//   ${up(b.s)} {
//     max-width: 550px;
//   }
//   ${up(b.m)} {
//     width: 90%;
//     max-width: 1440px;
//   }
//   ${between(b.m, b.l)} {
//     width: 90%;
//     max-width: 1440px;
//     background: black;
//   }
// @media (min-width: 440px) {
//  max-width: 550px;
// }
// @media (min-width: 980px) {
//  width: 90%;
//  max-width: 1440px;
// }
// $ {({ theme: { up, breakpoint } }) => up(breakpoint.s)} {
//  max-width: 550px;
// }
// $ {({ theme: { up, breakpoint: b } }) => up(b.m)} {
//  width: 90%;
//  max-width: 1440px;
// }
// $ {({ theme: { between, breakpoint: b } }) => between(b.m, b.l)} {
//  width: 90%;
//  max-width: 1440px;
//  background: black;
// }
// `
// );

// SECOND EXAMPLE ->

const ContainerSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  ${({ theme }) => theme.up(theme.breakpoint.s)} {
    max-width: 550px;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 90%;
    max-width: 1440px;
  }
`;

function HomePage(): JSX.Element {
  return (
    <div>
      <HeroSection />
      <ContainerSections>
        <SectionProductDesc1 />
        <SectionProductDesc2 />
        <SectionProductDesc3 />
      </ContainerSections>
    </div>
  );
}

export default HomePage;
