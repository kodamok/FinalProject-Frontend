import React from 'react';
import styled from 'styled-components';
import { CgPlayListAdd, CgRemove } from 'react-icons/cg';
import { BsThreeDots } from 'react-icons/bs';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import Button from '../../atoms/Button/Button';

interface DivStyles {
  width?: string | undefined;
}

const Container = styled.div<DivStyles>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
`;
const AddNewServiceContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  justify-content: space-between;
`;
const InputsContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 0 1.5rem 0;
`;
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
  flex-grow: 10;
`;

const IconBox = styled.div`
  padding: 0.2rem;
`;

const ThreeDotsMenuWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const TitleOfServices = styled.table`
  tr {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }

  .title {
    margin-left: 1rem;
    flex-grow: 3;
  }

  .price {
    flex-grow: 2;
  }
  .description {
    flex-grow: 6;
  }

  tr {
    margin: 0;
    text-align: left;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  width: 70px;
`;

type Service = {
  serviceName: string;
  price: number;
  description: string;
};

function ServiceListItem({ serviceList, setServiceList }: any): JSX.Element {
  /* useEffect(() => {
    getServices(serviceList);
  }, [serviceList]); */

  // FUNCTION TO ADD A SERVICE
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { serviceName: '', price: 0, description: '' }]);
  };

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
      <ThreeDotsMenuWrapper>
        <h4 style={{ margin: '.5rem auto' }}>List Of Services</h4>
        <IconClickable icon={<BsThreeDots fontSize={40} />}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}
          >
            <Button
              whiteMenu
              text="Add New Service"
              width="200px"
              fontSize="1rem"
              onClick={() => handleServiceAdd}
            />
          </div>
        </IconClickable>
      </ThreeDotsMenuWrapper>

      <Container>
        <TitleOfServices>
          <thead>
            <tr>
              <td className="title">
                <h5>Title</h5>
              </td>
              <td className="price">
                <h5>price</h5>
              </td>
              <td className="description">
                <h5>Description</h5>
              </td>
            </tr>
          </thead>
        </TitleOfServices>
        <AddNewServiceContainer>
          {serviceList.length === 0 ? (
            <h5 style={{ textAlign: 'center' }}>NO SERVICES</h5>
          ) : (
            serviceList.map((singleService: any, index: number) => (
              <InputsContainer key={index}>
                <div>
                  <InputWithLabel
                    onChange={(e: any) => handleServiceChange(e, index)}
                    value={singleService.serviceName}
                    type="text"
                    name="serviceName"
                    placeholder="Title for the service"
                    width="15vw"
                    height="35px"
                    margin="0.2rem"
                  />
                </div>
                <div>
                  <InputWithLabel
                    onChange={(e: any) => handleServiceChange(e, index)}
                    value={singleService.price}
                    type="number"
                    name="price"
                    placeholder="Price"
                    width="10vw"
                    height="35px"
                    margin="0.2rem"
                  />
                </div>
                <div>
                  <InputWithLabel
                    onChange={(e: any) => handleServiceChange(e, index)}
                    value={singleService.description}
                    type="text"
                    name="description"
                    placeholder="Short description"
                    width="25vw"
                    height="35px"
                    margin="0.2rem"
                  />
                </div>
                <IconsContainer>
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
                </IconsContainer>
              </InputsContainer>
            ))
          )}
        </AddNewServiceContainer>
      </Container>
    </WrapperContainer>
  );
}

export default ServiceListItem;
