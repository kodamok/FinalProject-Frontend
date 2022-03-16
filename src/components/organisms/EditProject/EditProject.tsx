import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CgPlayListAdd, CgRemove } from 'react-icons/cg';
import { BsImage } from 'react-icons/bs';
import { AiOutlineFileText } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import useForm from '../../../hooks/useForm';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import Button from '../../atoms/Button/Button';
import TitleWithLines from '../../atoms/TitleWithLines/TitleWithLines';
import RoundedPhoto from '../../atoms/RoundedPhoto/RoundedPhoto';

const Container = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
  > svg:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  > p {
    font-weight: 700;
  }
`;

const ContainerButton = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerServices = styled.div`
  display: flex;
  gap: 0.5rem;
  > div:first-child {
    width: max-content;
    display: flex;
    gap: 0.5rem;
    > div:first-child {
      width: 100%;
    }
    > div:nth-child(2) {
      width: 60%;
    }
  }
  > div:nth-child(2) {
    flex-basis: 100%;
  }
  > div:last-child {
    width: max-content;
  }
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    flex-direction: column;
    > div:first-child {
      width: auto;
      display: flex;
      gap: 0.5rem;
    }
    > div:nth-child(2) {
      width: 100%;
    }
  }
`;

const NumberServiceOnMobile = styled.div`
  display: none;
  transition: 0.3s;
  > p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
    color: purple;
  }
  > svg:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
`;

const ContainerIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 0.3rem;
  > * {
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    display: none;
  }
`;

const ContainerInputAndPhoto = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContainerUploadedImages = styled.div`
  display: flex;
  gap: 0.5rem;
  a {
    text-decoration: none;
    color: black;
  }
  > div {
    width: 100px;
    height: 100px;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    position: relative;
  }
  margin-bottom: 0.5rem;
`;

const ContainerUploadedFiles = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
  > div {
    width: 100px;
    height: 100px;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    position: relative;
  }
`;

const DeleteIcon = styled(MdDelete)`
  position: absolute;
  bottom: 0;
  right: 0;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

function EditProject() {
  const { projectId }: any = useParams();
  const [project, setProject]: any = useState({});
  const { userData } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { handleError } = useError();

  const fetchProject = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/projectOne/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log('This is Fetch', res);
      console.log(resJSON);
      if (res.status === 200) {
        setProject(resJSON);
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

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmitEditProject = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoadingSubmit(true);
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },
        body: JSON.stringify(inputs)
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (res.status === 200) {
        handleError(resJSON.message, true);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  interface initial {
    _id: string;
    avatar: File | string | null | undefined;
    companyName: string;
    clientName: string;
    websiteName: string;
    taxNumber: string;
    startDate: string;
    dueDate: string;
    services: any;
    images: any;
    files: any;
  }

  const initialValues: initial = {
    _id: project?._id,
    avatar: project?.avatar || '',
    companyName: project?.companyName || '',
    clientName: project?.clientName || '',
    websiteName: project?.websiteName || '',
    taxNumber: project?.taxNumber || '',
    startDate: project?.startDate || '',
    dueDate: project?.dueDate || '',
    services: project?.services?.length
      ? project?.services
      : [{ description: '', price: '', serviceName: '' }],
    images: project?.images || [],
    files: project?.files || []
  };

  const { inputs, handleChange, setInputs } = useForm(initialValues);

  const data = [
    {
      label: 'Company Name',
      name: 'companyName'
    },
    {
      label: 'Client Name',
      name: 'clientName'
    },
    {
      label: 'Website Name',
      name: 'websiteName'
    },
    {
      label: 'Tax Number',
      name: 'taxNumber'
    },
    {
      label: 'Start Date',
      name: 'startDate',
      type: 'date'
    },
    {
      label: 'Due Date',
      name: 'dueDate',
      type: 'date'
    }
  ];

  const handleServiceChange = (e: InputEvent, i: number) => {
    const { value, name }: any = e.target as HTMLInputElement;
    inputs.services[i] = { ...inputs.services[i], [name]: value };
    setInputs({ ...inputs });
  };

  const handleServiceRemove = (i: number) => {
    inputs.services.splice(i, 1);
    setInputs({ ...inputs });
  };

  const handleServiceAdd = (i: number) => {
    inputs.services.splice(i + 1, 0, { description: '', price: '', serviceName: '' });
    setInputs({ ...inputs });
  };

  const handleServiceAddFirst = () => {
    setInputs({ ...inputs, services: [{ description: '', price: '', serviceName: '' }] });
  };

  const handleRemoveImage = (_e: any, i: number) => {
    inputs.images.splice(i, 1);
    setInputs({ ...inputs });
  };

  const handleRemoveFile = (_e: any, i: number) => {
    inputs.files.splice(i, 1);
    setInputs({ ...inputs });
  };

  if (isLoading) return <LoadingSpin />;
  return (
    <Container onSubmit={handleSubmitEditProject}>
      <TitleWithLines text="Edit Project" />
      {data.map((item: any) => (
        <InputWithLabel
          key={item._id}
          label={item.label}
          name={item.name}
          onChange={handleChange}
          value={inputs[item.name]}
          type={item.type}
          required={item.required}
        />
      ))}
      {inputs.services.map((_item: any, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <NumberServiceOnMobile>
            <p>Service {i + 1}</p>
            <CgRemove size={20} onClick={() => handleServiceRemove(i)} />
            <CgPlayListAdd size={30} onClick={() => handleServiceAdd(i)} />
          </NumberServiceOnMobile>
          <ContainerServices>
            <div>
              <InputWithLabel
                label="Service Name"
                name="serviceName"
                value={inputs?.services[i]?.serviceName}
                onChange={(e: any) => handleServiceChange(e, i)}
              />
              <InputWithLabel
                label="Price"
                name="price"
                value={inputs?.services[i]?.price}
                onChange={(e: any) => handleServiceChange(e, i)}
                type="number"
              />
            </div>
            <InputWithLabel
              label="Description"
              name="description"
              value={inputs?.services[i]?.description}
              onChange={(e: any) => handleServiceChange(e, i)}
            />
            <ContainerIcons>
              <CgRemove size={20} onClick={() => handleServiceRemove(i)} />
              <CgPlayListAdd size={30} onClick={() => handleServiceAdd(i)} />
            </ContainerIcons>
          </ContainerServices>
        </div>
      ))}
      {!inputs.services.length && <CgPlayListAdd size={30} onClick={handleServiceAddFirst} />}
      <ContainerInputAndPhoto>
        <InputWithLabel label="Avatar" name="avatar" onChange={handleChange} type="file" />
        <RoundedPhoto img={inputs.avatar || ''} alt="avatar" />
      </ContainerInputAndPhoto>
      <p>Images</p>
      <ContainerUploadedImages>
        {inputs.images.length > 0 &&
          inputs.images.map((item: any, i: number) => (
            <div key={item.key}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <BsImage fontSize={36} />
              </a>
              <DeleteIcon fontSize={22} onClick={(e: any) => handleRemoveImage(e, i)} />
            </div>
          ))}
      </ContainerUploadedImages>
      <p>Files</p>
      <ContainerUploadedFiles>
        {inputs.files.length > 0 &&
          inputs.files.map((item: any, i: number) => (
            <div key={item.key}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <AiOutlineFileText fontSize={40} />
              </a>
              <DeleteIcon fontSize={22} onClick={(e: any) => handleRemoveFile(e, i)} />
            </div>
          ))}
      </ContainerUploadedFiles>
      {/* <p>Files/Images Upload</p> */}
      {/* <FileUploader projectId={projectId} /> */}
      <ContainerButton>
        <Button type="submit" text={isLoadingSubmit ? 'Loading...' : 'Edit Project'} />
      </ContainerButton>
    </Container>
  );
}

export default EditProject;
