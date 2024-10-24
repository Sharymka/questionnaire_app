import React, {useContext, useEffect} from 'react';
import {templates} from "../../../const/templates";
import {TemplateContext} from "../contexts/TemplateContext";
import CustomTemplateEditor from "./CustomTemplateEditor";

function Template(props) {

	const {
		showFormsTableAnchor,
		setShowFormsTableAnchor,
		selectedTemplate,
		url,
		btnName,
		headerName,
		showFilledFormAnchor
	} = props;
	const {
		setTitle,
		setTopic,
		setDescription,
		setSelectedTags,
		setQuestions,
		setImgUrl
	} = useContext(TemplateContext);

	useEffect(() => {
		if (selectedTemplate) {
			setImgUrl(selectedTemplate.img);
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
		  showFilledFormAnchor={showFilledFormAnchor}
		  showFormsTableAnchor={showFormsTableAnchor}
		  setShowFormsTableAnchor={setShowFormsTableAnchor}
	  />
  );
}

export default Template;