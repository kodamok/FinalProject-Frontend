import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div``;

function EditProject() {
  const { projectId } = useParams();
  console.log(projectId);
  return <Container>Edit</Container>;
}

export default EditProject;
