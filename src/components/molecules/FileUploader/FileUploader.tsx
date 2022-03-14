import React, { useContext } from 'react';
import styled from 'styled-components';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import useError from '../../../hooks/useError';
import { Context } from '../../../providers/GeneralProvider';

const Container = styled.form`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

interface FileUploaderInterface {
  files: any;
}

const initialValue: FileUploaderInterface = {
  files: null
};

interface File {
  projectId: string | undefined;
}

function FileUploader({ projectId }: File) {
  const { handleError } = useError();
  const { userData } = useContext(Context);
  const { inputs, handleChange } = useForm(initialValue);
  const handleUploadDocumentFile = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const arrOfFiles: any = Array.from(inputs.files);
    for (let i = 0; i < arrOfFiles.length; i++) {
      formData.append('files2', arrOfFiles[i]);
    }
    const uploadFiles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/uploadFile/project/${projectId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userData.token}`
            },
            body: formData
          }
        );
        const resJSON = await res.json();
        if (res.status === 200) {
          handleError(resJSON.message || 'You uploaded files correctly', true);
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        console.log('FETCHING ERROR', error);
        handleError();
      }
    };
    uploadFiles();
  };

  return (
    <Container>
      <InputWithLabel
        multiple
        type="file"
        /* label="File" */ name="files"
        onChange={handleChange}
      />
      <Button
        type="submit"
        text="Upload a File"
        onClick={handleUploadDocumentFile}
        height="50px"
        width="140px"
        fontSize="13px"
        padding="0.5rem 1rem"
      />
    </Container>
  );
}

export default FileUploader;
