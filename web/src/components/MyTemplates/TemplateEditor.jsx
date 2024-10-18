import React, {useContext, useEffect} from 'react';
import TemplateHeader from "./TemplateHeader";
import {TemplateContext} from "../Template/TemplateContext";

function TemplateEditor(props) {

  const { selectedTemplate } = props;
  const {setTitle, setTopic, setDescription, setSelectedTags, setQuestions}  = useContext(TemplateContext);

  useEffect(() => {
	  console.log(selectedTemplate);
    	// setTitle(selectedTemplate.title);
    	// setTopic(selectedTemplate.topic);
    	// setDescription(selectedTemplate.description);
	  // setSelectedTags(selectedTemplate.tags);
    	// setQuestions(selectedTemplate.questions);
  }, []);

  return (<div>
    <TemplateHeader selectedTemplate={selectedTemplate}/>
  </div>);
}

export default TemplateEditor;