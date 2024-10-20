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
          inputValue={inputValue} // Передаем текущее значение ввода
          onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
          }}
          onChange={(event, newSelectedOption) => {
              event.preventDefault();
              console.log("onChange");
              console.log(newSelectedOption);
              if (typeof newSelectedOption[newSelectedOption.length - 1] === 'string') {
                  const newTag = newSelectedOption[newSelectedOption.length - 1];
                  addNewOption(newTag);
                  handleValue(Array.of({id:customOptions.length + 1, label:newTag}));
                  setInputValue(''); // сбрасываем inputValue после добавления
              } else {
                  // Если выбран существующий элемент, просто обновляем состояние
                  // setTagValue(newSelectedOption);
                  handleValue(newSelectedOption);
              }
              // handleValue(newSelectedOption)
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
                  // onChange={(event)=> textOnChange(event)}
              />
          )}
      />
  );
}

export default CustomAutoComplete;