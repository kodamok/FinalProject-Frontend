import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { BiFace } from 'react-icons/bi';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context } from '../../../providers/GeneralProvider';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';

const AvatarContainer = styled.div<Avatar>`
  display: flex;
  position: relative;
  /* border: 3px solid black; */
  width: ${({ width }) => width || 'auto'};
  & > div {
    display: flex;
    align-items: center;
  }
`;

const AvatarMenu = styled.div`
  border: 1px solid #e76f51;
  background: ${({ theme }) => theme.color.main2};
  padding: 0.7rem;
  position: absolute;
  top: 55px;
  display: flex;
  right: -25px;
  z-index: 50;
  text-align: left;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const AvatarMenuEmpty = styled.div<Avatar>`
  // This was cause why was the black dot on header
  //border: 1px solid black;
  flex-direction: column;
  top: ${({ top }) => top || '50px'};
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -12px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;

const Wrap = styled.div`
  position: relative;
`;
interface Avatar {
  img?: any;
  children: ReactNode;
  emptyAvatar?: boolean;
  onClick?: any;
  className?: any;
  width?: string;
  background?: any;
  top?: any;
}

function AvatarWithMenu({
  img,
  children,
  emptyAvatar,
  onClick,
  className,
  width,
  background,
  top
}: Avatar) {
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
    <Wrap>
      {emptyAvatar ? (
        <AvatarContainer onClick={onClick} className={className} width={width}>
          <AvatarMenuEmpty top={top} background={background} onClick={handleOpenAvatarMenu}>
            {children}
          </AvatarMenuEmpty>
        </AvatarContainer>
      ) : (
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
          {isOpenAvatarMenu && (
            <AvatarMenu ref={ref} onClick={handleOpenAvatarMenu}>
              {children}
            </AvatarMenu>
          )}
        </AvatarContainer>
      )}
    </Wrap>
  );
}

AvatarWithMenu.defaultProps = {
  img: undefined,
  emptyAvatar: false,
  onClick: undefined,
  className: undefined,
  width: undefined,
  background: undefined,
  top: undefined
};

export default AvatarWithMenu;
