import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalMessage from '../../organisms/GlobalMessage/GlobalMessage';
import TitleWithLines from '../../atoms/TitleWithLines/TitleWithLines';
import CardProject from '../../molecules/CardProject/CardProject';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';

const Container = styled.div`
  padding: 1rem;
  > h3 {
    text-align: center;
  }
`;

const ContainerProjects = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1.5rem;
  > div {
    width: 420px;
    max-width: 450px;
    min-width: 330px;
  }
`;
// const dummyProjectData = [
//   {
//     name: 'Super Website',
//     website: 'superwebsite.de',
//     text: 'Something About',
//     dueData: '11-11-2022',
//     finished: '32%'
//   },
//   {
//     name: 'Worst Website',
//     website: 'worstwebsite.de',
//     text: 'Something About',
//     dueData: '21-11-2022',
//     finished: '66%'
//   },
//   {
//     name: 'Average Website',
//     website: 'averagewebsite.de',
//     text: 'Something About',
//     dueData: '13-11-2024',
//     finished: '90%'
//   }
// ];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(Context);
  const { handleError } = useError();
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

      if (res.status === 200) {
        setProjects(resJSON);
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
    fetchProjects();
  }, []);

  if (isLoading) return <LoadingSpin />;
  return (
    <Container>
      <h3>My Projects</h3>
      <TitleWithLines text="All Projects" />
      <ContainerProjects>
        {projects.length ? (
          projects.map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <CardProject key={i} projectData={item} />
          ))
        ) : (
          <NoItemsFound text="Projects" />
        )}
      </ContainerProjects>
      <GlobalMessage />
    </Container>
  );
}

export default Projects;
