import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Input from '../../atoms/Input/Input';
import { Context } from '../../../providers/GeneralProvider';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';

import ServiceListInputs from '../../molecules/ServiceListItem/ServiceListInputs';
import useError from '../../../hooks/useError';
import PageHead from '../../molecules/PageHead/PageHead';

const PageContainer = styled.div`
  //border: 2px solid red;
`;

const FormContainer = styled.form`
  //border: 1px solid black;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px 2fr 70px;
  margin: 2rem auto;
  column-gap: 5px;
  max-width: 1400px;
  padding: 2rem;
  margin-bottom: 5rem;
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
     {
      grid-column: 1;
      grid-row: 2;
      padding: 0;
    }
  }
`;

/* const Intro = styled.div`
  //border: 2px solid green;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 700px;
  height: 100%;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSizeOpenSans.m};
  font-weight: 600;
  text-align: justify;
  padding: 1rem;

  .left {
    max-width: 700px;
  }
`; */

const BasicInfoContainer = styled.div`
  /*  border: 2px solid green; */
  grid-column: 1 / span 3;
  grid-row: 1 / span 3;
  display: inline-grid;
  grid-template-columns: minmax(450px, 2fr) 3.5fr;
  gap: 4rem;

  ${({ theme }) => theme.down(theme.breakpoint.m)} {
     {
      grid-template-columns: minmax(400px, 2fr);
      grid-template-rows: 1fr 1fr;
    }
  }

  .listOfServices {
    /* border: 2px solid red; */

    ${({ theme }) => theme.down(theme.breakpoint.m)} {
       {
        grid-column: 1;
        grid-row: 2;
      }
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
  border: 1px solid black;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};

  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
     {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 50px;
    }
  }

  .left {
    /* border: 5px solid yellow; */
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row: 1 / 2;
    grid-column: 1 / 2;

    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      }
    }
  }

  .right {
    /* border: 5px solid purple; */
    display: flex;
    flex-direction: column;
    grid-row: 1 / 2;
    grid-column: 2 / 3;

    ${({ theme }) => theme.down(theme.breakpoint.sm)} {
       {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        max-width: 300px;
        margin: 0 auto;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  grid-row: -1;
  grid-column: 2 / span 1;
  justify-self: end;
  align-self: center;
  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    {
     grid-row: -1;
     grid-column: 1/-1;
   }
 }
}
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
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(Context);
  const { inputs, handleChange, clearForm } = useForm(projectInfo);
  const { handleError } = useError();

  const [serviceList, setServiceList] = useState([{ serviceName: '', price: '', description: '' }]);
  inputs.services = [...serviceList];
  const params = useParams();

  // LISTS PREVIOS SERVICES ALREADY ADDED AND ADDS NEW SERVICES
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { serviceName: '', price: '', description: '' }]);
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
        clearForm();
        setServiceList([{ serviceName: '', price: '', description: '' }]);
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

  const pageHeadInfo = [
    {
      id: 1,
      titleOfPage: t('newProject'),
      threeDotButton: {
        button1: t('newProject'),
        onClickEvent: 'noation'
      }
    }
  ];

  return (
    <PageContainer>
      <PageHead pageHeadInfo={pageHeadInfo} />

      <FormContainer onSubmit={handleSubmitNewProject}>
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
              <Input
                form
                margin="0 0 1.8rem 0"
                label={t('newProjectStartDate')}
                type="date"
                name="startDate"
                onChange={handleChange}
                value={inputs.startDate}
                required
              />
              <Input
                form
                margin="0 0 1.8rem 0"
                label={t('newProjectEndDate')}
                type="date"
                name="dueDate"
                required
                onChange={handleChange}
                value={inputs.dueDate}
              />
            </div>
            <div className="right">
              <Input
                form
                margin="0 0 1.8rem 0"
                label={t('newProjectCompanyName')}
                name="companyName"
                placeholder="enter the name of the company"
                onChange={handleChange}
                value={inputs.companyName}
                required
              />
              <Input
                form
                margin="0 0 1.8rem 0"
                label="Website*"
                name="website"
                placeholder="enter a website"
                onChange={handleChange}
                value={inputs.website}
                required
              />
              <Input
                form
                margin="0 0 1.8rem 0"
                label={t('signUpBoxBillingInformationTaxNumber')}
                name="taxNumber"
                placeholder="enter a tax ID"
                onChange={handleChange}
                value={inputs.taxNumber}
              />
              <Input
                form
                margin="0 0 1.8rem 0"
                label={t('newProjectCDescription')}
                name="description"
                placeholder="enter a description"
                onChange={handleChange}
                value={inputs.description}
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
