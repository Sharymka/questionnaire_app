import React  from 'react';
import CustomFormControlSelect from "./CustomFormControlSelect";
import {accessOptions} from '../../../const/const';

function AccessLevelSelector(props) {

  const { accessLevel, handleAccessLevel } =props;
  return (
      <CustomFormControlSelect
       value={accessLevel}
       onChange={handleAccessLevel}
       options={accessOptions}
       label='Уровень доступа'

      />
  );
}

export default AccessLevelSelector;