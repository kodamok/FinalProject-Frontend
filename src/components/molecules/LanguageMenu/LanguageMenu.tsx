import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import i18next from 'i18next';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Container = styled.div`
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

function LanguageMenu() {
  const [actuallyLng, setActuallyLng] = useState(i18next.resolvedLanguage);
  const [isOpenMenuLanguage, setIsOpenMenuLanguage] = useState(false);
  const handleOpenLanguageMenu = () => {
    setIsOpenMenuLanguage((prev) => !prev);
  };
  const ref: any = useRef(null);
  useOnClickOutside(ref, () => setIsOpenMenuLanguage(false));
  return (
    <Container>
      <div onClick={handleOpenLanguageMenu}>
        <span className={`fi fi-${actuallyLng === 'en' ? 'gb' : 'de'}`} />
        {actuallyLng && <p>{actuallyLng.toUpperCase()}</p>}
      </div>
      {isOpenMenuLanguage && (
        <div ref={ref}>
          {languages.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                i18next.changeLanguage(item.code);
                setIsOpenMenuLanguage(false);
                setActuallyLng(item.code);
              }}
            >
              <span className={`fi fi-${item.country_code}`} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default LanguageMenu;
