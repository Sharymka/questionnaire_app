import React, {useContext} from 'react';
import TitleTextField from "../Template/TextFields/TitleTextField";
import TopicSelector from "../Template/FormControlSelectors/TopicSelector";
import DescriptionTextField from "../Template/TextFields/DescriptionTextField";
import HeaderBlock from "../ReusableComponents/TemplateHead";
import AutocompleteTags from "../Template/AutocompleteTags";
import {TemplateContext} from "../Template/TemplateContext";

function TemplateHeader() {

    const {
        title,
        topic,
        description,
        selectedTags,
        setSelectedTags,
        handleTitle,
        handleTopic,
        handleDescription
    } =  useContext(TemplateContext);

  return (
          <HeaderBlock
              title={title}
              LeftComponent={<TitleTextField onChange={handleTitle} title={title}/>}
              RightComponent={<TopicSelector onChange={handleTopic} topic ={topic}/>}
              DescriptionComponent={<DescriptionTextField onChange={handleDescription} description={description}/>}
              TagsComponent={<AutocompleteTags setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>}
          />
  );
}

export default TemplateHeader;