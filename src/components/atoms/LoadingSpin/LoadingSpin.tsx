import React from 'react';
import styled, { keyframes } from 'styled-components';

import NSx512 from '../../../assets/images/Logos/x512/NSx512.png';

/* const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`; */

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }`;

const Logo = styled.div`
  animation: ${Spin} 1s infinite;
`;
/* const LoadingSpinStyle = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #eae2b7;
  border-right: 16px solid #001523;
  border-bottom: 16px solid #9e0059;
  width: 100px;
  height: 100px;
  -webkit-animation: ${Spin} 3s linear infinite;
  animation: ${Spin} 3s linear infinite;
`; */

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function LoadingSpin() {
  return (
    <Container>
      {/* <LoadingSpinStyle /> */}
      <Logo>
        <img width="120px" src={NSx512} alt="NomadStudio Logo" />
      </Logo>
    </Container>
  );
}
