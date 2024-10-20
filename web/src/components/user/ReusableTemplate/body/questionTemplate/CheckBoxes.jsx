import React, {useContext} from 'react';
import {TemplateContext} from "../../../contexts/TemplateContext";
import CustomCheckBoxes from "../../reusableSimpleComp/CustomCheckBoxes";
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