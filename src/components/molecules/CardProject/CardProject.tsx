import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { BiArrowFromBottom } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';
import { Context } from '../../../providers/GeneralProvider';

interface Card {
  openDataDetails: boolean;
}

const Container = styled.div<Card>`
  border: 3px solid black;
  padding: 0 1rem 1rem 1rem;
  border-radius: 0.6rem;
  min-width: 290px;
  width: 100%;
  max-width: 450px;
  ${({ theme }) => theme.up(theme.breakpoint.sm)} {
    max-width: 290px;
  }
  * {
    margin: 0;
  }

  h4 {
    max-width: 180px;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  }
  h5 {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
    font-weight: bold;
  }
  span {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  }

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid grey;
    padding: 0.5rem 0 0.5rem 0;

    div:last-child {
      align-self: flex-start;
    }
  }

  > div:nth-child(2) {
    padding: 0.5rem 0.5rem 0 0.5rem;
    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
      display: ${({ openDataDetails }) => (openDataDetails ? 'block' : 'none')};
    }
    > div:last-child {
      display: flex;
      justify-content: center;
      ${({ theme }) => theme.up(theme.breakpoint.sm)} {
        display: none;
      }
    }
  }
`;

const ElementData = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerOptionsToClick = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem;
`;

interface client {
  projectData: {
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
  };
}

function CardProject({ projectData }: client) {
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const { setOpenChatBoxWithThisUser, userData } = useContext(Context);
  const navigate = useNavigate();
  const handleCloseDetails = (e: any) => {
    e.stopPropagation();
    setOpenDataDetails(false);
  };
  const handleNavigateToProjectDetails = () => {
    navigate(`/project/${projectData._id}`);
  };

  const handleNavigateToChatBoxMessage = () => {
    if (userData.role === 'Client') {
      setOpenChatBoxWithThisUser(projectData.ownerFreelancer);
    }
    if (userData.role === 'Freelancer') {
      setOpenChatBoxWithThisUser(projectData.ownerUser);
    }
  };

  return (
    <Container openDataDetails={openDataDetails} onClick={() => setOpenDataDetails(true)}>
      <div>
        <RoundedPhoto
          img={projectData.avatar}
          alt="face"
          width="60px"
          height="60px"
          outline="3px solid black"
        />
        <div>
          <h5>{projectData.websiteName || 'No Data'}</h5>
        </div>
        <div>
          <IconClickable icon={<BsThreeDots fontSize={28} />}>
            <ContainerOptionsToClick>
              <Button
                whiteMenu
                text="View"
                width="150px"
                fontSize="1rem"
                padding="0.3rem 1rem"
                onClick={handleNavigateToProjectDetails}
              />
              {/* <Button whiteMenu text="Upload" width="150px" fontSize="1rem" padding="0.3rem 1rem" /> */}
              {/* <Button */}
              {/*   whiteMenu */}
              {/*   text="Progress" */}
              {/*   width="150px" */}
              {/*   fontSize="1rem" */}
              {/*   padding="0.3rem 1rem" */}
              {/* /> */}
              <Button
                whiteMenu
                text="Message"
                width="150px"
                fontSize="1rem"
                padding="0.3rem 1rem"
                onClick={handleNavigateToChatBoxMessage}
              />
            </ContainerOptionsToClick>
          </IconClickable>
        </div>
      </div>
      <div>
        <ElementData>
          <span>Start Date:</span>
          <p>{projectData.startDate?.substring(0, 10) || 'No Data'}</p>
        </ElementData>
        <ElementData>
          <span>Due Data:</span>
          <p>{projectData.dueDate?.substring(0, 10) || 'No Data'}</p>
        </ElementData>
        <ElementData>
          <span>Client:</span>
          <p>{projectData.clientName || 'No Data'}</p>
        </ElementData>
        <ElementData>
          <span>Company Name:</span>
          <p>{projectData.companyName || 'No Data'}</p>
        </ElementData>
        <div>
          <BiArrowFromBottom onClick={handleCloseDetails} fontSize={24} />
        </div>
      </div>
    </Container>
  );
}
export default CardProject;
