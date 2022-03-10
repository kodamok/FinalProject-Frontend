import React from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import useMediaQuery from '../../../hooks/useMediaQuery';
import kim from '../../../assets/images/kim.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 4rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.main1};
  }
  span {
    font-weight: 700;
    font-size: 22px;
    
  }
`;
const ContainerThreeDots = styled.div`
  position: relative;
  margin: auto;
  left: 9rem;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: ${({ theme }) => theme.color.main2};
  align-content: center;
`;
const DetailsElement = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  justify-content: center;
`;
const DownloadInvoiceButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
// Style Desktop
const ContainerDesktop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.main1};
  }
  span {
    font-weight: 700;
    font-size: 22px;
    
  }
`;
const ContainerDetailDesktop = styled.div`
  display: flex;
  //border: 1px solid red;
  gap: 2rem;
`;
const TitleAndPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  margin: auto;
  padding-left: 30px;
  //border: 1px solid green;
`;

interface Project {
  projectData: any;
  /*  projectData: {
    startingDate: string;
    dueDate: string;
    companyName: string;
    customerName: string;
    webSite: string;
    taxNumber: string;
  }; */
}

function CardDetails({ projectData }: Project) {
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  return (
    <div>
      {!desktopVersion ? (
        <div>
          <Container>
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
            <h3>Nomad Studio</h3>
            <RoundedPhoto
              img={kim}
              alt="avatar"
              outline="3px solid black"
              width="12rem"
              height="12rem"
            />
            {/* check this part later, because the ? are not the best solution  */}
            {/* the problem is of the time of rendering */}
            {projectData && (
              <Details>
                <DetailsElement>
                  <span>Staring Date</span>
                  <p>{projectData?.oneProject?.createdAt}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Due Date</span>
                  <p>{projectData?.oneProject?.updatedAt}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Company Name</span>
                  <p>{projectData?.oneProject?.clientName}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Customer Name</span>
                  <p>{projectData?.oneProject?.name}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Website</span>
                  <p>{projectData?.oneProject?.text}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Tax Number</span>
                  <p>{projectData?.oneProject?.ownerUser}</p>
                </DetailsElement>
              </Details>
            )}
          </Container>
          <DownloadInvoiceButton>
            <Button
              text="Download Invoice"
              height="40px"
              width="180px"
              fontSize="13px"
              padding="0.5rem 1rem"
            />
          </DownloadInvoiceButton>
        </div>
      ) : (
        <div>
          <ContainerDesktop>
            <ContainerDetailDesktop>
              <TitleAndPicture>
                <h4>Nomad Studio</h4>
                <RoundedPhoto
                  img={kim}
                  alt="avatar"
                  outline="3px solid black"
                  width="12rem"
                  height="12rem"
                />
              </TitleAndPicture>
              {/* check this part later, because the ? are not the best solution  */}
              {/* the problem is of the time of rendering */}
              <div>
                {projectData && (
                  <Details>
                    <DetailsElement>
                      <span>Staring Date</span>
                      <p>{projectData?.oneProject?.createdAt}</p>
                    </DetailsElement>
                    <DetailsElement>
                      <span>Due Date</span>
                      <p>{projectData?.oneProject?.updatedAt}</p>
                    </DetailsElement>
                    <DetailsElement>
                      <span>Company Name</span>
                      <p>{projectData?.oneProject?.clientName}</p>
                    </DetailsElement>
                    <DetailsElement>
                      <span>Customer Name</span>
                      <p>{projectData?.oneProject?.name}</p>
                    </DetailsElement>
                    <DetailsElement>
                      <span>Website</span>
                      <p>{projectData?.oneProject?.text}</p>
                    </DetailsElement>
                    <DetailsElement>
                      <span>Tax Number</span>
                      <p>{projectData?.oneProject?.ownerUser}</p>
                    </DetailsElement>
                  </Details>
                )}
              </div>
            </ContainerDetailDesktop>
          </ContainerDesktop>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
