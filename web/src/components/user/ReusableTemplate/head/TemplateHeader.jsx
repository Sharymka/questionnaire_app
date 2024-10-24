import React, {useContext} from 'react';
import TitleTextField from "../reusableSimpleComp/TitleTextField";
import TopicSelector from "../reusableSimpleComp/TopicSelector";
import DescriptionTextField from "../reusableSimpleComp/DescriptionTextField";
import HeaderBlock from "./HeaderBlock";
import AutocompleteTags from "../reusableSimpleComp/AutocompleteTags";
import {TemplateContext} from "../../contexts/TemplateContext";
import CustomTypography from "../reusableSimpleComp/CustomTypography";

function TemplateHeader(props) {

    const { headerName, filledForm, showFilledFormAnchor } = props;

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
              filledForm={filledForm}
              LeftComponent={showFilledFormAnchor? <CustomTypography value={{title: filledForm.template.title}}/> : <TitleTextField onChange={setTitle} title={title}/>}
              RightComponent={showFilledFormAnchor? <CustomTypography value={{topic: filledForm.template.topic}}/> : <TopicSelector onChange={handleTopic} topic ={topic}/>}
              DescriptionComponent={ showFilledFormAnchor? <CustomTypography value={{description: filledForm.template.description}}/> : <DescriptionTextField onChange={setDescription} description={description}/>}
              TagsComponent={showFilledFormAnchor? null : <AutocompleteTags setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>}
          />
  );
}

export default TemplateHeader;