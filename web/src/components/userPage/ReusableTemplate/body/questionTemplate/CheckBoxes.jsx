import React, {useContext} from 'react';
import {TemplateContext} from "../../../contexts/TemplateContext";
import CustomCheckBoxes from "../../reusableSimpleComp/CustomCheckBoxes";
function CheckBoxes(props) {

    const { btnRef } = props;
  const {
      checkboxes,
      handleCheckboxes,
      handleAddCheckboxOption,
      handleDeleteCheckboxOption,
      handleCheckboxTextField,
  } =useContext(TemplateContext);

  return (
        <CustomCheckBoxes
            btnRef={btnRef}
            options={checkboxes}
            onChange={handleCheckboxes}
            addOptionOnClick={handleAddCheckboxOption}
            deleteOnClick={handleDeleteCheckboxOption}
            textFieldOnChange={handleCheckboxTextField}
        />
      );
}

export default CheckBoxes;