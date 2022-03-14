import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button<ButtonInterface>`
  padding: ${({ padding }) => padding || '1.3rem 2rem'};
  background: ${({ theme, background }) => background || theme.color.main3};
  font-size: ${({ theme, fontSize }) => fontSize || theme.fontSizeOpenSans.m};
  border-radius: 0.6rem;
  color: ${({ theme, color }) => color || theme.color.main1};
  border: ${({ border }) => border || 'none'};
  outline: none;
  width: ${({ width }) => width || '300px'};
  height: ${({ height }) => height};
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  //white-space: nowrap;
  &:hover {
    cursor: pointer;
    color: white;
    background: ${({ theme }) => theme.color.main6};
  }
  svg {
    margin-right: 1rem;
  }
`;

const ButtonWhiteStyle = styled.button<ButtonInterface>`
  padding: 0.5rem;
  background: ${({ theme }) => theme.color.main8};
  font-size: ${({ theme, fontSize }) => fontSize || theme.fontSizeOpenSans.m};
  border-radius: 0.6rem;
  color: ${({ color }) => color || 'black'};
  border: ${({ border }) => border || 'none'};
  outline: none;
  width: ${({ width }) => width || '300px'};
  height: ${({ height }) => height};
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  > span {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  }
  //white-space: nowrap;
  &:hover {
    cursor: pointer;
    color: white;
    background: black;
  }
`;

interface ButtonInterface {
  text?: string;
  color?: string;
  background?: string;
  type?: 'button' | 'submit';
  border?: string;
  width?: string;
  height?: string;
  onClick?: React.MouseEventHandler | any;
  padding?: string;
  fontSize?: string;
  style?: React.CSSProperties;
  icon?: any;
  whiteMenu?: boolean;
}

function Button({
  text,
  color,
  background,
  type,
  border,
  onClick,
  icon,
  width,
  height,
  padding,
  fontSize,
  style,
  whiteMenu
}: ButtonInterface) {
  return (
    <div>
      {whiteMenu ? (
        <ButtonWhiteStyle
          type={type}
          color={color}
          background={background}
          border={border}
          onClick={onClick}
          style={style}
          width={width}
          height={height}
          padding={padding}
          fontSize={fontSize}
        >
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </ButtonWhiteStyle>
      ) : (
        <ButtonStyle
          type={type}
          color={color}
          background={background}
          border={border}
          onClick={onClick}
          style={style}
          width={width}
          height={height}
          padding={padding}
          fontSize={fontSize}
        >
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </ButtonStyle>
      )}
    </div>
  );
}

Button.defaultProps = {
  color: undefined,
  background: undefined,
  type: 'button',
  border: undefined,
  text: undefined,
  width: undefined,
  height: undefined,
  onClick: undefined,
  icon: undefined,
  style: undefined,
  padding: undefined,
  fontSize: undefined,
  whiteMenu: false
};

export default Button;
