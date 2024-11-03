import React from 'react';
import HeaderBlock from "./HeaderBlock";
import AutocompleteTags from "../reusableSimpleComp/AutocompleteTags";
import CustomTypography from "../reusableSimpleComp/CustomTypography";
import {questionTopics} from "../../../../const/const";
import CustomTextField from "../reusableSimpleComp/CustomTextField";
import CustomFormControlSelect from "../reusableSimpleComp/CustomFormControlSelect";

function TemplateHeader(props) {


    const {
        headerName,
        data,
        actions,
        // selectedTemplate,
        // showFilledFormAnchor,
        isReadOnly = false,
        parentRef
        // filledForm
    } = props;
    // const { showSelectedTemplate } = useContext(TemplateContext);


  return (
          <HeaderBlock
              // filledForm={filledForm}
              headerName={headerName}
              isReadOnly={isReadOnly}
              // title={selectedTemplate ? selectedTemplate.title: title}
              TitleComponent={
                  isReadOnly ?
                      <CustomTypography value={{title: data.title}}/>:
                      <CustomTextField
                          onChange={actions.setTitle}
                          value={{title: data.title}}
                          wrap={true}
                      />
              }
              TopicComponent={
                  isReadOnly ?
                      <CustomTypography value={{topic: data.topic}}/>:
                      <ghjCustomFormControlSelect
                          value={data.topic}
                          onChange={actions.setTopic}
                          options={questionTopics}
                          label='Темы'

                      />
                      // <TopicSelector
                      //     onChange={setTopic}
                      //     value={dataTopic}/>
              }
              DescriptionComponent={
                  isReadOnly ?
                      <CustomTypography value={{description: data.description}}/>:
                      <CustomTextField
                          onChange={actions.setDescription}
                          value={{description: data.description}}
                          wrap={true}
                      />
              }
              TagsComponent={
                  isReadOnly ?
                      null:
                      <AutocompleteTags
                          value={data.tags}
                          onTagsChange={actions.setTags}
                      />
              }
              // LeftComponent={showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{title: s electedTemplate ? selectedTemplate.title: filledForm?.template.title}}/> : <TitleTextField onChange={setTitle} title={title}/>}
              // RightComponent={showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{topic: selectedTemplate ? questionTopics[selectedTemplate.topic]: filledForm?.template.topic}}/> : <TopicSelector onChange={handleTopic} topic={topic}/>}
              // DescriptionComponent={ showFilledFormAnchor || showSelectedTemplate ? <CustomTypography value={{description: selectedTemplate ? selectedTemplate.description: filledForm?.template.description}}/> : <DescriptionTextField onChange={setDescription} description={description}/>}
              // TagsComponent={showFilledFormAnchor || showSelectedTemplate? null : <AutocompleteTags setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>}
          />
  );
}

export default TemplateHeader;