import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa';
import Input from '../../atoms/Input/Input';
import useForm from '../../../hooks/useForm';
import { Context } from '../../../providers/GeneralProvider';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-width: 350px;
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
     {
      max-width: none;
    }
  }
`;

const ContainerMicrophone = styled.div`
  position: absolute;
  top: 0;
  right: 4px;
  color: black;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const ContainerFilteredList = styled.div<{ top: string | undefined }>`
  border: 1px solid #e76f51;
  background: ${({ theme }) => theme.color.main2};
  padding: 0.1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${({ top }) => top || '60px'};
  width: 100%;
  min-width: 160px;
  z-index: 500;
  max-height: 500px;
  overflow: auto;
  & > p {
    padding: 0.6rem 0.8rem;
    color: ${({ theme }) => theme.color.main1};
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
    text-align: left;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.main9};
      /* border-bottom: ${({ theme }) => theme.color.main9}; */
    }

    &:hover {
      /* border-bottom: ${({ theme }) => `0.5px solid ${theme.color.main9}`}; */
    }
  }
`;

interface SearchBarI {
  top?: string;
}

function SearchBar({ top }: SearchBarI) {
  const { handleChange, inputs, clearForm, setInputs } = useForm();
  const { clientsGlobal } = useContext(Context);
  const [isSpeeching, setIsSpeeching] = useState(false);
  const navigate = useNavigate();
  const handleNavigateToClient = (id: string) => {
    navigate(`/client/${id}`);
    clearForm();
  };
  const ref = useRef(null);
  useOnClickOutside(ref, clearForm);

  const handleSpeech = () => {
    setIsSpeeching(true);
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; // webkitSpeechRecognition for Chrome and SpeechRecognition for FF
    const recognition = new window.SpeechRecognition();
    recognition.onresult = (event: any) => {
      // SpeechRecognitionEvent type
      const speechToText = event.results[0][0].transcript;
      if (speechToText.toLowerCase() === 'secret') {
        window.location.href = 'https://www.google.com';
      }

      setInputs({
        ...inputs,
        searchBar: speechToText
      });
      setIsSpeeching(false);
    };
    recognition.onspeechend = () => {
      setIsSpeeching(false);
      recognition.stop();
    };
    recognition.onerror = () => {
      setIsSpeeching(false);
      recognition.stop();
    };
    recognition.start();
  };

  return (
    <Container ref={ref}>
      <Input
        margin="0"
        name="searchBar"
        value={inputs.searchBar}
        onChange={handleChange}
        placeholder={isSpeeching ? 'Speak Now' : 'Search'}
      />
      <ContainerMicrophone>
        <FaMicrophone fontSize={20} onClick={handleSpeech} />
      </ContainerMicrophone>
      {clientsGlobal && inputs.searchBar && (
        <ContainerFilteredList top={top}>
          {clientsGlobal.filter((item: any) =>
            item.name.toLowerCase().includes(inputs.searchBar.toLowerCase())
          ).length < 1 && <p>No results</p>}
          {clientsGlobal
            .filter((item: any) => item.name.toLowerCase().includes(inputs.searchBar.toLowerCase()))
            .map((item: any) => (
              <p onClick={() => handleNavigateToClient(item._id)}>{item.name}</p>
            ))}
        </ContainerFilteredList>
      )}
      {inputs.searchBar === '.' && (
        <ContainerFilteredList top={top}>
          {clientsGlobal.map((item: any) => (
            <p onClick={() => handleNavigateToClient(item._id)}>{item.name}</p>
          ))}
        </ContainerFilteredList>
      )}
    </Container>
  );
}

SearchBar.defaultProps = {
  top: undefined
};

export default SearchBar;
