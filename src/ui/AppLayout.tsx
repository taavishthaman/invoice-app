import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: var(--11, #f8f8fb);
  overflow: hidden;
`;

const Container = styled.div`
  width: 73rem;
  margin-top: 2rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
