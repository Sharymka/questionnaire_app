import {useContext} from "react";
import {deleteData, postData} from "../../Requests";
import {TemplateContext} from "../contexts/TemplateContext";
import {getSaveEditedTemplateUrl} from "../../url/url";
import useUploadImg from "./API/useUploadImg";

const useActionsTemplates = (blobUrl) => {

	const { uploadImg } =  useUploadImg();

	const {
		title,
		topic,
		description,
		tags,
		questions,
		imgUrl,
		templates,
		setMessage,
		setFilteredTemps,
		setTemplates,
		refreshTemps,
		setRefreshTemps,
		setCurrentView,
		resetTemplateStates,
	} = useContext(TemplateContext);


	const saveTemplate = async (url)=> {

		let  cloudinaryImgUrl = null;

		if(imgUrl) {
			console.log('imgUrl', imgUrl);
			cloudinaryImgUrl = await uploadImg();
			console.log('cloudinaryImgUrl:', cloudinaryImgUrl);
		}

		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:cloudinaryImgUrl
		}

		try {
			const { status, data } = await postData(url, requestData);

			if (status >= 200 && status < 300){
				setMessage({success: "Template was saved successfully"});
				console.log("Template was saved successfully:", data);
				setRefreshTemps(!refreshTemps);
			}else {
				setMessage({error: "Template saving failed"});
				console.log("Template saving failed:", data.error);
			}
			setTimeout(() => {
				setMessage(null);
				resetTemplateStates();
			}, 3000);

		}catch (error) {
			console.log("Saving Template failed:", error.message);
		}

	}
	const deleteTemplate = async(id) => {
		try {
			const { status }  = await deleteData(`api/template/${id}`);

			if (status >= 200 && status < 300){
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

		let  cloudinaryImgUrl = null;

		if(blobUrl) {
			cloudinaryImgUrl = await uploadImg();
			console.log('cloudinaryImgUrl:', cloudinaryImgUrl);
		}

		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:cloudinaryImgUrl ?? imgUrl,
		}
		try {
			const { status } = await postData(url, requestData);

			if (status >= 200 && status < 300){
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
		if(substring === '') {
			setFilteredTemps(templates);
			return;
		}
		const filteredTemps = templates.filter((temp) => temp.tags.some((tag) => tag.label.toLowerCase().includes(substring.toLowerCase())));
		setFilteredTemps(filteredTemps);
	};

	return {
		deleteTemplate,
		saveTemplate,
		filterTemplates,
		updateTemplate
	}

}
export default useActionsTemplates;