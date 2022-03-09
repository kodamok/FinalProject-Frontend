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

const ButtonForPhoto = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  background-image: url(${upload});
  background-position: center;
  background-size: 20px;
  background-color: ${({ theme }) => theme.color.main4};

  top: 10px;
  left: 110px;
  z-index: 11;

  &:hover {
    background-color: ${({ theme }) => theme.color.main1};
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
  outlineOffset
}: Photo) {
  return (
    <Container>
      {RoundedPhotoWithButton ? (
        <PhotoWithButton>
          <ButtonForPhoto />
          <ContainerPhoto
            width={width}
            height={height}
            border={border}
            outline={outline}
            outlineOffset={outlineOffset}
            margin={margin}
          >
            <div>{img && <img src={img} alt={alt} />}</div>
          </ContainerPhoto>
        </PhotoWithButton>
      ) : (
        <ContainerPhoto
          width={width}
          height={height}
          border={border}
          outline={outline}
          outlineOffset={outlineOffset}
        >
          {img && <img src={img} alt={alt} />}
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
  RoundedPhotoWithButton: false
};

export default RoundedPhoto;
