
import React, {useContext, useEffect} from "react";
import Template from "./Template/Template";
import {useParams} from "react-router-dom";
import {TemplateContext} from "../contexts/TemplateContext";
import {SAVE_FORM_URL} from "../../url/url";
import SidePanel from "./Template/SidePanel";

function SelectedTemplate() {

	const { id } = useParams();
	const [showTemplateAnchor, setShowTemplateAnchor] = React.useState(true);
	const { config, resetTemplateStates, setSelectedTempId, setQuestionStatus } = useContext(TemplateContext);

	useEffect(() => {
		if(id) {
			resetTemplateStates();
			setQuestionStatus('select');
			setSelectedTempId(Number(id));
			setShowTemplateAnchor(false);
		}
	}, [id]);

	return (
		<>
			<div className=" p-5 container container_min_1200">
				{
					showTemplateAnchor ? (
						<div>Loading...</div>
					) : (
						<>
							<Template
								btnName='Отправить форму'
								url={SAVE_FORM_URL}
							/>
							<SidePanel
								config={config}
							/>
						</>
					)
				}

			</div>
		</>
	)

}
	export default SelectedTemplate;
