import React from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ContainerOptionsToClick } from '../CardClient/CardClient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  padding: 1rem 4rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.main1};
  }
  span {
    font-weight: 700;
    font-size: 22px;
    
  }
  h4 {
      margin:auto;
  }
`;
const ContainerThreeDots = styled.div`
  position: relative;
  margin: auto;
  left: 8rem;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.color.main2};
  align-content: center;
`;

const DetailsElement = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  align-items: center;
`;

// Style Desktop
const ContainerDesktop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 2rem 3rem;
  margin-bottom: 4rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.main1};
  }
  span {
    font-weight: 700;
    font-size: 22px;
  }
`;
const ContainerThreeDotsDesktop = styled.div`
  position: relative;
  margin: auto;
  left: 50rem;
  bottom: 11rem;
  //border: 10px solid pink;
  :hover {
    cursor: pointer;
  }
`;
const ContainerDetailDesktop = styled.div`
  display: flex;
  padding: inherit;
  gap: 10rem;
  //border: 10px solid red;
`;
const TitleAndPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  margin: auto;
  //border: 10px solid green;
`;
const DetailsDesktop = styled.div`
  display: flex;
  gap: 7px;
  color: ${({ theme }) => theme.color.main2};
  align-content: center;
  gap: 5rem;
`;
const ContactInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //border: 10px solid orange;
  h4 {
    margin: auto;
  }
`;
const BillingInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface Client {
  clientData: any;
  /*  projectData: {
    startingDate: string;
    dueDate: string;
    companyName: string;
    customerName: string;
    webSite: string;
    taxNumber: string;
  }; */
}
// Card Details Mobil Version
function CardClientDetails({ clientData }: Client) {
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  const navigate = useNavigate();
  const handleOpenNewProjectPage = () => {
    console.log('client', clientData);
    navigate(`/newProject/${clientData._id}`);
  };
  return (
    <div>
      {!desktopVersion ? (
        <div>
          <Container>
            <ContainerThreeDots>
              <IconClickable icon={<BsThreeDots fontSize={38} />}>
                <ContainerOptionsToClick>
                  <Button
                    whiteMenu
                    text="New Project"
                    onClick={handleOpenNewProjectPage}
                    width="150px"
                    fontSize="1rem"
                    padding="0.3rem 1rem"
                  />
                  {/*   <Button */}
                  {/*     text="What ever too" */}
                  {/*     width="180px" */}
                  {/*     fontSize="1rem" */}
                  {/*     padding="0.5rem 1rem" */}
                  {/*   /> */}
                </ContainerOptionsToClick>
              </IconClickable>
            </ContainerThreeDots>

            {/* check this part later, because the ? are not the best solution  */}
            {/* the problem is of the time of rendering */}
            {clientData && (
              <Details>
                <h4>Nomad Studio</h4>
                <RoundedPhoto
                  img={clientData?.avatar}
                  alt="avatar"
                  outline="3px solid black"
                  width="12rem"
                  height="12rem"
                />
                <h5>Contact Information</h5>
                <DetailsElement>
                  <span>Name</span>
                  <p>{clientData?.name}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Surname</span>
                  <p>{clientData?.name}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Email</span>
                  <p>{clientData?.email}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Phone number</span>
                  <p>{clientData?.name}</p>
                </DetailsElement>
                <h5>Billing Information</h5>
                <DetailsElement>
                  <span>Id</span>
                  <p>{clientData?.role}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Tax Number</span>
                  <p>{clientData?.taxNumber}</p>
                </DetailsElement>
              </Details>
            )}
          </Container>
        </div>
      ) : (
        // Card Details Desktop Version
        <div>
          <ContainerDesktop>
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
                  <Button
                    whiteMenu
                    text="New Project"
                    onClick={handleOpenNewProjectPage}
                    width="150px"
                    fontSize="1rem"
                    padding="0.3rem 1rem"
                  />
                  {/* <Button */}
                  {/*   text="What ever too" */}
                  {/*   width="180px" */}
                  {/*   fontSize="1rem" */}
                  {/*   padding="0.5rem 1rem" */}
                  {/* /> */}
                </div>
              </IconClickable>
            </ContainerThreeDotsDesktop>
            <ContainerDetailDesktop>
              {/* check this part later, because the ? are not the best solution  */}
              {/* the problem is of the time of rendering */}
              <div>
                {clientData && (
                  <DetailsDesktop>
                    <TitleAndPicture>
                      <h5>Nomad Studio</h5>
                      <RoundedPhoto
                        img={clientData?.avatar}
                        alt="avatar"
                        outline="3px solid black"
                        width="12rem"
                        height="12rem"
                      />
                    </TitleAndPicture>
                    <ContactInformation>
                      <h4>Contact</h4>
                      <DetailsElement>
                        <span>Name</span>
                        <p>{clientData?.name}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Surname</span>
                        <p>{clientData?.name}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Email</span>
                        <p>{clientData?.email}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Phone Number</span>
                        <p>{clientData?.name}</p>
                      </DetailsElement>
                    </ContactInformation>
                    <BillingInformation>
                      <h4>Billing</h4>
                      <DetailsElement>
                        <span>Id</span>
                        <p>{clientData?.role}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Tax Number</span>
                        <p>{clientData?.taxNumber}</p>
                      </DetailsElement>
                    </BillingInformation>
                  </DetailsDesktop>
                )}
              </div>
            </ContainerDetailDesktop>
          </ContainerDesktop>
        </div>
      )}
    </div>
  );
}
export default CardClientDetails;
