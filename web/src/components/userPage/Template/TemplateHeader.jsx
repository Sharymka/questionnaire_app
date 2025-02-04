import React, {useContext} from 'react';
import HeaderBlock from "./HeaderBlock";
import AutocompleteTags from "./AutocompleteTags";
import CustomTypography from "./CustomTypography";
import {questionTopics} from "../../../const/const";
import CustomTextField from "./CustomTextField";
import CustomFormControlSelect from "./CustomFormControlSelect";
import {TemplateContext} from "../../contexts/TemplateContext";
import useGetUsers from "../../hooks/API/useGetUsers";

function TemplateHeader(props) {

    const {
        headerName,
        data,
        actions,
    } = props;

    const { config } = useContext(TemplateContext);
    // header: true,
    // sidePanel: true,
    // questionList: [{ id: 1, toolBlock: false, question: 'edit', answer: 'readOnly', checkboxMode: "select"}];

  return (
          <HeaderBlock
              headerName={headerName}
              TitleComponent={
                  config?.baseConfig?.header === 'edit' ?
                      <CustomTextField
                          onChange={actions.setTitle}
                          value={{title: data.title}}
                          wrap={true}
                      />:
                      <CustomTypography value={{title: data.title}}/>

              }
              TopicComponent={
                  config?.baseConfig?.header === 'edit' ?
                      <CustomFormControlSelect
                          value={data.topic}
                          onChange={actions.setTopic}
                          options={questionTopics}
                          label='Темы'

                      />:
                      <CustomTypography value={{topic: data.topic}}/>

              }
              DescriptionComponent={
                  config?.baseConfig?.header === 'edit'?
                      <CustomTextField
                          onChange={actions.setDescription}
                          value={{description: data.description}}
                          wrap={true}
                      />:
                      <div className='d-flex justify-content-between'>
                          <CustomTypography value={{description: data.description}}/>
                          <CustomTypography value={{user: data.user }}/>
                      </div>

              }
              TagsComponent={
                  config?.baseConfig?.header === 'edit' ?
                      <AutocompleteTags
                          value={data.tags}
                          onTagsChange={actions.setTags}
                      />: null

              }
          />
  );
}

export default TemplateHeader;