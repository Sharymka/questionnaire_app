import React, {useContext} from 'react';
import CustomFormControlSelect from "../ReusableComponents/CustomFormControlSelect";
import {questionTopics} from "../../../const/const";
import {TemplateContext} from "../TemplateContext";

function TopicSelector() {

    const {handleTopic, topic} = useContext(TemplateContext);


  return (
      <CustomFormControlSelect
      name='Темы'
      value={topic}
      onChange={handleTopic}
      options={questionTopics}
      />
  );
}

export default TopicSelector;