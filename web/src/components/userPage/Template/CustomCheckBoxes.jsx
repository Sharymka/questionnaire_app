import React, {useEffect} from 'react';
import {FormControlLabel, IconButton, Radio, RadioGroup, Typography} from "@mui/material";
import CustomTextField from "./CustomTextField";
import {DELETE_ICON_URL} from "../../../url/url";
import ActionButton from "./AcctionBtn";
import useDraggableWrapper from "../../hooks/useDraggableWrapper";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function CustomCheckBoxes(props) {

    // const { btnRef } =props;

  const {
      options,
      actions, // объект типа { checkboxOnChange: checkboxOnChange, ...}
      config,
      field, // поле 'answer'
      optionId = null,
      dragHandleProps
  } = props;

  const {
      checkboxOnChange,
      deleteOptionOnClick,
      textFieldOnChange
  } = actions;

    const withDraggable = useDraggableWrapper(config.checkboxMode, true);

    const handleChange = (event) => {
        if (typeof(checkboxOnChange) === 'function') {
            checkboxOnChange(event.target.value);
        } else {
            console.error('onChange is not a function:', checkboxOnChange);
        }
    };
  return (
      <div
      >
          <RadioGroup
              onChange={handleChange}
              // fullWidth
              sx={{
                  width: '100% !important',
              }}
          >
              {Array.isArray(options) && options?.map((option, index) => (
                  withDraggable(option, index, // <-- получаем provided
                      <div
                          key={index}
                          className='d-flex align-items-center mb-1'
                      >
                          <span className='me-2'>{index + 1}.</span>
                          {
                              config.checkboxMode === 'readOnly' && (
                                  <>
                                      <Typography>{option.value}</Typography>
                                  </>
                              )
                          }
                          {
                              config.checkboxMode === 'select' && (
                                  <>
                                      <FormControlLabel
                                          value={option.id}
                                          control={<Radio checked={option.selected}/>}
                                      />
                                      <Typography>{option.value}</Typography>
                                  </>
                              )
                          }
                          {
                              config.checkboxMode === 'edit' && (
                                  <>
                                      <CustomTextField
                                          value={{ checkbox: option.value }}
                                          onChange={textFieldOnChange}
                                          checkboxId={option.id}
                                      />
                                      <ActionButton
                                          onClick={() => deleteOptionOnClick(option.id)}
                                          altText="Удалить"
                                          imgSrc={DELETE_ICON_URL}
                                      />

                                      {/* Передаём dragHandleProps в IconButton */}
                                      <IconButton
                                          {...dragHandleProps}
                                          style={{ cursor: 'grab' }}
                                      >
                                          <DragIndicatorIcon/>
                                      </IconButton>
                                  </>
                              )
                          }
                      </div>
                  )
              ))}
          </RadioGroup>
      </div>

  );
}

export default CustomCheckBoxes;