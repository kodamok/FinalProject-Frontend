import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import CardClientDetails from '../../molecules/CardClientDetails/CardClientDetails';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import PageHead from '../../molecules/PageHead/PageHead';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const ContainerClientDetails = styled.div`
  margin: auto;
`;

function ClientDetails() {
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(Context);
  const { handleError } = useError();
  const { clientId } = useParams();
  const navigate = useNavigate();

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

      if (res.status === 200) {
        setClient(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClientDetails();
  }, [clientId]);

  const handleNavigateToCreateNewProject = () => {
    navigate(`/newProject/${clientId}`);
  };

  const PageHeadInfo = [
    {
      id: 1,
      titleOfPage: `${userData.role === 'Freelancer' ? 'Client' : 'Freelancer'} Details`,
      threeDotButton: {
        button1: 'New Project',
        onClickEvent: handleNavigateToCreateNewProject
      }
    }
  ];

  if (isLoading) return <LoadingSpin />;
  return (
    <div>
      <PageHead pageHeadInfo={PageHeadInfo} />
      <Container>
        <ContainerClientDetails>
          {client && <CardClientDetails clientData={client} />}
        </ContainerClientDetails>
      </Container>
    </div>
  );
}

export default ClientDetails;
