import React from 'react';
import styled from 'styled-components';
import { CgPlayListAdd, CgRemove } from 'react-icons/cg';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';

interface DivStyles {
  width?: string | undefined;
}

/* const ListOfServicesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 800px;
  flex-direction: column;

  .listOfServicesText {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`; */

const WrapperContainer = styled.div`
  /* border: 5px solid red; */
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div<DivStyles>`
  /* border: 5px solid blue; */
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const HeaderServiceGrid = styled.div`
  /*  border: 5px solid yellow; */
  display: inline-grid;
  mix-width: 800px;
  grid-template-columns: 8fr 8fr 8fr 1fr;
  font-family: 'Inter';
  font-size: ${({ theme }) => theme.fontSizeInter.ms};
  font-weight: bold;

  .boxTitle {
    /* border: 5px solid black; */
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .boxPrice {
    /* border: 5px solid black; */
    display: flex;
    justify-self: center;
    padding: 0;
  }
  .boxDescription {
    /* border: 5px solid black; */
    display: flex;
    justify-self: center;
    padding: 0;
  }
  .threeDots {
    /* border: 5px solid black; */
    padding: 0;
    align-self: end;
  }
`;

const AddNewServiceContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputsContainer = styled.div`
  /* border: 5px solid green; */
  display: inline-grid;
  grid-template-columns: 4fr 3fr 10fr 1fr;
  column-gap: 0.5rem;

  .serviceName {
    /* border: 5px solid black; */
  }

  .servicePrice {
    /* border: 5px solid black; */
  }

  .serviceDescription {
    /* border: 5px solid black; */
  }

  .icons {
    /* border: 5px solid black; */
    display: flex;
    width: 70px;
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
  const handleServiceChange = (e: InputEvent, index: any) => {
    const { value, name }: any = e.target as HTMLInputElement;
    const list: Service[] | any = [...serviceList];
    list[index][name] = value as string;
    setServiceList(list);
  };

  return (
    <WrapperContainer>
      <Container>
        <HeaderServiceGrid>
          <div className="boxTitle">Title</div>
          <div className="boxPrice">price</div>
          <div className="boxDescription">Description</div>
        </HeaderServiceGrid>
        <AddNewServiceContainer>
          {serviceList.length === 0 ? (
            <h5 style={{ textAlign: 'center' }}>NO SERVICES</h5>
          ) : (
            serviceList.map((singleService: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <InputsContainer key={index}>
                <div className="serviceName">
                  <InputWithLabel
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
                  <InputWithLabel
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
                  <InputWithLabel
                    onChange={(e: any) => handleServiceChange(e, index)}
                    value={singleService.description}
                    type="text"
                    name="description"
                    placeholder="Short description"
                    height="35px"
                    margin="0.2rem"
                  />
                </div>

                <div className="icons">
                  {serviceList.length < 9 && (
                    <IconBox>
                      <CgPlayListAdd size={30} onClick={handleServiceAdd} />
                    </IconBox>
                  )}
                  {serviceList.length > 0 && (
                    <IconBox>
                      <CgRemove size={20} onClick={() => handleServiceRemove(index)} />
                    </IconBox>
                  )}
                </div>
              </InputsContainer>
            ))
          )}
        </AddNewServiceContainer>
      </Container>
    </WrapperContainer>
  );
}

export default ServiceListItem;
