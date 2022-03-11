import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    border-bottom: 3px solid grey;
    padding: 0.5rem 0 0.5rem 0;
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
`;

const ElementData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
  }
`;

const ContainerOptionsToClick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  padding: 0.5rem;
`;

interface client {
  clientData: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    projects: string;
    finished: string;
    avatar: string;
  };
}

function CardClient({ clientData }: client) {
  const [openDataDetails, setOpenDataDetails] = useState(false);

  const navigate = useNavigate();
  const handleCloseDetails = (e: SyntheticEvent) => {
    e.stopPropagation();
    setOpenDataDetails(false);
  };
  const handleOpenDetails = () => {
    setOpenDataDetails(true);
  };

  const handleNewProjectClick = () => {
    const userData = clientData;

    navigate(`/newProject/${userData._id}`);
  };

  return (
    <Container openDataDetails={openDataDetails} onClick={handleOpenDetails}>
      <div>
        <RoundedPhoto
          img={clientData.avatar}
          alt="face"
          width="60px"
          height="60px"
          outline="3px solid black"
        />
        <div>
          <h4>{clientData.name}</h4>
        </div>
        <div>
          <IconClickable icon={<BsThreeDots fontSize={28} />}>
            <ContainerOptionsToClick>
              <Button whiteMenu text="View" width="150px" fontSize="1rem" padding="0.3rem 1rem" />
              <Button
                whiteMenu
                text="Message"
                width="150px"
                fontSize="1rem"
                padding="0.3rem 1rem"
              />
              <Button
                whiteMenu
                text="New Project"
                width="150px"
                fontSize="1rem"
                padding="0.3rem 1rem"
                onClick={handleNewProjectClick}
              />
            </ContainerOptionsToClick>
          </IconClickable>
        </div>
      </div>
      <div>
        <h5>Contact Overview:</h5>
        <ElementData>
          <span>Phone:</span>
          <p>{clientData.phone}</p>
        </ElementData>
        <ElementData>
          <span>Email:</span>
          <p>{clientData.email}</p>
        </ElementData>
        <ElementData>
          <span>Projects:</span>
          <p>{clientData.projects.length}</p>
        </ElementData>
        {/* <ElementData> */}
        {/*   <span>Finished:</span> */}
        {/*   <p>{clientData.finished}</p> */}
        {/* </ElementData> */}
        <div>
          <BiArrowFromBottom onClick={handleCloseDetails} fontSize={24} />
        </div>
      </div>
    </Container>
  );
}
export default CardClient;
