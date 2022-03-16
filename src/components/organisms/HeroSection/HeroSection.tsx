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
  padding: 0 3rem 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > div:first-child > div:last-child {
    display: none;
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    color: ${({ theme }) => theme.color.main1};
    text-align: center;
    ${({ theme }) => theme.up(theme.breakpoint.m)} {
      margin-top: 1.5rem;
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
    gap: 5rem;
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
`;

const Wave = styled.img`
  position: absolute;
  bottom: 0;
  width: 100vw;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: none;
  }
`;

const dataHeroSection = [
  {
    text: 'Take your business everywhere you goand feel safe that all your data is at one place',
    icon: <MdCheckCircleOutline fontSize={36} />,
    id: 1
  },
  {
    text: 'You can manage your clients, appointments and messages in one place',
    icon: <MdCheckCircleOutline fontSize={36} />,
    id: 2
  },
  {
    text:
      'We know that it takes time until you make a life out of it. So try it for ' +
      'free and grow until you decide to take your next step',
    icon: <MdCheckCircleOutline fontSize={36} />,
    id: 3
  }
];

function HeroSection() {
  const navigate = useNavigate();
  const handleNavigateToServices = () => {
    navigate('/services');
  };
  const { t } = useTranslation();
  return (
    <Background>
      <Container style={{ position: 'relative' }}>
        <div>
          <h3 style={{ position: 'relative', zIndex: 1 }}>{t('mainText')}</h3>
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
            <Button text="LETS TRY IT!" onClick={handleNavigateToServices} />
          </div>
        </div>
      </Container>
      <Wave src={waveMobile} alt="wave" />
    </Background>
  );
}

export default HeroSection;
