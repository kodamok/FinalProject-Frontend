import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import plan30 from '../../../assets/illustrations/Plan30.png';
import plan15 from '../../../assets/illustrations/Plan15.png';
import plan00 from '../../../assets/illustrations/Plan00.png';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';

function Services(): JSX.Element {
  const MainContainer = styled.div`
    margin: 0 auto;
  `;

  const HeadingContainer = styled.div`
    padding: 0 1.5rem 1.5rem 1.5rem;
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
    padding-bottom: 2rem;
  `;
  const ServicesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  `;
  const PhotoServiceOne = styled.img`
    height: auto;
    width: 400px;
  `;
  const PhotoServiceTwo = styled.img`
    height: auto;
    width: 315px;
  `;
  const PhotoServiceThree = styled.img`
    height: auto;
    width: 390px;
    right: 29px;
    position: relative;
  `;
  const { t } = useTranslation();
  return (
    <MainContainer>
      <HeadingContainer>
        <h2>
          {t('services1')} <RedSpan>{t('services2')}</RedSpan>
        </h2>
      </HeadingContainer>
      <ServicesContainer>
        <PhotoServiceOne src={plan30} />
        <PhotoServiceTwo src={plan15} />
        <PhotoServiceThree src={plan00} />
      </ServicesContainer>
    </MainContainer>
  );
}

export default Services;
