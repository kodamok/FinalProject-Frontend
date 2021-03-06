import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const ContainerChildrens = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #e76f51;
  z-index: 100;
`;

const ContainerIcon = styled.div``;

interface Icon {
  icon: ReactElement;
  children: ReactNode;
}

function IconClickable({ icon, children }: Icon) {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: any) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <Container ref={ref}>
      <ContainerIcon onClick={handleOpen}>{icon}</ContainerIcon>
      {open && <ContainerChildrens onClick={handleClose}>{children}</ContainerChildrens>}
    </Container>
  );
}

export default IconClickable;
