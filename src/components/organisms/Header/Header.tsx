import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import NS1blk from '../../../assets/images/Logos/newLogos/62x165/NS1blk.png';
/* import { useNavigate } from 'react-router-dom'; */
import AvatarWithMenu from '../../molecules/AvatarWithMenu/AvatarWithMenu';
/* import CompanyLogo from '../../../assets/illustrations/COMPANYLOGO.png'; */
/* import logoForWhiteBackground from '../../../assets/images/Logos/logoForWhiteBackground.svg';
 */ import NavLink from '../../atoms/NavLink/NavLink';
import Contact from '../../molecules/Contact/Contact';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Context } from '../../../providers/GeneralProvider';
import { useAuth } from '../../../hooks/useAuth';
import LanguageMenu from '../../molecules/LanguageMenu/LanguageMenu';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../../atoms/Button/Button';

interface StyledDivProps {
  isOpenMenu: boolean;
}

const Container = styled.div<StyledDivProps>`
  background: ${({ theme }) => theme.color.main1};
  color: ${({ theme }) => theme.color.main2};
  font-size: ${({ theme }) => theme.fontSizeInter.m};
  border: 2px solid black;
  padding: 0.7rem;
  min-height: ${({ isOpenMenu }) => (isOpenMenu ? '100vh' : 'auto')};
  /* border: 2px solid red; */
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FlexOpen = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid grey; */
`;

/* const StyledP = styled.p`
  font-size: ${({ theme }) => theme.fontSizeOpenSans.xxxs};
  position: absolute;
  bottom: 5px;
  right: -19px;
  font-weight: bold;
`; */
/* const StyledSlogan = styled.p`
  font-size: ${({ theme }) => theme.fontSizeOpenSans.xxs};
  padding-left: 70px;
  margin-top: -15px;
  font-weight: bold;
`; */
const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0 1rem 2rem;
`;
const StyledLogoSlogan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Style desktopVersion
const ContainerDesktop = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background: ${({ theme }) => theme.color.main1};
  color: ${({ theme }) => theme.color.main2};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  border: 2px solid black;
  padding: 0.2rem;
`;
const StyledMenuDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: bold;
`;
const CountryFlag = styled.div`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const ServicesAndLanguage = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
// Style AdminHeader

const ContainerDesktopAdmin = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${({ theme }) => theme.color.main7};
  color: ${({ theme }) => theme.color.main8};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  padding: 0.2rem;
`;

const StyledMenuDesktopAdmin = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: bold;
`;
const CountryFlagAdmin = styled.div`
  display: flex;
  gap: 0.1rem;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;
const ServicesAndLanguageAdmin = styled.div`
  display: flex;
  position: relative;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  margin: 1rem;
`;
// const StyledInput = styled.input`
//   position: relative;
//   height: 2rem;
//   width: 20rem;
//   margin: auto;
//   border-radius: 0.3rem;
//   background-image: url(https://cdn2.hubspot.net/hubfs/4004166/bioticresearch_website_assets/images/search_icon.png);
//   background-repeat: no-repeat;
//   background-position: right center;
// `;

// Style ClientHeader
const ContainerDesktopClient = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${({ theme }) => theme.color.main7};
  color: ${({ theme }) => theme.color.main8};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  padding: 0.2rem;
`;

const StyledMenuDesktopClient = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: bold;
`;
const CountryFlagClient = styled.div`
  display: flex;
  z-index: 0;
  gap: 0.1rem;
  :hover {
    cursor: pointer;
  }
`;
const ServicesAndLanguageClient = styled.div`
  display: flex;
  position: relative;
  gap: 3rem;
  justify-content: space-around;
  margin: 1rem;
`;

const ButtonLogoutMobil = styled.button`
  position: absolute;
  color: ${({ theme }) => theme.color.main2};
  background: none;
  font-size: ${({ theme }) => theme.fontSizeInter.m};
  top: 17rem;
  border: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;
const ButtonLogoutMobilAdmin = styled.button`
  position: absolute;
  color: ${({ theme }) => theme.color.main2};
  background: none;
  font-size: ${({ theme }) => theme.fontSizeInter.m};
  top: 28rem;
  border: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;

const data = [
  {
    path: '/aboutUs',
    text: 'ABOUT US',
    id: 1
  },
  {
    path: '/services',
    text: 'SERVICES',
    id: 2
  },
  {
    path: '/login',
    text: 'LOGIN',
    id: 3
  },
  {
    path: '/signup',
    text: 'SIGN UP',
    id: 4
  },
  {
    path: '/contact',
    text: 'CONTACT',
    id: 5
  }
];

const dataDesktop = [
  {
    path: '/aboutUs',
    text: 'ABOUT US',
    id: 1
  },
  {
    path: '/services',
    text: 'SERVICES',
    id: 2
  },
  {
    path: '/contact',
    text: 'CONTACT',
    id: 3
  },
  {
    path: '/login',
    text: 'LOGIN',
    id: 4
  }
];
const dataHeaderAdmin = [
  {
    path: '/',
    text: 'DASHBOARD',
    id: 1
  },
  {
    path: '/clients',
    text: 'CLIENTS/PROJECTS',
    id: 2
  },
  {
    path: '/messages',
    text: 'MESSAGES',
    id: 3
  }
];

const dataHeaderClient = [
  {
    path: '/',
    text: 'DASHBOARD',
    id: 1
  },
  {
    path: '/projects',
    text: 'PROJECTS',
    id: 2
  },
  {
    path: '/messages',
    text: 'MESSAGES',
    id: 3
  }
];

function Header() {
  const { userData } = useContext(Context);
  const { handleLogout } = useAuth();

  // useNavigate Function
  const navigate = useNavigate();
  const navigateTo = (path: any) => {
    navigate(path);
  };

  // Open & Closing Menu
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };
  // useMediaQuery
  const desktopVersion = useMediaQuery('(min-width: 1060px)');

  // console.log('We are on the size of Desktop Version?', desktopVersion);

  // Testing AdminHeader
  // const adminLogIn = true;
  // Client Mobil Version ----------------------------------------------
  if (userData.token && userData.role === 'Client') {
    return (
      <div>
        {!desktopVersion ? (
          <Container isOpenMenu={isOpenMenu}>
            {!isOpenMenu && (
              <Flex>
                <div style={{ position: 'relative' }}>
                  <NavLink path="/" image={NS1blk} alt="Logo" />
                </div>
                <div>
                  {!isOpenMenu && (
                    <GiHamburgerMenu fontSize={48} cursor="pointer" onClick={handleOpenMenu} />
                  )}
                </div>
              </Flex>
            )}
            {isOpenMenu && (
              <>
                <FlexOpen>
                  <div style={{ position: 'relative' }}>
                    <NavLink path="/" image={NS1blk} alt="Logo" />
                  </div>
                  <div>
                    <GrClose onClick={handleOpenMenu} cursor="pointer" fontSize={48} />
                  </div>
                </FlexOpen>
                <StyledMenu>
                  {dataHeaderClient.map((item) => (
                    <NavLink
                      key={item.id}
                      path={item.path}
                      text={item.text}
                      onClick={handleOpenMenu}
                    />
                  ))}
                  <ButtonLogoutMobil type="button" onClick={handleLogout}>
                    LOGOUT
                  </ButtonLogoutMobil>
                </StyledMenu>
                <br />
                <StyledLogoSlogan>
                  <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
                </StyledLogoSlogan>
                <Contact />
              </>
            )}
          </Container>
        ) : (
          // Client Desktop Version ----------------------------------------------
          <ContainerDesktopClient>
            <StyledLogoSlogan>
              <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
            </StyledLogoSlogan>
            {/* <StyledInput type="text" placeholder="Search" /> */}
            <SearchBar />
            <ServicesAndLanguageClient>
              <StyledMenuDesktopClient>
                {dataHeaderClient.map((item) => (
                  <NavLink key={item.id} path={item.path} text={item.text} color="white" />
                ))}
              </StyledMenuDesktopClient>
              <CountryFlagAdmin>
                <LanguageMenu />
              </CountryFlagAdmin>
              <AvatarWithMenu img={userData.avatar}>
                <div>
                  <Button
                    whiteMenu
                    text="Settings"
                    width="100px"
                    fontSize="1rem"
                    onClick={() => navigateTo('/settings')}
                  />
                  <Button
                    whiteMenu
                    text="Logout"
                    width="100px"
                    fontSize="1rem"
                    onClick={handleLogout}
                  />
                </div>
              </AvatarWithMenu>
            </ServicesAndLanguageClient>
          </ContainerDesktopClient>
        )}
      </div>
    );
  }
  // Freelancer Mobil Version ----------------------------------------------
  if (userData.token && userData.role === 'Freelancer') {
    return (
      <div>
        {!desktopVersion ? (
          <Container isOpenMenu={isOpenMenu}>
            {!isOpenMenu && (
              <Flex>
                <div style={{ position: 'relative' }}>
                  <NavLink path="/" image={NS1blk} alt="Logo" />
                </div>
                <div>
                  {!isOpenMenu && (
                    <GiHamburgerMenu fontSize={48} cursor="pointer" onClick={handleOpenMenu} />
                  )}
                </div>
              </Flex>
            )}
            {isOpenMenu && (
              <>
                <FlexOpen>
                  <div style={{ position: 'relative' }}>
                    <NavLink path="/" image={NS1blk} alt="Logo" />
                  </div>
                  <div>
                    <GrClose onClick={handleOpenMenu} cursor="pointer" fontSize={48} />
                  </div>
                </FlexOpen>
                <StyledMenu>
                  {dataHeaderAdmin.map((item) => (
                    <NavLink
                      key={item.id}
                      path={item.path}
                      text={item.text}
                      onClick={handleOpenMenu}
                    />
                  ))}
                  <NavLink path="/newClient" text="NEW CUSTOMER" onClick={handleOpenMenu} />
                  <NavLink path="/settings" text="SETTINGS" onClick={handleOpenMenu} />
                  <NavLink path="/statistics" text="STATISTICS" onClick={handleOpenMenu} />
                  <ButtonLogoutMobilAdmin type="button" onClick={handleLogout}>
                    LOGOUT
                  </ButtonLogoutMobilAdmin>
                </StyledMenu>
                <br />
                <StyledLogoSlogan>
                  <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
                </StyledLogoSlogan>
                <Contact />
              </>
            )}
          </Container>
        ) : (
          // Freelancer Desktop Version ----------------------------------------------
          <ContainerDesktopAdmin>
            <StyledLogoSlogan>
              <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
            </StyledLogoSlogan>
            {/* <StyledInput type="text" placeholder="Search" /> */}
            <SearchBar />
            <ServicesAndLanguageAdmin>
              <StyledMenuDesktopAdmin>
                {dataHeaderAdmin.map((item) => (
                  <NavLink key={item.id} path={item.path} text={item.text} color="white" />
                ))}
              </StyledMenuDesktopAdmin>
              <CountryFlagClient>
                <LanguageMenu />
              </CountryFlagClient>
              <AvatarWithMenu img={userData.avatar}>
                <div>
                  <Button
                    whiteMenu
                    text="Settings"
                    width="100px"
                    fontSize="1rem"
                    onClick={() => navigateTo('/settings')}
                  />
                  <Button
                    whiteMenu
                    text="Logout"
                    width="100px"
                    fontSize="1rem"
                    onClick={handleLogout}
                  />
                </div>
              </AvatarWithMenu>

              {/* <AvatarContainer onClick={handleOpenAvatarMenu} ref={ref}>
                <RoundedPhoto
                  img={userData.avatar}
                  icon={<BiFace fontSize={32} />}
                  alt="avatar"
                  outline="1px solid black"
                  width="30px"
                  height="30px"
                />
                {isOpenAvatarMenu && (
                  <AvatarMenu>
                    {dataAvatarMenu.map((item) => (
                      <div>
                        <Button whiteMenu text={item.text} width="100px" fontSize="1rem" />
                        <Button
                          whiteMenu
                          text="Logout"
                          width="100px"
                          fontSize="1rem"
                          onClick={handleLogout}
                        />
                      </div>
                    ))}
                  </AvatarMenu>
                )}
              </AvatarContainer> */}
            </ServicesAndLanguageAdmin>
          </ContainerDesktopAdmin>
        )}
      </div>
    );
  }
  // Logout Mobil Version ----------------------------------------------
  return (
    <div>
      {!desktopVersion ? (
        <Container isOpenMenu={isOpenMenu}>
          {!isOpenMenu && (
            <Flex>
              <div>
                <NavLink path="/" image={NS1blk} alt="Logo" />
              </div>
              <div>
                {!isOpenMenu && (
                  <GiHamburgerMenu fontSize={48} cursor="pointer" onClick={handleOpenMenu} />
                )}
              </div>
            </Flex>
          )}
          {isOpenMenu && (
            <>
              <FlexOpen>
                <div>
                  <NavLink path="/" image={NS1blk} alt="Logo" />
                </div>
                <div>
                  <GrClose onClick={handleOpenMenu} cursor="pointer" fontSize={48} />
                </div>
              </FlexOpen>
              <StyledMenu>
                {data.map((item) => (
                  <NavLink
                    key={item.id}
                    path={item.path}
                    text={item.text}
                    onClick={handleOpenMenu}
                  />
                ))}
              </StyledMenu>
              <br />
              <StyledLogoSlogan>
                <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
              </StyledLogoSlogan>
              <Contact />
            </>
          )}
        </Container>
      ) : (
        // Logout Desktop Version ----------------------------------------------
        <ContainerDesktop>
          <StyledLogoSlogan>
            <NavLink path="/" bigLogo image={NS1blk} alt="Logo" />
          </StyledLogoSlogan>
          <ServicesAndLanguage>
            <StyledMenuDesktop>
              {dataDesktop.map((item) => (
                <NavLink key={item.id} path={item.path} text={item.text} />
              ))}

              <NavLink path="/signup" text="SIGN UP" border="2px solid black" />
            </StyledMenuDesktop>
            <CountryFlag>
              <LanguageMenu />
            </CountryFlag>
          </ServicesAndLanguage>
        </ContainerDesktop>
      )}
    </div>
  );
}

export default Header;
