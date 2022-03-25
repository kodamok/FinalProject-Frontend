import React from 'react';
import styled from 'styled-components';
import { CgPlayListAdd, CgRemove } from 'react-icons/cg';
import Input from '../../atoms/Input/Input';

interface DivStyles {
  width?: string | undefined;
}

const WrapperContainer = styled.div`
  //border: 5px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 70px;
  justify-content: stretch;
  overflow-y: scroll;
  overflow: hidden;
  height: 450px;
`;

const Container = styled.div<DivStyles>`
  /* border: 5px solid blue; */
  grid-column-start: 1;
  grid-column-end: -1;
`;

const AddNewServiceContainer = styled.div`
  /* border: 2px solid black; */

  display: grid;
  grid-template-columns: 3fr 1fr 5fr 1fr;
  grid-template-rows: 70px 1fr;
  justify-content: stretch;

  .boxTitle {
    /* border: 5px solid black; */
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .boxPrice {
    /* border: 5px solid black; */
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .boxDescription {
    /* border: 5px solid black; */
    display: flex;
    justify-content: center;
    padding: 0;
  }
`;
const InputsContainer = styled.div`
  //border: 5px solid green;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 5fr 1fr;
  grid-template-rows: 40px 1fr;
  justify-items: stretch;
  column-gap: 0.5rem;
  padding: 0.5rem;

  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
     {
      grid-template-columns: 3fr 1fr 5fr 1fr;
      grid-template-rows: 30px 40px 1fr;
    }
  }

  .serviceNumber {
    grid-column: 1 / 2;
    grid-row: 1/2;

    > p {
      font-weight: 700;
      font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
      color: #9e0059;
      padding: 0.5rem;
    }
  }

  .serviceName {
    /* border: 5px solid black; */
    grid-column: 1 / 2;
    grid-row: 2/3;

    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-column: 1 / 2;
        grid-row: 3/4;
      }
    }
  }

  .servicePrice {
    /* border: 5px solid black; */
    width: 70px;
    margin-inline: 1rem;
    grid-column: 2 / 3;
    grid-row: 2/3;

    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-column: 2 / 3;
        grid-row: 3/4;
      }
    }
  }

  .serviceDescription {
    /* border: 5px solid black; */

    grid-column: 3 / 4;
    grid-row: 2/3;

    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-column: 3 / 4;
        grid-row: 3/4;
      }
    }
  }

  .icons {
    grid-column: 4 / -1;
    grid-row: 2 / 3;
    //border: 5px solid black;
    display: flex;
    width: 70px;
    justify-self: end;
    align-items: center;
    padding: 0.5rem;
    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-column: 1 / 2;
        grid-row: 2/3;
        justify-self: start;
      }
    }
  }
`;

/* const IconsContainer = styled.div`
  display: flex;
  width: 70px;
`; */

const IconBox = styled.div`
  padding: 0.2rem;
`;

type Service = {
  serviceName: string;
  price: number;
  description: string;
};

function ServiceListItem({ serviceList, setServiceList, handleServiceAdd }: any): JSX.Element {
  /* useEffect(() => {
    getServices(serviceList);
  }, [serviceList]); */

  // FUNCTION TO REMOVE A SERVICE
  const handleServiceRemove = (index: number): void => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  // FUNCTION TO HANDLE INPUT CHANGES AND MANAGING TO THE FORM
  const handleServiceChange = (e: any, index: any) => {
    const { value, name }: any = e.target as HTMLInputElement;
    const list: Service[] | any = [...serviceList];
    list[index][name] = value as string;
    setServiceList(list);
  };
  return (
    <WrapperContainer>
      <Container>
        <AddNewServiceContainer>
          <div className="boxTitle">Title</div>
          <div className="boxPrice">price</div>
          <div className="boxDescription">Description</div>

          {serviceList.map((singleService: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <InputsContainer key={index}>
              <div className="serviceNumber">
                <p> Service {index + 1}</p>
              </div>
              <div className="serviceName">
                <Input
                  form
                  onChange={(e: any) => handleServiceChange(e, index)}
                  value={singleService.serviceName}
                  type="text"
                  name="serviceName"
                  placeholder="Title for the service"
                  height="35px"
                  margin="0.2rem"
                />
              </div>
              <div className="servicePrice">
                <Input
                  form
                  onChange={(e: any) => handleServiceChange(e, index)}
                  value={singleService.price}
                  type="number"
                  name="price"
                  placeholder="Price"
                  height="35px"
                  margin="0.2rem"
                />
              </div>
              <div className="serviceDescription">
                <Input
                  textArea
                  onChange={(e: any) => handleServiceChange(e, index)}
                  value={singleService.description}
                  name="description"
                  placeholder="Short description"
                  margin="0.2rem"
                  cols={40}
                />
              </div>

              <div className="icons">
                {serviceList.length < 9 && (
                  <IconBox>
                    <CgPlayListAdd size={30} onClick={handleServiceAdd} />
                  </IconBox>
                )}
                {serviceList.length > 1 && (
                  <IconBox>
                    <CgRemove size={20} onClick={() => handleServiceRemove(index)} />
                  </IconBox>
                )}
              </div>
            </InputsContainer>
          ))}
        </AddNewServiceContainer>
      </Container>
    </WrapperContainer>
  );
}

export default ServiceListItem;
