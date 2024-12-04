import React, {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

function CustomAutoComplete(props) {

    const [inputValue, setInputValue] = useState('');
    const {
        value, //массив объектов вида: [{id: 1, first_name:'Ivan', last_name:'Ivanov'}]
        options, // массив объектов: [{ id: 2, label: "Технологии" }]
        label, // строка, например 'Теги'
        getOptionLabel, // строка, например "Здоровье"
        getTagChipLabel, // строка, например "Здоровье"
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
              //если вводим сами в интпуте значение тега, то в newSelectedOption попадает значение вида ['Веселье']
              // или из предложенных вариантов [{id: 1, label:'Наука'}]
              event.preventDefault();
              const selectedTag = newSelectedOption[newSelectedOption.length - 1];

              if (newSelectedOption.length === 0) {
                  if (deleteTag) {
                      value.forEach((tag) => deleteTag(tag.id));
                  }
                  return;
              }

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