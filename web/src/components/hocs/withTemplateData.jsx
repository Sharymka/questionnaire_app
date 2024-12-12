import React, {useContext, useEffect} from 'react';
import useGetTemplateById from "../hooks/API/useGetTemplateById";
import {TemplateContext} from "../contexts/TemplateContext";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";

function withTemplateData(WrappedComponent) {

	return (props) => {

		const { templateId } = props;
		const { template, loading } = useGetTemplateById(templateId);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (templateId && template) {
				setTempDataToState(template);
			}
		}, [template]);

		const {
			title,
			topic,
			description,
			tags,
			questions,
			imgUrl,
			setTitle,
			setTopic,
			setDescription,
			setTags,
			setImgUrl,
		} = useContext(TemplateContext);

		return (
			<WrappedComponent
				{...props}
				loading={templateId? loading: false}
				data={{
					title: title,
					topic: topic,
					description: description,
					tags: tags,
					imgUrl: imgUrl,
					questions:questions
				}}
				actions={{
					setTitle: setTitle,
					setTopic: setTopic,
					setDescription: setDescription,
					setTags: setTags,
					setImgUrl: setImgUrl
				}}
			/>
		);
	};
}

export default withTemplateData;
