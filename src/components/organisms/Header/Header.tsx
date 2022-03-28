import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NSLogo from '../../../assets/images/Logos/newLogos/53x161/NSLogo.png';
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
  font-size: ${({ theme }) => theme.fontSizeOpenSans.l};
  border: 2px solid #001523;
  padding: 0.7rem;
  min-height: ${({ isOpenMenu }) => (isOpenMenu ? '100vh' : 'auto')};
  /* border: 2px solid red; */
  position: relative;
  z-index: 9999;
  //top: 0;
  //left: 0;
  //z-index: 0;
  //width: 100%;
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
  justify-content: space-between;
  flex-direction: column;
  padding: 2rem;
`;
const StyledLogoSlogan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Style desktopVersion
const ContainerDesktop = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.color.main1};
  color: ${({ theme }) => theme.color.main2};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  border-bottom: 1px solid ${({ theme }) => theme.color.main9};
  padding: 0.5rem;
`;
const StyledMenuDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
  align-items: center;
  background: ${({ theme }) => theme.color.main2};
  color: ${({ theme }) => theme.color.main8};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  border-bottom: 2px solid ${({ theme }) => theme.color.main9};
  padding: 0.5rem;
`;

const StyledMenuDesktopAdmin = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: 600;
  @media (max-width: 1200px) {
    > div:last-child {
      display: none;
    }
  }
`;
const DropdownMenuDesktopAdmin = styled.div`
@media (min-width: 1200px) and (max-width: 2000px) {
    > div:first-child {
      display: none;
    }`;

const CountryFlagAdmin = styled.div`
  display: flex;
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
  align-items: center;
  background: ${({ theme }) => theme.color.main2};
  color: ${({ theme }) => theme.color.main8};
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  border-bottom: 1px solid ${({ theme }) => theme.color.main9};
  padding: 0.5rem;
`;

const StyledMenuDesktopClient = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: 600;
`;
const CountryFlagClient = styled.div`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const ServicesAndLanguageClient = styled.div`
  display: flex;
  position: relative;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
`;

const ButtonLogoutMobil = styled.div`
  color: ${({ theme }) => theme.color.main2};
  font-weight: 600;
  padding-left: 0.5rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;
const ButtonLogoutMobilAdmin = styled.div`
  color: ${({ theme }) => theme.color.main2};
  padding-left: 0.5rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main4};
  }
`;

const ContainerSearchBar = styled.div`
  // ${({ theme }) => theme.down(theme.breakpoint.s)} {
  //   width: 120px;
  // }
`;

function Header() {
  const { t } = useTranslation();
  const dataDesktop = [
    {
      path: '/aboutUs',
      text: t('headerAboutUs'),
      id: 1
    },
    {
      path: '/services',
      text: t('headerServices'),
      id: 2
    },
    {
      path: '/contact',
      text: t('headerContact'),
      id: 3
    },
    {
      path: '/login',
      text: t('headerLogin'),
      id: 4
    }
  ];
  const dataHeaderAdmin = [
    {
      path: '/',
      text: 'Dashboard',
      id: 1
    },
    {
      path: '/clients',
      text: t('headerAdminProjects'),
      id: 2
    },
    {
      path: '/messages',
      text: t('headerAdminMessages'),
      id: 3
    }
  ];

  const dataHeaderClient = [
    {
      path: '/',
      text: 'Dashboard',
      id: 1
    },
    {
      path: '/projects',
      text: t('headerClientProjects'),
      id: 2
    },
    {
      path: '/messages',
      text: t('headerClientMessages'),
      id: 3
    }
  ];
  const data = [
    {
      path: '/aboutUs',
      text: t('headerAboutUs'),
      id: 1
    },
    {
      path: '/services',
      text: t('headerServices'),
      id: 2
    },
    {
      path: '/login',
      text: t('headerLogin'),
      id: 3
    },
    {
      path: '/signup',
      text: t('headerSignUp'),
      id: 4
    },
    {
      path: '/contact',
      text: t('headerContact'),
      id: 5
    }
  ];
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
  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };
  // useMediaQuery
  const desktopVersion = useMediaQuery('(min-width: 1060px)');

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpenMenu) {
      body!.style.overflow = 'hidden';
      console.log(body);
    } else {
      body!.style.overflow = 'visible';
    }
  }, [isOpenMenu]);

  useEffect(() => {
    if (desktopVersion) {
      setIsOpenMenu(false);
    }
  }, [desktopVersion]);

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
                  <NavLink path="/" image={NSLogo} alt="Logo" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CountryFlagAdmin>
                    <LanguageMenu />
                  </CountryFlagAdmin>
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
                    <NavLink path="/" image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
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
                  <NavLink path="/settings" text="Settings" onClick={handleOpenMenu} />
                  <ButtonLogoutMobil onClick={handleLogout}>Logout</ButtonLogoutMobil>
                </StyledMenu>
                <StyledLogoSlogan>
                  <NavLink path="/" bigLogo image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
                </StyledLogoSlogan>
                <Contact />
              </>
            )}
          </Container>
        ) : (
          // Client Desktop Version ----------------------------------------------
          <ContainerDesktopClient>
            <StyledLogoSlogan>
              <NavLink path="/" bigLogo image={NSLogo} alt="Logo" />
            </StyledLogoSlogan>
            {/* <StyledInput type="text" placeholder="Search" /> */}
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
                    dropMenu
                    color="white"
                    text="Settings"
                    width="100px"
                    onClick={() => navigateTo('/settings')}
                  />
                  <Button
                    dropMenu
                    color="white"
                    text="Logout"
                    width="100px"
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
          <div>
            <Container isOpenMenu={isOpenMenu}>
              {!isOpenMenu && (
                <Flex>
                  <div style={{ position: 'relative' }}>
                    <NavLink path="/" image={NSLogo} alt="Logo" />
                  </div>
                  {/* Do we need searchBar here? */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CountryFlagAdmin>
                      <LanguageMenu />
                    </CountryFlagAdmin>
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
                      <NavLink path="/" image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
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
                    <NavLink path="/newClient" text="New Customer" onClick={handleOpenMenu} />
                    <NavLink path="/settings" text="Settings" onClick={handleOpenMenu} />
                    <NavLink path="/statistics" text="Statistics" onClick={handleOpenMenu} />
                    <ButtonLogoutMobilAdmin onClick={handleLogout}>Logout</ButtonLogoutMobilAdmin>
                  </StyledMenu>
                  <StyledLogoSlogan>
                    <NavLink path="/" bigLogo image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
                  </StyledLogoSlogan>
                  <Contact />
                </>
              )}
            </Container>
            <ContainerSearchBar>
              <SearchBar top="36px" />
            </ContainerSearchBar>
          </div>
        ) : (
          // Freelancer Desktop Version ----------------------------------------------
          <ContainerDesktopAdmin>
            <StyledLogoSlogan>
              <NavLink path="/" bigLogo image={NSLogo} alt="Logo" />
            </StyledLogoSlogan>
            {/* <StyledInput type="text" placeholder="Search" /> */}
            <SearchBar />
            <ServicesAndLanguageAdmin>
              <StyledMenuDesktopAdmin>
                {dataHeaderAdmin.map((item) => (
                  <NavLink key={item.id} path={item.path} text={item.text} color="white" />
                ))}
                <NavLink path="/statistics" text="Statistics" color="white" />
              </StyledMenuDesktopAdmin>
              <CountryFlagClient>
                <LanguageMenu />
              </CountryFlagClient>
              <AvatarWithMenu img={userData.avatar}>
                <DropdownMenuDesktopAdmin>
                  <Button
                    dropMenu
                    color="white"
                    text="Statistics"
                    width="100px"
                    onClick={() => navigateTo('/statistics')}
                  />
                  <Button
                    dropMenu
                    color="white"
                    text="Settings"
                    width="100px"
                    onClick={() => navigateTo('/settings')}
                  />
                  <Button
                    dropMenu
                    color="white"
                    text="Logout"
                    width="100px"
                    onClick={handleLogout}
                  />
                </DropdownMenuDesktopAdmin>
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
                <NavLink path="/" image={NSLogo} alt="Logo" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CountryFlagAdmin>
                  <LanguageMenu />
                </CountryFlagAdmin>
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
                  <NavLink path="/" image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
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
              <StyledLogoSlogan>
                <NavLink path="/" bigLogo image={NSLogo} alt="Logo" onClick={handleCloseMenu} />
              </StyledLogoSlogan>
              <Contact />
            </>
          )}
        </Container>
      ) : (
        // Logout Desktop Version ----------------------------------------------
        <ContainerDesktop>
          <StyledLogoSlogan>
            <NavLink path="/" bigLogo image={NSLogo} alt="Logo" />
          </StyledLogoSlogan>
          <ServicesAndLanguage>
            <StyledMenuDesktop>
              {dataDesktop.map((item) => (
                <NavLink key={item.id} path={item.path} text={item.text} />
              ))}

              <Button
                onClick={() => navigateTo('/signup')}
                text="SignUp"
                border="2px solid #9e0059"
                width="100px"
                background="transparent"
                color="#9e0059"
                height="40px"
              />
            </StyledMenuDesktop>
            <CountryFlag>
              <LanguageMenu background="#eae2b7" />
            </CountryFlag>
          </ServicesAndLanguage>
        </ContainerDesktop>
      )}
    </div>
  );
}

export default Header;
