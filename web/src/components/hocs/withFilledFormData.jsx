import useGetTemplateById from "../hooks/API/useGetTemplateById";
import {useSetTempDataToState} from "../hooks/useSetTempDataToState";
import React, {useContext, useEffect} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import useGetFormById from "../hooks/API/useGetFormById";
import data from "mdb-ui-kit/src/js/mdb/dom/data";

function withFilledFormData(WrappedComponent) {

	return (props) => {

		const { filledFormId } = useContext(TemplateContext);
		const { form, loading, setLoading } = useGetFormById(filledFormId);

		const setTempDataToState = useSetTempDataToState();

		useEffect(() => {
			if (filledFormId && form) {
				setTempDataToState(form);
				setLoading(false);
			}
		}, [form, filledFormId]);


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
					img: form?.img,
					questions:questions,
					user:form?.user
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
