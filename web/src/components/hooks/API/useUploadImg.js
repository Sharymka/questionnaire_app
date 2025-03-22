import {postFileData} from "../../../Requests";
import {useContext} from "react";
import {TemplateContext} from "../../contexts/TemplateContext";

 const useUploadImg =  () => {

	const { imgUrl } = useContext(TemplateContext);

	const formData = new FormData();
	formData.append('image', imgUrl);

		 const uploadImg = async () => {
			 try {
				 const { status, data } = await postFileData('api/upload', formData);

				 if (status >= 200 && status < 300){
					 console.log('Uploading successfully finished. URL:');
					 return data.url;
				 }
			 } catch (error) {
				 console.error('Error uploading image:', error);
			 }

		 }

	return { uploadImg };
};

 export default useUploadImg;