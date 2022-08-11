import styled from "styled-components";
import { Link } from "react-router-dom";

interface SideBarNavProps {
    sideBar: boolean,
};

export const Nav = styled.div`
    background: #222324;
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const NavIcon = styled(Link)`
    margin-left: 1rem;
    font-size: 1rem;
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const SideBarNav = styled.nav<SideBarNavProps>`
    background: #222324;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sideBar }) => (sideBar ? '0%' : '-100%')};
    transition: 350ms;
    z-index: 1000;
`;

export const SidebarWrap = styled.div`
    width: 100%;
`;