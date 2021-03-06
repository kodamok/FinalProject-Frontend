import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaMicrophone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from '../../atoms/Button/Button';
import CardMessage from '../../molecules/CardMessage/CardMessage';
import { Context } from '../../../providers/GeneralProvider';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import PageHead from '../../molecules/PageHead/PageHead';
import Input from '../../atoms/Input/Input';

interface Props {
  selected?: any;
}

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 100%;
  //border: 10px solid purple;
  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    padding: 1rem 0;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  align-content: space-between;
  justify-content: space-between;
  flex-direction: column;
  //border: 10px solid purple;

  > div:first-child {
    position: relative;
    width: 100%;
  }
  > div:last-child {
    width: 100%;
    > button {
      border-bottom-right-radius: 0.4rem;
    }
  }
`;

const ContainerContactListAndMessages = styled.div`
  display: flex;
  border: 2px solid #1f313e;
  margin: 3rem 0;
  border-radius: 0.6rem;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  //margin: 0 auto;
  justify-content: space-between;
  ${({ theme }) => theme.up(theme.breakpoint.sm)} {
    margin: 3rem auto 3rem auto;
  }
  //gap: 3rem;
`;

const ContactList = styled.div`
  border-right: 1px solid #001523;
  overflow: hidden;
  overflow-y: auto;
  min-width: 200px;
  max-width: 250px;
  overscroll-behavior: contain;
  // TODO Not good - to FIX
  max-height: 610px;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;

  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    min-width: 70px;
    max-width: 70px;
  }
`;

const WrapperBoxMessage = styled.div`
  //border: 2px solid red;
  // ${({ theme }) => theme.down(theme.breakpoint.sm)} {
  //   width: 100%;
  //   min-width: 300px;
  // }
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
`;

const Contact = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #eae2b7;
  padding: 0.5rem 1rem 0.5rem 1rem;
  gap: 1rem;
  transition: 0.3s;
  background: #001523;
  color: white;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main9};
  }
  h5 {
    padding: 0;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
  }
  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    padding: 0.2rem;
    gap: 0;
    display: block;
    > div:first-child {
      display: none;
    }
  }
`;

const WrapperMessages = styled.div`
  //padding: 1rem;
  //border: 2px solid black;
  max-height: 100%;
  height: 500px;
  width: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  //gap: 0.4rem;
  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    overflow: auto;
    overscroll-behavior: contain;
    height: 100%;
    padding-top: 0.4rem;
  }
  ${({ theme }) => theme.up(theme.breakpoint.sm)} {
    min-width: 400px;
    max-width: 400px;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    min-width: 700px;
    max-width: 700px;
  }
  ${({ theme }) => theme.up(theme.breakpoint.l)} {
    min-width: 1000px;
    max-width: 1000px;
  }
`;

const PContainer = styled.div`
  background: ${({ theme }) => theme.color.main2};
  color: white;
  padding: 1rem;
  font-family: 'Inter';
  font-size: ${({ theme }) => theme.fontSizeInter.ms};
  border-top-right-radius: 0.4rem;
`;

const Microphone = styled(FaMicrophone)`
  position: absolute;
  top: 12px;
  right: 8px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

interface Message {
  message: string;
  receiverId: string;
}

const initialValue: Message = {
  message: '',
  receiverId: ''
};

function Messages() {
  const { t } = useTranslation();
  const { messages, userData } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [clientMessages, setClientMessages] = useState([]);
  const { inputs, handleChange, resetForm, setInputs } = useForm(initialValue);
  const { handleError } = useError();
  const [clients, setClients] = useState<any[]>([]);
  const [actuallyClient, setActuallyClient] = useState<any[]>([]);

  // Fetching Clients from Freelancer
  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/freelancer`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData?.token}`
        }
      });
      const resJSON = await res.json();

      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  // Fetching Freelancers from Client
  const fetchClientsForClient = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/freelancers`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData?.token}`
        }
      });
      const resJSON = await res.json();

      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  // onSubmit Form - Send a Message
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
  const handleDisplayMessages = (id: string) => {
    setClientMessages(messages.filter((item: any) => item.creator === id || item.receiver === id));
    setActuallyClient(clients.filter((item: any) => item._id === id));
  };

  // Fetching Clients
  useEffect(() => {
    if (userData.token && userData.role === 'Freelancer') {
      fetchClients();
    }
    if (userData.token && userData.role === 'Client') {
      fetchClientsForClient();
    }
  }, []);

  // Assign actually client on begin and set client messages
  useEffect(() => {
    if (actuallyClient.length < 1 && clients.length > 0) {
      setActuallyClient([clients[0]]);
      if (messages.length > 0) {
        setClientMessages(() =>
          messages.filter(
            (item: any) => item.creator === clients[0]._id || item.receiver === clients[0]._id
          )
        );
      }
    }
    if (actuallyClient.length > 0) {
      inputs.receiverId = actuallyClient[0]._id;
    }
  }, [actuallyClient, clients, messages]);

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
  const pageHeadInfo = [
    {
      id: 1,
      titleOfPage: t('messages')
    }
  ];

  if (isLoading) return <LoadingSpin />;
  if (!clients.length) {
    return (
      <Container>
        <PageHead pageHeadInfo={pageHeadInfo} />
        <div style={{ padding: '1rem' }}>
          <NoItemsFound text="Clients" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PageHead pageHeadInfo={pageHeadInfo} />
      <ContainerContactListAndMessages>
        <ContactList>
          {clients.map((clientData: any) => (
            <Contact key={clientData._id} onClick={() => handleDisplayMessages(clientData._id)}>
              <div>
                <h5>{clientData.name}</h5>
              </div>
              <RoundedPhoto
                img={clientData.avatar || clientData.google?.picture}
                alt="face"
                width="40px"
                height="40px"
                outline="2px solid black"
                name={clientData.name}
              />
            </Contact>
          ))}
        </ContactList>
        <WrapperBoxMessage>
          <WrapperMessages>
            {actuallyClient.length > 0 && (
              <PContainer>
                {' '}
                <p>{actuallyClient[0].name}</p>
              </PContainer>
            )}
            <div>
              {clientMessages.map((item: any, i) => (
                <CardMessage
                  marginLeft={item.creator === userData.userId}
                  key={item._id}
                  message={item}
                  idName={i === clientMessages.length - 1 ? 'lastMessage' : undefined}
                />
              ))}
              <AlwaysScrollToBottom />
            </div>
          </WrapperMessages>
          <Form onSubmit={handleSubmitMessage}>
            <div>
              <Input
                form
                margin="0 0.1rem 0 0"
                placeholder="Write a Message..."
                name="message"
                onChange={handleChange}
                value={inputs.message}
              />
              <Microphone fontSize={18} onClick={handleSpeech} />
            </div>
            <Button
              dropMenu
              text="Send"
              type="submit"
              background="#001523"
              color="white"
              height="4.4rem"
              width="100%"
            />
          </Form>
        </WrapperBoxMessage>
      </ContainerContactListAndMessages>
    </Container>
  );
}

export default Messages;

// Component which is created after last element to scroll
export function AlwaysScrollToBottom() {
  const elementRef: any = useRef();
  useEffect(() => elementRef.current.scrollIntoView(false));
  return <div ref={elementRef} />;
}
