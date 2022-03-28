import React from 'react';
import styled from 'styled-components';
// import { BsThreeDots } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';
// import IconClickable from '../../atoms/IconClickable/IconClickable';
// import Button from '../../atoms/Button/Button';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import useMediaQuery from '../../../hooks/useMediaQuery';
// import { Context } from '../../../providers/GeneralProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  border-radius: 0.6rem;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  background-color: ${({ theme }) => theme.color.main1};
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    padding: 1rem 0.6rem;
  }
  span {
    font-weight: 700;
    font-size: 22px;
  }
`;
// const ContainerThreeDots = styled.div`
//   position: relative;
//   margin: auto;
//   left: 8rem;
// `;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.main2};
  gap: 0;
  > h4 {
    margin: 1rem;
  }
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
  align-items: center;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.color.main2};
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.main1};

  span {
    font-weight: 700;
    font-size: 22px;
    @media (max-width: 1242px) {
       {
        font-size: 15px;
      }
    }
    @media (max-width: 1129px) {
       {
        font-size: 12px;
      }
    }
  }
`;
const ContainerDetailDesktop = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2rem;
  //border: 10px solid red;
`;
const TitleAndPictureDesktop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  //border: 10px solid green;

  @media (max-width: 1242px) {
    > h4 {
      font-size: 25px;
    }
  }
`;
const DetailsDesktop = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.main2};
  align-content: center;
  gap: 2rem;
`;
const ContainerDetailsElement = styled.div`
  padding-top: 3rem;
  //border: 10px solid blue;
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
  // const navigate = useNavigate();
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  // const { userData } = useContext(Context);

  // const handleNavigateToClient = () => {
  //   if (userData.role === 'Freelancer') {
  //     navigate(`/client/${projectData.ownerUser}`);
  //   } else {
  //     navigate(`/client/${projectData.ownerFreelancer}`);
  //   }
  // };
  // const handleNavigateToEditProject = () => {
  //   navigate(`/editProject/${projectData._id}`);
  // };

  // Card Details Mobil Version
  return (
    <div>
      {!desktopVersion ? (
        <div>
          <Container>
            {/* <ContainerThreeDots> */}
            {/*   <IconClickable icon={<BsThreeDots fontSize={38} />}> */}
            {/*     <div */}
            {/*       style={{ */}
            {/*         display: 'flex', */}
            {/*         flexDirection: 'column', */}
            {/*         gap: '0.5rem', */}
            {/*         padding: '1rem' */}
            {/*       }} */}
            {/*     > */}
            {/*       <Button */}
            {/*         whiteMenu */}
            {/*         text={userData.role === 'Freelancer' ? 'View Client' : 'View Freelancer'} */}
            {/*         width="180px" */}
            {/*         fontSize="1rem" */}
            {/*         padding="0.5rem 1rem" */}
            {/*         onClick={handleNavigateToClient} */}
            {/*       /> */}
            {/*       {userData.role === 'Freelancer' && ( */}
            {/*         <Button */}
            {/*           whiteMenu */}
            {/*           text="Edit Project" */}
            {/*           width="180px" */}
            {/*           fontSize="1rem" */}
            {/*           padding="0.5rem 1rem" */}
            {/*           onClick={handleNavigateToEditProject} */}
            {/*         /> */}
            {/*       )} */}
            {/*     </div> */}
            {/*   </IconClickable> */}
            {/* </ContainerThreeDots> */}

            {/* check this part later, because the ? are not the best solution  */}
            {/* the problem is of the time of rendering */}
            {projectData && (
              <Details>
                <h4>Nomad Studio</h4>
                <RoundedPhoto
                  img={projectData?.avatar}
                  alt="avatar"
                  outline="3px solid black"
                  width="12rem"
                  height="12rem"
                />
                <DetailsElement>
                  <span>Starting Date</span>
                  <p>{projectData?.startDate?.substring(0, 15) || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Due Date</span>
                  <p>{projectData?.updatedAt?.substring(0, 10) || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Company Name</span>
                  <p>{projectData?.companyName || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Customer Name</span>
                  <p>{projectData?.clientName || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Website</span>
                  <p>{projectData?.websiteName || 'No Data'}</p>
                </DetailsElement>
                <DetailsElement>
                  <span>Tax Number</span>
                  <p>{projectData?.taxNumber || 'No Data'}</p>
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
                {projectData && (
                  <DetailsDesktop>
                    <TitleAndPictureDesktop>
                      <h4>Nomad Studio</h4>
                      <RoundedPhoto
                        img={projectData?.avatar}
                        alt="avatar"
                        outline="3px solid black"
                        width="12rem"
                        height="12rem"
                      />
                      <DetailsElement style={{ alignSelf: 'flex-start', paddingLeft: '3rem' }}>
                        <span>Starting Date</span>
                        <p>{projectData?.startDate?.substring(0, 15) || 'No Data'}</p>
                      </DetailsElement>
                      <DetailsElement style={{ alignSelf: 'flex-start', paddingLeft: '3rem' }}>
                        <span>Due Date</span>
                        <p>{projectData?.updatedAt?.substring(0, 10) || 'No Data'}</p>
                      </DetailsElement>
                    </TitleAndPictureDesktop>
                    <ContainerDetailsElement>
                      <DetailsElement>
                        <span>Company Name</span>
                        <p>{projectData?.companyName || 'No Data'}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Customer Name</span>
                        <p>{projectData?.clientName || 'No Data'}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Website</span>
                        <p>{projectData?.websiteName || 'No Data'}</p>
                      </DetailsElement>
                      <DetailsElement>
                        <span>Tax Number</span>
                        <p>{projectData?.taxNumber || 'No Data'}</p>
                      </DetailsElement>
                    </ContainerDetailsElement>
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

export default CardDetails;
