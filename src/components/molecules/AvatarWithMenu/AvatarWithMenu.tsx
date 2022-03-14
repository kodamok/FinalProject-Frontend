import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { BiFace } from 'react-icons/bi';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context } from '../../../providers/GeneralProvider';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';

const AvatarContainer = styled.div`
  display: flex;
  /* border: 3px solid black; */
  & > div {
    display: flex;
    align-items: center;
    z-index: 1000;
  }
`;

const AvatarMenu = styled.div`
  border-left: 2px solid black; 
  border-right: 2px solid black; 
  border-bottom: 2px solid black; 
  position:absolute;
  display:flex;
  padding: 0.5rem;
  flex-direction:column;
  top: 64px;
  right: 0px;
  z-index: 50;



  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
`;

interface Avatar {
  img: any;
  children: ReactNode;
}

function AvatarWithMenu({ img, children }: Avatar) {
  // User Data
  const { userData } = useContext(Context);
  // Avatar Menu
  const [isOpenAvatarMenu, setIsOpenAvatarMenu] = useState(false);
  const handleOpenAvatarMenu = () => {
    setIsOpenAvatarMenu((prev) => !prev);
  };

  // Reset Menu when Logout
  useEffect(() => {
    if (!userData.token) {
      setIsOpenAvatarMenu(false);
    }
  }, [userData.token]);

  const ref: any = useRef(null);
  useOnClickOutside(ref, () => handleOpenAvatarMenu());

  return (
    <AvatarContainer>
      <RoundedPhoto
        onClick={handleOpenAvatarMenu}
        img={img}
        icon={<BiFace fontSize={32} />}
        alt="avatar"
        outline="1px solid black"
        width="30px"
        height="30px"
      />
      {isOpenAvatarMenu && <AvatarMenu ref={ref}>{children}</AvatarMenu>}
    </AvatarContainer>
  );
}

export default AvatarWithMenu;
