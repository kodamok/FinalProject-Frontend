import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleWithLines from '../../atoms/TitleWithLines/TitleWithLines';
import Chart from '../../molecules/Chart/Chart';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import CardProfile from '../../molecules/CardProfile/CardProfile';
import PageHead from '../../molecules/PageHead/PageHead';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* h3 {
    padding: 1rem 0;
    margin: 0;
  }
  h3:first-child {
    text-transform: uppercase;
  }
  h3,
  h4 {
    text-align: center;
  } */
`;

const ContainerClients = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContainerProjects = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Data = styled.div`
  // ${({ theme }) => theme.up(theme.breakpoint.m)} {
  //   width: 66%;
  // }
`;
// const Stats = styled.div`
//   //border: 2px solid red;
//   // ${({ theme }) => theme.up(theme.breakpoint.m)} {
//   //   width: 20%;
//   // }
// `;
const ContainerDataAndStats = styled.div`
  //border: 2px solid red;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

function AdminDashboard() {
  const [clients, setClients]: any = useState([]);
  const [projects, setProjects]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(Context);
  const { handleError } = useError();
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/freelancer/3`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project/3`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (res.status === 200) {
        setProjects(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchClients();
        await fetchProjects();
      } catch (e: any) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // const dataStats = {
  //   labels: ['Clients', 'Projects'],
  //   datasets: [
  //     {
  //       label: 'Stats',
  //       data: [statistics.clients, statistics.projects],
  //       backgroundColor: backgroundColorSchema,
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)'
  //       ],
  //       borderWidth: 3
  //     }
  //   ]
  // };

  const handleNavigateToCreateNewClient = () => {
    navigate('/newClient');
  };

  const PageHeadInfo = [
    {
      id: 1,
      titleOfPage: 'Dashboard',
      threeDotButton: {
        button1: 'New Client',
        onClickEvent: handleNavigateToCreateNewClient
      }
    }
  ];

  if (isLoading) return <LoadingSpin />;

  return (
    <Container>
      <PageHead pageHeadInfo={PageHeadInfo} />
      <Chart data={undefined} options={undefined} />
      <ContainerDataAndStats>
        <Data>
          <TitleWithLines text="Recent Clients" />
          <ContainerClients>
            {clients.length ? (
              clients.map((item: any) => <CardProfile client key={item._id} clientData={item} />)
            ) : (
              <NoItemsFound text="Clients" />
            )}
          </ContainerClients>

          <TitleWithLines text="Recent Projects" />
          <ContainerProjects>
            {projects.length ? (
              projects.map((item: any) => <CardProfile key={item._id} projectData={item} />)
            ) : (
              <NoItemsFound text="Projects" />
            )}
          </ContainerProjects>
        </Data>
      </ContainerDataAndStats>
    </Container>
  );
}

export default AdminDashboard;
