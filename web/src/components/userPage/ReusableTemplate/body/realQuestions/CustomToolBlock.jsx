import React from 'react';
import {IconButton} from "@mui/material";
import {DELETE_ICON_BASKET_URL, EDIT_ICON_URL, SAVE_ICON_URL} from "../../../../../url/url";

function CustomToolBlock(props) {

	const {
		classes,
		valueIndex,
		onEditOrSaveOnClick,
		onDeleteClick,
		showSaveIcon = true,
		anchor = false,
	} = props;
  return (
	  <div className={`d-flex justify-content-center ${classes}`}>
	  <IconButton
		  className="p-1"
		  onClick={() => onEditOrSaveOnClick(valueIndex)}
		  aria-label="edit"
	  >
		  {
			  anchor && showSaveIcon? (
				  <img style={{maxWidth: '22px', maxHeight: '25px'}}
				       src={SAVE_ICON_URL}
				       alt="Save icon"
				  />
			  ): (
				  <img
					  style={{maxWidth: '25px', maxHeight: '25px'}}
					  src={EDIT_ICON_URL}
					  alt="Delete icon"
				  />
			  )
		  }
	  </IconButton>
	  <IconButton
		  className="p-1"
		  onClick={() => onDeleteClick(valueIndex)}
		  aria-label="delete"
	  >
		  <img
			  style={{maxWidth: '30px', maxHeight: '30px'}}
			  src={DELETE_ICON_BASKET_URL}
			  alt="Delete icon"
		  />
	  </IconButton>
  </div>
  );
}

export default CustomToolBlock;