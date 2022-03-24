import React from 'react';
import styled from 'styled-components';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import useMediaQuery from '../../../hooks/useMediaQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  padding: 1rem 4rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  box-shadow:${({ theme }) => theme.boxShadow.mainShadow};
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
  h5 {
    margin: 1rem;
  }
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
`;

// Style Desktop
const ContainerDesktop = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  box-shadow:${({ theme }) => theme.boxShadow.mainShadow};
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
  padding: inherit;
  //border: 10px solid red;
`;
const TitleAndPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  gap: 2rem;
  //border: 10px solid green;
  h4 {
    margin: 0;
  }
`;
const DetailsDesktop = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.main2};
  align-content: center;
  gap: 5rem;
`;
const ContactInformation = styled.div`
  display: flex;
  flex-direction: column;
  //border: 10px solid orange;
  span,
  p {
    margin-right: auto;
  }
  h4 {
    margin: 0 auto 1rem auto;
  }
`;
const BillingInformation = styled.div`
  display: flex;
  flex-direction: column;
  //border: 10px solid blue;
  span,
  p {
    margin-right: auto;
  }
  h4 {
    margin: 0 0 1rem 0;
    padding-left: 17px;
  }
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
  return (
    <div>
      {!desktopVersion ? (
        <div>
          <Container>
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
                  <span>Email</span>
                  <p>{clientData?.email}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Phone number</span>
                  <p>{clientData?.phone}</p>
                </DetailsElement>
                <h5>Billing Information</h5>
                <DetailsElement>
                  <span>Id</span>
                  <p>{clientData?.identityCardNumber || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Tax Number</span>
                  <p>{clientData?.taxNumber || 'No Data'}</p>
                </DetailsElement>
              </Details>
            )}
          </Container>
        </div>
      ) : (
        // Card Details Desktop Version
        <div>
          <ContainerDesktop>
            <ContainerDetailDesktop>
              {/* check this part later, because the ? are not the best solution  */}
              {/* the problem is of the time of rendering */}
              <div>
                {clientData && (
                  <DetailsDesktop>
                    <TitleAndPicture>
                      <h4>Nomad Studio</h4>
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
                        <span>Email</span>
                        <p>{clientData?.email}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Phone Number</span>
                        <p>{clientData?.phone}</p>
                      </DetailsElement>
                    </ContactInformation>
                    <BillingInformation>
                      <h4>Billing</h4>
                      <DetailsElement>
                        <span>Id-Number</span>
                        <p>{clientData?.identityCardNumber || 'No Data'}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Tax-Number</span>
                        <p>{clientData?.taxNumber || 'No Data'}</p>
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
