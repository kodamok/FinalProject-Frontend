import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import useError from '../../../hooks/useError';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  * {
    min-width: 300px;
  }
`;

function ForgotPassword() {
  const { handleError } = useError();
  const navigate = useNavigate();
  interface Form {
    email: string;
  }
  const initialValue: Form = {
    email: ''
  };
  const { inputs, handleChange } = useForm(initialValue);
  const handleSendLinkToResetPassword = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('You want have email with link to reset password on this email', inputs.email);
    const sendLinkToResetPassword = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/resetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        console.log(resJSON);
        if (res.status === 200) {
          navigate('/login');
          handleError('You got a email with link to reset password', true);
        } else {
          handleError(resJSON.message, false);
        }
      } catch (error: any) {
        console.log('FETCHING ERROR', error);
        handleError();
      }
    };
    sendLinkToResetPassword();
  };
  return (
    <Container>
      <InputWithLabel type="email" label="Your Email" name="email" onChange={handleChange} />
      <Button text="Submit" onClick={handleSendLinkToResetPassword} />
    </Container>
  );
}

export default ForgotPassword;
