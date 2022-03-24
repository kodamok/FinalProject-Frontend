import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import i18next from 'i18next';

import Button from '../../atoms/Button/Button';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import AvatarWithMenu from '../AvatarWithMenu/AvatarWithMenu';

/* const Container = styled.div`
  position: relative;
  background-color: inherit;
  border-radius: 0.6rem;
  z-index: 9999;
  > div:first-child {
    display: flex;
    gap: 0.2rem;
    border-radius: 0.4rem;
    padding: 0.3rem 0.6rem;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main3};
    }
  }
  > div:nth-child(2) {
    display: flex;
    color: ${({ theme }) => theme.color.main8};
    background-color: ${({ theme }) => theme.color.main7};
    border-radius: 0.6rem;
    flex-direction: column;
    position: absolute;
    top: 2.5rem;
    left: 0;
  }
  > div:nth-child(2) > div {
    display: flex;

    border-radius: 0.6rem;
    gap: 0.2rem;
    transition: 0.3s;
    border-radius: 0.4rem;
    padding: 0.3rem 0.6rem;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.color.main3};
    }
  }
`; */

const Text = styled.span`
  width: 250px;
  color: white;
  padding: 0.3rem;
`;

const Bla = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 500;
`;
const languages = [
  { id: 1, code: 'de', name: 'Deutsch', country_code: 'de' },
  {
    id: 2,
    code: 'en',
    name: 'English',
    country_code: 'gb'
  }
];

interface Lang {
  background?: any;
  top?: any;
}

function LanguageMenu({ background, top }: Lang) {
  const [actuallyLng, setActuallyLng] = useState(i18next.resolvedLanguage);
  const [isOpenMenuLanguage, setIsOpenMenuLanguage] = useState(false);
  const handleOpenLanguageMenu = () => {
    setIsOpenMenuLanguage((prev) => !prev);
  };
  const ref: any = useRef(null);
  useOnClickOutside(ref, () => setIsOpenMenuLanguage(false));
  return (
    <AvatarWithMenu
      emptyAvatar
      onClick={handleOpenLanguageMenu}
      className={`fi fi-${actuallyLng === 'en' ? 'gb' : 'de'}`}
      width="50px"
      background={background}
      top={top}
    >
      {isOpenMenuLanguage && (
        <Bla ref={ref}>
          {languages.map((item) => (
            <Button
              dropMenu
              key={item.id}
              onClick={() => {
                i18next.changeLanguage(item.code);
                // setIsOpenMenuLanguage(false);
                setActuallyLng(item.code);
              }}
              width="70px"
              background={background}
            >
              <Text className={`fi fi-${item.country_code}`} />
            </Button>
          ))}
        </Bla>
      )}
    </AvatarWithMenu>
  );
}

LanguageMenu.defaultProps = {
  background: undefined,
  top: undefined
};

export default LanguageMenu;
