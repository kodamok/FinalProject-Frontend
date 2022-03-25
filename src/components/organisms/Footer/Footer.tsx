import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Link to create the
// import Contact from '../../molecules/Contact/Contact';
import { MdLocalPhone, MdEmail, MdOutlineFacebook } from 'react-icons/md';
import { SiTwitter } from 'react-icons/si';
import { IoLogoInstagram } from 'react-icons/io';
import mobileFooterWave from '../../../assets/illustrations/mobileFooterWaveBlue.png';
import useMediaQuery from '../../../hooks/useMediaQuery';
/* import companyLogo from '../../../assets/illustrations/COMPANYLOGO.png'; */
import NS3wht from '../../../assets/images/Logos/newLogos/81x195/NS3wht.png';
import LanguageMenu from '../../molecules/LanguageMenu/LanguageMenu';
import NavLink from '../../atoms/NavLink/NavLink';
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
  font-size: 14px;
  padding-bottom: 30px;
  z-index: -1;
  margin-top: 0px;
  position: absolute;
  bottom: 0;
`;

// margin-top: -44px;

const FooterWave = styled.div`
  background-image: url(${mobileFooterWave});
  background-color: #ffffff;
  background-position: top;
  position: relative;
  background-size: 100% 100px;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
  z-index: -1;
  bottom: 138px;
`;

const MobileFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 4rem;
  margin-top: 8rem;
  width: 100%;
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
  z-index: 500;
  //margin-top: 5rem;
`;

// Desktop Styles

const DesktopFooter = styled.div`
  background-color: ${({ theme }) => theme.color.main2};
  color: ${({ theme }) => theme.color.main8};
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 3vh;
  border-top: 2px solid #e76f51;
`;

const LeftCol = styled.div`
  display: flex;
  margin-top: 1rem;
`;

/* const LogoCol = styled.div`
  background-color: red;
  display: flex;
`
*/

const StyledCol = styled.div`
  /* border: 2px solid white; */
  /*width: 140px;*/
  width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  div > span {
    margin-left: 0.7rem;

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.main9};
    }
  }

  p {
    padding: 0 10px 0 50px;
    text-decoration: underline;
    font-size: 15px;
    text: bold;
  }
`;
const Contact = styled.div`
  margin-top: 1rem;
`;

const CountryFlag = styled.div`
  display: flex;
  gap: 0.2rem;
  margin: auto 3%;
  :hover {
    cursor: pointer;
  }
`;

// bei 100% passt sich das Bild dem parentelement an, es ist so groß, wie Platz da ist
const CompanyLogo = styled.img`
  width: 300px;
  align-items: bottom;
`;

const LogoAndCopyrights = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0;

  & > p {
    font-size: ${({ theme }) => theme.fontSizeOpenSans.xxs};
    line-height: 0;
  }
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
              <CountryFlag>
                <LanguageMenu top="-50px" />
              </CountryFlag>
            </StyledCol>
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
              <Contact>
                <div>
                  <NavLink path="/aboutUs" text="About Us" color="white" />
                  <NavLink path="/services" text="Services" color="white" />
                  <NavLink path="/contact" text="Contact" color="white" />
                  <NavLink path="/impressum" text="Impressum" color="white" />
                  <NavLink path="/faq" text="FAQ" color="white" />
                </div>
              </Contact>
            </StyledCol>
            <StyledCol>
              <p>CONTACT US : </p>
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
          <LogoAndCopyrights>
            <Link to="/">
              <CompanyLogo src={NS3wht} />
            </Link>
            <p>&copy; All rights Reserved to Nomad Studio</p>
          </LogoAndCopyrights>
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
