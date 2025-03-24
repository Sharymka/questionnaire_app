import React, {useContext, useEffect, useState} from 'react';
import useGetTemplateById from "../hooks/API/useGetTemplateById";
import {TemplateContext} from "../contexts/TemplateContext";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";
import useGetFormById from "../hooks/API/useGetFormById";

function withData(WrappedComponent) {

	return (props) => {

		const { selectedTempId, filledFormId } = useContext(TemplateContext)
		const { template } = useGetTemplateById();
		const { form } = useGetFormById();
		const [loading, setLoading] = useState(true);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (selectedTempId && template) {
				setTempDataToState(template);
				setLoading(false);
			}
		}, [template, selectedTempId, setTempDataToState]);

		useEffect(() => {
			if (filledFormId && form) {
				setTempDataToState(form);
				setLoading(false);
			}
		}, [form, filledFormId, setTempDataToState]);

		const {
			title,
			topic,
			description,
			tags,
			questions,
			author,
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
				loading={selectedTempId || filledFormId ? loading: false}
				data={{
					title: title,
					topic: topic,
					description: description,
					tags: tags,
					imgUrl: imgUrl,
					questions:questions,
					user:author,
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

export default withData;
