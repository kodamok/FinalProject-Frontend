import React, { useContext, useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Context } from '../../../providers/GeneralProvider';
import CardDetails from '../../molecules/CardDetails/CardDetails';
import useError from '../../../hooks/useError';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Button from '../../atoms/Button/Button';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import FileUploader from '../../molecules/FileUploader/FileUploader';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';

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
  padding-top: 4rem;
`;
// Style Mobil Version
const ContainerDetails = styled.div`
  margin: auto;
`;
const ProjectInvoicesFiles = styled.div`
  display: flex;
  margin: auto;
  gap: 4rem;
  justify-content: space-around;
  padding: 1rem 2rem;
  padding: 1rem;
  padding-bottom: 16rem;
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

// Style Modal
const ModalBackground = styled.div`
  width: 80vw;
  max-width: 350px;
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
  width: 90vw;
  max-width:350px;
  max-height: 70vh;
  border-radius: 0.6rem;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.main1};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 25px;
  //scrollbar-color: Is in the GlobalStyle.ts
  
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
const ModalBackgroundDesktop = styled.div`
  width: 40vw;
  max-width: 550px;
  height: 30vh;
  //border: 10px solid red;
  background-color: ${({ theme }) => theme.color.main8};
  position: absolute;
  display: flex;
  justify-content: center;
  align-item: center;
`;
const ModalContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  max-width: 550px;
  height: 30vh;
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
const ContainerThreeDotsDesktop = styled.div`
  position: relative;
  margin: auto;
  left: 32rem;
  bottom: 9rem;
  :hover {
    cursor: pointer;
  }
`;
const ContainerDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-bottom: 4rem;
  //border: 10px solid yellow;
`;
const ContainerDetailsDesktop = styled.div`
  position: relative;
  //border: 10px solid green;
`;
const ProjectInvoicesFilesDesktop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
  //border: 10px solid red;
}
h6 {
margin:0;
}
`;
const InvoiceDesktop = styled.div`
  display: flex;
  position: relative;
  //border: 10px solid purple;
  gap: 15px;
`;
const ServicesInvoiceDesktop = styled.div`
  display: flex;
  flex-direction: column;
  flex:10 5 10px;
  }
h5 {
  text-decoration: underline;
}
`;
const ShortDescriptionDesktop = styled.div`
  display: flex;
  flex-direction: column;
  flex:1 1 500px;
}
h5 {
  text-decoration: underline;
}  
`;

const PricesInvoiceDesktop = styled.div`
  display: flex;
  flex-direction: column;
  flex:10 5 10px;
}
h5 {
  text-decoration: underline;
}
`;
const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 10px solid black;
  padding: 1rem;
  gap: 2rem;
`;
const Files = styled.div`
  display: flex;
  //border: 10px solid black;
`;
const TotalInput = styled.input`
  position: relative;
  height: 2rem;
  width: 5rem;
  margin: auto;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const LabelTotal = styled.label`
  font-weight: bold;
  gap: 1rem;
`;
const Line = styled.div`
  border: 0.2px solid black;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 15px;
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
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useContext(Context);
  const { handleError } = useError();
  const { projectId } = useParams();

  const fetchProject = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/projectOne/${projectId}`, {
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
    } finally {
      setIsLoading(false);
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
  const ref: any = useRef(null);
  // useOnClickOutside(ref, () => handleModal()); Come from this one but is enough
  // with (ref, handleModal) if we have declared this function before
  useOnClickOutside(ref, handleModal);

  if (isLoading) return <LoadingSpin />;
  return (
    // Project Details Mobil Version ----------------------------------------------
    <div>
      <Title>Project Details</Title>
      {!desktopVersion ? (
        <Container>
          {console.log(project)}
          <ContainerDetails>{project && <CardDetails projectData={project} />}</ContainerDetails>
          <ProjectInvoicesFiles>
            <ServicesInvoice>
              <h4>Service</h4>
              {/* Closing */}
              {openModal && (
                <ModalBackground ref={ref}>
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
              {/* closing end */}
              {/* opening */}
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
              {/* opening ends */}
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
        // Project Details Desktop Version ----------------------------------------------
        <ContainerDesktop>
          <ContainerDetailsDesktop>
            {project && <CardDetails projectData={project} />}
          </ContainerDetailsDesktop>
          <ProjectInvoicesFilesDesktop>
            <InvoiceDesktop>
              <ContainerThreeDotsDesktop>
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
              </ContainerThreeDotsDesktop>
              <ServicesInvoiceDesktop>
                <h5>Service</h5>
                {openModal && (
                  <ModalBackgroundDesktop ref={ref}>
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
                  </ModalBackgroundDesktop>
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
              </ServicesInvoiceDesktop>
              <PricesInvoiceDesktop>
                <h5>Price</h5>
                {pricesData.map((item) => (
                  <div key={item.id}>
                    <p>{item.text}</p>
                  </div>
                ))}
              </PricesInvoiceDesktop>
              <ShortDescriptionDesktop>
                <h5>Short description</h5>
                {shortDescriptionData.map((item) => (
                  <div key={item.id}>
                    <p>{item.text}</p>
                  </div>
                ))}
              </ShortDescriptionDesktop>
            </InvoiceDesktop>
            <Total>
              <Button
                text="+ Add/Remove New Service"
                height="50px"
                width="200px"
                fontSize="13px"
                padding="0.5rem 1rem"
              />
              <Button
                text="+ Add note"
                height="50px"
                width="140px"
                fontSize="13px"
                padding="0.5rem 1rem"
              />
              <LabelTotal>
                Total:<span> </span>
                <TotalInput type="number" min="0" /> € <span />
              </LabelTotal>
            </Total>
            <Line />
            <h6>Project Files</h6>
            <Line />
            <Files>
              <FileUploader projectId={projectId} />
            </Files>
          </ProjectInvoicesFilesDesktop>
        </ContainerDesktop>
      )}
    </div>
  );
}

export default ProjectDetail;
