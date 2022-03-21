import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import Button from '../../atoms/Button/Button';
import { Context } from '../../../providers/GeneralProvider';

const glow = keyframes` 
    0%{
        box-shadow: 0px 0px 0px 0.5px #e76f51,
         0px 0px 10px 1px #fcbf49;
         transform: scale(0.8);
    }

    25%{
        box-shadow: 0px 0px 10px 1px #e76f51,
        0px 0px 15px 1px #2A9D8F;
    }

    50%{
        box-shadow: 0px 0px 20px 2px #e76f51,
        0px 0px 20px 1px #fcbf49;
    }

    75%{
        box-shadow: 0px 0px 10px 1px #e76f51,
        0px 0px 15px 1px #2A9D8F;
    }

    100%{
        box-shadow: 0px 0px 0px 0.5px #e76f51,
        0px 0px 10px 1px #fcbf49;
        transform: scale(0.7);
    }
    `;

const moon = keyframes` 
    0%{
        top: 0px;
        left:0px;     
    }

    100%{
        top: -25px;
        left:-90px;
        transform: scale(1);
        
    }
    

    `;
const moonReverse = keyframes` 
    0%{
       
        top: -25px;
        left:-90px;
        transform: scale(1);
    }

    100%{
        top: 0px;
        left:0px;
        
    }
    

    `;

const cardTitle = keyframes`
    0%{
        top:-20px;
        font-size: 1.777rem;
        transform: translate(0);
        
    }

    100%{
        font-size: 1rem;
        transform: translate(-67px, 50%);
        top:-140px;
        left: 110px
    `;
const cardTitleReverse = keyframes`
    0%{
        font-size: 1.333rem;
        transform: translate(-67px, 50%);
        top:-140px;
        left: 110px;
    }

    100%{
        font-size: 1.777rem;
        transform: translate(0);
        top:-20px;
    `;
const cardPhone = keyframes`
    0%{
        /* font-size: 1.333rem;
        top:-25px;
        transform: translate(0); */
        opacity: 0;
        font-weight: 400;
        
    }

    100%{
        /* font-size: 1rem;
        transform: translate(-67px, 50%);
        top:-140px;
        left: 110px */
        opacity: 100%;
        font-weight: 600;
    `;
const cardPhoneReverse = keyframes`
    0%{
        /* font-size: 1rem;
        transform: translate(-67px, 50%);
        top:-140px;
        left: 110px; */
        font-weight: 600;
        opacity: 100%;
    }

    100%{
        /* font-size: 1.333rem;
        transform: translate(0);
        top:-25px; */
        opacity: 0;
        font-weight: 400;
    `;
const cardShadow = keyframes`
    0%{
        box-shadow:
  0px 0.5px 0.1px rgba(0, 0, 0, 0.002),
  0px 1.2px 0.2px rgba(0, 0, 0, 0.004),
  0px 2px 0.5px rgba(0, 0, 0, 0.005),
  0px 3.1px 0.8px rgba(0, 0, 0, 0.007),
  0px 4.6px 1.4px rgba(0, 0, 0, 0.008),
  0px 6.7px 2.4px rgba(0, 0, 0, 0.009),
  0px 10px 3.9px rgba(0, 0, 0, 0.01),
  0px 16px 7.1px rgba(0, 0, 0, 0.01),
  0px 30px 15px rgba(0, 0, 0, 0.01)
;

        
    }

    100%{
        box-shadow:
  0px 0.1px 0.1px rgba(0, 0, 0, 0.063),
  0px 0.1px 0.3px rgba(0, 0, 0, 0.119),
  0px 0.2px 0.7px rgba(0, 0, 0, 0.17),
  0px 0.3px 1.2px rgba(0, 0, 0, 0.216),
  0px 0.5px 2px rgba(0, 0, 0, 0.259),
  0px 0.7px 3.2px rgba(0, 0, 0, 0.296),
  0px 1px 4.9px rgba(0, 0, 0, 0.326),
  0px 1.5px 7.9px rgba(0, 0, 0, 0.348),
  0px 2.3px 13.6px rgba(0, 0, 0, 0.356),
  0px 4px 27px rgba(0, 0, 0, 0.34)
;

      ;
      
    `;
const cardShadowReverse = keyframes`
    0%{
        box-shadow:
        0px 0.1px 0.1px rgba(0, 0, 0, 0.063),
        0px 0.1px 0.3px rgba(0, 0, 0, 0.119),
        0px 0.2px 0.7px rgba(0, 0, 0, 0.17),
        0px 0.3px 1.2px rgba(0, 0, 0, 0.216),
        0px 0.5px 2px rgba(0, 0, 0, 0.259),
        0px 0.7px 3.2px rgba(0, 0, 0, 0.296),
        0px 1px 4.9px rgba(0, 0, 0, 0.326),
        0px 1.5px 7.9px rgba(0, 0, 0, 0.348),
        0px 2.3px 13.6px rgba(0, 0, 0, 0.356),
        0px 4px 27px rgba(0, 0, 0, 0.34)
      ;
      
;

    }

    100%{
        box-shadow:
        0px 0.5px 0.1px rgba(0, 0, 0, 0.002),
        0px 1.2px 0.2px rgba(0, 0, 0, 0.004),
        0px 2px 0.5px rgba(0, 0, 0, 0.005),
        0px 3.1px 0.8px rgba(0, 0, 0, 0.007),
        0px 4.6px 1.4px rgba(0, 0, 0, 0.008),
        0px 6.7px 2.4px rgba(0, 0, 0, 0.009),
        0px 10px 3.9px rgba(0, 0, 0, 0.01),
        0px 16px 7.1px rgba(0, 0, 0, 0.01),
        0px 30px 15px rgba(0, 0, 0, 0.01)
      ;
      
    `;

const Wrap = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  margin: 1rem;
`;

const MainDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  /* border: 2px solid white; */

  .name {
    color: ${({ theme }) => theme.color.main9};
    font-size: ${({ theme }) => theme.fontSizeInter.m};
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
    letter-spacing: 0.2rem;
    position: relative;
    transform: translate(0);
    width: 100%;
    top: -20px;
    left: 0px;
    animation-name: ${cardTitleReverse};
    animation-duration: 1s;
    /* border: 2px solid white; */

    p {
      text-align: center;
      flex-wrap: wrap;
    }
  }

  .phone {
    color: ${({ theme }) => theme.color.main9};
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    letter-spacing: 0.2rem;
    position: relative;
    transform: translate(0);
    width: 100%;
    top: -140px;
    left: 110px;
    font-size: 1rem;
    transform: translate(-67px, 50%);
    opacity: 0;
    animation-name: ${cardPhoneReverse};
    animation-duration: 0.5s;
    /* border: 2px solid white; */
  }
`;

const NewRoundedPhoto = styled(RoundedPhoto)`
  img {
    z-index: 5;
  }
`;

const MainContainer = styled.div`
  padding: 30px 0 40px;
  background-color: #001523;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0.5px 0.1px rgba(0, 0, 0, 0.002), 0px 1.2px 0.2px rgba(0, 0, 0, 0.004),
    0px 2px 0.5px rgba(0, 0, 0, 0.005), 0px 3.1px 0.8px rgba(0, 0, 0, 0.007),
    0px 4.6px 1.4px rgba(0, 0, 0, 0.008), 0px 6.7px 2.4px rgba(0, 0, 0, 0.009),
    0px 10px 3.9px rgba(0, 0, 0, 0.01), 0px 16px 7.1px rgba(0, 0, 0, 0.01),
    0px 30px 15px rgba(0, 0, 0, 0.01);

  animation-name: ${cardShadowReverse};
  animation-duration: 0.5s;
  animation-iteration-count: ease-in-out;
  animation-fill-mode: forwards;
  border: 3px solid black;

  :hover {
    box-shadow: 0px 0.1px 0.1px rgba(0, 0, 0, 0.063), 0px 0.1px 0.3px rgba(0, 0, 0, 0.119),
      0px 0.2px 0.7px rgba(0, 0, 0, 0.17), 0px 0.3px 1.2px rgba(0, 0, 0, 0.216),
      0px 0.5px 2px rgba(0, 0, 0, 0.259), 0px 0.7px 3.2px rgba(0, 0, 0, 0.296),
      0px 1px 4.9px rgba(0, 0, 0, 0.326), 0px 1.5px 7.9px rgba(0, 0, 0, 0.348),
      0px 2.3px 13.6px rgba(0, 0, 0, 0.356), 0px 4px 27px rgba(0, 0, 0, 0.34);

    ::before {
      content: '';
      width: 100%;
      height: 40%;
      background-color: transparent;
      position: absolute;
      top: 0;
      right: 0;
      left: 0px;
      border: 3px solid #eae2b7;
      border-radius: 10px;
      transform: scale(1);
      opacity: 0;
      transition: all 0.3s linear 0.7s;
      animation-name: ${cardPhone};
      animation-duration: 0.5s;
      animation-iteration-count: linear;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in-out;
      animation-delay: 0.2s;
    }

    animation-name: ${cardShadow};
    animation-duration: 0.5s;
    animation-iteration-count: ease-in-out;
    animation-fill-mode: forwards;

    .picture {
      animation-name: ${moon};
      animation-duration: 0.5s;
      animation-iteration-count: linear;
      animation-fill-mode: forwards;
    }

    .name {
      animation-name: ${cardTitle};
      animation-duration: 0.5s;
      animation-iteration-count: linear;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in-out;
    }

    .phone {
      animation-name: ${cardPhone};
      animation-duration: 0.5s;
      animation-iteration-count: linear;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in-out;
      animation-delay: 0.2s;
    }
    ::before {
    }

    .picture img {
      box-shadow: 0 0 0 5px #e76f51;
      transform: scale(0.7);
    }

    .social {
      bottom: 0;
      opacity: 100%;
    }
  }

  .picture {
    display: inline-block;
    box-shadow: 0px;
    z-index: 1;
    position: relative;
    margin-bottom: 20px;
    transition: all 0.5s ease;
    animation-name: ${moonReverse};
    animation-duration: 1s;

    ::before {
      content: '';
      width: 100%;
      height: 40%;
      background-color: transparent;
      position: absolute;
      top: 0;
      right: 0;
      left: 0px;
      border: 3px solid #eae2b7;
      border-radius: 10px;
      transform: translate(-67px, 50%);
      opacity: 0;
      animation-name: ${cardPhoneReverse};
      animation-duration: 1s;
    }

    ::after {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #1f313e;
      border: 2px solid #eae2b7;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      box-shadow: 0px 0px 50px 1px #e76f51;
      animation-name: ${glow};
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-play-state: running;
    }

    img {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transform: scale(1);
      transition: all 0.9s ease 0s;
    }
  }

  .phone {
    opacitiy: 100%;
  }

  .title {
    display: block;
    color: #eae2b7;
  }

  .social {
    opacity: 60%;
    width: 100%;
    padding: 0.7rem 0 0 0.7rem;
    margin: 0;
    height: 170px;
    background-color: #eae2b7;
    position: absolute;
    bottom: -110px;
    left: 0;
    transition: all 0.5s ease 0.5ms;
    border-radius: 10px 10px 0 0;
    border-left: 3px solid #001523;
    border-right: 3px solid #001523;
    border-top: 3px solid #001523;
    background-clip: padding-box;

    .socialInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .details {
        letter-spacing: 0.1rem;
        display: flex;
        width: 100%;
        align-content: center;
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 0.5rem;

        & > :nth-child(1) {
          font-weight: 600;
          font-family: 'Inter';
          font-size: ${({ theme }) => theme.fontSizeInter.s};
          color: ${({ theme }) => theme.color.main2};
          line-height: 1rem;
          text-shadow: 0px 1px 2px white;
          padding: 0 0 0.1rem 0;
        }

        & > :nth-child(2) {
          color: ${({ theme }) => theme.color.main2};
          text-align: left;
          font-family: 'Open Sans';
          font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
        }
      }
    }
  }

  .threeDots {
    position: absolute;
    padding: 0.5rem 1rem 0 0;
    top: 0;
    right: 0;
    z-index: 5;
  }
`;

interface client {
  client?: boolean;

  clientData:
    | {
        _id?: string;
        name: string;
        email: string;
        phone?: string;
        projects: string;
        finished: string;
        avatar: string;
      }
    | any;

  projectData:
    | {
        _id: string;
        name: string;
        finished: string;
        websiteName: string;
        startDate: string;
        dueDate: string;
        clientName: string;
        companyName: string;
        taxNumber: string;
        text: string;
        avatar: string;
        ownerFreelancer: string;
        ownerUser: string;
        services: any;
        images: any;
        files: any;
        updatedAt: string;
        createdAt: string;
      }
    | any;
}

function CardProfile({ clientData, projectData, client }: client) {
  const navigate = useNavigate();
  const { setOpenChatBoxWithThisUser, userData } = useContext(Context);

  // Navigation Functions
  const handleNavigateToProjectDetails = () => {
    navigate(`/project/${projectData._id}`);
  };

  const handleNewProjectClick = () => {
    navigate(`/newProject/${clientData._id}`);
  };

  const handleNavigateToClientDetails = () => {
    navigate(`/client/${clientData._id}`);
  };

  const handleNavigateToChatBoxMessage = () => {
    if (client) {
      setOpenChatBoxWithThisUser(clientData._id);
    }
    if (!client && userData.role === 'Client') {
      setOpenChatBoxWithThisUser(projectData.ownerFreelancer);
    }
    if (!client && userData.role === 'Freelancer') {
      setOpenChatBoxWithThisUser(projectData.ownerUser);
    }
  };

  // Drop Down Menu CLIENT

  const dropMenuClient = [
    {
      id: 1,
      text: 'New Project',
      onClickEvent: handleNewProjectClick
    },
    {
      id: 2,
      text: 'View Client',
      onClickEvent: handleNavigateToClientDetails
    },
    {
      id: 3,
      text: 'Send Message',
      onClickEvent: handleNavigateToChatBoxMessage
    }
  ];

  // Drop Down Menu PROJECT

  const dropMenuProject = [
    {
      id: 1,
      text: 'Project Details',
      onClickEvent: handleNavigateToProjectDetails
    },
    {
      id: 2,
      text: 'Send Message',
      onClickEvent: handleNavigateToChatBoxMessage
    }
  ];

  return (
    <Wrap>
      {client ? (
        <MainContainer>
          <div className="threeDots">
            <IconClickable icon={<BsThreeDots fontSize={40} color="#eae2b7" />}>
              {dropMenuClient.map((item) => (
                <Button
                  color="white"
                  key={item.id}
                  dropMenu
                  text={item.text}
                  width="150px"
                  fontSize="1rem"
                  onClick={item.onClickEvent}
                />
              ))}
            </IconClickable>
          </div>
          <div className="picture">
            {/* <Cover /> */}
            <NewRoundedPhoto
              img={clientData.avatar}
              width="110px"
              height="110px"
              alt="face"
              outline="3px solid #e76f51"
            />
          </div>
          <MainDetails>
            <div className="name">
              <p>{clientData.name}</p>
            </div>
            <div className="phone">
              <div>+49 123 654 78</div>
            </div>
          </MainDetails>
          <div className="social">
            <div className="socialInfo">
              <div className="details">
                <p>Email:</p>
                <div>{projectData.companyName}</div>
              </div>

              <div className="details">
                <p>Projects:</p>
                <div>5</div>
              </div>
            </div>
          </div>
        </MainContainer>
      ) : (
        <MainContainer>
          <div className="threeDots">
            <IconClickable icon={<BsThreeDots fontSize={40} color="#eae2b7" />}>
              {dropMenuProject.map((item) => (
                <Button
                  color="white"
                  key={item.id}
                  dropMenu
                  text={item.text}
                  width="150px"
                  fontSize="1rem"
                  onClick={item.onClickEvent}
                />
              ))}
            </IconClickable>
          </div>
          <div className="picture">
            {/* <Cover /> */}
            <NewRoundedPhoto
              img={projectData.avatar}
              width="110px"
              height="110px"
              alt="face"
              outline="3px solid #e76f51"
            />
          </div>
          <MainDetails>
            <div className="name">
              <p>{projectData.clientName}</p>
            </div>
            <div className="phone">
              <div>+49 123 654 78</div>
            </div>
          </MainDetails>
          <div className="social">
            <div className="socialInfo">
              <div className="details">
                <p>Company:</p>
                <div>{projectData.phone}</div>
              </div>
              <div className="details">
                <p>Start:</p>
                <div>{projectData.startDate}</div>
              </div>
              <div className="details">
                <p>Due:</p>
                <div>{projectData.dueDate}</div>
              </div>
            </div>
          </div>
        </MainContainer>
      )}
    </Wrap>
  );
}

CardProfile.defaultProps = {
  client: false
};

export default CardProfile;
