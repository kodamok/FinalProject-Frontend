import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { BiArrowFromBottom } from 'react-icons/bi';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';

interface Card {
  openDataDetails: boolean;
}

const Container = styled.div<Card>`
  border: 3px solid black;
  padding: 0 1rem 1rem 1rem;
  border-radius: 0.6rem;
  * {
    margin: 0;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 4px solid black;
    padding: 0.5rem 0 0.5rem 0;
    h4 {
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
    }
    div:last-child {
      align-self: flex-start;
    }
  }

  > div:nth-child(2) {
    padding: 0.5rem 0.5rem 0 0.5rem;
    ${({ theme }) => theme.down(theme.breakpoint.m)} {
      display: ${({ openDataDetails }) => (openDataDetails ? 'block' : 'none')};
    }
    > div:last-child {
      display: flex;
      justify-content: center;
      ${({ theme }) => theme.up(theme.breakpoint.m)} {
        display: none;
      }
    }
  }

  h4 {
    max-width: 180px;
  }
  span {
    font-weight: 700;
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
    name: string;
    finished: string;
    website: string;
    dueData: string;
    text: string;
    avatar: string;
  };
}

function CardProject({ projectData }: client) {
  const [openDataDetails, setOpenDataDetails] = useState(false);
  const handleCloseDetails = (e: any) => {
    e.stopPropagation();
    setOpenDataDetails(false);
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
          <h4>{projectData.name}</h4>
        </div>
        <div>
          <IconClickable icon={<BsThreeDots fontSize={28} />}>
            <ContainerOptionsToClick>
              <Button text="View" width="150px" fontSize="1rem" padding="0.3rem 1rem" />
              <Button text="Upload" width="150px" fontSize="1rem" padding="0.3rem 1rem" />
              <Button text="Progress" width="150px" fontSize="1rem" padding="0.3rem 1rem" />
              <Button text="Message" width="150px" fontSize="1rem" padding="0.3rem 1rem" />
            </ContainerOptionsToClick>
          </IconClickable>
        </div>
      </div>
      <div>
        <h5>Project Overview:</h5>
        <ElementData>
          <span>Website:</span>
          <p>{projectData.website}</p>
        </ElementData>
        <ElementData>
          <span>Due Data:</span>
          <p>{projectData.dueData}</p>
        </ElementData>
        <ElementData>
          <span>Finished:</span>
          <p>{projectData.finished}</p>
        </ElementData>
        <ElementData>
          <span>Text:</span>
          <p>{projectData.text}</p>
        </ElementData>
        <div>
          <BiArrowFromBottom onClick={handleCloseDetails} fontSize={24} />
        </div>
      </div>
    </Container>
  );
}
export default CardProject;
