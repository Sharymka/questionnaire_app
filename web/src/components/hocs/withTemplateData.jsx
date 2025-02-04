import React, {useContext, useEffect, useState} from 'react';
import useGetTemplateById from "../hooks/API/useGetTemplateById";
import {TemplateContext} from "../contexts/TemplateContext";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";
import useGetUsers from "../hooks/API/useGetUsers";

function withTemplateData(WrappedComponent) {

	return (props) => {

		const { selectedTempId } = useContext(TemplateContext)
		const { template } = useGetTemplateById();
		const [loading, setLoading] = useState(true);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (selectedTempId && template) {
				setTempDataToState(template);
				setLoading(false);
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
					questions:questions,
					user:template?.user.first_name + " " + template?.user.last_name,
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
