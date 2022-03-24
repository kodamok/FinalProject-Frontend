import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../atoms/Button/Button';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import { PurpleSpan } from '../../atoms/PurpleSpan/PurpleSpan';
import KidneyBackground2 from '../../../assets/illustrations/KidneyTextBackground2.png';
import face1 from '../../../assets/images/face1small.jpg';
import face2 from '../../../assets/images/face2small.jpg';
import useMediaQuery from '../../../hooks/useMediaQuery';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  h5 {
    font-weight: 900;
    text-align: center;
    width: 90%;
    max-width: 450px;
    margin: 2rem auto;
  }
  h3 {
    font-weight: 900;
    text-align: center;
    width: 90%;
    max-width: 650px;
    margin: 2rem auto;
  }
  > div:last-child {
    margin: 0 auto;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    width: 90%;
    max-width: 1200px;
  }
`;

export const Box = styled.div`
  padding: 1rem;
  border: 1px solid red;
  border-radius: 0.8rem;
  margin: auto;
  width: 90%;
  max-width: 360px;
  min-width: 280px;
  background: white;

  p {
    margin: 0;
    text-align: right;
    padding-right: 0.5rem;
  }

  p:first-child {
    margin-bottom: 1rem;
    text-align: left;
    padding-right: 0;
  }

  p:nth-child(2) {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
    color: #7b42f6;
  }

  p:last-child {
    font-weight: 800;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
    color: grey;
  }
`;

const Testimonials = styled.div`
  padding: 0 1rem;
  margin: 2rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 399px) {
    padding: 0;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    margin: 0;
    > div:last-child {
      margin: 2rem auto 0 auto;
    }
  }
`;

export const OneTestimonial = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  justify-content: space-between;
  p {
    font-weight: 500;
  }
`;

export const PRight = styled.p`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
`;

export const TextTestimonial = styled.div`
  width: 70%;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    margin-right: auto;
    width: 210px;
    text-align: right;
  }
`;

export const ContainerPhoto = styled.div`
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const FlexPhoto = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;

const TextAndKidneyBackground = styled.div`
  position: relative;
  img:last-child {
    width: 330px;
    position: absolute;
    top: 50px;
    left: 60%;
    transform: translateX(-50%);
    z-index: -1;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    img:last-child {
      top: -38px;
    }
  }
`;

// Desktop Version

const ContainerFlex = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  width: 100%;
  > div {
    width: 40%;
  }
  > div:first-child {
    width: 400px;
  }
`;

function SectionProductDesc1(): JSX.Element {
  const navigate = useNavigate();
  const handleNavigateToSignup = () => {
    navigate('/signup');
  };
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  const { t } = useTranslation();
  return (
    <Container>
      {!desktopVersion ? (
        <>
          <TextAndKidneyBackground>
            <h5>
              {t('landingPageSecondaryText1')} <RedSpan> {t('landingPageSecondaryText2')} </RedSpan>
              , <RedSpan> {t('landingPageSecondaryText3')} </RedSpan>{' '}
              {t('landingPageSecondaryText4')} <RedSpan>{t('landingPageSecondaryText5')}</RedSpan>{' '}
              {t('landingPageSecondaryText6')}{' '}
              <PurpleSpan>{t('landingPageSecondaryText7')}</PurpleSpan>
            </h5>
            <div>
              <img src={KidneyBackground2} alt="kidney background" />
            </div>
          </TextAndKidneyBackground>
          <Box>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aut cumque
              cupiditate eaque eligendi incidunt libero, maiores nesciunt nihil praesentium, rerum
              vero !"
            </p>
            <p>Lorem ipsum</p>
            <p>Golor sit amet</p>
          </Box>
          <Testimonials>
            <OneTestimonial>
              <FlexPhoto>
                <ContainerPhoto>
                  <img src={face1} alt="face" />
                </ContainerPhoto>
              </FlexPhoto>
              <TextTestimonial>
                <p>"Lorem ipsum dolor sit </p>
                <p>Amet at vero..."</p>
                <PRight>Lorem ipsum</PRight>
                <PRight>Lorem ipsum dolor sit amet</PRight>
              </TextTestimonial>
            </OneTestimonial>
            <OneTestimonial>
              <TextTestimonial>
                <p>"Lorem ipsum dolor sit</p>
                <p>Amet at vero..."</p>
                <PRight>Lorem ipsum</PRight>
                <PRight>Lorem ipsum dolor sit amet</PRight>
              </TextTestimonial>
              <FlexPhoto style={{ justifyContent: 'flex-end' }}>
                <ContainerPhoto>
                  <img src={face2} alt="face" />
                </ContainerPhoto>
              </FlexPhoto>
            </OneTestimonial>
          </Testimonials>
          <div>
            <Button
              text="Start Free Trial"
              background="#001523"
              color="#fcbf49"
              onClick={handleNavigateToSignup}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <h3>
              {t('landingPageSecondaryText1')} <RedSpan>{t('landingPageSecondaryText2')}</RedSpan>,{' '}
              <RedSpan>{t('landingPageSecondaryText3')}</RedSpan> {t('landingPageSecondaryText4')}{' '}
              <RedSpan>{t('landingPageSecondaryText5')}</RedSpan> {t('landingPageSecondaryText6')}{' '}
              <PurpleSpan>{t('landingPageSecondaryText7')}</PurpleSpan>
            </h3>
          </div>
          <ContainerFlex>
            <Testimonials>
              <OneTestimonial>
                <TextTestimonial>
                  <p>"Lorem ipsum dolor sit </p>
                  <PRight>Lorem ipsum dolor</PRight>
                </TextTestimonial>
                <FlexPhoto>
                  <ContainerPhoto>
                    <img src={face1} alt="face" />
                  </ContainerPhoto>
                </FlexPhoto>
              </OneTestimonial>
              <OneTestimonial>
                <FlexPhoto style={{ justifyContent: 'flex-end' }}>
                  <ContainerPhoto>
                    <img src={face2} alt="face" />
                  </ContainerPhoto>
                </FlexPhoto>
                <TextTestimonial>
                  <p>"Lorem ipsum dolor sit</p>
                  <PRight>Lorem ipsum</PRight>
                </TextTestimonial>
              </OneTestimonial>
              <div>
                <Button
                  text="Start Free Trial"
                  background="#001523"
                  color="#fcbf49"
                  onClick={handleNavigateToSignup}
                />
              </div>
            </Testimonials>
            <TextAndKidneyBackground>
              <div>
                <img src={KidneyBackground2} alt="kidney background" />
              </div>
              <Box>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aut cumque
                  cupiditate eaque eligendi incidunt libero, maiores nesciunt nihil praesentium,
                  rerum vero !"
                </p>
                <p>Lorem ipsum</p>
                <p>Golor sit amet</p>
              </Box>
            </TextAndKidneyBackground>
          </ContainerFlex>
        </>
      )}
    </Container>
  );
}

export default SectionProductDesc1;
