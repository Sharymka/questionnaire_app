import React, {useContext} from 'react';
import CustomFormControlSelect from "../reusableSimpleComp/CustomFormControlSelect";
import {accessOptions} from '../../../../const/const';
import {TemplateContext} from "../../contexts/TemplateContext";


function AccessLevelSelector() {

  const { accessLevel, handleAccessLevel } = useContext(TemplateContext);

  return (
      <CustomFormControlSelect
        name='Уровень доступа'
        value={accessLevel}
        onChange={handleAccessLevel}
        options={accessOptions}
      />
  );
}

export default AccessLevelSelector;