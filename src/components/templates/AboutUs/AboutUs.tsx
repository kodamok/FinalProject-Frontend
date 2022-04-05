import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TeamBackground from '../../../assets/illustrations/TeamBackground.png';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import david from '../../../assets/images/team/david.jpg';
import priscilla from '../../../assets/images/team/priscilla.jpg';
import patryk from '../../../assets/images/team/patryk.png';
import marlene from '../../../assets/images/team/marlene.jpg';
import gabo from '../../../assets/images/team/gabo.jpg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OpeningTextContainer = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 850px;
  margin: 0 auto;

  h2 {
    text-align: center;
    -webkit-text-stroke: 1px ${({ theme }) => theme.color.main2};
  }

  p {
    padding: 0 1rem 1rem 1rem;
    ${({ theme }) => theme.up(theme.breakpoint.sm)} {
      padding: 0 2rem 1rem 2rem;
    }
  }
`;
const TheTeamContainer = styled.div`
  background: url(${TeamBackground});
`;

const OurTeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const OurTeamTitle = styled.div`
  text-align: center;
`;

const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const TeamMemberName = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizeInter.m};
    text-align: center;
    margin: 1.2rem 0 0 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
    text-align: center;
  }
`;

// const {t} überall in jeden file
function AboutUs(): JSX.Element {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <OpeningTextContainer>
        <h2>
          {t('aboutUsHeadline1')} <RedSpan> {t('aboutUsHeadline2')} </RedSpan>
          {t('aboutUsHeadline3')}
        </h2>
        <div>
          <p>{t('aboutUsWeStartedTheSameAsYouDidText')}</p>
          <h5>{t('aboutUsWhatIsWebsiteAbout')}</h5>
          <p>{t('aboutUsWhatIsWebsiteAboutText')}</p>
          <h5>{t('aboutUsHowTheWebsiteWorksHeadline')}</h5>
          <p>{t('aboutUsHowTheWebsiteWorksText')}</p>
          <h5>{t('aboutUsWhatToolsAreAvailable')}</h5>
          <h5>{t('aboutUsForTheFreelancer')}</h5>
          <p>{t('1')}</p>
          <p>{t('2')}</p>
          <p>{t('3')}</p>
          <p>{t('4')}</p>
          <p>{t('5')}</p>
          <p>{t('6')}</p>
          <p>{t('7')}</p>
          <h5>{t('aboutUsForTheCustomer')}</h5>
          <p>{t('8')}</p>
          <p>{t('9')}</p>
          <p>{t('10')}</p>
          <p>{t('11')}</p>
        </div>
      </OpeningTextContainer>
      <TheTeamContainer>
        <OurTeamTitle>
          <h3>{t('aboutUsTheTeam')}</h3>
        </OurTeamTitle>
        <OurTeamContainer>
          <TeamMemberContainer>
            <RoundedPhoto
              width="250px"
              height="250px"
              border="2px solid black"
              img={marlene}
              alt="FrontEnd Developer"
            />

            <TeamMemberName>
              <h4>Marlene Wieduwilt</h4>
              <p>Front-end Developer</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <RoundedPhoto
              border="2px solid black"
              width="250px"
              height="250px"
              img={gabo}
              alt="FrontEnd Developer"
            />

            <TeamMemberName>
              <h4>Gabriel Fernandez</h4>
              <p>Front-end Developer</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <RoundedPhoto
              border="2px solid black"
              width="250px"
              height="250px"
              img={priscilla}
              alt="FrontEnd Developer"
            />

            <TeamMemberName>
              <h4>Priscilla Andinwo</h4>
              <p>Front-end Developer</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <RoundedPhoto
              border="2px solid black"
              width="250px"
              height="250px"
              img={patryk}
              alt="Project Manager"
            />

            <TeamMemberName>
              <h4>Patryk Lisowski</h4>
              <p>
                Project Manager, <br />
                Full-stack Developer
              </p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <RoundedPhoto
              width="250px"
              height="250px"
              img={david}
              alt="Team Member UX Designer/FrontEnd"
              border="2px solid black"
            />

            <TeamMemberName>
              <h4>David Rabinovich</h4>
              <p>
                UX/UI Designer, <br />
                Front-end Developer
              </p>
            </TeamMemberName>
          </TeamMemberContainer>
        </OurTeamContainer>
      </TheTeamContainer>
    </MainContainer>
  );
}

export default AboutUs;
