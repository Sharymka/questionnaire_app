
import React, {useState, useContext, useEffect} from "react";
import Template from "@/features/template-editor/ui/template/Template";
import {useParams} from "react-router-dom";
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import {SAVE_FORM_URL} from "@/shared/lib/url/url";
import {AuthContext} from "@/entities/session/model/AuthContext";

function SelectedTemplate() {

	const { id } = useParams();

	const { isAuthenticated } = useContext(AuthContext);

	const [showTemplateAnchor, setShowTemplateAnchor] = useState(true);

	const { questionStatus, setSelectedTempId, setQuestionStatus } = useContext(TemplateContext);

	useEffect(() => {
		if(id) {
			if(isAuthenticated) {
				setQuestionStatus('select');
			} else {
				setQuestionStatus('readOnly');
			}
			setSelectedTempId(Number(id));
			localStorage.setItem('tempId',  JSON.stringify(id));

		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- прежнее поведение: только [id]
	}, [id]);

	useEffect(() => {
		if(questionStatus){
			setShowTemplateAnchor(false);
		}
	}, [questionStatus])

	return (
		<>
			<div className=" p-5 main_container container_min_1200">
				{
					showTemplateAnchor ? (
						<div>Loading...</div>
					) : (
						<>
							<Template
								btnName='Отправить форму'
								url={SAVE_FORM_URL}
							/>
						</>
					)
				}

			</div>
		</>
	)

}
	export default SelectedTemplate;
