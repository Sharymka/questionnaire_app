import React from 'react';
import CustomFormControlSelect from "../../ReusableComponents/CustomFormControlSelect";
import {questionTopics} from "../../../const/const";

function TopicSelector(props) {

    const { onChange, topic } = props;

  return (
      <CustomFormControlSelect
      name="Темы"
      value={topic}
      onChange={onChange}
      options={questionTopics}
      variant="standard"
      />
  );
}

export default TopicSelector;