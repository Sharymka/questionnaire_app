import React, {useContext} from 'react';
import {IconButton, Menu} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {TemplateContext} from "../../userPage/contexts/TemplateContext";

function MenuComponent(props) {

  const { setShowAllTemplates } = useContext(TemplateContext);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }


  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
	  <>
        <IconButton aria-label="menu" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          <MenuItem
              onClick={()=> {
                  handleClose()
                  setShowAllTemplates(true)
          }}
          >Все шаблоны
          </MenuItem>
            <MenuItem
                className="card-footer"
                onClick={()=> {
                    setShowAllTemplates(false);
                }}
            >Назад
            </MenuItem>

          {/*<MenuItem*/}
          {/*    // onClick={handleClose}*/}
          {/*>Мои формы<*/}
          {/*/MenuItem>*/}
        </Menu>
      </>
  );
}

export default MenuComponent;