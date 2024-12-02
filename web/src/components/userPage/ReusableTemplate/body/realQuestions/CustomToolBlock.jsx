import React from 'react';
import {IconButton} from "@mui/material";
import {DELETE_ICON_BASKET_URL, EDIT_ICON_URL, SAVE_ICON_URL, SHOW_FORM_LIST} from "../../../../../url/url";
import ActionButton from "../../AcctionBtn";

function CustomToolBlock(props) {

	const {
		classes,
		value, // целый объект вида {id: 1, name:'вопрос', ...}
		handleEditOnClick,
		handleDeleteOnClick,
		handleShowForms,
		showForms = false,
	} = props;
  return (
	  <div className={`d-flex justify-content-center ${classes}`}>

		  {
			  value.edit ? (
				  <ActionButton
					  classes="p-1"
					  onClick={handleEditOnClick}
					  imgSrc={SAVE_ICON_URL}
					  altText="Save icon"
				  />
			  ): (
				  <ActionButton
					  classes="p-1"
					  onClick={handleEditOnClick}
					  imgSrc={EDIT_ICON_URL}
					  altText="Edit icon"
				  />
			  )
		  }
		  <ActionButton
			  classes="p-1"
			  onClick={handleDeleteOnClick}
			  imgSrc={DELETE_ICON_BASKET_URL}
			  altText="Delete icon"
		  />
		  {
			  showForms && (
				  <ActionButton
					  imgSrc={SHOW_FORM_LIST}
					  onClick={handleShowForms}
					  altText="show image modal window"
				  />
			  )
		  }
  </div>
  );
}

export default CustomToolBlock;