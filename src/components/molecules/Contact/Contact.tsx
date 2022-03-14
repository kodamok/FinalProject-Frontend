import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdLocalPhone, MdEmail, MdOutlineFacebook } from 'react-icons/md';
import { SiTwitter } from 'react-icons/si';
import { IoLogoInstagram } from 'react-icons/io';
import { dataContact } from '../../../data/dataContact';

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  gap: 2rem;
`;

//= =====================
// THIS IS THE STYLE I DELETED
// FROM THE FOOTER CONTACT TITLE
//= =====================
/* const StyledContactWord = styled.div`
  display: flex;
  margin: auto;
  font-weight: bold;
`; */

const TelAndEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
`;

/// =================
// SINCE THE CONTAINER EmailAndPhoneContainer WAS USED SEVERAL TIMES
// I RENAMED IT TO JUST CONTAINER AND USED THE NAME FOR
// THE BIGGER CONTAINER WHICH INCLUDES ALL
//= =======================
const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  &: hover {
    cursor: pointer;
  }
`;
const StyledSocialNetWorks = styled.div`
  display: flex;
  padding-bottom: 2rem;
  gap: 2rem;
  &: hover {
    cursor: pointer;
  }
`;

function Contact() {
  return (
    <StyledContact>
      <TelAndEmailContainer>
        <Container>
          <Container>
            <MdLocalPhone fontSize={30} />
          </Container>
          <Container>{dataContact.telephone}</Container>
        </Container>
        <Container>
          <Container>
            <MdEmail fontSize={30} />
          </Container>
          <Container>{dataContact.email}</Container>
        </Container>
      </TelAndEmailContainer>
      <StyledSocialNetWorks>
        <Link to="/">
          <MdOutlineFacebook color="black" fontSize={50} />
        </Link>
        <Link to="/">
          <SiTwitter color="black" fontSize={50} />
        </Link>
        <Link to="/">
          <IoLogoInstagram color="black" fontSize={50} />
        </Link>
      </StyledSocialNetWorks>
    </StyledContact>
  );
}

export default Contact;
