import React, {useContext, useState} from 'react';
import {IconButton, Menu} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {TemplateContext} from "../contexts/TemplateContext";
import ModalForm from "../userPage/Template/ModalForm";

function MenuComponent(props) {

  const { setShowAllTemplates } = useContext(TemplateContext);
  const [showMenu, setShowMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);


  const handleOpenMenu = (event) => {
      setShowMenu(event.currentTarget);
  }


  const handleCloseMenu = () => {
      setShowMenu(null)
  }


    const handleOpenModal = (event) => {
        setShowModal(true);
        handleOpenForm()
        handleCloseMenu();
    };
    const handleCloseModal = () => {
        setShowModal(null); // Закрываем модальное окно
    };

    const handleOpenForm= () => {
        setShowForm(true);
    }
    const handleCloseForm = () => {
        setShowForm(false);
    }

  return (
	  <>
        <IconButton aria-label="menu" onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
            anchorEl={showMenu}
            open={Boolean(showMenu)}
            onClose={handleCloseMenu}
        >
          <MenuItem
              onClick={()=> {
                  handleCloseMenu()
                  setShowAllTemplates(true)
          }}
          >Все шаблоны
          </MenuItem>
            <MenuItem
                onClick={()=> {
                    handleCloseMenu()
                    handleOpenModal()
                }}
            >SaleForce
            </MenuItem>
            <MenuItem
                className="card-footer"
                onClick={()=> {
                    setShowAllTemplates(false);
                }}
            >Назад
            </MenuItem>
        </Menu>
          <ModalForm
              showModal={showModal}
              showForm={showForm}
              handleCloseForm={handleCloseForm}
              handleCloseModal={handleCloseModal}
          />
      </>
  );
}

export default MenuComponent;