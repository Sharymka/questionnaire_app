import {postFileData} from "../../../Requests";
import {useContext, useState} from "react";
import {TemplateContext} from "../../contexts/TemplateContext";

 const useUploadImg =  () => {

	const { imgUrl } = useContext(TemplateContext);

	const formData = new FormData();
	formData.append('image', imgUrl);

		 const uploadImg = async () => {
			 try {
				 const response = await postFileData('api/upload', formData);
				 if (response.status === 202) {
					 const data = await response.json();
					 console.log('Uploading successfully finished. URL:', data.url);
					 return data.url;
				 }
			 } catch (error) {
				 console.error('Error uploading image:', error);
			 }

		 }

	return { uploadImg };
};

 export default useUploadImg;