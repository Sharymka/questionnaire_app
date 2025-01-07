import {useContext, useEffect, useState} from "react";
import {deleteData} from "../../Requests";
import useGetTemplates from "./API/useGetTemplates";
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsTemplates = (setView) => {

	const { setAction } = useContext(TemplateContext);
	const user = JSON.parse(localStorage.getItem('user')) ?? { id:1 };
	const { templates, setTemplates, loading } = useGetTemplates();
	const [myTemplates, setMyTemplates] = useState([]);
	const [selectedTempId, setSelectedTempId] = useState(null);

	useEffect(() => {
		if (templates) {
			setMyTemplates(templates.filter((template) => template.userId === user.id));
		}
	}, [templates]);

	const handleEditOnClick = (id) => {
		setView('editor');
		setAction('edit');
		setSelectedTempId(id);
	}

	const handleDeleteTemplate = async(id) => {
		try {
			const response = await deleteData(`api/template/${id}`);
			const data = await response.json();
			if(response.ok) {
				setMyTemplates(prevState =>
					prevState.filter((item) => item.id !== id) );
				console.log("template was deleted successfully");
			}else{
				console.log("template deleting failed");
			}
		}catch (error) {
			console.log(error);
		}
	}


	return {
		myTemplates,
		selectedTempId,
		handleEditOnClick,
		handleDeleteTemplate,
		loading
	}


}
export default useActionsTemplates;