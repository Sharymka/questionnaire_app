import React, {useContext} from 'react';
import CustomFormControlSelect from "../ReusableComponents/CustomFormControlSelect";
import {QuestionContext} from "../contexts/QuestionContext";
import {accessOptions} from '../../../const/const';

function AccessLevelSelector() {

  const { accessLevel, handleAccessLevel } = useContext(QuestionContext);

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