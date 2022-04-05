// import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import CardMessage from '../../molecules/CardMessage/CardMessage';
import { AlwaysScrollToBottom } from '../../templates/Messages/Messages';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import Input from '../../atoms/Input/Input';

const Form = styled.form`
  padding: 1rem;
  align-items: flex-end;
  justify-self: flex-end;
  display: flex;
  flex-direction: column;
  > div:first-child {
    position: relative;
    width: 100%;
  }
  > div:last-child {
    width: 100%;
  }
`;

const ContactList = styled.div`
  padding: 0 0 3rem 0;
  height: 620px;
  overflow: auto;
  overscroll-behavior: contain;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;
  > div:first-child {
    min-width: 40px;
  }
  p {
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  }
  p:last-child {
    font-weight: normal;
  }
  > div:last-child {
    /* border-bottom: 1px solid grey; */
    width: 100%;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main9};
  }
`;

const ContainerFixed = styled.div`
  position: fixed;
  bottom: 0px;
  right: 1rem;
  z-index: 999;
  display: flex;
  gap: 1rem;
`;

const ChatBox = styled.div`
  position: fixed;
  right: 280px;
  bottom: 0;
  background: #e7e7e7;
  min-height: 50px;
  min-width: 300px;
  max-width: 500px;
  //padding: 0 0.5rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-height: 600px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    right: 70px;
  }

  ${({ theme }) => theme.down('550px')} {
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    max-width: none;
    //height: 600px;
    //justify-content: space-between;
  }

  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid grey;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    background: ${({ theme }) => theme.color.main2};

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main7};
    }
  }

  > div:first-child > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: white;
  }

  > div:first-child > div:nth-child(2) > svg:hover {
    cursor: pointer;
    border-radius: 50%;
    transform: scale(1.2);
  }

  > div:first-child > div:nth-child(2) > svg {
    position: relative;
    top: -6px;
    z-index: 1;
  }

  > div:nth-child(2) {
    //max-height: 300px;
    //min-width: 300px;
    //max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    //align-self: center;
    gap: 0.1rem;
    overflow: auto;
    overscroll-behavior: contain;

    ${({ theme }) => theme.down(theme.breakpoint.m)} {
      min-width: 200px;
      //max-width: 250px;
      max-height: none;
    }
  }
`;

const ChatBoxSmall = styled.div`
  position: fixed;
  right: 280px;
  bottom: 0;
  height: 50px;
  min-width: 200px;
  padding: 0 0.5rem;
  background: ${({ theme }) => theme.color.main2};
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  display: flex;
  justify-content: space-between;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: white;
  }
  > div:last-child > svg:hover {
    cursor: pointer;
    transform: scale(1.2);
    border-radius: 50%;
  }
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    right: 70px;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main7};
  }
`;

const Container = styled.div`
  height: 50px;
  min-width: 250px;
  padding: 0 0.5rem;
  color: white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;
  background: ${({ theme }) => theme.color.main2};
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.6rem;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  box-shadow: 0px 0px 0.1px rgba(0, 0, 0, 0.024), 0px 0px 0.3px rgba(0, 0, 0, 0.045),
    0px 0px 0.7px rgba(0, 0, 0, 0.065), 0px 0px 1.2px rgba(0, 0, 0, 0.083),
    0px 0px 2px rgba(0, 0, 0, 0.099), 0px 0px 3.2px rgba(0, 0, 0, 0.113),
    0px 0px 4.9px rgba(0, 0, 0, 0.125), 0px 0px 7.9px rgba(0, 0, 0, 0.133),
    0px 0px 13.6px rgba(0, 0, 0, 0.136), 0px 0px 27px rgba(0, 0, 0, 0.13);

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    width: 40px;
    height: 40px;
    min-width: 40px;
    p {
      display: none;
    }
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main7};
    // ${({ theme }) => theme.down(theme.breakpoint.m)} {
    //   background: none;
    // }
  }
`;

const ContainerOpenContactList = styled.div`
  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    gap: 2rem;
    align-items: center;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizeInter.ms};
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    height: 70px;
    border-bottom: 1px solid grey;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    background: ${({ theme }) => theme.color.main2};
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main7};
    }
  }
  color: white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-top: 1px solid white;
  height: 80vh;
  min-width: 250px;
  background: ${({ theme }) => theme.color.main7};
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
`;

const Microphone = styled(FaMicrophone)`
  position: absolute;
  top: 11px;
  right: 8px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const PWhite = styled.p`
  color: white;
`;

interface Message {
  message: string;
  receiverId: string;
}

const initialValue: Message = {
  message: '',
  receiverId: ''
};

function GlobalMessage() {
  const [isOpenContactList, setIsOpenContactList] = useState(false);
  const { inputs, handleChange, resetForm, setInputs } = useForm(initialValue);
  const [clientMessages, setClientMessages] = useState([]);
  const [actuallyClient, setActuallyClient] = useState<any[]>([]);
  const { userData, messages, openChatBoxWithThisUser, setOpenChatBoxWithThisUser, clientsGlobal } =
    useContext(Context);
  const { handleError } = useError();
  const [openChatWithMessages, setOpenChatWithMessages] = useState(false);
  const [displayChatBoxOnTheBottom, setDisplayChatBoxOnTheBottom] = useState(false);

  const handleOpenContactListChat = () => {
    setIsOpenContactList((prev) => !prev);
    setOpenChatWithMessages(false);
  };

  // Opening ChatBox With Messages
  const handleOpenChatBoxWithMessages = () => {
    setOpenChatWithMessages((prev) => !prev);
  };
  const handleCloseChatBoxWithMessages = (e: any) => {
    e.stopPropagation();
    setOpenChatWithMessages(false);
    setDisplayChatBoxOnTheBottom(false);
  };

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const sendMessage = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        if (res.status === 201) {
          resetForm();
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        handleError();
      }
    };
    sendMessage();
  };

  // Set actually client and his messages after click on his Avatar
  const handleOpenChatBox = (id: string) => {
    setClientMessages(messages.filter((item: any) => item.creator === id || item.receiver === id));
    setActuallyClient(clientsGlobal.filter((item: any) => item._id === id));
    setIsOpenContactList(false);
    setOpenChatWithMessages(true);
    setDisplayChatBoxOnTheBottom(true);
  };

  const handleCloseMessagesAndContactList = () => {
    setOpenChatWithMessages(false);
    setIsOpenContactList(false);
  };

  // Assign actually client id to inputs.receiverId
  useEffect(() => {
    if (actuallyClient.length > 0) {
      inputs.receiverId = actuallyClient[0]._id;
    }
  }, [actuallyClient]);

  // If messages changes thanks to SSE(Server Sent Events) then we display new message
  useEffect(() => {
    if (actuallyClient.length > 0) {
      setClientMessages(
        messages.filter(
          (item: any) =>
            item.creator === actuallyClient[0]._id || item.receiver === actuallyClient[0]._id
        )
      );
    }
  }, [messages]);

  useEffect(() => {
    if (openChatBoxWithThisUser) {
      handleOpenChatBox(openChatBoxWithThisUser);
      setOpenChatBoxWithThisUser('');
    }
  }, [openChatBoxWithThisUser]);

  const containerFixed = useRef(null);

  useOnClickOutside(containerFixed, handleCloseMessagesAndContactList);

  const handleSpeech = () => {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; // webkitSpeechRecognition for Chrome and SpeechRecognition for FF
    const recognition = new window.SpeechRecognition();
    recognition.lang = 'en';
    recognition.onresult = (event: any) => {
      // SpeechRecognitionEvent type
      const speechToText = event.results[0][0].transcript;

      setInputs({
        ...inputs,
        message: `${inputs.message.trim()} ${speechToText}`
      });
    };
    recognition.start();
  };

  return (
    <ContainerFixed ref={containerFixed}>
      {openChatWithMessages ? (
        <ChatBox>
          <div onClick={handleOpenChatBoxWithMessages}>
            <div>
              <RoundedPhoto
                width="40px"
                height="40px"
                img={actuallyClient[0].avatar || actuallyClient[0].google?.picture}
                alt="avatar"
                name={actuallyClient[0].name}
              />
              <PWhite>{actuallyClient.length > 0 && actuallyClient[0].name}</PWhite>
            </div>
            <div>
              <MdOutlineClose
                color="white"
                fontSize={18}
                onClick={handleCloseChatBoxWithMessages}
              />
            </div>
          </div>
          <div>
            {clientMessages.map((item: any, i) => (
              <CardMessage
                // style={{ marginLeft: item.creator === userData.userId ? 'auto' : null }}
                marginLeft={item.creator === userData.userId}
                /* eslint-disable-next-line react/no-array-index-key */
                key={i}
                message={item}
              />
            ))}
            {/* <div ref={lastRef} /> */}
            <AlwaysScrollToBottom />
          </div>
          <Form onSubmit={handleSubmitMessage}>
            <div>
              <Input
                placeholder="Write a Message..."
                name="message"
                onChange={handleChange}
                value={inputs.message}
              />
              <Microphone fontSize={18} onClick={handleSpeech} />
            </div>
            <Button text="Send a Message" type="submit" width="100%" />
          </Form>
        </ChatBox>
      ) : (
        displayChatBoxOnTheBottom && (
          <ChatBoxSmall onClick={handleOpenChatBoxWithMessages}>
            <div>
              <RoundedPhoto
                width="40px"
                height="40px"
                img={actuallyClient[0].avatar || actuallyClient[0].google?.picture}
                alt="avatar"
                name={actuallyClient[0].name}
              />
              <PWhite>{actuallyClient.length > 0 && actuallyClient[0].name}</PWhite>
            </div>
            <div>
              <MdOutlineClose
                color="white"
                fontSize={18}
                onClick={handleCloseChatBoxWithMessages}
              />
            </div>
          </ChatBoxSmall>
        )
      )}
      {isOpenContactList ? (
        <ContainerOpenContactList>
          <div onClick={handleOpenContactListChat}>
            <RoundedPhoto
              width="40px"
              height="40px"
              img={userData.avatar}
              alt="avatar"
              name={userData.name}
            />
            <p>Messages</p>
            <TiMessages fontSize={28} />
          </div>
          <div>
            <ContactList>
              {clientsGlobal.map((clientData: any) => (
                <Contact key={clientData._id} onClick={() => handleOpenChatBox(clientData._id)}>
                  <RoundedPhoto
                    img={clientData.avatar || clientData.google?.picture}
                    alt="face"
                    width="40px"
                    height="40px"
                    name={clientData.name}
                  />
                  <div>
                    <p>{clientData.name}</p>
                  </div>
                </Contact>
              ))}
            </ContactList>
          </div>
        </ContainerOpenContactList>
      ) : (
        <Container onClick={handleOpenContactListChat}>
          <p>Messages</p>
          <TiMessages fontSize={28} />
        </Container>
      )}
    </ContainerFixed>
  );
}

export default GlobalMessage;
