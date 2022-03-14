import React, { SyntheticEvent, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import { googleLoginUrl } from '../../../helpers/googleLoginUrl';

const Container = styled.form`
  padding: 0 1rem;
  max-width: 350px;
  margin: 1rem auto;

  h3 {
    text-align: center;
  }
  p {
    margin: 0.4rem 0 1rem 0;
    text-align: right;
    display: inline-block;
  }
  p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    max-width: 350px;
  }
`;

const ContainerP = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Line = styled.div`
  width: 230px;
  height: 2px;
  background-color: #666;
`;

function LogIn() {
  const { setUserData } = useContext(Context);
  interface FormLogin {
    email: string;
    password: string;
  }
  const navigate = useNavigate();

  const initialValue: FormLogin = {
    email: '',
    password: ''
  };

  const { handleChange, inputs } = useForm(initialValue);
  const { handleError } = useError();

  const handleOpenCreateNewAccountPage = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('You try login with these inputs', inputs);
    const login = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // Authorization: 'Bearer ' + userData?.token, // IN FUTURE TO AUTHORIZATION
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();
        console.log(resJSON);
        if (res.status === 200) {
          navigate('/');
          setUserData(resJSON);
        }
        handleError(resJSON.message, res.status === 200);
      } catch (error: any) {
        console.log('FETCHING ERROR', error);
        handleError();
      }
    };
    await login();
  };

  const handleNavigateToForgotPassword = () => {
    navigate('/forgotPassword');
  };

  return (
    <Container onSubmit={handleSubmit}>
      <h3>LOGIN</h3>
      <InputWithLabel label="Email" name="email" onChange={handleChange} />
      <InputWithLabel type="password" label="Password" name="password" onChange={handleChange} />
      <ContainerP>
        <p onClick={handleNavigateToForgotPassword}>I forgot my password</p>
      </ContainerP>
      <div>
        <Button type="submit" background="#2A9D8F" text="Login" />
        <Line />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <a href={googleLoginUrl}>
          <Button text="Login with Google" icon={<FcGoogle />} padding="1.3rem 1rem" />
        </a>
        <Button
          background="#9e0059"
          text="Create New Account"
          onClick={handleOpenCreateNewAccountPage}
        />
      </div>
    </Container>
  );
}

export default LogIn;
