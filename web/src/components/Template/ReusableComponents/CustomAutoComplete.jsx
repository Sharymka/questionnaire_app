import React from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

function CustomAutoComplete(props) {

const {
    value,
    customOptions,
    label,
    placeholder,
    handleValue,
    deleteTag,
    getOptionLabel,
    getTagLabel,
    sortBy,
} = props;

  return (
      <Autocomplete
          multiple
          className="d-flex diraction-row w-100"
          id="fixed-tags-demo"
          value={value}
          onChange={(event, newSelectedOption) => {
              handleValue(newSelectedOption)
          }}
          options={customOptions}
          getOptionLabel={getOptionLabel}

          renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                const {key, ...tagProps} = getTagProps({index});
                return (
                    <Chip
                        key={key}
                        label={getTagLabel(option, sortBy)}
                        {...tagProps}
                        onDelete={(event) => {
                            event.preventDefault();
                          deleteTag(option.id)
                        }}
                    />
                );
              })
          }
          style={{width: 500 }}
          renderInput={(params) => (
              <TextField {...params} label={label} placeholder={placeholder} />
          )}
      />
  );
}

export default CustomAutoComplete;