import React, {useContext} from 'react';
import {Button, FormControlLabel, IconButton, Radio, RadioGroup, TextField} from "@mui/material";
import {TemplateContext} from "./TemplateContext";
function CheckBoxes() {
  const {checkboxOptions, handleOptionChange,  handleOptionTextChange, handleAddOption, handleDeleteOption} =useContext(TemplateContext);

  return (<div>
    <RadioGroup onChange={handleOptionChange}>
      {checkboxOptions.map((option, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>

            <FormControlLabel
                value={option.value}
                control={<Radio checked={option.selected}/>}
                label=""
            />
            <TextField
                label=""
                fullWidth
                margin="normal"
                variant="standard"
                value={option.value}
                onChange={(event) => handleOptionTextChange(event, index)}
            />
            <IconButton onClick={() => handleDeleteOption(index)} aria-label="delete">
                <img style={{ maxWidth: '30px', maxHeight: '30px' }} src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728317879/delete-2-svgrepo-com_hbzopy.svg"
                     alt="Delete icon"/>
            </IconButton>
          </div>
      ))}

      <Button onClick={handleAddOption} variant="contained" style={{margin: '16px 0'}}>
        Добавить вариант
      </Button>
    </RadioGroup>
  </div>);
}

export default CheckBoxes;