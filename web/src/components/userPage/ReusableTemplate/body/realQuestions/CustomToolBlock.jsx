import React from 'react';
import {IconButton} from "@mui/material";
import {DELETE_ICON_BASKET_URL, EDIT_ICON_URL, SAVE_ICON_URL} from "../../../../../url/url";
import ActionButton from "../../AcctionBtn";

function CustomToolBlock(props) {

	const {
		classes,
		question,
		handleEditOnClick,
		handleDeleteOnClick,
		showSaveIcon = true,
		anchor = false,
	} = props;
  return (
	  <div className={`d-flex justify-content-center ${classes}`}>

		  {
			  question.edit ? (
				  <ActionButton
					  classes="p-1"
					  onClick={() => handleEditOnClick(question.id)}
					  imgSrc={SAVE_ICON_URL}
					  altText="Save icon"
				  />
			  ): (
				  <ActionButton
					  classes="p-1"
					  onClick={() => handleEditOnClick(question.id)}
					  imgSrc={EDIT_ICON_URL}
					  altText="Edit icon"
				  />
			  )
		  }
		  <ActionButton
			  classes="p-1"
			  onClick={() => handleDeleteOnClick(question.id)}
			  imgSrc={DELETE_ICON_BASKET_URL}
			  altText="Delete icon"
		  />
  </div>
  );
}

export default CustomToolBlock;