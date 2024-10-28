import React, {useContext} from 'react';
import TitleTextField from "../reusableSimpleComp/TitleTextField";
import TopicSelector from "../reusableSimpleComp/TopicSelector";
import DescriptionTextField from "../reusableSimpleComp/DescriptionTextField";
import HeaderBlock from "./HeaderBlock";
import AutocompleteTags from "../reusableSimpleComp/AutocompleteTags";
import {TemplateContext} from "../../contexts/TemplateContext";
import CustomTypography from "../reusableSimpleComp/CustomTypography";
import {questionTopics} from "../../../../const/const";

function TemplateHeader(props) {

    const { headerName, filledForm, selectedTemplate, showFilledFormAnchor } = props;
    const { showSelectedTemplate } = useContext(TemplateContext);

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
              filledForm={filledForm}
              headerName={headerName}
              title={selectedTemplate ? selectedTemplate.title: title}
              LeftComponent={showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{title: selectedTemplate ? selectedTemplate.title: filledForm?.template.title}}/> : <TitleTextField onChange={setTitle} title={title}/>}
              RightComponent={showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{topic: selectedTemplate ? questionTopics[selectedTemplate.topic]: filledForm?.template.topic}}/> : <TopicSelector onChange={handleTopic} topic={topic}/>}
              DescriptionComponent={ showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{description: selectedTemplate ? selectedTemplate.description: filledForm?.template.description}}/> : <DescriptionTextField onChange={setDescription} description={description}/>}
              TagsComponent={showFilledFormAnchor || showSelectedTemplate? null : <AutocompleteTags setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>}
          />
  );
}

export default TemplateHeader;