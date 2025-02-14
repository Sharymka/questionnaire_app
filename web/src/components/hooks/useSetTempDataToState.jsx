import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

export function useSetTempDataToState() {
	const {setTitle, setTopic, setDescription, setTags,setImgUrl, setQuestions} = useContext(TemplateContext);

	return (data) => {
		setTitle(data.title);
		setTopic(data.topic);
		setDescription(data.description);
		setTags(data.tags);
		setImgUrl(data.img);
		setQuestions(data.questions);
	};
}