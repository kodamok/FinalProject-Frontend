import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ContainerPhoto,
  FlexPhoto,
  OneTestimonial,
  PRight,
  TextTestimonial
} from '../SectionProductDesc1/SectionProductDesc1';
import Button from '../../atoms/Button/Button';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import ManFlight from '../../../assets/illustrations/ManBookingFlight.png';
import KidneyBackground from '../../../assets/illustrations/KidneyTextBackground.png';
import face3 from '../../../assets/images/face3small.jpg';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h5 {
    width: 80%;
    max-width: 900px;
    margin: 1rem auto;
    font-weight: 900;
    text-align: center;
    ${({ theme }) => theme.up(theme.breakpoint.m)} {
      font-size: ${({ theme }) => theme.fontSizeInter.ml};
    }
  }
  > div:last-child {
    margin: 3rem auto 0 auto;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 90%;
    max-width: 1200px;
    align-items: center;
  }
`;

const ContainerIllustration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 300px;
    height: auto;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    img {
      width: 400px;
    }
  }
`;

const ImgStyled = styled.img`
  width: 420px;
  position: absolute;
  bottom: -150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    bottom: -70px;
  }
`;

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    flex-direction: row;
    gap: 1rem;
    justify-content: space-around;
    margin: 3rem 0;
  }
`;

function SectionProductDesc2(): JSX.Element {
  const navigate = useNavigate();
  const handleNavigateToServices = () => {
    navigate('/services');
  };
  return (
    <Container>
      <div>
        <h5>
          You can <RedSpan>live your life</RedSpan> without worrying of who sent what where
        </h5>
      </div>
      <ContainerFlex>
        <ContainerIllustration>
          <img src={ManFlight} alt="Man Who booking Flight" />
        </ContainerIllustration>
        <OneTestimonial style={{ padding: '1rem', position: 'relative', gap: '2rem' }}>
          <ImgStyled src={KidneyBackground} alt="background" />
          <TextTestimonial>
            <p>"Lorem ipsum dolor sit</p>
            <p>Amet at vero..."</p>
            <PRight>Lorem ipsum</PRight>
            <PRight>Lorem ipsum dolor sit amet</PRight>
          </TextTestimonial>
          <FlexPhoto style={{ justifyContent: 'flex-end' }}>
            <ContainerPhoto>
              <img src={face3} alt="face" />
            </ContainerPhoto>
          </FlexPhoto>
        </OneTestimonial>
      </ContainerFlex>
      <div>
        <Button
          text="Choose a Plan"
          color="#001523"
          background="#fcbf49"
          onClick={handleNavigateToServices}
        />
      </div>
    </Container>
  );
}

export default SectionProductDesc2;
