
import React from "react";
import Template from "./Template/Template";
import {useParams} from "react-router-dom";

function SelectedTemplate() {

	const { id } = useParams();

	const config = {
		isReadOnly: {
			header: true,
			questionsList: true,
		},
		display: {
			toolBlock: false,
			sidePanel: false,
		},
		checkboxMode: "select",
	};

	console.log(id);
	return (
		<>
			<div className=" p-5 container container_min_1200">
				<Template
					btnName='Отправить форму'
					templateId={id}
					config={config}
				/>
			</div>
		</>
	)

}
	export default SelectedTemplate;
