import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TitleWithLines from '../../atoms/TitleWithLines/TitleWithLines';
import CardClient from '../../molecules/CardClient/CardClient';
import CardProject from '../../molecules/CardProject/CardProject';
import { backgroundColorSchema, optionsDoughnut } from '../../../helpers/chartSettings';
import Chart from '../../molecules/Chart/Chart';
import GlobalMessage from '../../organisms/GlobalMessage/GlobalMessage';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';

// LoadingSpin
// import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h3 {
    padding: 1rem 0;
    margin: 0;
  }
  h3:first-child {
    text-transform: uppercase;
  }
  h3,
  h4 {
    text-align: center;
  }
`;

const ContainerClients = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const ContainerProjects = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Data = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 66%;
  }
`;
const Stats = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 32%;
  }
`;
const ContainerDataAndStats = styled.div`
  display: flex;
  flex-direction: column;
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
  const [statistics, setStatistics]: any = useState([]);
  const { userData } = useContext(Context);
  const { handleError } = useError();

  // LoadingSpin

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

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

  const fetchStatistics = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/statistics`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (res.status === 200) {
        setStatistics(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };

  const fetchAll = async () => {
    await fetchClients();
    await fetchProjects();
    await fetchStatistics();
  };

  useEffect(() => {
    (async () => {
      await fetchAll();
      setIsLoading(false);
    })();
  }, []);

  console.log({ clients, projects });

  const dataStats = {
    labels: ['Clients', 'Projects'],
    datasets: [
      {
        label: 'Stats',
        data: [statistics.clients, statistics.projects],
        backgroundColor: backgroundColorSchema,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 3
      }
    ]
  };

  if (isLoading) return <LoadingSpin />;

  return (
    <Container>
      <h3>Dashboard</h3>
      <ContainerDataAndStats>
        <Data>
          <div>
            <TitleWithLines text="Recent Clients" />
            <ContainerClients>
              {clients.length ? (
                clients.map((item: any) => <CardClient key={item._id} clientData={item} />)
              ) : (
                <NoItemsFound text="Clients" />
              )}
            </ContainerClients>
          </div>
          <div>
            <TitleWithLines text="Recent Projects" />
            <ContainerProjects>
              {projects.length ? (
                projects.map((item: any) => <CardProject key={item._id} projectData={item} />)
              ) : (
                <NoItemsFound text="Projects" />
              )}
            </ContainerProjects>
          </div>
        </Data>
        <Stats>
          <TitleWithLines text="Statistics" />
          {projects.length || clients.length ? (
            <Chart data={dataStats} options={optionsDoughnut} />
          ) : (
            <NoItemsFound text="Statistics" />
          )}
        </Stats>
      </ContainerDataAndStats>
      <GlobalMessage />
    </Container>
  );
}

export default AdminDashboard;
