import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomCheckBoxes from "./ReusableComponents/CustomCheckBoxes";
function CheckBoxes() {
  const {
      checkboxOptions,
      handleCheckboxes,
      handleAddCheckboxOption,
      handleDeleteCheckboxOption,
      handleCheckboxTextField,
  } =useContext(TemplateContext);

  return (
        <CustomCheckBoxes
            options={checkboxOptions}
            onChange={handleCheckboxes}
            addOptionOnClick={handleAddCheckboxOption}
            deleteOnClick={handleDeleteCheckboxOption}
            textFieldOnChange={handleCheckboxTextField}
            btnName='Добавить вариант'
        />
      );
}

export default CheckBoxes;