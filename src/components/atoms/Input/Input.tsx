import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ContainerProp {
  width: string | undefined;
  height: string | undefined;
  margin: string | undefined;
  border: string | undefined;
  label: string | undefined;
  value: string | undefined;
  inputName: string | undefined;
  top?: string | undefined;
}
const fadeInAnimation = keyframes`
from {
  top: 0
}
to {
  top: -30px
}
`;

const Container = styled.div<ContainerProp>`
  color: ${({ color }) => color || 'black'};
  width: 100%;
  margin: ${({ margin }) => margin || '50px 3%;'};
  height: ${({ height }) => height};
  position: relative;

  input {
    font: 15px/24px 'Open Sans', sans-serif;
    color: black;
    width: 100%;
    letter-spacing: 1px;

    :focus {
      outline: none;
      border-bottom: 0;
      transition: 1s;
    }
  }

  // border FX

  .effect ~ .focus-border:before,
  .effect ~ .focus-border:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.color.main4};
    transition: 0.2s;
  }

  .effect ~ .focus-border:after {
    top: auto;
    bottom: 0;
  }
  .effect ~ .focus-border i:before,
  .effect ~ .focus-border i:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 2px;
    height: 0;
    background-color: ${({ theme }) => theme.color.main4};
    transition: 0.5s;
  }
  .effect ~ .focus-border i:after {
    left: auto;
    right: 0;
  }
  .effect:focus ~ .focus-border:before,
  .effect:focus ~ .focus-border:after {
    left: 0;
    width: 100%;
    transition: 0.2s;
  }
  .effect:focus ~ .focus-border i:before,
  .effect:focus ~ .focus-border i:after {
    top: 0;
    height: 100%;
    transition: 0.2s;
    backgorund-color: black;
  }

  //Background FX

  .effect {
    width: 100%;
    border: 0;
    padding: 7px 15px;
    border-bottom: 2px solid black;
    position: relative;
    backgorund-color: black;
    box-shadow: 0;
  }

  .effect ~ .focus-bg {
    position: absolute;
    left: 50%;
    top: 0;
    width: 0;
    height: 100%;
    transition: 0.6s;
    background-color: red;
    box-shadow: 0px 0px 7.3px rgba(0, 0, 0, 0.024), 0px 0px 13.5px rgba(0, 0, 0, 0.03),
      0px 0px 21px rgba(0, 0, 0, 0.036), 0px 0px 32.3px rgba(0, 0, 0, 0.048),
      0px 0px 62px rgba(0, 0, 0, 0.1);

    z-index: -1;
  }

  .effect:focus ~ .focus-bg {
    box-shadow: 0px 0px 7.3px rgba(0, 0, 0, 0.04), 0px 0px 13.5px rgba(0, 0, 0, 0.05),
      0px 0px 21px rgba(0, 0, 0, 0.061), 0px 0px 32.3px rgba(0, 0, 0, 0.081),
      0px 0px 62px rgba(0, 0, 0, 0.17);

    transition: 0.6s;
    width: 100%;
    left: 0;
  }

  // LETTER FX

  .effect ~ label {
    position: absolute;
    left: 0;
    width: 100%;
    top: ${(props) => props.inputName === props.label && '-30px'};
    color: ${({ theme }) => theme.color.main3};
    z-index: -1;
    animation: ${fadeInAnimation} 0.2s linear;
    letter-spacing: 0.5px;
  }
  .effect:focus ~ label,
  .has-content.effect ~ label {
    width: 100%;
    font-size: ${(props) => (props.inputName === undefined ? '0' : '20px')};
    top: ${(props) => (props.inputName === undefined ? '0' : '-35px')};
    color: ${({ theme }) => theme.color.main3};
    transition: 0.1s;
  }
`;

interface FormInput {
  name: string;
  placeholder?: string | undefined;
  onChange?: any;
  value?: any;
  required?: boolean;
  color?: string;
  type?: string | undefined;
  width?: string;
  height?: string;
  margin?: string;
  multiple?: boolean;
  border?: string;
  id?: string;
  label?: string | undefined | any;
}
function Input({
  name,
  type,
  placeholder,
  onChange,
  value,
  required,
  color,
  width,
  height,
  margin,
  multiple,
  border,
  label,
  id
}: FormInput) {
  const [inputName, setInputName] = useState('undefined');
  const getValue = (e: any) => {
    const target = e.target.name;
    setInputName(target.charAt(0).toUpperCase() + target.slice(1));
  };
  console.log(inputName);
  console.log(label);

  return (
    <div>
      <Container
        value={value}
        label={label}
        inputName={inputName}
        color={color}
        width={width}
        height={height}
        margin={margin}
        border={border}
      >
        <input
          className="effect"
          type={type}
          name={name}
          placeholder={placeholder}
          id={name}
          value={value}
          required={required}
          onChange={onChange}
          multiple={multiple}
          onBlur={getValue}
        />
        {label === inputName && <label htmlFor={id || name}>{label}</label>}
        <span className="focus-border">
          <i />
        </span>
        <span className="focus-bg" />
      </Container>
    </div>
  );
}
Input.defaultProps = {
  type: 'text',
  placeholder: undefined,
  onChange: undefined,
  value: undefined,
  required: false,
  color: undefined,
  width: undefined,
  height: undefined,
  margin: undefined,
  multiple: false,
  border: undefined,
  id: undefined,
  label: undefined
};

export default Input;
