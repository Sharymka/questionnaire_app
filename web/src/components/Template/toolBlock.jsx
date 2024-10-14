import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import {QuestionContext} from "./contexts/QuestionContext";

function ToolBlock(props) {

  const { handleEditorAnchor } = useContext(QuestionContext);

  return (<div className="d-flex justify-content-center toolBlockPosition">
    <IconButton
        sx={{
          padding: '1px'
        }}
        onClick={handleEditorAnchor}
        aria-label="edit"
    >
      <img
          style={{maxWidth: '25px', maxHeight: '25px'}}
          src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728643368/edit-2-svgrepo-com_zvrazo.svg"
          alt="Delete icon"
      />
    </IconButton>
    <IconButton
        sx={{
          padding: '1px'
        }}
        // onClick={() => handleDeleteOption(index)}
        aria-label="delete"
    >
      <img
          style={{maxWidth: '30px', maxHeight: '30px'}}
          src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728644862/delete-svgrepo-com_2_hucmdi.svg"
          alt="Delete icon"
      />
    </IconButton>
  </div>);
}

export default ToolBlock;