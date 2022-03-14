import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import CardClientDetails from '../../molecules/CardClientDetails/CardClientDetails';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
`;
const Title = styled.h2`
  margin: auto;
  text-align: center;
  padding-top: 4rem;
`;
const ContainerClientDetails = styled.div`
  margin: auto;
`;
function ClientDetails() {
  const [client, setClient] = useState({});
  const { userData } = useContext(Context);
  const { handleError } = useError();
  const { clientId } = useParams();
  console.log('clientId', clientId);

  const fetchClientDetails = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log('This is Fetch', res);
      console.log(resJSON);
      if (res.status === 200) {
        setClient(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };
  useEffect(() => {
    fetchClientDetails();
  }, []);
  useEffect(() => {
    fetchClientDetails();
  }, [clientId]);
  return (
    <div>
      <Title>Customer Details</Title>

      <Container>
        <ContainerClientDetails>
          {client && <CardClientDetails clientData={client} />}
        </ContainerClientDetails>
      </Container>
    </div>
  );
}

export default ClientDetails;
