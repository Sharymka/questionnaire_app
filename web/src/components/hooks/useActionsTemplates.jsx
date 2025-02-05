import {useContext} from "react";
import {deleteData, postData} from "../../Requests";
import {TemplateContext} from "../contexts/TemplateContext";
import {getSaveEditedTemplateUrl} from "../../url/url";

const useActionsTemplates = () => {

	const {
		title,
		topic,
		description,
		tags,
		questions,
		imgUrl,
		templates,
		setMessage,
		resetTemplateStates,
		setFilteredTemps,
		setTemplates,
		refreshTemps,
		setRefreshTemps,
		setCurrentView
	} = useContext(TemplateContext);

	const saveTemplate = async (url)=> {
		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:imgUrl
		}
		try {
			const response = await postData(url, requestData);

			const responseData = await response.json();

			if (response.ok) {
				setMessage({success: "Template was saved successfully"});
				console.log("Template was saved successfully:", responseData);
				setRefreshTemps(!refreshTemps);

			}else {
				setMessage({error: "Template saving failed"});
				console.log("Template saving failed:", responseData.error);

			}
			setTimeout(() => {
				setMessage(null);
			}, 3000);

		}catch (error) {
			console.log("Saving Template failed:", error.message);
		}
		resetTemplateStates();
	}
	const deleteTemplate = async(id) => {
		try {
			const response = await deleteData(`api/template/${id}`);
			await response.json();
			if(response.ok) {
				setTemplates(prevState =>
					prevState.filter((item) => item.id !== id));
				console.log("template was deleted successfully");
			}else{
				console.log("template deleting failed");
			}
		}catch (error) {
			console.log(error);
		}
	}

	const updateTemplate = async(id) => {
		const url = getSaveEditedTemplateUrl(id);

		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:imgUrl
		}
		try {
			const response = await postData(url, requestData);

			if(response.ok) {
				setMessage({success: "Template was updated successfully"});
				console.log("Template was updated successfully");
				setRefreshTemps(!refreshTemps);
			}else {
				setMessage({error: "Template updating failed"});
			}
			setTimeout(() => {
				setMessage(null);
				setCurrentView('templatesTable');
			}, 3000);

		} catch (error) {
			console.log("Updating Template failed:", error.message);
		}
	}

	const filterTemplates = (substring) => {
		console.log('substring', substring);
		if(substring === '') {
			setFilteredTemps(templates);
			return;
		}
		const filteredTemps = templates.filter((temp) => temp.tags.some((tag) => tag.label.toLowerCase().includes(substring.toLowerCase())));
		setFilteredTemps(filteredTemps);
		console.log('filteredTemps', filteredTemps);
	};

	return {
		deleteTemplate,
		saveTemplate,
		filterTemplates,
		updateTemplate
	}

}
export default useActionsTemplates;