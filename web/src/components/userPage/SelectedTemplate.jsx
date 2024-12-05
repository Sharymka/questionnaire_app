
import React from "react";
import Template from "./Template/Template";
import {useParams} from "react-router-dom";
import useGetTemplateById from "../hooks/API/useGetTemplateById";

function SelectedTemplate() {

	const { id } = useParams();
	// const template = useGetTemplateById(id);
	return (
		<>
			<div className=" p-5 container container_min_1200">
				<Template templateId={id}/>
			</div>
		</>
	)

}
	export default SelectedTemplate;
