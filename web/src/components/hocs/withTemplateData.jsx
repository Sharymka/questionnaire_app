import React, {useContext, useState} from 'react';
import useGetTemplate from "../hooks/API/useGetTemplate";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

function withTemplateData(WrappedComponent) {

	return (props) => {

		const { templateId } = props;
		const { myTemplate, setMyTemplates, loading } = useGetTemplate(templateId);
		const {
			setTitle,
			setTopic,
			setDescription,
			setTags,
			setImgUrl
		} = useContext(TemplateContext);

		console.log("Template ID:", templateId);

		return (
			templateId ? (
				<WrappedComponent
					{...props}
					loading={loading}
					data={myTemplate}
					actions={{
						setTitle: setTitle,
						setTopic: setTopic,
						setDescription: setDescription,
						setTags: setTags,
						setImgUrl: setImgUrl
					}}
				/>
				) : (
				<WrappedComponent
					{...props}
					loading={loading}
				/>
				)


		);
	};
}

export default withTemplateData;
