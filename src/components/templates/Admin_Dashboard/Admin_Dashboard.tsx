import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TitleWithLines from '../../atoms/TitleWithLines/TitleWithLines';
import CardClient from '../../molecules/CardClient/CardClient';
import CardProject from '../../molecules/CardProject/CardProject';
import { dataStats, optionsDoughnut } from '../../../helpers/chartSettings';
import Chart from '../../molecules/Chart/Chart';
import GlobalMessage from '../../organisms/GlobalMessage/GlobalMessage';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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
  flex-direction: column;
  gap: 1.5rem;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ContainerProjects = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Data = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 76%;
  }
`;
const Stats = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 20%;
  }
`;
const ContainerDataAndStats = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

function AdminDashboard() {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const { userData } = useContext(Context);
  const { handleError } = useError();
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
    fetchClients();
    fetchProjects();
  }, []);

  console.log({ clients, projects });

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
