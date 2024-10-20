import React, {useContext} from 'react';
import {Button, FormControlLabel, IconButton, Radio, RadioGroup} from "@mui/material";
import CustomTextField from "./CustomTextField";
import {DELETE_ICON_URL} from "../../../../url/url";
import {TemplateContext} from "../../contexts/TemplateContext";

function CustomCheckBoxes(props) {

    const { editorAnchor } = useContext(TemplateContext);

  const {
        onChange,
        options,
        textFieldOnChange,
        deleteOnClick,
        addOptionOnClick,
        btnName
  } = props;

  return (
      <RadioGroup
          onChange={onChange}
      >
        {options.map((option, index) => (
            <div
                key={index}
                className='d-flex align-items-center mb-1'
              >
              <span className='me-2' >{index + 1}.</span>
              <FormControlLabel
                  value={option.value}
                  control={<Radio checked={option.selected}/>}
                  label=""
              />
              <CustomTextField
                  label=''
                  variant="standard"
                  value={option.value}
                  onChange={(event) => textFieldOnChange(event, index)}
              />
              <IconButton onClick={() => deleteOnClick(index)} aria-label="delete">
                <img
                    className='block_size_max_20_20'
                    src={DELETE_ICON_URL}
                    alt="Delete icon"
                />
              </IconButton>
            </div>
        ))}
          {

              <Button className='p-3 btn-primary btn-block'
                      onClick={addOptionOnClick}
                      variant="contained"
              >
                  {btnName}
              </Button>

          }

      </RadioGroup>
  );
}

export default CustomCheckBoxes;