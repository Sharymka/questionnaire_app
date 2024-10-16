import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import {TemplateContext} from "./TemplateContext";
import {DELETE_ICON_BASKET_URL, EDIT_ICON_URL, SAVE_ICON_URL} from "../../url/url";

function ToolBlock(props) {

    const { questionIndex } = props;

  const { handleEditorAnchor, handleDeleteQuestion, editorAnchor } = useContext(TemplateContext);

  return (<div className="d-flex justify-content-center toolBlockPosition">
    <IconButton
        className="p-1"
        onClick={() => handleEditorAnchor(questionIndex)}
        aria-label="edit"
    >
        {
            editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue ? (
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
          onClick={() => handleDeleteQuestion(questionIndex)}
          aria-label="delete"
      >
          <img
              style={{maxWidth: '30px', maxHeight: '30px'}}
          src={DELETE_ICON_BASKET_URL}
          alt="Delete icon"
      />
    </IconButton>
  </div>);
}

export default ToolBlock;