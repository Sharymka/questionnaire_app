import {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

export function useSetTempDataToState() {
	const {setTitle, setTopic, setDescription, setTags, setQuestions} = useContext(TemplateContext);

	return (data) => {
		setTitle(data.title);
		setTopic(data.topic);
		setDescription(data.description);
		setTags(data.tags);
		setQuestions(data.questions);
	};
}