import React, {useContext, useEffect} from 'react';
import {templates} from "../../../const/templates";
import {TemplateContext} from "../contexts/TemplateContext";
import CustomTemplateEditor from "./CustomTemplateEditor";
import withDataAttributes from "../../hocs/withDataAttributes";

function Template2(props) {

	const {
		headerName,
		btnName,
		data,
		actions,
		// url,
		// showFilledFormAnchor,
		// setEditorAnchor,
		// editorAnchor,
		// showFormsTableAnchor,
		// setShowFormsTableAnchor,
		// selectedTemplate,
	} = props;

	// useEffect(() => {
	// 	if (selectedTemplate) {
	// 		setImgUrl(selectedTemplate.img);
	// 		setTitle(selectedTemplate.title);
	// 		setTopic(selectedTemplate.topic);
	// 		setDescription(selectedTemplate.description);
	// 		setSelectedTags(selectedTemplate.tags);
	// 		setQuestions(selectedTemplate.questions);
	// 	}
	// }, [selectedTemplate]);

	return (
	  <CustomTemplateEditor
		  // data-content="CustomTemplateEditor"
		  headerName={headerName}
		  btnName={btnName}
		  data={data}
		  actions={actions}
		  // url={url}
		  // editorAnchor={editorAnchor}
		  // setEditorAnchor={setEditorAnchor}
		  // selectedTemplate={selectedTemplate}
		  // showFilledFormAnchor={showFilledFormAnchor}
		  // showFormsTableAnchor={showFormsTableAnchor}
		  // setShowFormsTableAnchor={setShowFormsTableAnchor}
	  />
  );
}

Template2.displayName = "Template";

export default withDataAttributes(Template2);