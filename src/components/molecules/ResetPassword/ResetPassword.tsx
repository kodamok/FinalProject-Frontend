import React, { SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function ResetPassword() {
  const { handleError } = useError();
  const { token } = useParams();
  const navigate = useNavigate();
  interface Form {
    password: string;
  }
  const initialValue: Form = {
    password: ''
  };
  const { inputs, handleChange } = useForm(initialValue);
  const handleResetPassword = (e: SyntheticEvent) => {
    e.preventDefault();

    const resetPassword = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/resetPassword`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();

        if (res.status === 200) {
          navigate('/login');
          handleError(resJSON.message, true);
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        handleError();
      }
    };
    resetPassword();
  };
  return (
    <Container>
      <Input type="password" label="Your New Password" name="password" onChange={handleChange} />
      <Button text="Submit" onClick={handleResetPassword} />
    </Container>
  );
}

export default ResetPassword;
