import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
/* import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel'; */
import Input from '../../atoms/Input/Input';
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
  border: 1px solid #e76f51;
  background: ${({ theme }) => theme.color.main2};
  padding: 0.1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 60px;
  width: 100%;
  z-index: 5;
  max-height: 500px;
  overflow: auto;
  & > p {
    padding: 0.6rem 0.8rem;
    color: ${({ theme }) => theme.color.main1};
    text-align: left;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.main9};
      /* border-bottom: ${({ theme }) => theme.color.main9}; */
    }

    &:hover {
      /* border-bottom: ${({ theme }) => `0.5px solid ${theme.color.main9}`}; */
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
      <Input
        margin="0px"
        width="500px"
        name="searchBar"
        value={inputs.searchBar}
        onChange={handleChange}
        placeholder="Search"
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
