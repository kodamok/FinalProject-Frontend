import React, { SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
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

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { handleError } = useError();
  const handleVerifyEmail = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('You try verify Email with this token', token);
    const verifyEmail = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/verifyEmail`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const resJSON = await res.json();
        console.log(resJSON);
        if (res.status >= 200 && res.status < 300) {
          navigate('/login');
          handleError('You verified email, now you can login', true);
        } else {
          handleError();
        }
      } catch (error: any) {
        handleError();
      }
    };
    verifyEmail();
  };
  return (
    <Container>
      <Button text="Verify Email" onClick={handleVerifyEmail} />
    </Container>
  );
}

export default VerifyEmail;
