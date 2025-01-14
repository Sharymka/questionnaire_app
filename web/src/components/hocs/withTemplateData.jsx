import React, {useContext, useEffect} from 'react';
import useGetTemplateById from "../hooks/API/useGetTemplateById";
import {TemplateContext} from "../contexts/TemplateContext";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";

function withTemplateData(WrappedComponent) {

	return (props) => {

		const { selectedTempId } = useContext(TemplateContext)
		const { template, loading } = useGetTemplateById(selectedTempId);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (selectedTempId && template) {
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
				loading={selectedTempId? loading: false}
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
