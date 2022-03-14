import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import useForm from '../../../hooks/useForm';
import { Context } from '../../../providers/GeneralProvider';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ContainerFilteredList = styled.div`
  background: ${({ theme }) => theme.color.main8};
  border: 2px solid black;
  border-radius: 0.6rem;
  padding: 0.5rem;
  width: 120%;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  top: 96px;
  left: 0;
  z-index: 5;
  max-height: 500px;
  overflow: auto;
  > p {
    padding: 0.6rem 0.8rem;
    border-radius: 0.4rem;
    color: black;
    text-align: center;
    &:hover {
      background: black;
      color: white;
      cursor: pointer;
    }
  }
`;

function SearchBar() {
  const { handleChange, inputs, clearForm } = useForm();
  const { clientsGlobal } = useContext(Context);
  const navigate = useNavigate();
  const handleNavigateToClient = (id: string) => {
    navigate(`/client/${id}`);
    clearForm();
  };
  const ref = useRef(null);
  useOnClickOutside(ref, clearForm);
  return (
    <Container ref={ref}>
      <InputWithLabel
        name="searchBar"
        value={inputs.searchBar}
        onChange={handleChange}
        placeholder="Search"
        border="none"
      />
      {clientsGlobal && inputs.searchBar && (
        <ContainerFilteredList>
          {clientsGlobal.filter((item: any) =>
            item.name.toLowerCase().includes(inputs.searchBar.toLowerCase())
          ).length < 1 && <p>No results</p>}
          {clientsGlobal
            .filter((item: any) => item.name.toLowerCase().includes(inputs.searchBar.toLowerCase()))
            .map((item: any) => (
              <p onClick={() => handleNavigateToClient(item._id)}>{item.name}</p>
            ))}
        </ContainerFilteredList>
      )}
      {inputs.searchBar === '.' && (
        <ContainerFilteredList>
          {clientsGlobal.map((item: any) => (
            <p onClick={() => handleNavigateToClient(item._id)}>{item.name}</p>
          ))}
        </ContainerFilteredList>
      )}
    </Container>
  );
}

export default SearchBar;
