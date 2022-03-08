import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../../../providers/GeneralProvider';
import CardDetails from '../../molecules/CardDetails/CardDetails';
import useError from '../../../hooks/useError';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Button from '../../atoms/Button/Button';
import IconClickable from '../../atoms/IconClickable/IconClickable';
// /project/:projectId
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
`;
const Title = styled.h3`
  margin: auto;
  text-align: center;
`;
// Style Mobil Version
const ContainerDetails = styled.div`
  margin: auto;
`;
const ProjectInvoicesFiles = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  gap: 4rem;
  justify-content: space-around;
  padding: 1rem 2rem;
  padding: 1rem;
`;
const ServicesInvoice = styled.div`
  display: flex;
  flex-direction: column;
  
  }
h4 {
  text-decoration: underline;
}
`;
const ServicesButton = styled.button`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PricesInvoice = styled.div`
  display: flex;
  flex-direction: column;
    }
h4 {
  text-decoration: underline;
}
`;

const Total = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 1rem;
`;
const Files = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 1rem;
`;
// Style Modal
const ModalBackground = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: ${({ theme }) => theme.color.main8};
  position: absolute;
  display: flex;
  justify-content: center;
  align-item: center;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 70vh;
  border-radius: 0.6rem;
  overflow: scroll;
  background-color: ${({ theme }) => theme.color.main1};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 25px;
}
div {
  display:flex;
  justify-content: flex-end;
}
`;
const ModalText = styled.div`
  margin: auto;
`;
// Style Modal Desktop
const ModalContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  width: 35vw;
  height: 40vh;
  border-radius: 0.6rem;
  overflow: scroll;
  background-color: ${({ theme }) => theme.color.main1};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 25px;
}
div {
  display:flex;
  justify-content: flex-end;
}
`;
// Style Desktop Version
const ContainerThreeDots = styled.div`
  position: relative;
  margin: auto;
  left: 37rem;
  bottom: 10rem;
`;
const ContainerDesktop = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  border: 1px solid yellow;
`;
const ContainerDetailsDesktop = styled.div`
  position: relative;
  margin: auto;
  right: 10rem;
  border: 1px solid green;
`;
const ProjectInvoicesFilesDesktop = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  gap: 1rem;
  justify-content: space-around;
  border: 1px solid red;
`;
const InvoiceDesktop = styled.div`
  //by the moment is a flex div
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  padding: 1rem;
  gap: 3rem;
`;

const ShortDescriptionDesktop = styled.div`
  display: flex;
  flex-direction: column;

}
h4 {
  text-decoration: underline;
}  
`;

const PricesInvoiceDesktop = styled.div`
  display: flex;
  flex-direction: column;
  
}
h4 {
  text-decoration: underline;
}
`;
const nameOfServicesData = [
  {
    path: '/',
    text: 'Low Res. Mockup',
    id: 1
  },
  {
    path: '/',
    text: 'Back End Architecture',
    id: 2
  },
  {
    path: '/',
    text: 'UX & UI Design',
    id: 3
  },
  {
    path: '/',
    text: 'Front End Development',
    id: 4
  },
  {
    path: '/',
    text: 'Low Res. Mockup',
    id: 5
  },
  {
    path: '/',
    text: 'Back End Architecture',
    id: 6
  },
  {
    path: '/',
    text: 'UX & UI Design',
    id: 7
  },
  {
    path: '/',
    text: 'Front End Development',
    id: 8
  }
];
const pricesData = [
  {
    path: '/',
    text: '250€',
    id: 1
  },
  {
    path: '/',
    text: '45€',
    id: 2
  },
  {
    path: '/',
    text: '200€',
    id: 3
  },
  {
    path: '/',
    text: '45€',
    id: 4
  },
  {
    path: '/',
    text: '250€',
    id: 5
  },
  {
    path: '/',
    text: '45€',
    id: 6
  },
  {
    path: '/',
    text: '200€',
    id: 7
  },
  {
    path: '/',
    text: '45€',
    id: 8
  }
];

const shortDescriptionData = [
  {
    path: '/',
    text: 'Low Res. Mockup',
    id: 1
  },
  {
    path: '/',
    text: 'Back End Architecture',
    id: 2
  },
  {
    path: '/',
    text: 'UX & UI Design',
    id: 3
  },
  {
    path: '/',
    text: 'Front End Development',
    id: 4
  },
  {
    path: '/',
    text: 'Low Res. Mockup',
    id: 5
  },
  {
    path: '/',
    text: 'Back End Architecture',
    id: 6
  },
  {
    path: '/',
    text: 'UX & UI Design',
    id: 7
  },
  {
    path: '/',
    text: 'Front End Development',
    id: 8
  }
];
function ProjectDetail() {
  const [project, setProject] = useState({});

  const { userData } = useContext(Context);
  const { handleError } = useError();
  const projectId = '620f606f16b8070a5564db1d';
  // const projectId = useParams();
  console.log(projectId);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project/${projectId}`, {
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
        setProject(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);
  // useMediaQuery
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <div>
      <Title>Project Details</Title>
      {!desktopVersion ? (
        <Container>
          <ContainerDetails>{project && <CardDetails projectData={project} />}</ContainerDetails>
          <ProjectInvoicesFiles>
            <ServicesInvoice>
              <h4>Service</h4>
              {openModal && (
                <ModalBackground>
                  <ModalContainer>
                    <div>
                      <GrClose onClick={handleModal} cursor="pointer" fontSize={28} />
                    </div>
                    <ModalText>
                      <h5>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi expedita
                        fugiat quos accusamus in soluta. Necessitatibus doloremque vitae quia totam
                        ipsa! Esse fugit reprehenderit sequi molestiae possimus qui perspiciatis
                        iste in recusandae, ratione quibusdam tenetur. Quibusdam incidunt iusto
                        ipsum repellat natus fugiat voluptatem esse, architecto explicabo, inventore
                        nulla quae dolorum!
                      </h5>
                    </ModalText>
                  </ModalContainer>
                </ModalBackground>
              )}
              {nameOfServicesData.map((item) => (
                <div key={item.id}>
                  <ServicesButton
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {item.text}
                  </ServicesButton>
                </div>
              ))}
            </ServicesInvoice>
            <PricesInvoice>
              <h4>Price</h4>
              {pricesData.map((item) => (
                <div key={item.id}>
                  <p>{item.text}</p>
                </div>
              ))}
            </PricesInvoice>
          </ProjectInvoicesFiles>
        </Container>
      ) : (
        <ContainerDesktop>
          <ContainerDetailsDesktop>
            {project && <CardDetails projectData={project} />}
          </ContainerDetailsDesktop>
          <ProjectInvoicesFilesDesktop>
            <InvoiceDesktop>
              <ContainerThreeDots>
                <IconClickable icon={<BsThreeDots fontSize={38} />}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1rem'
                    }}
                  >
                    <Button text="What ever" width="180px" fontSize="1rem" padding="0.5rem 1rem" />
                    <Button
                      text="What ever too"
                      width="180px"
                      fontSize="1rem"
                      padding="0.5rem 1rem"
                    />
                  </div>
                </IconClickable>
              </ContainerThreeDots>
              <ServicesInvoice>
                <h4>Service</h4>
                {openModal && (
                  <ModalBackground>
                    <ModalContainerDesktop>
                      <div>
                        <GrClose onClick={handleModal} cursor="pointer" fontSize={28} />
                      </div>
                      <ModalText>
                        <h5>
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi expedita
                          fugiat quos accusamus in soluta. Necessitatibus doloremque vitae quia
                          totam ipsa! Esse fugit reprehenderit sequi molestiae possimus qui
                          perspiciatis iste in recusandae, ratione quibusdam tenetur. Quibusdam
                          incidunt iusto ipsum repellat natus fugiat voluptatem esse, architecto
                          explicabo, inventore nulla quae dolorum!
                        </h5>
                      </ModalText>
                    </ModalContainerDesktop>
                  </ModalBackground>
                )}
                {nameOfServicesData.map((item) => (
                  <div key={item.id}>
                    <ServicesButton
                      type="button"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      {item.text}
                    </ServicesButton>
                  </div>
                ))}
              </ServicesInvoice>
              <PricesInvoiceDesktop>
                <h4>Price</h4>
                {pricesData.map((item) => (
                  <div key={item.id}>
                    <p>{item.text}</p>
                  </div>
                ))}
              </PricesInvoiceDesktop>
              <ShortDescriptionDesktop>
                <h4>Short Description</h4>
                {shortDescriptionData.map((item) => (
                  <div key={item.id}>
                    <p>{item.text}</p>
                  </div>
                ))}
              </ShortDescriptionDesktop>
            </InvoiceDesktop>
            <Total>Total</Total>
            <Files>Files</Files>
          </ProjectInvoicesFilesDesktop>
        </ContainerDesktop>
      )}
    </div>
  );
}

export default ProjectDetail;
