import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const LoadingSpin = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #eae2b7;
  border-right: 16px solid #001523;
  border-bottom: 16px solid #9e0059;
  width: 120px;
  height: 120px;
  -webkit-animation: ${Spin} 3s linear infinite;
  animation: ${Spin} 3s linear infinite;
`;
