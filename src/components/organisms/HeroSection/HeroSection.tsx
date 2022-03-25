import React from 'react';
import styled from 'styled-components';
import { MdCheckCircleOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import womenOnTheWay from '../../../assets/illustrations/WomanOnTheWay.png';
import waveMobile from '../../../assets/illustrations/wave.svg';

const Background = styled.div`
  background: ${({ theme }) => theme.color.main2};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 0 3rem 0;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    padding: 0 0 3rem 0;
  }
`;
const Container = styled.div`
  padding: 0 1rem 3.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  > div:first-child > div:last-child {
    display: none;
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  h1 {
    color: ${({ theme }) => theme.color.main1};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizeInter.ml};
    margin-top: 1.5rem;
    ${({ theme }) => theme.up(theme.breakpoint.m)} {
      margin-top: 1.5rem;
      font-size: ${({ theme }) => theme.fontSizeInter.xl};
    }
  }

  div:last-child {
    margin-bottom: 2.6rem;
  }
  ${({ theme }) => theme.up(theme.breakpoint.s)} {
    max-width: 550px;
  }
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    flex-direction: row;
    gap: 4rem;
    align-items: flex-start;
    width: 90%;
    max-width: 1200px;
    margin-top: 3rem;
    h3 {
      font-size: ${({ theme }) => theme.fontSizeInter.xl};
    }
    > div:first-child > div:last-child {
      display: flex;
      position: absolute;
      bottom: -5.5rem;
      img {
        width: 450px;
        height: auto;
      }
    }
  }
`;

const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 2rem;
  margin: 2.4rem 0;
  p {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  }
`;

const ContainerIconAndText = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
//   David
//   p {
//     font-size: 17px;
// }
  > p {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
      font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
    }
`;

const Wave = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: none;
  }
`;

// because inside the return we are inside the jsx and here we need to invoke the function t the {}
// Without {} the function would not run, { } means JS
function HeroSection() {
  const navigate = useNavigate();
  const handleNavigateToServices = () => {
    navigate('/services');
  };
  // t comes from inside the useTranslation Hook (more details in the Hook description),
  // with {} we extract the t function from useTranslation
  const { t } = useTranslation();
  // Here outside the jsx (return) we dont need {}to invoke the function t, so just t('text')is enough
  const dataHeroSection = [
    {
      text: t('landingPageMainText'),
      icon: <MdCheckCircleOutline color="#FF0054" fontSize={36} />,
      id: 1
    },
    {
      text: t('landingPageSmallMainTextOne'),
      icon: <MdCheckCircleOutline color="#FF0054" fontSize={36} />,
      id: 2
    },
    {
      text: t('landingPageSmallMainTextTwo') + t('landingPageSmallMainTextThree'),
      icon: <MdCheckCircleOutline color="#FF0054" fontSize={36} />,
      id: 3
    }
  ];
  return (
    <Background>
      <Container style={{ position: 'relative' }}>
        <div>
          <h1 style={{ position: 'relative', zIndex: 1 }}>{t('landingPageMainText')}</h1>
          {/* <h3 style={{ width: '500px', position: 'relative', zIndex: 1 }}> */}
          {/*        {t('landingPageMainText')} */}
          {/*      </h3>  */}

          <div>
            <img src={womenOnTheWay} alt="women on the way" />
          </div>
        </div>
        <div>
          <ContainerList>
            {dataHeroSection.map((item) => (
              <ContainerIconAndText key={item.id}>
                <div>{item.icon}</div>
                <p>{item.text}</p>
              </ContainerIconAndText>
            ))}
          </ContainerList>
          <div>
            <Button text={t('landingPageMainTextButton')} onClick={handleNavigateToServices} />
          </div>
        </div>
      </Container>
      <Wave src={waveMobile} alt="wave" />
    </Background>
  );
}

export default HeroSection;
