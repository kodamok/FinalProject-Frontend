import React, { SyntheticEvent, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import Button from '../../atoms/Button/Button';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';

import useForm from '../../../hooks/useForm';

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2rem;
  
  

  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    {
     justify-content: flex-end
  }
`;

export const TextContainer = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    text-align: center;
    -webkit-text-stroke: 1px ${({ theme }) => theme.color.main2};

    ${({ theme }) => theme.up(theme.breakpoint.l)} {
      {
        font-size: ${({ theme }) => theme.fontSizeInter.xl};
        text-align: start;
      }
  }

  p {
    padding: 0 2rem 1.5rem 2rem;
  }
`;

const FormContainer = styled.form`
  display: block;
  margin: 0px auto;
  padding: 2rem;
  mix-width: 250px;
  max-width: 600px;
  flex-grow: 2;
  border: solid 3px black;
  border-radius: 10px;
  background: black;


  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    margin-right: 10rem;
    flex-grow: 3;
    }
  }
`;

function Contact(): JSX.Element {
  const { setUserData } = useContext(Context);
  interface ContactMessage {
    fullName: string;
    email: string;
    textArea: string;
  }

  const navigate = useNavigate();

  const initialValue: ContactMessage = {
    fullName: '',
    email: '',
    textArea: ''
  };

  const { handleChange, inputs } = useForm(initialValue);
  const { handleError } = useError();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    /* console.log('those are the inputs', inputs); */

    const sendMessage = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // Authorization: 'Bearer ' + user
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        if (res.status === 200) {
          setUserData(resJSON);
          navigate('/');
        }

        handleError(resJSON.message, res.status === 200);
      } catch (error: unknown) {
        /* console.log('FETCHING ERROR', error); */
        handleError();
      }
    };

    sendMessage();
  };
  return (
    <PageContainer>
      <TextContainer>
        <h2 style={{ WebkitTextStroke: '0' }}>
          Contact Us. <br /> We appreciate <br /> <RedSpan>honest</RedSpan> feedback
        </h2>
      </TextContainer>
      <FormContainer onSubmit={handleSubmit}>
        {' '}
        <InputWithLabel
          name="fullName"
          label="Full Name"
          type="input"
          placeholder="Full Name"
          color="#ffffff"
          onChange={handleChange}
          /* value */ required
        />
        <InputWithLabel
          name="email"
          label="E-mail"
          type="email"
          placeholder="E-Mail Address"
          color="white"
          onChange={handleChange}
          /* value */ required
        />
        <InputWithLabel
          TextAreaWithLabel
          label="Tell Us Whatever you want..."
          name="textArea"
          placeholder="...But be nice :)"
          rows={10}
          maxlength={120}
          color="white"
          required
          onChange={handleChange}
        />
        <Button
          text="Send Form"
          type="submit"
          color="black"
          background="#9e0059"
          style={{ width: '100%' }}
        />
      </FormContainer>
    </PageContainer>
  );
}

export default Contact;
