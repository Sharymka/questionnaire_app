import React from 'react';
import { FormControlLabel, IconButton, Radio, RadioGroup} from "@mui/material";
import CustomTextField from "./CustomTextField";
import {DELETE_ICON_URL} from "../../../../url/url";

function CustomCheckBoxes(props) {

    const { btnRef } =props;

  const {
        onChange,
        options,
        textFieldOnChange,
        deleteOnClick,
  } = props;

  return (
      <RadioGroup
          onChange={onChange}
          sx={{
            width: '100% !important',
          }}
      >
        {options?.map((option, index) => (
            <div
                key={index}
                className=' justify-content-between d-flex align-items-center mb-1'
              >
              <span className='me-2' >{index + 1}.</span>
              <FormControlLabel
                  value={option.id}
                  control={<Radio checked={option.selected}/>}
              />
              <CustomTextField
                  btnRef={btnRef}
                  optionId={option.id}
                  variant="standard"
                  value={option.value}
                  onChange={textFieldOnChange}
              />
              <IconButton onClick={() => deleteOnClick(option.id)} aria-label="delete">
                <img
                    className='block_size_max_20_20'
                    src={DELETE_ICON_URL}
                    alt="Delete icon"
                />
              </IconButton>
            </div>
        ))}
      </RadioGroup>
  );
}

export default CustomCheckBoxes;