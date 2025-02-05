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

    const addNewOption = (event) => {
        if (addNewOptionTag) setInputValue(event.target.value);
    }

    const handleChange = (event, selectedOptionArr = []) => {
        //если вводим сами в интпуте значение тега, то в newSelectedOption попадает значение вида ['Веселье']
        // или из предложенных вариантов [{id: 1, label:'Наука'}]

        event.preventDefault();
        const selectedTag = selectedOptionArr[selectedOptionArr?.length - 1];

        if (selectedOptionArr.length === 0) {
            deleteTag?.(value.map(tag => tag.id));
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

  return (
      <Autocomplete
          multiple
          freeSolo
          options={options}
          value={value}
          inputValue={inputValue}
          getOptionLabel={getOptionLabel}
          onInputChange={addNewOption}
          onChange={handleChange}
          renderTags={(value) =>
              value.map((option, index) => {
                return (
                    <Chip
                        key={option.id}
                        label={getTagChipLabel(option, sortBy)}
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