import React from 'react';
import styled from 'styled-components';

interface MessageStyled {
  marginLeft: boolean;
  position: string | undefined;
}

const Container = styled.div<MessageStyled>`
  max-width: 80%;
  margin: ${({ marginLeft: m }) => (m ? '0 0.4rem 0 auto' : '0 0.4rem')};
  position: ${({ position }) => position && position};
  > div > p {
    background: #5757f3;
    border-radius: 1.4rem;
    padding: 0.2rem 0.6rem;
    color: white;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  }
  > div > span {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xxxs};
    color: grey;
  }
  > div {
    display: flex;
    flex-direction: ${({ marginLeft: m }) => (m ? 'row-reverse' : 'row')};
  }
`;

interface Message {
  message: {
    text: string;
    creator: string;
    receiver: string;
    nameCreator: string;
    nameReceiver: string;
    createdAt: string;
  };
  marginLeft: boolean;
  idName?: string;
  position?: string | undefined;
}

const CardMessage = React.forwardRef(
  ({ message, marginLeft, idName, position }: Message, ref: any) => {
    const date = new Date(message.createdAt).toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return (
      <Container marginLeft={marginLeft} id={idName} position={position} ref={ref}>
        <div>
          <p>{message.text}</p>
          <span>{date}</span>
        </div>
      </Container>
    );
  }
);

CardMessage.defaultProps = {
  idName: undefined,
  position: undefined
};

export default CardMessage;
