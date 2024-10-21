import React, {useContext} from 'react';
import TitleTextField from "../reusableSimpleComp/TitleTextField";
import TopicSelector from "../reusableSimpleComp/TopicSelector";
import DescriptionTextField from "../reusableSimpleComp/DescriptionTextField";
import HeaderBlock from "./HeaderBlock";
import AutocompleteTags from "../reusableSimpleComp/AutocompleteTags";
import {TemplateContext} from "../../contexts/TemplateContext";

function TemplateHeader(props) {

    const { headerName } = props;

    const {
        title,
        topic,
        description,
        selectedTags,
        setSelectedTags,
        handleTopic,
        setDescription,
        setTitle,
    } =  useContext(TemplateContext);

  return (
          <HeaderBlock
              headerName={headerName}
              title={title}
              LeftComponent={<TitleTextField onChange={setTitle} title={title}/>}
              RightComponent={<TopicSelector onChange={handleTopic} topic ={topic}/>}
              DescriptionComponent={<DescriptionTextField onChange={setDescription} description={description}/>}
              TagsComponent={<AutocompleteTags setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>}
          />
  );
}

export default TemplateHeader;