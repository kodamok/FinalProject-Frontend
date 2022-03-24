import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import useError from '../../../hooks/useError';
import useForm from '../../../hooks/useForm';

const PageContainer = styled.div`
  //border: 2px solid red;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  padding: 2rem;

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
     {
      padding: 0;
    }
  }
`;

export const TextContainer = styled.div`
  //border: 2px solid red;
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    text-align: left;
    font-size: clamp(
      ${({ theme }) => theme.fontSizeInter.m},
      8vw,
      ${({ theme }) => theme.fontSizeInter.xl}
    );

    ${({ theme }) => theme.down(theme.breakpoint.m)} {
       {
        text-align: center;
      }
    }
  }
`;

const FormContainer = styled.form`
  /* border: 5px solid red; */
  display: block;
  padding: 2rem;
  margin: 0 auto;
  min-width: 250px;
  max-width: 600px;
  flex-grow: 2;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 10px;
  background: #001523;

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
     {
      margin: 0 auto;
      flex-grow: 3;
    }
  }
`;

function Contact(): JSX.Element {
  interface ContactMessage {
    name: string;
    email: string;
    message: string;
  }

  const navigate = useNavigate();

  const initialValue: ContactMessage = {
    name: '',
    email: '',
    message: ''
  };

  const { handleChange, inputs } = useForm(initialValue);
  const { handleError } = useError();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const sendMessage = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/contactForm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        if (res.status >= 200 && res.status < 300) {
          navigate('/');
          handleError('You sent message correctly', true);
        } else {
          handleError(resJSON.message);
        }
      } catch (error: unknown) {
        handleError();
      }
    };

    sendMessage();
  };
  const { t } = useTranslation();
  return (
    <PageContainer>
      <TextContainer>
        <h2 style={{ WebkitTextStroke: '0' }}>
          {t('contact1')} <br /> {t('contact2')} <br /> <RedSpan>{t('contact3')}</RedSpan>
          {t('contact4')}
        </h2>
      </TextContainer>
      <FormContainer onSubmit={handleSubmit}>
        {' '}
        <Input
          form
          name="name"
          color="white"
          label={t('contactChatName')}
          placeholder={t('contactChatName')}
          onChange={handleChange}
          value={inputs.name}
          /* value */ required
        />
        <Input
          form
          name="email"
          label="E-mail"
          type="email"
          color="white"
          placeholder="E-Mail Address"
          onChange={handleChange}
          value={inputs.email}
          /* value */ required
        />
        <Input
          textArea
          label={t('contactChatText')}
          name="message"
          placeholder={t('contactChatInnerText')}
          rows={10}
          required
          height="100%"
          color="white"
          onChange={handleChange}
          value={inputs.message}
        />
        <Button
          text={t('contactChatButton')}
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
