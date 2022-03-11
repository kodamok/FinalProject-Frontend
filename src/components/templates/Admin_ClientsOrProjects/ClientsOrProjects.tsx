import React, { useContext, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styled from 'styled-components';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import { Context } from '../../../providers/GeneralProvider';
import CardClient from '../../molecules/CardClient/CardClient';
import CardProject from '../../molecules/CardProject/CardProject';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';

const ContainerFilterBy = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  > div:first-child {
    display: flex;
    align-items: center;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    padding: 0 2rem;
  }
`;

const ContainerClients = styled.div`
  padding: 0.3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  max-width: 95%;
  margin: 1.2rem auto 1.2rem auto;
  border-radius: 1rem;
  ${({ theme }) => theme.down('700px')} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    justify-content: center;
  }
`;
const ContainerProjects = styled.div`
  padding: 0.3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  max-width: 95%;
  margin: 1.2rem auto 1.2rem auto;
  border-radius: 1rem;
  ${({ theme }) => theme.down('700px')} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    justify-content: center;
  }
`;

function ClientsOrProjects() {
  const [choiceRadio, setChoiceRadio] = useState('projects');
  const [clients, setClients] = useState([]);
  console.log(clients[0]);

  const [projects, setProjects] = useState([]);
  const { userData } = useContext(Context);
  const { handleError } = useError();

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/freelancer`, {
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project`, {
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

  // Handling value when you click on choice
  const handleChangeRadio = (e: any) => {
    setChoiceRadio(e.target.value);
  };
  console.log(choiceRadio);
  return (
    <div>
      <h2>Clients/Projects</h2>
      <ContainerFilterBy>
        <div>
          <p>Filter by:</p>
          <InputWithLabel
            type="radio"
            label="Projects"
            name="chooseType"
            onChange={handleChangeRadio}
            value="projects"
            id="projects"
            checked={choiceRadio === 'projects'}
          />
          <InputWithLabel
            type="radio"
            label="Clients"
            name="chooseType"
            value="clients"
            id="clients"
            onChange={handleChangeRadio}
            checked={choiceRadio === 'clients'}
          />
        </div>
        <div>
          <IconClickable icon={<BsThreeDots fontSize={28} />}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}
            >
              <Button
                text="Create New Client"
                width="180px"
                fontSize="1rem"
                padding="0.5rem 1rem"
              />
              <Button
                text="Create New Project"
                width="180px"
                fontSize="1rem"
                padding="0.5rem 1rem"
              />
            </div>
          </IconClickable>
        </div>
      </ContainerFilterBy>
      {choiceRadio === 'projects' ? (
        <ContainerProjects>
          {projects.length ? (
            projects.map((item: any) => <CardProject key={item._id} projectData={item} />)
          ) : (
            <NoItemsFound text="Projects" />
          )}
        </ContainerProjects>
      ) : (
        <ContainerClients>
          {clients.length ? (
            clients.map((item: any) => <CardClient key={item._id} clientData={item} />)
          ) : (
            <NoItemsFound text="Clients" />
          )}
        </ContainerClients>
      )}
    </div>
  );
}

export default ClientsOrProjects;
