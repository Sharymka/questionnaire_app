import React  from 'react';
import CustomFormControlSelect from "../reusableSimpleComp/CustomFormControlSelect";
import {accessOptions} from '../../../../const/const';

function AccessLevelSelector(props) {

  const { accessLevel, handleAccessLevel } =props;
  return (
      <CustomFormControlSelect
        data-context="AccessLevelSelector"
        name='Уровень доступа'
        value={accessLevel}
        onChange={handleAccessLevel}
        options={accessOptions}
      />
  );
}

export default AccessLevelSelector;