import { styled } from "styled-components";
import React from "react";
import SidebarImg from "../assets/sidebar_logo.svg";
import CompnayLogo from "../assets/invoices_logo.svg";
import Moon from "../assets/moon.svg";
import Dude from "../assets/dude.png";
import { useNavigate } from "react-router-dom";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #373b53;
  width: 10.3rem;
  height: 100vh;
  border-radius: 0 20px 20px 0;
`;

const StyledSidebarGraphic = styled.img`
  position: relative;
`;

const StyledCompanyLogo = styled.img`
  position: absolute;
  top: 3.2rem;
  left: 3.2rem;
`;

const StyledSidebarProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledThemeSwitcher = styled.img``;

const StyledProfileContainer = styled.div`
  height: 9.8rem;
  width: 100%;
  border-top: 1px solid #494e6e;
  width: 100%;
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  height: 4rem;
  width: 4rem;
  cursor: pointer;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <StyledSidebar>
      <div>
        <StyledSidebarGraphic src={SidebarImg} />
        <StyledCompanyLogo src={CompnayLogo} />
      </div>
      <StyledSidebarProfile>
        <StyledThemeSwitcher src={Moon} />
        <StyledProfileContainer>
          <ProfileImg
            src={Dude}
            alt="Dude Img"
            onClick={() => {
              navigate("/login");
            }}
          />
        </StyledProfileContainer>
      </StyledSidebarProfile>
    </StyledSidebar>
  );
};

export default Sidebar;
