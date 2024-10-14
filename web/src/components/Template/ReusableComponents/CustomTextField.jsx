import React from 'react';
import {TextField} from "@mui/material";

function CustomTextField(props) {
  const {
      label,
      classes,
      value,
      placeholder,
      onChange,
      variant,
      multiline =false,
      minRows='',
      maxRows='',
      rows='',

  } = props;
  return (
      <TextField
          className={classes}
          label={label}
          placeholder={placeholder}
          fullWidth
          margin="normal"
          variant={variant}
          value={value}
          onChange={(event) => onChange(event)}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          rows={rows}
      />
  );
}

export default CustomTextField;