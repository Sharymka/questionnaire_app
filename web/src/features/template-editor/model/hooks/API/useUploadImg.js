import {postFileData} from "@/shared/api/requests";
import {useContext} from "react";
import {TemplateContext} from "../../TemplateContext";

 const useUploadImg =  () => {

	const { imgUrl } = useContext(TemplateContext);

	const formData = new FormData();
	formData.append('image', imgUrl);

		 const uploadImg = async () => {
			 try {
				 const { status, data } = await postFileData('/upload', formData);

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