import React, {useContext, useEffect} from 'react';
import {templates} from "../../../const/templates";
import {TemplateContext} from "../contexts/TemplateContext";
import CustomTemplateEditor from "./CustomTemplateEditor";

function Template(props) {

	const { selectedTemplate, url, btnName, headerName } = props;
	const {
		setTitle,
		setTopic,
		setDescription,
		setSelectedTags,
		setQuestions,

	} = useContext(TemplateContext);

	useEffect(() => {
		if (selectedTemplate) {
			setTitle(selectedTemplate.title);
			setTopic(selectedTemplate.topic);
			setDescription(selectedTemplate.description);
			setSelectedTags(selectedTemplate.selectedTags);
			setQuestions(templates[selectedTemplate.id - 1].questions);
		}
	}, [selectedTemplate, templates]);

	return (
	  <CustomTemplateEditor
		  url={url}
		  btnName={btnName}
		  headerName={headerName}
		  selectedTemplate={selectedTemplate}
	  />
  );
}

export default Template;