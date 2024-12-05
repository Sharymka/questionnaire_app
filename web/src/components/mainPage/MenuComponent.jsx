import React, { useContext, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TemplateContext } from "../contexts/TemplateContext";
import ModalForm from "../userPage/Template/ModalForm";
import useActionsMenu from "../hooks/useActionsMenu";

function MenuComponent() {
    const {showMenu, handleOpenMenu, handleCloseMenu, menuItems } = useActionsMenu();

    return (
        <>
            {/* Иконка меню */}
            <IconButton aria-label="menu" onClick={handleOpenMenu}>
                <MenuIcon />
            </IconButton>

            {/* Выпадающее меню */}
            <Menu anchorEl={showMenu} open={Boolean(showMenu)} onClose={handleCloseMenu}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={item.action}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>

            {/* Модальное окно */}
            {/*<ModalForm*/}
            {/*    showModal={showModal}*/}
            {/*    showForm={showForm}*/}
            {/*    handleCloseForm={handleCloseForm}*/}
            {/*    handleCloseModal={handleCloseModal}*/}
            {/*/>*/}
        </>
    );
}

export default MenuComponent;
