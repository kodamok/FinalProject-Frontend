import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../../../providers/GeneralProvider';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import COMPANYLOGO from '../../../assets/illustrations/COMPANYLOGO.png';
import ServiceListInputs from '../../molecules/ServiceListItem/ServiceListInputs';
import IconClickable from '../../atoms/IconClickable/IconClickable';

const PageContainer = styled.div`
  /* border: 2px solid red; */
`;

const FormContainer = styled.form`
  /* border: 5px solid black; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 70px 2fr 70px;
  column-gap: 50px;
  padding-left: 5rem;
  padding-right: 5rem;
  margin-bottom: 5rem;
`;

const Table = styled.table`
  /* border: 2px solid black; */
  grid-column:1 / span 3
  display: flex;
  align-items: baseline;
  padding: 1rem;
  width: 80vw;

  tr {
    border: 2px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    list-style: none;
    padding: 0;

    th {
      padding: 0;
    }

    .newProject {
      /* border: 2px solid black; */
      font-size: ${({ theme }) => theme.fontSizeInter.ml};
      text-align: left;
      width: 25vw;
    }

    .listOfServices {
      /* border: 2px solid black; */
      font-size: ${({ theme }) => theme.fontSizeInter.m};
      width: 53vw;
    }
  }
`;

const BasicInfoContainer = styled.div`
  /* border: 2px solid green; */
  grid-column: 1 / span 3;
  grid-row: 2 / span 2;
  display: inline-grid;
  grid-template-columns: minmax(450px, 2fr) 3.5fr;
`;

const LeftContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main1};
  padding: 1rem;
  display: inline-grid;
  grid-template-columns: 0.5fr 1fr;
  column-gap: 10px;
  border-radius: 10px;
  border: 3px solid black;

  .left {
    /* border: 5px solid yellow; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .right {
    /* border: 5px solid purple; */
    display: flex;
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.div`
  grid-row: 3;
  grid-column: 3;
  justify-self: end;
  align-self: end;
`;

interface initial {
  companyName: string;
  customerName: string;
  website: string;
  taxNumber: string;
  services: any;
}

const projectInfo: initial = {
  companyName: '',
  customerName: '',
  website: '',
  taxNumber: '',
  services: []
};

function NewProject(): JSX.Element {
  const { userData } = useContext(Context);
  const { inputs, handleChange } = useForm(projectInfo);
  const [serviceList, setServiceList] = useState([{ serviceName: '', price: 0, description: '' }]);
  inputs.services = [...serviceList];
  const params = useParams();
  console.log(inputs);
  console.log(serviceList);

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { serviceName: '', price: 0, description: '' }]);
  };

  // EXTRACT THE SERVICES FROM THE SERVICE LIST INPUT COMPONENT
  /* 
  const getServicesFromComponent = (array: any) => {
    const listOfServicesCopy = [...array];
    const arrayOfServices = listOfServicesCopy.map((service: any) => [
      service.serviceName,
      service.price,
      service.description
    ]);

    return arrayOfServices;
  }; */

  /* console.log(inputs); */

  // SUBMIT THE NEW PROJECT INFORMATION
  const handleSubmitNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project/${params.clientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },

        body: JSON.stringify({ inputs })
      });
      console.log(inputs);
      const resJSON = await res.json();
      console.log(resJSON);
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmitNewProject}>
        <Table>
          <thead>
            <tr>
              <th className="newProject">New Project</th>
              <th className="listOfServices">List Of Services</th>
              <th>
                <div className="threeDots">
                  <IconClickable icon={<BsThreeDots fontSize={40} />}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '0.5rem'
                      }}
                    >
                      <Button
                        whiteMenu
                        text="Add New Service"
                        width="200px"
                        fontSize="1rem"
                        onClick={handleServiceAdd}
                      />
                    </div>
                  </IconClickable>
                </div>
              </th>
            </tr>
          </thead>
        </Table>
        <BasicInfoContainer>
          <LeftContainer>
            <div className="left">
              <RoundedPhoto
                RoundedPhotoWithButton
                img={COMPANYLOGO}
                alt="blablabla"
                width="150px"
                height="150px"
                border="2px solid black"
              />
              <InputWithLabel
                label="Start Date*"
                type="date"
                name="startDate"
                onChange={handleChange}
                required
              />
              <InputWithLabel
                label="End Date*"
                type="date"
                name="endDate"
                required
                onChange={handleChange}
              />
            </div>
            <div className="right">
              <InputWithLabel
                label="Company Name"
                type="input"
                name="companyName"
                placeholder="enter the name of the company"
                onChange={handleChange}
              />
              <InputWithLabel
                label="Customer Name*"
                type="input"
                name="customerName"
                placeholder="enter a customer name"
                onChange={handleChange}
                required
              />
              <InputWithLabel
                label="Website"
                type="input"
                name="website"
                placeholder="enter a website"
                onChange={handleChange}
              />
              <InputWithLabel
                label="Tax Number"
                type="input"
                name="taxNumber"
                placeholder="enter a tax ID"
                onChange={handleChange}
              />
            </div>
          </LeftContainer>

          <div>
            <ServiceListInputs
              handleChange={handleChange}
              serviceList={serviceList}
              setServiceList={setServiceList}
              handleServiceAdd={handleServiceAdd}
            />
          </div>
        </BasicInfoContainer>

        <ButtonWrapper>
          <Button type="submit" text="submit" height="40px" width="150px" padding="0px;" />
        </ButtonWrapper>
      </FormContainer>
    </PageContainer>
  );
}
export default NewProject;
