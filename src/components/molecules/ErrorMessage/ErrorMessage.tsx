import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/GeneralProvider';

interface Error {
  success: boolean | undefined;
}

const Title = styled.h4`
  color: grey;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

const shrinkAnimation = keyframes`
  from {
    transform: translateX(-50%) scaleX(1);
  }
  to {
    transform: translateX(-50%) scaleX(0);
  }
`;

const slideAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(500%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

export const Wrapper = styled.div<Error>`
  position: fixed;
  z-index: 9999;
  left: 50%;
  min-width: 300px;
  transform: translateX(-50%);
  bottom: 10%;
  background-color: white;
  padding: 25px 25px 15px;
  color: ${({ theme, success }) => (success ? 'green' : theme.color.main6)};
  border: 3px solid ${({ theme, success }) => (success ? 'green' : theme.color.main6)};
  border-radius: 15px;
  ${({ theme }) => theme.down(theme.breakpoint.s)} {
    min-width: 90%;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  }
  animation: ${slideAnimation} 1s ease-in-out 1 forwards,
    ${slideAnimation} 1s 6s ease-in-out 1 reverse forwards;
  ${Title} {
    color: ${({ theme, success }) => (success ? 'green' : theme.color.main6)};
    ${({ theme }) => theme.down(theme.breakpoint.s)} {
      font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
    }
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    background-color: ${({ theme, success }) => (success ? 'green' : theme.color.main6)};
    width: 60px;
    height: 5px;
    border-radius: 50px;
  }
  &::before {
    opacity: 0.5;
  }
  &::after {
    transform: translateX(-50%) scaleX(1);
    transform-origin: left top;
    animation: ${shrinkAnimation} 5s 1s linear 1 forwards;
  }
`;

interface Message {
  message?: string;
  success?: boolean;
  successMessage?: string;
}

function ErrorMessage({ message, success, successMessage }: Message) {
  const { myError, setMyError } = useContext(Context);

  useEffect(() => {
    if (myError.message || myError.successMessage) {
      setTimeout(() => {
        setMyError({
          message: '',
          success: false,
          successMessage: ''
        });
      }, 6400);
    } else {
      setMyError({
        message: '',
        success: false,
        successMessage: ''
      });
    }
  }, []);
  return (
    <Wrapper success={success}>
      <Title>{success ? 'Well Done!' : 'Oops!'}</Title>
      <p>{success ? successMessage : message}</p>
    </Wrapper>
  );
}

ErrorMessage.defaultProps = {
  message: 'Something went wrong. Please try again, or contact our support.',
  success: false,
  successMessage: 'Your action was successful.'
};

export default ErrorMessage;
