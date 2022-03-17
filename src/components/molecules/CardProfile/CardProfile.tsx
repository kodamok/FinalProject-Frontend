import React from 'react';
import styled, { keyframes } from 'styled-components';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';

const glow = keyframes` 
    0%{
        box-shadow: 0px 0px 0px 0.5px #e76f51,
         0px 0px 10px 1px #fcbf49;
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
    }
    `;

const moon = keyframes` 
    0%{
        top: 0px;
        left:0px;     
    }

    100%{
        top: -20px;
        left:-80px;
        transform: scale(0.9);
        
    }
    

    `;
const moonReverse = keyframes` 
    0%{
       
        top: -20px;
        left:-80px;
        transform: scale(0.9);
    }

    100%{
        top: 0px;
        left:0px;
        
    }
    

    `;

const cardTitle = keyframes`
    0%{
        top:150px;
    }

    100%{
        top:30px;
        left: 140px
    `;
const cardTitleReverse = keyframes`
    0%{
        
        top:30px;
        left: 140px;
    }

    100%{
        top:150px;
    `;

const Wrap = styled.div`
  width: 300px;
  height: 285px;
  display: flex;
`;
/* const Cover = styled.span`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.main8};
  position: absolute;
  top: -30px;
  left: -70px;
  border: 5px solid black;
  border-radius: 50%;
  box-shadow: 0px 0px 50px 1px #e76f51, 0px 0px 50px 60px rgba(0, 0, 0, 0.288);
  box-shadow: 0px 0px 50px 1px #e76f51, 0px 0px 50px 60px rgba(0, 0, 0, 0.288);
  z-index: 10;
  animation: ${Glow} 10s linear infinite ease-in-out;
  animation-direction: alternate;
`; */

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-size: ${({ theme }) => theme.fontSizeInter.m};
    color: ${({ theme }) => theme.color.main9};
    font-size: ${({ theme }) => theme.fontSizeInter.m};
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
    letter-spacing: 0.2rem;
  }
`;

const NewRoundedPhoto = styled(RoundedPhoto)``;

const MainContainer = styled.div`
  padding: 30px 0 40px;
  background-color: #001523;
  border-radius: 10%;
  width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
  border: 2px solid #e76f51;

  :hover {
    .picture {
      animation-name: ${moon};
      animation-duration: 0.5s;
      animation-iteration-count: ease-in-out;
      animation-fill-mode: forwards;
    }

    .name {
      animation-name: ${cardTitle};
      animation-duration: 0.5s;
      animation-iteration-count: easecubic-bezier(0.56, 0.6, 0.58, 0.62);
      animation-fill-mode: forwards;
    }
    ::before {
    }

    .picture img {
      box-shadow: 0 0 0 5px #e76f51;
      transform: scale(0.8);
    }

    .social {
      bottom: 0;
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
      height: 0;
      border-radius: 50%;
      background-color: #e76f51;
      position: absolute;
      bottom: 150%;
      right: 0;
      left: 0;
      opacity: 1;
      transform: scale(0.8);
      transition: all 0.3s linear 0s;
    }

    ::after {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #1f313e;
      border: 2px solid white;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      box-shadow: 0px 0px 50px 1px #e76f51, 0px 0px 50px 60px rgba(0, 0, 0, 0.288);
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

  .name {
    position: absolute;
    top: 150px;
    left: 90px;
    animation-name: ${cardTitleReverse};
    animation-duration: 1s;
  }

  .title {
    display: block;
    color: #eae2b7;
  }

  .social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0;
    margin: 0;
    height: 150px;
    background-color: #e76f51;
    position: absolute;
    bottom: -100px;
    left: 0;
    transition: all 0.5s ease 0.5ms;
    border-top: 2px solid #2a9d8f;

    li {
      display: inline-block;

      a {
        /* Currently no links available */
        display: block;
        padding: 10px;
        font-size: 17px;
        color: white;
        transition: all 0.3s ease 0s;
        text-decoration: none;

        a:hover {
          color: #1369ce;
          background-color: #f7f5ec;
        }
      }
    }
  }
`;

interface client {
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

function CardProfile({ clientData, projectData }: client) {
  const findProjectFromClient = () => {
    const getAllProjectsFromOneClient = clientData.projects;
    const getAllProjectsFromFreelancer = projectData;
    const getProjectId = getAllProjectsFromFreelancer.map((item: any) => item._id);
    console.log('this are projectData from the freelancer', getAllProjectsFromFreelancer);
    console.log(getAllProjectsFromOneClient);
    console.log(getProjectId);
    let projectsFromSpecificClient;

    for (let i = 0; i < getAllProjectsFromOneClient.length; i++) {
      projectsFromSpecificClient = getProjectId.filter(
        (item: any) => item === getAllProjectsFromOneClient[i]
      );
    }
    console.log(projectsFromSpecificClient);
  };

  findProjectFromClient();

  return (
    <Wrap>
      <MainContainer>
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
        <ContactDetails>
          <div className="name">{clientData.name}</div>
          <div className="details">{clientData.email}</div>
          <div className="details">{clientData.phone}</div>
        </ContactDetails>
        <ul className="social">
          <li>
            <div>{clientData.email}</div>
          </li>
        </ul>
      </MainContainer>
    </Wrap>
  );
}

export default CardProfile;
