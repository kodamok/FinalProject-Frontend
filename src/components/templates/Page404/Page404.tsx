import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import notFound from '../../../assets/404/notFound.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;

  h3 {
    margin: 1rem;
  }
  div:last-child {
    margin-top: 1rem;
  }
`;

const Box404 = styled.div`
  background-image: url(${notFound});
  background-position: center;
  box-shadow: 0px 0px 1.7px #fcbf49, 0px 0px 6.9px #fcbf49, 0px 0px 21.6px #fcbf49,
    0px 0px 94px #fcbf49;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Page404() {
  return (
    <Container>
      {/* <h3>Page Not Found</h3>
      <h3>Error 404</h3> */}
      <Box404>
        <Button text="Go to Home" />
      </Box404>
    </Container>
  );
}

export default Page404;
