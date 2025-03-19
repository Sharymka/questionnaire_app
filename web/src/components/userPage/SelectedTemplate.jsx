
import React, {useState, useContext, useEffect} from "react";
import Template from "./Template/Template";
import {useParams} from "react-router-dom";
import {TemplateContext} from "../contexts/TemplateContext";
import {SAVE_FORM_URL} from "../../url/url";
import {AuthContext} from "../mainPage/context/AuthContext";

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
