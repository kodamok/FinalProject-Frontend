import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button<ButtonInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || '0.5rem'};
  background: ${({ theme, background }) => background || theme.color.main5};
  font-size: ${({ theme, fontSize }) => fontSize || theme.fontSizeOpenSans.ms};
  border-radius: 0.6rem;
  color: ${({ theme, color }) => color || theme.color.main1};
  border: ${({ border }) => border || '1px solid black'};
  outline: none;
  width: ${({ width }) => width || '300px'};
  height: ${({ height }) => height || '50px'};
  font-weight: 600;
  //white-space: nowrap;
  &:hover {
    cursor: pointer;
    background: #e76f51;
    color: ${({ theme }) => theme.color.main8};
    box-shadow: 0.5px 0.7px 1.4px rgba(0, 0, 0, 0.018), 1.1px 1.5px 3.1px rgba(0, 0, 0, 0.026),
      1.8px 2.5px 5.3px rgba(0, 0, 0, 0.032), 2.8px 3.9px 8.2px rgba(0, 0, 0, 0.038),
      4.1px 5.8px 12.2px rgba(0, 0, 0, 0.042), 6px 8.5px 17.9px rgba(0, 0, 0, 0.048),
      9px 12.7px 26.8px rgba(0, 0, 0, 0.054), 14.4px 20.3px 42.7px rgba(0, 0, 0, 0.062),
      27px 38px 80px rgba(0, 0, 0, 0.08);
    transition: background 0.3s ease-in;
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

const ButtonDrop = styled.button<ButtonInterface>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${({ background }) => background || '#001523'};
  color: ${({ color }) => color || 'black'};
  border: ${({ border }) => border || 'black'};
  outline: none;
  width: ${({ width }) => width || '300px'};
  height: ${({ height }) => height};
  transition: 0.3s ease-in-out;
  & > span {
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
  }

  //white-space: nowrap;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main9};
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
  children?: any;
  dropMenu?: boolean;
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
  whiteMenu,
  children,
  dropMenu
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
          {children}
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </ButtonWhiteStyle>
      ) : dropMenu ? (
        <ButtonDrop
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
          {children}
          <span>{text}</span>
        </ButtonDrop>
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
  whiteMenu: false,
  children: undefined,
  dropMenu: false
};

export default Button;
