import React, {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

function CustomAutoComplete(props) {

    const [inputValue, setInputValue] = useState('');
const {
    value,
    customOptions,
    label,
    placeholder,
    handleValue,
    addNewOption,
    deleteTag,
    getOptionLabel,
    getTagLabel,
    sortBy,
    variant="outlined",
} = props;

  return (
      <Autocomplete
          multiple
          freeSolo
          className="w-100"
          id="fixed-tags-demo"
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
              if (addNewOption) {
                  setInputValue(newInputValue);
              }
          }}
          onChange={(event, newSelectedOption) => {
              event.preventDefault();
              if(newSelectedOption) {
                  if (typeof newSelectedOption[newSelectedOption?.length - 1] === 'string') {
                      const newTag = newSelectedOption[newSelectedOption?.length - 1];
                      if(addNewOption) {
                          addNewOption(newTag);
                          handleValue(Array.of({id:customOptions?.length + 1, label:newTag}));
                      }
                      setInputValue('');
                  } else {
                      handleValue(newSelectedOption);
                  }
              }
          }}
          options={customOptions}
          getOptionLabel={getOptionLabel}

          renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                const {key, ...tagProps} = getTagProps({index});
                return (
                    <Chip
                        sx={{
                            marginBottom: variant === "standard" ? '8px!important' : '0px'
                        }}
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
              <TextField
                  {...params}
                  variant={variant}
                  label={label}
                  placeholder={placeholder}
              />
          )}
      />
  );
}

export default CustomAutoComplete;