import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Link to create the
// import Contact from '../../molecules/Contact/Contact';
import { MdLocalPhone, MdEmail, MdOutlineFacebook } from 'react-icons/md';
import { SiTwitter } from 'react-icons/si';
import { IoLogoInstagram } from 'react-icons/io';
import mobileFooterWave from '../../../assets/illustrations/mobileFooterWaveBlue.png';
import useMediaQuery from '../../../hooks/useMediaQuery';
import companyLogo from '../../../assets/illustrations/COMPANYLOGO.png';
import LanguageMenu from '../../molecules/LanguageMenu/LanguageMenu';
// import NavLink from '../../atoms/NavLink/NavLink';
// Mobile Styles

const FooterBody = styled.div`
  background-color: #001523;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-top: -44px;
  font-size: 14px;
  padding-bottom: 30px;
`;

const FooterWave = styled.div`
  background-image: url(${mobileFooterWave});
  background-position: top;
  background-size: 100% 100px;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
`;

const MobileFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  justify-content: left;
  // margin-bottom: 18px;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  justify-content: space-between;
`;

const StyledSpan = styled.span`
  margin-left: 10px;
`;

// allgemein

const MyFooter = styled.div`
  width: 100%;
  position: relative;
`;

// Desktop Styles

const DesktopFooter = styled.div`
  background-color: #001523;
  color: #ffffff;
  display: flex;
  padding: 100px 50px;
  flex-basis: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 3vh;
`;

const LeftCol = styled.div`
  display: flex;
`;

/* const LogoCol = styled.div`
  background-color: red;
  display: flex;
`
*/

const StyledCol = styled.div`
  width: 140px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
`;

const CountryFlag = styled.div`
  display: flex;
  gap: 0.2rem;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled.div`
  color: white;
`;
// bei 100% passt sich das Bild dem parentelement an, es ist so groß, wie Platz da ist
const CompanyLogo = styled.img`
  width: 100%;
  height: auto;
  align-items: bottom;
`;

// alles, was html(html tags) ist klein schreiben, nur Components groß
// contact wurde importiert und kann deshalb im return zurückgegeben werden
// ract returned nur ein element, deshalb muss ein allumschließendes element gegeben sein, kann auch div oder leerer tag sein
function Footer() {
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  return (
    <MyFooter>
      {desktopVersion ? (
        <DesktopFooter>
          <LeftCol>
            <StyledCol>
              <div>
                <MdOutlineFacebook size={28} color="white" />
                <span>Facebook</span>
              </div>
              <div>
                <SiTwitter size={28} color="white" />
                <span>Twitter</span>
              </div>
              <div>
                <IoLogoInstagram size={28} color="white" />
                <span>Instagram</span>
              </div>
            </StyledCol>
            <StyledCol>
              <CountryFlag>
                <LanguageMenu />
              </CountryFlag>
            </StyledCol>
            <StyledCol>
              <div>
                <StyledLink>About Us</StyledLink>
                <StyledLink>Services</StyledLink>
                <StyledLink>Payments</StyledLink>
                <Link to="/impressum">
                  <StyledLink>Impressum</StyledLink>
                </Link>
                <Link to="/faqs">
                  <StyledLink>FAQ</StyledLink>
                </Link>
              </div>
            </StyledCol>
            <StyledCol>
              <span>CONTACT US : </span>
              <FooterRow>
                <MdLocalPhone color="white" size={28} />
                <StyledSpan>+49 1234 6666666</StyledSpan>
              </FooterRow>
              <FooterRow>
                <MdEmail color="white" size={28} />
                <StyledSpan>info@blabla.de</StyledSpan>
              </FooterRow>
            </StyledCol>
          </LeftCol>
          <Link to="/">
            <CompanyLogo src={companyLogo} />
          </Link>
        </DesktopFooter>
      ) : (
        <MobileFooter>
          <FooterWave />
          <FooterBody>
            <div>DE </div>
            <FooterRow>
              <MdLocalPhone color="white" size={28} />
              <StyledSpan>+49 1234 6666666</StyledSpan>
            </FooterRow>
            <FooterRow>
              <MdEmail color="white" size={28} />
              <StyledSpan>info@blabla.de</StyledSpan>
            </FooterRow>
            <IconRow>
              <MdOutlineFacebook size={28} color="white" />
              <SiTwitter size={28} color="white" />
              <IoLogoInstagram size={28} color="white" />
            </IconRow>
          </FooterBody>
        </MobileFooter>
      )}
    </MyFooter>
  );
}

export default Footer;
