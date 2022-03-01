// import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import face from '../../../assets/images/face2small.jpg';
import face1 from '../../../assets/images/face1small.jpg';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import CardMessage from '../../molecules/CardMessage/CardMessage';
import { AlwaysScrollToBottom } from '../../templates/Messages/Messages';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';

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
  padding: 0;
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  gap: 0.6rem;
  p {
    font-weight: normal;
  }
  p:last-child {
    font-weight: normal;
    //font-size: ${({ theme }) => theme.fontSizeOpenSans.xxs};
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
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem;
    border-bottom: 1px solid grey;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main5};
    }
  }
  > div:nth-child(2) {
    max-height: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
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
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
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
  gap: 0.6rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.main5};
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
  };
  const [clients, setClients] = useState<any[]>([]);
  const { userData, messages } = useContext(Context);
  const { handleError } = useError();
  const [openChatWithMessages, setOpenChatWithMessages] = useState(false);
  // Fetching Clients from Freelancer
  const fetchClients = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/user/freelancer/${userData.token}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      const resJSON = await res.json();
      // console.log(resJSON);
      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };
  // Fetching Freelancers from Client
  const fetchClientsForClient = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/user/freelancers/${userData.token}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      const resJSON = await res.json();
      // console.log(resJSON);
      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
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
    if (actuallyClient.length < 1 && clients.length > 0 && messages.length > 0) {
      setActuallyClient([clients[0]]);
      setClientMessages(() =>
        messages.filter(
          (item: any) => item.creator === clients[0]._id || item.receiver === clients[0]._id
        )
      );
    }
    if (actuallyClient.length > 0) {
      inputs.receiverId = actuallyClient[0]._id;
    }
  }, [actuallyClient, clients, messages]);

  // Set actually client and his messages after click on his Avatar
  const handleOpenChatBox = (id: string) => {
    console.log(id);
    setClientMessages(messages.filter((item: any) => item.creator === id || item.receiver === id));
    setActuallyClient(clients.filter((item: any) => item._id === id));
    setIsOpenContactList(false);
    setOpenChatWithMessages(true);
  };

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

  const handleOpenChatBoxWithMessages = () => {
    console.log(clientMessages);
    setOpenChatWithMessages((prev) => !prev);
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
        console.log({ resJSON });
        if (res.status === 201) {
          resetForm();
          handleError(resJSON.message, true);
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

  console.log(clientMessages);
  return (
    <ContainerFixed>
      {openChatWithMessages ? (
        <ChatBox>
          <div onClick={handleOpenChatBoxWithMessages}>
            <RoundedPhoto width="40px" height="40px" img={face} alt="avatar" />
            <p>{actuallyClient.length > 0 && actuallyClient[0].name}</p>
          </div>
          <div>
            {clientMessages.map((item: any) => (
              <CardMessage
                // style={{ marginLeft: item.creator === userData.userId ? 'auto' : null }}
                marginLeft={item.creator === userData.userId}
                key={item._id}
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
        <ChatBoxSmall onClick={handleOpenChatBoxWithMessages}>
          <RoundedPhoto width="40px" height="40px" img={face} alt="avatar" />
          <p>{actuallyClient.length > 0 && actuallyClient[0].name}</p>
        </ChatBoxSmall>
      )}
      {isOpenContactList ? (
        <ContainerOpenContactList>
          <div onClick={handleOpenContactListChat}>
            <RoundedPhoto width="40px" height="40px" img={face} alt="avatar" />
            <p>Messages</p>
          </div>
          <div>
            <ContactList>
              {clients.map((clientData: any) => (
                <Contact key={clientData._id} onClick={() => handleOpenChatBox(clientData._id)}>
                  <RoundedPhoto img={face1} alt="face" width="40px" height="40px" />
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
          <RoundedPhoto width="40px" height="40px" img={face} alt="avatar" />
          <p>Messages</p>
        </Container>
      )}
    </ContainerFixed>
  );
}

export default GlobalMessage;

// // Component which is created after last element to scroll
// function AlwaysScrollToBottom() {
//   const elementRef: any = useRef();
//   useEffect(() => elementRef.current.scrollIntoView(false));
//   return <div ref={elementRef} />;
// }

// const { messages, userData } = useContext(Context);
// const [clientMessages, setClientMessages] = useState([]);
// const { inputs, handleChange, resetForm } = useForm(initialValue);
// const { handleError } = useError();
// const [clients, setClients] = useState<any[]>([]);
// const [actuallyClient, setActuallyClient] = useState<any[]>([]);
//
// // Fetching Clients from Freelancer
// const fetchClients = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.REACT_APP_BACKEND}/user/freelancer/${userData.token}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${userData?.token}`
//         }
//       }
//     );
//     const resJSON = await res.json();
//     // console.log(resJSON);
//     if (res.status === 200) {
//       setClients(resJSON);
//     } else {
//       handleError(resJSON.message);
//     }
//   } catch (error: any) {
//     console.log('FETCHING ERROR', error);
//     handleError();
//   }
// };
//
// // Fetching Freelancers from Client
// const fetchClientsForClient = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.REACT_APP_BACKEND}/user/freelancers/${userData.token}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${userData?.token}`
//         }
//       }
//     );
//     const resJSON = await res.json();
//     // console.log(resJSON);
//     if (res.status === 200) {
//       console.log(resJSON);
//       setClients(resJSON);
//     } else {
//       handleError(resJSON.message);
//     }
//   } catch (error: any) {
//     console.log('FETCHING ERROR', error);
//     handleError();
//   }
// };
//
// // onSubmit Form - Send a Message
// const handleSubmitMessage = async (e: SyntheticEvent) => {
//   e.preventDefault();
//   const sendMessage = async () => {
//     try {
//       console.log('This message is sending...', inputs);
//       const res = await fetch(`${process.env.REACT_APP_BACKEND}/message`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userData.token}`
//         },
//         body: JSON.stringify(inputs)
//       });
//       const resJSON = await res.json();
//       console.log({ resJSON });
//       if (res.status === 201) {
//         resetForm();
//         handleError(resJSON.message, true);
//       } else {
//         handleError(resJSON.message);
//       }
//     } catch (error: any) {
//       console.log('Something wrong with sending message', error);
//       handleError();
//     }
//   };
//   sendMessage();
// };
//
// // Set actually client and his messages after click on his Avatar
// const handleDisplayMessages = (id: string) => {
//   console.log(id);
//   setClientMessages(messages.filter((item: any) => item.creator === id || item.receiver === id));
//   setActuallyClient(clients.filter((item: any) => item._id === id));
// };
//
// // Fetching Clients
// useEffect(() => {
//   if (userData.token && userData.role === 'Freelancer') {
//     fetchClients();
//   }
//   if (userData.token && userData.role === 'Client') {
//     fetchClientsForClient();
//   }
// }, []);
//
// // Assign actually client on begin and set client messages
// useEffect(() => {
//   if (actuallyClient.length < 1 && clients.length > 0 && messages.length > 0) {
//     setActuallyClient([clients[0]]);
//     setClientMessages(() =>
//       messages.filter(
//         (item: any) => item.creator === clients[0]._id || item.receiver === clients[0]._id
//       )
//     );
//   }
//   if (actuallyClient.length > 0) {
//     inputs.receiverId = actuallyClient[0]._id;
//   }
// }, [actuallyClient, clients, messages]);
//
// // If messages changes thanks to SSE(Server Sent Events) then we display new message
// useEffect(() => {
//   if (actuallyClient.length > 0) {
//     setClientMessages(
//       messages.filter(
//         (item: any) =>
//           item.creator === actuallyClient[0]._id || item.receiver === actuallyClient[0]._id
//       )
//     );
//   }
// }, [messages]);
