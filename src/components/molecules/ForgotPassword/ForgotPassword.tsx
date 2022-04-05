import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import Input from '../../atoms/Input/Input';

const Container = styled.div`
  padding: 3rem 4rem;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  width: 100%;
  max-width: 600px;
  border-radius: 0.6rem;
  * {
    min-width: 300px;
  }
  h4,
  h5 {
    margin: 0 0 2rem 0;
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
      <h4>Have you forgotten your password?</h4>
      <h5>Enter your e-mail and we will send you a link to set a new password.</h5>
      <Input
        type="email"
        label="Your Email"
        name="email"
        placeholder="Enter your e-mail"
        onChange={handleChange}
      />
      <Button text="Submit" width="100%" onClick={handleSendLinkToResetPassword} />
    </Container>
  );
}

export default ForgotPassword;
