import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomCheckBoxes from "./ReusableComponents/CustomCheckBoxes";
function CheckBoxes() {
  const {checkboxOptions, handleOptionChange,  handleOptionTextChange, handleAddOption, handleDeleteOption} =useContext(TemplateContext);

  return (
      <div>
        <CustomCheckBoxes
            options={checkboxOptions}
            onChange={handleOptionChange}
            textFieldOnChange={handleOptionTextChange}
            deleteOnClick={handleDeleteOption}
            addOptionOnClick={handleAddOption}
            btnName='Добавить вариант'
        />
      </div>);
}

export default CheckBoxes;