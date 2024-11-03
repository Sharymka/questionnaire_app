import React, {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

function CustomAutoComplete(props) {

    const [inputValue, setInputValue] = useState('');
    const {
        value,
        options,
        label,
        getOptionLabel,
        getTagChipLabel,
        addTags,
        addNewOptionTag,
        deleteTag,
        placeholder,
        sortBy='',
        variant="outlined",
    } = props;

  return (
      <Autocomplete
          multiple
          freeSolo
          className='fullWidth'
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {

              if (addNewOptionTag) {
                  setInputValue(newInputValue);
              }
          }}
          onChange={(event, newSelectedOption) => {
              //захватывает объект с введенным значением в input(состояние inputValue) или из предложенных вариантов
              //варианты ['Веселье'] или [{id: 1, label:'Наука'}]
              event.preventDefault();
              const selectedTag = newSelectedOption[newSelectedOption.length - 1];

                  if (typeof selectedTag === 'string') {
                      if(addNewOptionTag) {
                          addNewOptionTag(selectedTag);
                          addTags({id:options?.length + 1, label:selectedTag});
                      }
                      setInputValue('');
                  } else {
                      addTags(selectedTag);
                  }
              }
          }
          options={options}
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
                        label={getTagChipLabel(option, sortBy)}
                        {...tagProps}
                        onDelete={(event) => {
                            event.preventDefault();
                          deleteTag(option.id)
                        }}
                    />
                );
              })
          }
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