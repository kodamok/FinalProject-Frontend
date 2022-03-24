import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TeamBackground from '../../../assets/illustrations/TeamBackground.png';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import face1small from '../../../assets/images/face1small.jpg';
import face2small from '../../../assets/images/face2small.jpg';
import face3small from '../../../assets/images/face3small.jpg';
import face4small from '../../../assets/images/face4small.jpg';
import face5small from '../../../assets/images/face5small.jpg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OpeningTextContainer = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    text-align: center;
    -webkit-text-stroke: 1px ${({ theme }) => theme.color.main2};
  }

  p {
    padding: 0 2rem 1.5rem 2rem;
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

const PhotoOfTeamMember1 = styled.div`
  background-image: url(${face1small});
  background-position: center;
  border: 3px solid ${({ theme }) => theme.color.main4};
  border-radius: 50%;
  height: 250px;
  width: 250px;
`;
const PhotoOfTeamMember2 = styled.div`
  background-image: url(${face2small});
  background-position: center;
  border: 3px solid ${({ theme }) => theme.color.main4};
  border-radius: 50%;
  height: 250px;
  width: 250px;
`;
const PhotoOfTeamMember3 = styled.div`
  background-image: url(${face3small});
  background-position: center;
  border: 3px solid ${({ theme }) => theme.color.main4};
  border-radius: 50%;
  height: 250px;
  width: 250px;
`;
const PhotoOfTeamMember4 = styled.div`
  background-image: url(${face4small});
  background-position: center;
  border: 3px solid ${({ theme }) => theme.color.main4};
  border-radius: 50%;
  height: 250px;
  width: 250px;
`;
const PhotoOfTeamMember5 = styled.div`
  background-image: url(${face5small});
  background-position: center;
  border: 3px solid ${({ theme }) => theme.color.main4};
  border-radius: 50%;
  height: 250px;
  width: 250px;
`;

const TeamMemberName = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizeInter.m};
    text-align: center;
    margin: 0;
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
          {t('aboutUsHeadline1')} <RedSpan>{t('aboutUsHeadline2')}</RedSpan>
          {t('aboutUsHeadline3')}
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque nisi dicta sit. Debitis,
          obcaecati sapiente harum, praesentium quasi laborum doloremque modi sunt quibusdam, totam
          libero ipsum? Voluptas assumenda laboriosam odit! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque veritatis quasi facilis doloribus, id officia ipsa quas nisi
          provident inventore porro, dicta dolore beatae consectetur, voluptas sint est illum
          laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe ducimus
          veritatis quisquam cum ipsam tempore. Repellendus minus iure vitae aut hic et omnis sed.
          Fugit laboriosam totam reprehenderit a?
        </p>
      </OpeningTextContainer>
      <TheTeamContainer>
        <OurTeamTitle>
          <h3>{t('aboutUsTheTeam')}</h3>
        </OurTeamTitle>
        <OurTeamContainer>
          <TeamMemberContainer>
            <PhotoOfTeamMember1 />
            <TeamMemberName>
              <h4>Name Surname</h4>
              <p>CO-FOUNDER &amp; CTO</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <PhotoOfTeamMember2 />
            <TeamMemberName>
              <h4>Name Surname</h4>
              <p>CO-FOUNDER &amp; CTO</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <PhotoOfTeamMember3 />
            <TeamMemberName>
              <h4>Name Surname</h4>
              <p>CO-FOUNDER &amp; CTO</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <PhotoOfTeamMember4 />
            <TeamMemberName>
              <h4>Name Surname</h4>
              <p>CO-FOUNDER &amp; CTO</p>
            </TeamMemberName>
          </TeamMemberContainer>
          <TeamMemberContainer>
            <PhotoOfTeamMember5 />
            <TeamMemberName>
              <h4>Name Surname</h4>
              <p>CO-FOUNDER &amp; CTO</p>
            </TeamMemberName>
          </TeamMemberContainer>
        </OurTeamContainer>
      </TheTeamContainer>
    </MainContainer>
  );
}

export default AboutUs;
