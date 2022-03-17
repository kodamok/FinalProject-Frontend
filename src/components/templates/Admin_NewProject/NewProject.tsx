import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../../../providers/GeneralProvider';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import ServiceListInputs from '../../molecules/ServiceListItem/ServiceListInputs';
import IconClickable from '../../atoms/IconClickable/IconClickable';
import useError from '../../../hooks/useError';

const PageContainer = styled.div`
  /* border: 2px solid red; */
`;

const FormContainer = styled.form`
  /* border: 5px solid black; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px 2fr 70px;
  column-gap: 5px;
  padding-left: 5rem;
  padding-right: 5rem;
  margin-bottom: 5rem;
`;

const Table = styled.div`
  /* border: 2px solid black;  */
  grid-column:1 / span 3;
  display: flex;
  justify-content:space-between;
  align-items: center;

    .newProject {
      /* border: 2px solid black; */
      font-size: ${({ theme }) => theme.fontSizeInter.m};
      text-align: left;
      
    }

    .listOfServices {
  

      /* border: 2px solid black; */
      font-size: ${({ theme }) => theme.fontSizeInter.m};
     
    }

    .threeDots{

    }
  }
`;

const BasicInfoContainer = styled.div`
  /*  border: 2px solid green; */
  grid-column: 1 / span 3;
  grid-row: 2 / span 2;
  display: inline-grid;
  grid-template-columns: minmax(450px, 2fr) 3.5fr;

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    grid-template-columns: minmax(450px, 2fr);
    grid-template-rows: 1fr 1fr;
  }

  .listOfServices {
    /* border: 2px solid red; */

    ${({ theme }) => theme.down(theme.breakpoint.m)} {
      grid-column: 1;
      grid-row: 2;
    }
  }
`;

const LeftContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main1};
  padding: 1rem;
  display: inline-grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 1fr 50px;
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
  grid-row: 2;
  grid-column: 2 / span 1;
  justify-self: end;
  align-self: center;
`;

interface initial {
  image: File | string | null;
  companyName: string;
  description: string;
  website: string;
  taxNumber: string;
  services: any;
  startDate: string;
  dueDate: string;
}

const projectInfo: initial = {
  image: '',
  companyName: '',
  description: '',
  website: '',
  taxNumber: '',
  startDate: '',
  dueDate: '',
  services: []
};

function NewProject(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(Context);
  const { inputs, handleChange } = useForm(projectInfo);
  const { handleError } = useError();

  const [serviceList, setServiceList] = useState([{ serviceName: '', price: 0, description: '' }]);
  inputs.services = [...serviceList];
  const params = useParams();

  // LISTS PREVIOS SERVICES ALREADY ADDED AND ADDS NEW SERVICES
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { serviceName: '', price: 0, description: '' }]);
  };

  // SUBMIT THE NEW PROJECT INFORMATION
  const handleSubmitNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project/${params.clientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },

        body: JSON.stringify(inputs)
      });
      const resJSON = await res.json();
      if (res.status >= 200 && res.status < 300) {
        handleError(resJSON.message, true);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmitNewProject}>
        <Table>
          <div className="newProject">New Project</div>
          <div className="listOfServices">List Of Services</div>
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
        </Table>
        <BasicInfoContainer>
          <LeftContainer>
            <div className="left">
              <RoundedPhoto
                RoundedPhotoWithButton
                img={inputs.image || ''}
                alt="logo or company avatar"
                width="150px"
                height="150px"
                border="2px solid black"
                handleChange={handleChange}
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
                name="dueDate"
                required
                onChange={handleChange}
              />
            </div>
            <div className="right">
              <InputWithLabel
                label="Company Name*"
                name="companyName"
                placeholder="enter the name of the company"
                onChange={handleChange}
                required
              />
              <InputWithLabel
                label="Website*"
                name="website"
                placeholder="enter a website"
                onChange={handleChange}
                required
              />
              <InputWithLabel
                label="Tax Number"
                name="taxNumber"
                placeholder="enter a tax ID"
                onChange={handleChange}
              />
              <InputWithLabel
                label="Description"
                name="description"
                placeholder="enter a description"
                onChange={handleChange}
              />
            </div>
            <ButtonWrapper>
              <Button
                type="submit"
                text={isLoading ? 'Loading...' : 'Submit'}
                height="40px"
                width="150px"
                padding="0px;"
              />
            </ButtonWrapper>
          </LeftContainer>

          <div className="listOfServices">
            <ServiceListInputs
              serviceList={serviceList}
              setServiceList={setServiceList}
              handleServiceAdd={handleServiceAdd}
            />
          </div>
        </BasicInfoContainer>
      </FormContainer>
    </PageContainer>
  );
}
export default NewProject;
