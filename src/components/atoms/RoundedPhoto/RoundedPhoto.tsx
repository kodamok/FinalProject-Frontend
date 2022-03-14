import React from 'react';
import styled from 'styled-components';
import upload from '../../../assets/images/upload/upload.svg';

interface PhotoStyled {
  width?: string;
  height?: string;
  border?: string;
  outline?: string;
  outlineOffset?: string;
  margin?: string;
}

const ContainerPhoto = styled.div<PhotoStyled>`
  border-radius: 50%;
  width: ${({ width }) => width || '90px'};
  height: ${({ height }) => height || '90px'};
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: ${({ width }) => width || '90px'};
    height: ${({ height }) => height || '90px'};
    border: ${({ border }) => border || 'none'};
    outline: ${({ outline }) => outline || 'none'};
    outline-offset: ${({ outlineOffset }) => outlineOffset || 'none'};
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Container = styled.div`
  /*  border: 2px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotoWithButton = styled.div`
  /*  border: 2px solid black; */
  display: flex;
  position: relative;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

const ButtonForPhoto = styled.button`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  background-image: url(${upload});
  background-position: center;
  background-size: 20px;
  background-color: ${({ theme }) => theme.color.main4};
  outline: none;
  border:none

  top: 10px;
  left: 110px;
  z-index: 11;

  &:hover {
    background-color: ${({ theme }) => theme.color.main1};
  }
`;

const UploadPhotoButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
const InputFileStyle = styled.input`
  z-index: 12;
  position: absolute;
  opacity: 0;
  background: black;
  width: 30px;
  height: 30px;
  left: 110px;
  &:hover {
    cursor: pointer;
    outline: 3px solid black;
  }
`;
interface Photo {
  img: string | undefined | null;
  alt: string;
  width?: string;
  margin?: string;
  height?: string;
  border?: string;
  outline?: string;
  outlineOffset?: string;
  RoundedPhotoWithButton?: boolean;
  icon?: any;
  handleChange?: any;
  onClick?: any;
}

function RoundedPhoto({
  RoundedPhotoWithButton,
  img,
  alt,
  width,
  margin,
  height,
  border,
  outline,
  outlineOffset,
  icon,
  handleChange,
  onClick
}: Photo) {
  return (
    <Container>
      {RoundedPhotoWithButton ? (
        <PhotoWithButton>
          <UploadPhotoButton>
            <InputFileStyle name="image" type="file" onChange={handleChange} />
            <ButtonForPhoto type="button" />
          </UploadPhotoButton>
          <ContainerPhoto
            width={width}
            height={height}
            border={border}
            outline={outline}
            outlineOffset={outlineOffset}
            margin={margin}
          >
            {img && (
              <div>
                <img src={img} alt={alt} />
              </div>
            )}
            {icon && !img && <div>{icon}</div>}
          </ContainerPhoto>
        </PhotoWithButton>
      ) : (
        <ContainerPhoto
          width={width}
          height={height}
          border={border}
          outline={outline}
          outlineOffset={outlineOffset}
          onClick={onClick}
        >
          {img && <img src={img} alt={alt} />}
          {icon && !img && icon}
        </ContainerPhoto>
      )}
    </Container>
  );
}

RoundedPhoto.defaultProps = {
  width: undefined,
  margin: undefined,
  height: undefined,
  border: undefined,
  outline: undefined,
  outlineOffset: undefined,
  RoundedPhotoWithButton: false,
  icon: undefined,
  handleChange: undefined,
  onClick: false
};

export default RoundedPhoto;
