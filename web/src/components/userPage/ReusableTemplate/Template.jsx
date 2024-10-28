import React, {useContext, useEffect} from 'react';
import {templates} from "../../../const/templates";
import {TemplateContext} from "../contexts/TemplateContext";
import CustomTemplateEditor from "./CustomTemplateEditor";

function Template(props) {

	const {
		setEditorAnchor,
		editorAnchor,
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
			setSelectedTags(selectedTemplate.tags);
			setQuestions(selectedTemplate.questions);
		}
	}, [selectedTemplate]);

	return (
	  <CustomTemplateEditor
		  data-content="CustomTemplateEditor"
		  url={url}
		  btnName={btnName}
		  headerName={headerName}
		  editorAnchor={editorAnchor}
		  setEditorAnchor={setEditorAnchor}
		  selectedTemplate={selectedTemplate}
		  showFilledFormAnchor={showFilledFormAnchor}
		  showFormsTableAnchor={showFormsTableAnchor}
		  setShowFormsTableAnchor={setShowFormsTableAnchor}
	  />
  );
}

export default Template;