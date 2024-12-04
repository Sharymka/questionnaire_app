import React from 'react';
import { FormControlLabel, IconButton, Radio, RadioGroup} from "@mui/material";
import CustomTextField from "./CustomTextField";
import {DELETE_ICON_URL} from "../../../url/url";
import ActionButton from "./AcctionBtn";

function CustomCheckBoxes(props) {

    // const { btnRef } =props;

  const {
      options,
      actions, // объект типа { checkboxOnChange: checkboxOnChange, ...}
      field ='',
      optionId = null
      // textFieldOnChange,
        // deleteOnClick,
      // onChange,
  } = props;

  const {
      checkboxOnChange,
      deleteOptionOnClick,
      textFieldOnChange
  } = actions;

    const handleChange = (event) => {
        if (typeof checkboxOnChange === 'function') {
            checkboxOnChange(event.target.value);
            // if (optionId !== null) {
            //     checkboxOnChange(event.target.value, optionId);
            // } else if (field) {
            //     checkboxOnChange(event.target.value, field);
            // }  else {

            // }
        } else {
            console.error('onChange is not a function:', checkboxOnChange);
        }
    };
  return (
      <RadioGroup
          onChange={handleChange}
          // fullWidth
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
                  value={{checkbox: option.value}}
                  onChange={textFieldOnChange}
                  // btnRef={btnRef}
                  checkboxId={option.id}
              />
                <ActionButton
                    onClick={() => deleteOptionOnClick(option.id)}
                    altText="Удалить"
                    imgSrc={DELETE_ICON_URL}
                />
              {/*<IconButton onClick={() => deleteOnClick(option.id)} aria-label="delete">*/}
              {/*  <img*/}
              {/*      className='block_size_max_20_20'*/}
              {/*      src={DELETE_ICON_URL}*/}
              {/*      alt="Delete icon"*/}
              {/*  />*/}
              {/*</IconButton>*/}
            </div>
        ))}
      </RadioGroup>
  );
}

export default CustomCheckBoxes;