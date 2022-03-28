import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import Input from '../../atoms/Input/Input';

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

        if (res.status === 200) {
          navigate('/login');
          handleError('You got a email with link to reset password', true);
        } else {
          handleError(resJSON.message, false);
        }
      } catch (error: any) {
        handleError();
      }
    };
    sendLinkToResetPassword();
  };
  return (
    <Container>
      <Input type="email" label="Your Email" name="email" onChange={handleChange} />
      <Button text="Submit" onClick={handleSendLinkToResetPassword} />
    </Container>
  );
}

export default ForgotPassword;
