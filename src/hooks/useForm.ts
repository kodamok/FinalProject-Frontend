import React, { useEffect, useState } from 'react';
import Compressor from 'compressorjs';

interface objectValues {
  [key: string]: any;
}

const initValue: objectValues = {};

export default function useForm(initial = initValue) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  interface ChangeEvent {
    value: string | number | File | any;
    name: string;
    type: string;
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value }: ChangeEvent = e.target as HTMLInputElement;
    const { name, type }: ChangeEvent = e.target as HTMLInputElement;

    if (type === 'number') {
      value = parseInt(value, 10);
    }
    if (type === 'file') {
      // setPreviewImage(window.URL.createObjectURL(inputs.image) as any);
      const { files }: any = e.target as HTMLInputElement;
      if (files.length === 1 && files[0].type.startsWith('image') && inputs.files !== null) {
        await new Compressor(files[0], {
          quality: 0.6,
          success(result: File | Blob) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = () => {
              value = reader.result;
              setInputs({
                ...inputs,
                [name]: value
              });
            };
          },
          error() {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
              value = reader.result;
              setInputs({
                ...inputs,
                [name]: value
              });
            };
          }
        });
      } else {
        // Read All Files (Multiple possible)
        const filteredFiles = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.startsWith('image')) {
            // eslint-disable-next-line no-new
            new Compressor(files[i], {
              quality: 0.6,
              success(result: File | Blob) {
                filteredFiles.push(result);
              },
              error() {
                filteredFiles.push(files[i]);
              }
            });
          } else {
            filteredFiles.push(files[i]);
          }
        }

        setInputs({
          ...inputs,
          [name]: filteredFiles
        });
      }
    }
    if (type !== 'file') {
      setInputs({
        // copy the existing state
        ...inputs,
        [name]: value
      });
    }
  }

  const handleSelect = (e: any, action: any) => {
    const obj = [];
    if (e?.length) {
      for (let i = 0; i < e.length; i++) {
        obj.push({ label: e[i].label, value: e[i].value });
      }
      setInputs({
        // copy the existing state
        ...inputs,
        [action.name]: obj
      });
    } else {
      setInputs({
        // copy the existing state
        ...inputs,
        [action.name]:
          e?.label === undefined || e?.value === undefined
            ? ''
            : { label: e?.label, value: e?.value }
      });
    }
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']));
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    handleSelect,
    setInputs
  };
}
