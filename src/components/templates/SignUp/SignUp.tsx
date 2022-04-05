import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';
import { googleLoginUrl } from '../../../helpers/googleLoginUrl';
import Input from '../../atoms/Input/Input';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 1rem;
  h3,
  h4 {
    text-align: left;
    margin: 1rem 0 0 0;
  }
  h3:first-child {
    text-align: center;
    max-width: 250px;
    ${({ theme }) => theme.up(theme.breakpoint.m)} {
      max-width: 500px;
    }
  }
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    h4 {
      margin-bottom: 1rem;
    }
  }
`;

export const InputFileStyle = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  &:hover {
    cursor: pointer;
    outline: 3px solid black;
  }
`;

const ContainerDiv = styled.div`
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    background: ${({ theme }) => theme.color.main1};
    display: flex;
    gap: 3rem;
    padding: 2rem 3rem;
    min-height: 500px;
    border: 2px solid black;
    box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
    border-radius: 0.6rem;
  }
`;

// const ParagraphAdd = styled.div`
//   display: none;
//   ${({ theme }) => theme.up(theme.breakpoint.m)} {
//     display: block;
//   }
// `;

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const HeadingAdd = styled.div`
  display: none;
  ${({ theme }) => theme.up(theme.breakpoint.m)} {
    display: flex;
    justify-content: flex-start;
  }
`;
const DivOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;
const DivTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 350px;
`;
const DivThree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 350px;
`;

interface FormSignUp {
  name: string;
  email: string;
  password: string;
  taxNumber: string;
  identityCardNumber: string | undefined;
  image: File | string | null;
}

const initialValue: FormSignUp = {
  name: '',
  email: '',
  password: '',
  taxNumber: '',
  identityCardNumber: '',
  image: ''
};

function SignUp() {
  const { handleError } = useError();
  const [isLoading, setIsLoading] = useState(false);
  const { handleChange, inputs, clearForm } = useForm(initialValue);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const signup = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
        });
        const resJSON = await res.json();

        if (res.status === 201) {
          handleError(
            resJSON.message || 'You created account correctly, now verify your email',
            true
          );
          clearForm();
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        handleError();
      } finally {
        setIsLoading(false);
      }
    };
    signup();
  };
  const { t } = useTranslation();
  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <h3>{t('signUpNewAccount')}</h3>
        <div>
          <a href={googleLoginUrl}>
            <Button text="Login with Google" icon={<FcGoogle />} padding="1.3rem 1rem" />
          </a>
        </div>
        <h3>{t('signUpOr')}</h3>
        <ContainerDiv>
          <DivOne>
            <div>
              <HeadingAdd>
                <h4>{t('signUpBoxUserDetails')}</h4>
              </HeadingAdd>
              <RoundedPhoto img={inputs.image || ''} alt="face" width="250px" height="250px" />
            </div>
            <ContainerButton>
              <Button background="#1F313E" text={t('signUpBoxPhoto')} />
              <InputFileStyle name="image" type="file" onChange={handleChange} />
            </ContainerButton>
          </DivOne>
          <DivTwo>
            <div>
              <h4>{t('signUpBoxContactInformation')}</h4>
              <Input
                label="Name*"
                name="name"
                placeholder="Give your Name"
                onChange={handleChange}
                value={inputs.name}
                required
              />

              <Input
                label="Email*"
                name="email"
                type="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              <Input
                label={`${t('signUpBoxContactInformationPassword')}*`}
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
            </div>
          </DivTwo>
          <DivThree>
            <div>
              <h4>{t('signUpBoxBillingInformation')}</h4>
              <Input
                label={`${t('signUpBoxBillingInformationPassport')}`}
                name="identityCardNumber"
                value={inputs.identityCardNumber}
                onChange={handleChange}
              />
              <Input
                label={`${t('signUpBoxBillingInformationTaxNumber')}`}
                name="taxNumber"
                onChange={handleChange}
                value={inputs.taxNumber}
              />
              {/* <ParagraphAdd> */}
              {/*   <p>Lorem isi corrupti voluptatibus?</p> */}
              {/* </ParagraphAdd> */}
            </div>
            <ContainerButton>
              <Button
                type="submit"
                background="#9e0059"
                text={isLoading ? 'Loading...' : 'Create Account'}
              />
            </ContainerButton>
          </DivThree>
        </ContainerDiv>
      </div>
    </FormContainer>
  );
}

export default SignUp;
