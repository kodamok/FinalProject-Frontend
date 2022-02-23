import React from 'react';
import styled from 'styled-components';
import { Box } from '../SectionProductDesc1/SectionProductDesc1';
import Button from '../../atoms/Button/Button';
import { RedSpan } from '../../atoms/RedSpan/RedSpan';
import Security from '../../../assets/illustrations/Security.png';
import face4 from '../../../assets/images/face4small.jpg';
import face5 from '../../../assets/images/face5small.jpg';
import face6 from '../../../assets/images/face6small.jpg';

const Container = styled.div`
  padding: 0 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 2rem;
  h5 {
    font-weight: bold;
    text-align: center;
  }
  > div:last-child {
    margin: 3rem auto 0 auto;
  }
`;

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  h5 {
    font-weight: bold;
    margin: 0;
  }
`;

const ContainerPhoto = styled.div`
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
`;

const SecuritySection = styled.div`
  position: relative;
  height: 320px;
  img:last-child {
    width: 420px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
`;

const StyledPTestimonial = styled.p`
  font-size: ${({ theme }) => theme.fontSizeOpenSans.xs};
  font-weight: 600;
`;

const data = [
  {
    photo: face4,
    title: 'Golor sit amet',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate debitis hic\n' +
      'nemo quisquam tempora tenetur voluptatum! Consequuntur, cumque deleniti dicta esse\n' +
      'laudantium, magni non perferendis quasi quo recusandae ullam voluptatem? Aliquam\n' +
      'corporis deleniti iusto.',
    signature: 'Lorem ipsum',
    id: 1
  },
  {
    photo: face5,
    title: 'Golor sit amet',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate debitis hic\n' +
      'nemo quisquam tempora tenetur voluptatum! Consequuntur, cumque deleniti dicta esse\n' +
      'laudantium, magni non perferendis quasi quo recusandae ullam voluptatem? Aliquam\n' +
      'corporis deleniti iusto.',
    signature: 'Lorem ipsum',
    id: 2
  },
  {
    photo: face6,
    title: 'Golor sit amet',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate debitis hic\n' +
      'nemo quisquam tempora tenetur voluptatum! Consequuntur, cumque deleniti dicta esse\n' +
      'laudantium, magni non perferendis quasi quo recusandae ullam voluptatem? Aliquam\n' +
      'corporis deleniti iusto.',
    signature: 'Lorem ipsum',
    id: 3
  }
];

function SectionProductDesc3(): JSX.Element {
  return (
    <Container>
      <div>
        <h5>
          Adjust your <RedSpan>earning</RedSpan> to your<RedSpan> work performance</RedSpan>
        </h5>
      </div>
      <Box>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aut cumque
          cupiditate eaque eligendi incidunt libero, maiores nesciunt nihil praesentium!"
        </p>
        <p>Lorem ipsum</p>
        <p>Golor sit amet</p>
      </Box>
      <SecuritySection>
        <div>
          <img src={Security} alt="security illustration" />
        </div>
        <h5 style={{ margin: '0' }}>
          <RedSpan>Security</RedSpan>
        </h5>
        <h5 style={{ margin: '0' }}>
          is very<RedSpan> important</RedSpan>
        </h5>
        <h5 style={{ margin: '0' }}>
          <span
            style={{
              fontWeight: '800',
              fontSize: '2.5rem',
              textShadow: '3px 3px 2px rgba(0,0,0,0.3)'
            }}
          >
            to us!
          </span>
        </h5>
      </SecuritySection>
      <div>
        {data.map((item) => (
          <Testimonial key={item.id}>
            <ContainerPhoto>
              <img src={item.photo} alt="face" />
            </ContainerPhoto>
            <h5>{item.title}</h5>
            <StyledPTestimonial>{item.text}</StyledPTestimonial>
            <p style={{ marginLeft: 'auto' }}>{item.signature}</p>
          </Testimonial>
        ))}
        <div />
        <div />
      </div>
      <div>
        <Button text="Signup" background="#fcbf49" color="#001523" border="2px solid #001523" />
      </div>
    </Container>
  );
}

export default SectionProductDesc3;