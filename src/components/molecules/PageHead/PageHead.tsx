import React, { useState } from 'react';
import { BsThreeDots, BsQuestionCircle } from 'react-icons/bs';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import IconClickable from '../../atoms/IconClickable/IconClickable';

const Wrap = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  //border: 2px solid blue;
  width: 88%;
  display: flex;
  flex-direction: column;
  //margin: 1rem;
  padding: 1rem;
`;

const H3 = styled.h3`
  text-align: left;
  font-weight: 400;
  font-size: clamp(
    ${({ theme }) => theme.fontSizeInter.ms},
    5vw + 0.5rem,
    ${({ theme }) => theme.fontSizeInter.ml}
  );
  margin: 1rem 0;
  width: 100%;
  color: ${({ theme }) => theme.color.main2};
  text-shadow: -1px 2px 5px #ffffff;
`;

const RightIcons = styled.div`
  //border: 2px solid red;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThreeDotMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  align-items: center;
  background-color: #fcbf49;
  //background: ${({ theme }) => theme.color.main5};
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border: 1px solid black;
  border-radius: 10px;
  min-height: 42px;
`;

const QuestionMarkIcon = styled.div`
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 30px;
  //border: 2px solid blue;

  .questionMarkContent {
    position: absolute;
    top: 20px;
    right: 22px;
    min-width: 200px;
    min-height: 10ch;
    background: #001523;
    border: 2px solid #e76f51;
    padding: 0.5rem;
    border-radius: 0 10px 0 0;

    p {
      font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
      color: #ffffff;
    }
  }
`;

interface Head {
  pageHeadInfo: any;
  children?: any;
}

function PageHead({ pageHeadInfo, children }: Head) {
  const [questionMark, setQuestionMark] = useState(false);

  const handleOpenHelp = (e: any) => {
    e.stopPropagation();
    setQuestionMark((prev) => !prev);
  };

  const handleCloseHelp = () => {
    setQuestionMark(false);
  };
  return (
    <Wrap>
      <Container>
        <H3>{pageHeadInfo[0].titleOfPage}</H3>

        <ThreeDotMenu>
          <div>{children}</div>

          <RightIcons>
            {pageHeadInfo[0].helpButton ? (
              <QuestionMarkIcon onMouseEnter={handleOpenHelp} onMouseLeave={handleCloseHelp}>
                <BsQuestionCircle fontSize={25} />
                {questionMark && (
                  <div className="questionMarkContent">
                    <p>{pageHeadInfo[0].helpButton}</p>
                  </div>
                )}
              </QuestionMarkIcon>
            ) : null}
            {pageHeadInfo[0].threeDotButton ? (
              <IconClickable icon={<BsThreeDots fontSize={40} color="#001523" />}>
                {pageHeadInfo.map((item: any) => (
                  <Button
                    dropMenu
                    key={item.id}
                    text={item.threeDotButton.button1}
                    width="150px"
                    fontSize="1rem"
                    padding="0.1rem 1rem"
                    onClick={item.threeDotButton.onClickEvent}
                    color="white"
                  />
                ))}
              </IconClickable>
            ) : null}
          </RightIcons>
        </ThreeDotMenu>
      </Container>
    </Wrap>
  );
}

PageHead.defaultProps = {
  children: undefined
};

export default PageHead;
