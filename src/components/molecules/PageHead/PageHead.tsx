import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
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
  margin-bottom: 1rem;
  width: 100%;
  color: ${({ theme }) => theme.color.main2};
  text-shadow: -1px 2px 5px #ffffff;
`;

const ThreeDotMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  align-items: center;
  background-color: #fcbf49;
  border: 1px solid black;
  border-radius: 10px;
  min-height: 42px;
`;

interface Head {
  pageHeadInfo: any;
  children?: any;
  intro?: HTMLParagraphElement | HTMLElement | any;
}

function PageHead({ pageHeadInfo, children, intro }: Head) {
  return (
    <Wrap>
      <Container>
        <H3>{pageHeadInfo[0].titleOfPage}</H3>
        {/* Remember on this condition {intro && ...} */}
        {intro && <div className="intro">{intro}</div>}

        <ThreeDotMenu>
          <div>{children}</div>
          {pageHeadInfo[0].threeDotButton ? (
            <IconClickable icon={<BsThreeDots fontSize={40} color="#001523" />}>
              {pageHeadInfo.map((item: any) => (
                <Button
                  dropMenu
                  key={item.id}
                  text={item.threeDotButton.button1}
                  width="200px"
                  fontSize="1rem"
                  padding="0.1rem 1rem"
                  onClick={item.threeDotButton.onClickEvent}
                  color="white"
                />
              ))}
            </IconClickable>
          ) : null}
        </ThreeDotMenu>
      </Container>
    </Wrap>
  );
}

PageHead.defaultProps = {
  children: undefined,
  intro: undefined
};

export default PageHead;
