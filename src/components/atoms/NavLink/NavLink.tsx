import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.main8};
  border-radius: 0.6rem;
  img {
    width: 140px;
    height: auto;
  }
`;

const BigLogo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.main2};
  img {
    width: 15rem;
    @media (min-width: 1060px) {
      width: 12rem;
    }
  }
`;

const ContainerNavText = styled.div`
  padding: 0.2rem;
  color: ${({ color }) => color || 'black'};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;
// Style desktopVersion
const Container = styled.div<PropsStyled>`
  border: ${({ border }) => border || 'none'};
  border-radius: 0.6rem;
  padding: 0 5px;
  &: hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.color.main4};
  }
`;

// ? - optional
interface Props {
  path: string;
  text?: string | undefined;
  image?: string | undefined;
  alt?: string | undefined;
  bigLogo?: boolean | undefined;
  border?: string | undefined;
  onClick?: React.MouseEventHandler;
  color?: string | undefined;
  fontWeight?: string | undefined;
}
interface PropsStyled {
  border: string | undefined;
  fontWeight: string | undefined;
}

function NavLink({ path, text, image, alt, bigLogo, border, onClick, color, fontWeight }: Props) {
  return (
    <Container border={border} fontWeight={fontWeight}>
      {bigLogo ? (
        <BigLogo to={path}>
          {image && <img src={image} alt={alt} />}
          {text && <ContainerNavText>{text}</ContainerNavText>}
        </BigLogo>
      ) : (
        <StyledLink to={path} onClick={onClick}>
          {image && <img src={image} alt={alt} />}
          {text && <ContainerNavText color={color}>{text}</ContainerNavText>}
        </StyledLink>
      )}
    </Container>
  );
}

// Default Props when optional props are not provided
NavLink.defaultProps = {
  text: undefined,
  bigLogo: false,
  alt: undefined,
  image: undefined,
  border: undefined,
  onClick: undefined,
  color: undefined,
  fontWeight: undefined
};

export default NavLink;
