import React, { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Nav,
         NavIcon,
         SideBarNav,
         SidebarWrap,
         Lista,
         HeaderTitle,
} from "./styles";
import { SideBarItem } from "../SideBarItem/SideBarItem";
import { LinkMenu } from "../../@types/menu";
import { useMenu } from "../../context/menuContext";
import { useLocation } from "react-router-dom";
import useMenuStore from "../../stores/menuStore";

export const SideBar: React.FC = () => {
    const [sideBar, setSideBar] = useState(false);
    const { menuNome, fetechedMenu } = useMenu();
    const showSideBar = () => setSideBar(!sideBar);
    const { pathname } = useLocation();
   
    let LinksTratados: LinkMenu[] = [];

    const buildChildrenLinks = (linkPai: LinkMenu, linkList: LinkMenu[]) => {
        const indexLinkPai = linkList.findIndex((link => link.pai_id === linkPai.id));
        const linkFilhosRetorno: LinkMenu[] = [];
        if (indexLinkPai !== 1) {
            linkList.forEach((link, index) => {
                if (link.pai_id === linkPai.id) {
                    link.filhos = buildChildrenLinks(link, linkList);
                    linkFilhosRetorno.push(link);
                };
            });
        };
        return linkFilhosRetorno;
    };

    
    fetechedMenu?.forEach((link, index) => {
        link.filhos = buildChildrenLinks(link, fetechedMenu);
        LinksTratados.push(link);
    });

    LinksTratados = LinksTratados.filter(link => link.pai_id === null);

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav>
                    <NavIcon to='#'>
                        <FaIcons.FaBars onClick={showSideBar} />
                    </NavIcon>
                    <HeaderTitle>{menuNome}</HeaderTitle>
                </Nav>
                <SideBarNav sideBar={sideBar}> 
                    <SidebarWrap>
                        {/* {sideBar && <BlackHole onClick={showSideBar}/>} */}
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSideBar} />
                        </NavIcon>
                        <Lista>
                            {LinksTratados && LinksTratados?.map((item, index) => (
                                    <SideBarItem
                                        key={index}
                                        id={item.id}
                                        nome={item.nome}
                                        icone={item.icone}
                                        rota={item.rota}
                                        pai_id={item.pai_id}
                                        filhos={item.filhos ?? item.filhos}
                                        possuifilhos={item.possuifilhos}
                                        />
                                    )
                                )
                            }
                        </Lista>
                    </SidebarWrap>
                </SideBarNav>
            </IconContext.Provider>
            {/* {sideBar && <BlackHole onClick={showSideBar}/>} */}
        </>
    )
};