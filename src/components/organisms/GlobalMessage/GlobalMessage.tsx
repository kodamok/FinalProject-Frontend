// import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GrContact } from 'react-icons/gr';
import { MdOutlineClose } from 'react-icons/md';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import CardMessage from '../../molecules/CardMessage/CardMessage';
import { AlwaysScrollToBottom } from '../../templates/Messages/Messages';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Form = styled.form`
  padding: 1rem;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  * {
    width: 100%;
  }
  //border: 1px solid grey;
`;
//
// const WrapperMessages = styled.div`
//   //padding: 1rem;
//   //border: 2px solid black;
//   max-height: 1200px;
//   height: 400px;
//   width: 95vw;
//   max-width: 600px;
//   display: flex;
//   flex-direction: column;
//   //gap: 0.4rem;
//   > div:last-child {
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//     overflow-y: scroll;
//     height: 100%;
//     padding-top: 0.4rem;
//     ::-webkit-scrollbar {
//       width: 10px;
//     }
//
//     /* Track */
//     ::-webkit-scrollbar-track {
//       background: #f1f1f1;
//     }
//
//     /* Handle */
//     ::-webkit-scrollbar-thumb {
//       background: #888;
//     }
//
//     /* Handle on hover */
//     ::-webkit-scrollbar-thumb:hover {
//       background: #555;
//     }
//   }
// `;
//
// const PContainer = styled.div`
//   background: ${({ theme }) => theme.color.main3};
//   color: white;
//   padding: 1rem;
// `;
//
const ContactList = styled.div`
  padding: 0 0 3rem 0;
  overflow: auto;
  overscroll-behavior: contain;
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  gap: 0.6rem;
  > div:first-child {
    min-width: 40px;
  }
  p {
    font-weight: normal;
  }
  p:last-child {
    font-weight: normal;
  }
  > div:last-child {
    border-bottom: 1px solid grey;
    width: 100%;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main5};
  }
`;

const ContainerFixed = styled.div`
  position: fixed;
  bottom: 0;
  right: 1rem;
  z-index: 999;
  display: flex;
  gap: 1rem;
`;

const ChatBox = styled.div`
  position: fixed;
  right: 230px;
  bottom: 0;
  min-height: 50px;
  min-width: 200px;
  //padding: 0 0.5rem;
  background: ${({ theme }) => theme.color.main4};
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    right: 70px;
  }
  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid grey;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main5};
    }
  }

  > div:first-child > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  > div:first-child > div:nth-child(2) > svg:hover {
    cursor: pointer;
    background: white;
    border-radius: 50%;
  }

  > div:first-child > div:nth-child(2) > svg {
    position: relative;
    top: -6px;
    z-index: 1;
  }

  > div:nth-child(2) {
    max-height: 300px;
    min-width: 300px;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 0.1rem;
    overflow-y: scroll;
    overscroll-behavior: contain;
    ${({ theme }) => theme.down(theme.breakpoint.m)} {
      min-width: 200px;
      max-width: 250px;
    }
  }
`;

const ChatBoxSmall = styled.div`
  position: fixed;
  right: 230px;
  bottom: 0;
  height: 50px;
  min-width: 200px;
  padding: 0 0.5rem;
  background: ${({ theme }) => theme.color.main4};
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  display: flex;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  > div:last-child > svg:hover {
    cursor: pointer;
    background: white;
    border-radius: 50%;
  }
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    right: 70px;
  }
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main5};
  }
`;

const Container = styled.div`
  height: 50px;
  min-width: 200px;
  padding: 0 0.5rem;
  background: ${({ theme }) => theme.color.main4};
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.6rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
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
    background: ${({ theme }) => theme.color.main5};
    // ${({ theme }) => theme.down(theme.breakpoint.m)} {
    //   background: none;
    // }
  }
`;

const ContainerOpenContactList = styled.div`
  > div:first-child {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid grey;
    padding: 0.3rem 0.5rem;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main5};
    }
  }
  height: 80vh;
  min-width: 200px;
  background: ${({ theme }) => theme.color.main4};
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
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
  const { inputs, handleChange, resetForm } = useForm(initialValue);
  const [clientMessages, setClientMessages] = useState([]);
  const [actuallyClient, setActuallyClient] = useState<any[]>([]);
  const handleOpenContactListChat = () => {
    setIsOpenContactList((prev) => !prev);
    setOpenChatWithMessages(false);
  };
  // const [clientsGlobal, setClientsGlobal] = useState<any[]>([]);
  const { userData, messages, openChatBoxWithThisUser, setOpenChatBoxWithThisUser, clientsGlobal } =
    useContext(Context);
  const { handleError } = useError();
  const [openChatWithMessages, setOpenChatWithMessages] = useState(false);
  const [displayChatBoxOnTheBottom, setDisplayChatBoxOnTheBottom] = useState(false);
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
        console.log('This message is sending...', inputs);
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
        console.log('Something wrong with sending message', error);
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

  return (
    <ContainerFixed ref={containerFixed}>
      {openChatWithMessages ? (
        <ChatBox>
          <div onClick={handleOpenChatBoxWithMessages}>
            <div>
              <RoundedPhoto
                width="40px"
                height="40px"
                img={actuallyClient[0].avatar}
                alt="avatar"
              />
              <p>{actuallyClient.length > 0 && actuallyClient[0].name}</p>
            </div>
            <div>
              <MdOutlineClose fontSize={18} onClick={handleCloseChatBoxWithMessages} />
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
            <InputWithLabel
              placeholder="Write a Message..."
              name="message"
              onChange={handleChange}
              value={inputs.message}
            />
            <Button text="Send a Message" type="submit" />
          </Form>
        </ChatBox>
      ) : (
        displayChatBoxOnTheBottom && (
          <ChatBoxSmall onClick={handleOpenChatBoxWithMessages}>
            <div>
              <RoundedPhoto
                width="40px"
                height="40px"
                img={actuallyClient[0].avatar}
                alt="avatar"
              />
              <p>{actuallyClient.length > 0 && actuallyClient[0].name}</p>
            </div>
            <div>
              <MdOutlineClose fontSize={18} onClick={handleCloseChatBoxWithMessages} />
            </div>
          </ChatBoxSmall>
        )
      )}
      {isOpenContactList ? (
        <ContainerOpenContactList>
          <div onClick={handleOpenContactListChat}>
            <RoundedPhoto width="40px" height="40px" img={userData.avatar} alt="avatar" />
            <p>Messages</p>
          </div>
          <div>
            <ContactList>
              {clientsGlobal.map((clientData: any) => (
                <Contact key={clientData._id} onClick={() => handleOpenChatBox(clientData._id)}>
                  <RoundedPhoto img={clientData.avatar} alt="face" width="40px" height="40px" />
                  <div>
                    <p>{clientData.name}</p>
                    {/* {console.log(clientData)} */}
                    {/* <p>{clientData.messages[0].text}</p> */}
                  </div>
                </Contact>
              ))}
            </ContactList>
          </div>
        </ContainerOpenContactList>
      ) : (
        <Container onClick={handleOpenContactListChat}>
          <p>Messages</p>
          <GrContact fontSize={28} />
        </Container>
      )}
    </ContainerFixed>
  );
}

export default GlobalMessage;
