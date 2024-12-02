import useGetTemplate from "../hooks/API/useGetTemplate";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";
import React, {useContext, useEffect} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";
import useGetFormById from "../hooks/API/useGetFormById";
import data from "mdb-ui-kit/src/js/mdb/dom/data";

function withFilledFormData(WrappedComponent) {

	return (props) => {

		const { filledFormId } = props;
		const { form, loading } = useGetFormById(filledFormId);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			console.log("filledFormId", filledFormId);
			console.log("form", form);
			if (filledFormId && form) {
				console.log("filledFormId", filledFormId);
				console.log('useEffect withFilledFormData');
				setTempDataToState(form);
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
				loading={filledFormId? loading: false}
				data={{
					title: title,
					topic: topic,
					description: description,
					tags: tags,
					imgUrl: imgUrl,
					questions:questions,
					user:form.user
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

export default withFilledFormData;
