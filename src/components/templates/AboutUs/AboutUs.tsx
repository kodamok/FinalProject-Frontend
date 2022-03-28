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
        <p>
          We met each other in the DCI 1 year web Developement program. We were all coming from
          different backgrounds but we all had one goal in common: to finish our program an start
          working as Web Developers. Throughout the year each one found different challenges but at
          the same time we somehow intertwined helping each other to be better. After the year we
          had to deliver a Final Project in less than 2 months. This site is that project: <br />
          <h5>What is this website about?</h5>A website which includes all the basic tools necessary
          for any freelancer to interact with its customer and avoid jumping from platform to
          platform falling in to infinite searches about where is what.
          <h5>How the website works?</h5>
          After the freelancer created his account, inside the account you can create a new customer
          with a user name and a password. That user name and password is the log in information
          necessary so your customer can access the website and start communicating and seeing all
          the necessary updates as well as sharing files/photos associated to the project. Dont
          forget to give him the login and password you created.
          <h5>What tools ara available?</h5>
          <h5>For the freelancer:</h5>
          - Share photos and files. <br />- Keep track of all your customers.
          <br /> - All the conversations related to the project in one place.
          <br /> - An archive for all the present and past projects.
          <br /> - Statistics about our performance as a freelance.
          <br /> - PDF Download of the table of services provided.
          <br /> - All the contact information from your customers in one place
          <h5>For the customer:</h5>
          <br /> - All the conversations related to the project in one place.
          <br /> - Upload of files/photos related to the project.
          <br /> - Manage username and password for more privacy.
          <br /> - Access to project details.
        </p>
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
