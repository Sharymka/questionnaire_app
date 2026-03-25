import {useContext} from "react";
import {TemplateContext} from "../TemplateContext";
import {getQuestions} from "@/shared/lib/utilits/getQuestions";

export function useSetTempDataToState() {
	const {setTitle, setTopic, setDescription, setTags,setImgUrl, setQuestions, setAuthor, currentView} = useContext(TemplateContext);

	return (data) => {
		setTitle(data.title);
		setTopic(data.topic);
		setDescription(data.description);
		setTags(data.tags);
		setImgUrl(data.img);
		setQuestions(getQuestions(data.questions, data.userId, currentView));
		setAuthor(data.user);
	};
}