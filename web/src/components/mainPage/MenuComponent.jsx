import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useActionsMenu from "../hooks/useActionsMenu";

function MenuComponent() {
    const { showMenu,
            handleOpenMenu,
            handleCloseMenu,
            menuItems
          } = useActionsMenu();

    return (
        <>
            <IconButton aria-label="menu" onClick={handleOpenMenu}>
                <MenuIcon />
            </IconButton>
            <Menu anchorEl={showMenu} open={Boolean(showMenu)} onClose={handleCloseMenu}>
                {menuItems?.map((item, index) => (
                    <MenuItem key={index} onClick={item.action}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default MenuComponent;
