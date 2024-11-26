import React, {useContext, useEffect} from 'react';
import useGetTemplate from "../hooks/API/useGetTemplate";
import {TemplateContext} from "../userPage/contexts/TemplateContext";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";

function withTemplateData(WrappedComponent) {

	return (props) => {

		const { templateId } = props;
		const { myTemplate, loading } = useGetTemplate(templateId);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (templateId && myTemplate) {
				setTempDataToState(myTemplate);
			}
		}, []);

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
