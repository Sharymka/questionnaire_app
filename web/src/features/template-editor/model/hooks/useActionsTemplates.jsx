import {useContext} from "react";
import {deleteData, postData} from "@/shared/api/requests";
import {TemplateContext} from "../TemplateContext";
import {getSaveEditedTemplateUrl} from "@/shared/lib/url/url";
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
			cloudinaryImgUrl = await uploadImg();
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
				setRefreshTemps(!refreshTemps);
			}else {
				setMessage({error: "Template saving failed"});
			}
			setTimeout(() => {
				setMessage(null);
				resetTemplateStates();
			}, 3000);

		}catch (error) {
		}

	}
	const deleteTemplate = async(id) => {
		try {
			const { status }  = await deleteData(`/template/${id}`);

			if (status >= 200 && status < 300){
				setTemplates(prevState =>
					prevState.filter((item) => item.id !== id));
			}
		}catch (error) {
		}
	}

	const updateTemplate = async(id) => {
		const url = getSaveEditedTemplateUrl(id);

		let  cloudinaryImgUrl = null;

		if(blobUrl) {
			cloudinaryImgUrl = await uploadImg();
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
				setRefreshTemps(!refreshTemps);
			}else {
				setMessage({error: "Template updating failed"});
			}
			setTimeout(() => {
				setMessage(null);
				setCurrentView('templatesTable');
			}, 3000);

		} catch (error) {
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