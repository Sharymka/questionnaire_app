import React, {useContext} from 'react';
import TitleTextField from "../Template/TextFields/TitleTextField";
import TopicSelector from "../Template/FormControlSelectors/TopicSelector";
import DescriptionTextField from "../Template/TextFields/DescriptionTextField";
import {TemplateContext} from "../Template/TemplateContext";
import HeaderBlock from "../ReusableComponents/TemplateHead";

function TemplateHeader() {

    const {title, topic, description, handleTitle, handleTopic, handleDescription } = useContext(TemplateContext);

  return (
      <HeaderBlock
          title={title}
          LeftComponent={<TitleTextField onChange={handleTitle} title={title}/>}
          RightComponent={<TopicSelector onChange={handleTopic} topic ={topic}/>}
          DescriptionComponent={<DescriptionTextField onChange={handleDescription} descrition ={description}/>}
      />
  );
}

export default TemplateHeader;