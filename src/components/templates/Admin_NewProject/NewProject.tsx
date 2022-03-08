import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../../providers/GeneralProvider';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import COMPANYLOGO from '../../../assets/illustrations/COMPANYLOGO.png';

import ServiceListInputs from '../../molecules/ServiceListItem/ServiceListInputs';

const PageContainer = styled.div`
  /* border: 2px solid red; */
  padding: 2rem;
  display: flex;
`;

const BasicInfoContainer = styled.div`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  .left {
    /* border: 5px solid yellow; */
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }

  .right {
    /* border: 5px solid purple; */
    display: flex;
    flex-direction: column;
    flex-grow: 6;
    padding: 0.5rem;
  }
`;

const FormContainer = styled.form`
  /* border: 5px solid black; */
  display: flex;
  flex-direction: column;
  flex-grow: 4;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
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
        <BasicInfoContainer>
          <div className="left">
            <RoundedPhoto
              img={COMPANYLOGO}
              alt="blablabla"
              width="150px"
              height="150px"
              border="2px"
            />
            <InputWithLabel
              label="Star Date*"
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
          <ServiceListInputs
            handleChange={handleChange}
            serviceList={serviceList}
            setServiceList={setServiceList}
          />
        </BasicInfoContainer>

        <ButtonWrapper>
          <Button type="submit" text="submit" height="40px" width="150px" padding="0px;" />
        </ButtonWrapper>
      </FormContainer>
    </PageContainer>
  );
}
export default NewProject;
