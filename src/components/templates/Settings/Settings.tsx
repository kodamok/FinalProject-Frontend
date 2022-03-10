import React, { SyntheticEvent, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import { Context } from '../../../providers/GeneralProvider';
import { InputFileStyle } from '../SignUp/SignUp';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 1rem;
  h3,
  h4 {
    text-align: left;
    margin: 1rem 0 0 0;
  }
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    h4 {
      margin-bottom: 1rem;
    }
  }
`;
const ContainerDiv = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    background: ${({ theme }) => theme.color.main1};
    display: flex;
    gap: 3rem;
    padding: 2rem 3rem;
    min-height: 500px;
    border: 2px solid black;
    border-radius: 0.6rem;
  }
`;

const ParagraphAdd = styled.div`
  display: none;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: block;
  }
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const HeadingAdd = styled.div`
  display: none;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: flex;
    justify-content: flex-start;
  }
`;
const DivOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;
const DivTwo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;
const DivThree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 350px;
`;

function Settings() {
  const { handleError } = useError();

  interface FormSignUp {
    name: string;
    email: string;
    password: string;
    newPassword: string;
    newPasswordRepeated: string;
    avatar: any;
    taxNumber: string;
    identityCardNumber: string | undefined;
  }

  const { userData, setUserData } = useContext(Context);

  const initialValue: FormSignUp = {
    name: userData.name,
    email: userData.email,
    password: '',
    newPassword: '',
    avatar: userData.avatar,
    newPasswordRepeated: '',
    taxNumber: userData.taxNumber,
    identityCardNumber: userData.identityCardNumber
  };

  const { handleChange, inputs } = useForm(initialValue);

  const handleSubmitUserDataChange = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('You try change your data with these inputs', inputs);
    const updateUserData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        if (res.status === 200) {
          handleError(resJSON.message || 'You changed data correctly', true);
          const { identityCardNumber, email, name, taxNumber, avatar } = resJSON;
          setUserData({ ...userData, identityCardNumber, email, name, taxNumber, avatar });
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        console.log('FETCHING ERROR', error);
        handleError();
      }
    };
    updateUserData();
  };

  // Fancy Stuff

  // useEffect(() => {
  // if ('speechSynthesis' in window) {
  //   const speech = new SpeechSynthesisUtterance(
  //     `Hello ${userData.name}`
  //     // with email ${userData.email}
  //   );
  //   // speech.lang = 'en-US';
  //   speech.lang = 'es';
  //   // speech.lang = 'pl';
  //   window.speechSynthesis.speak(speech);
  // }
  // console.group('User Details');
  // console.log('name: Sudheer Jonna');
  // console.log('job: Software Developer');
  //
  // // Nested Group
  // console.group('Address');
  // console.log('Street: Commonwealth');
  // console.log('City: Los Angeles');
  // console.log('State: California');
  //
  // console.groupEnd();
  // }, []);

  useEffect(() => {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; // webkitSpeechRecognition for Chrome and SpeechRecognition for FF
    const recognition = new window.SpeechRecognition();
    recognition.onresult = (event: any) => {
      // SpeechRecognitionEvent type
      const speechToText = event.results[0][0].transcript;
      console.log(speechToText);
      console.log('yup');
    };
    recognition.start();
  }, []);

  return (
    <FormContainer onSubmit={handleSubmitUserDataChange}>
      <div>
        <h3>Settings</h3>
        <ContainerDiv>
          <DivOne>
            <div>
              <HeadingAdd>
                <h4>User Details</h4>
              </HeadingAdd>
              <RoundedPhoto
                img={inputs.image || inputs.avatar}
                alt="face"
                width="250px"
                height="250px"
              />
            </div>
            <ContainerButton>
              <Button background="#1F313E" text="Upload Photo" />
              <InputFileStyle name="avatar" type="file" onChange={handleChange} />
            </ContainerButton>
          </DivOne>
          <DivTwo>
            <h4>Contact Information</h4>
            <InputWithLabel
              label="Name*"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
            <InputWithLabel
              label="Email*"
              name="email"
              type="email"
              onChange={handleChange}
              value={inputs.email}
              required
            />
            <InputWithLabel
              label="New Password"
              name="newPassword"
              type="password"
              value={inputs.newPassword}
              onChange={handleChange}
            />
            <InputWithLabel
              label="Repeat New Password"
              name="newPasswordRepeated"
              type="password"
              value={inputs.newPasswordRepeated}
              onChange={handleChange}
            />
          </DivTwo>
          <DivThree>
            <div>
              <h4>Billing Information</h4>
              <InputWithLabel
                label="Identity Card Number"
                name="identityCardNumber"
                onChange={handleChange}
                value={inputs.identityCardNumber}
              />
              <InputWithLabel
                label="Tax Number"
                name="taxNumber"
                onChange={handleChange}
                value={inputs.taxNumber}
              />
              <InputWithLabel
                label="Password To Confirm Changes*"
                name="password"
                type="password"
                onChange={handleChange}
                value={inputs.password}
                required
              />
              <ParagraphAdd>
                <p />
              </ParagraphAdd>
            </div>
            <ContainerButton>
              <Button type="submit" background="#9e0059" text="Save Changes" />
            </ContainerButton>
          </DivThree>
        </ContainerDiv>
      </div>
    </FormContainer>
  );
}

export default Settings;
