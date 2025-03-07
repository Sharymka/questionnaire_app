import {useContext, useEffect, useState} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import imageCompression from "browser-image-compression";


const useActionsImageUpload = (handleClose, setBlobUrl) => {

	const { setImgUrl } =  useContext(TemplateContext);
	const [blobImage, setBlobImage] = useState(null);
	const [localBlobUrl, setLocalBlobUrl] = useState(null);

	useEffect(() => {
		if (blobImage) {
			const url = URL.createObjectURL(blobImage);
			setLocalBlobUrl(url);

			return () => URL.revokeObjectURL(url);
		}
	}, [blobImage]);

	const sizeImageChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			try {
				const compressedFile = await imageCompression(file, {
					maxSizeMB: 1,
					maxWidthOrHeight: 1024,
					useWebWorker: true,
				});
				setBlobImage(compressedFile);
			} catch (error) {
				console.error('Error during image compression:', error);
			}
		}
	};

	const handleUpload = () => {
		setBlobUrl(localBlobUrl);
		setImgUrl(blobImage);
		setTimeout(()=> {
			handleClose(false);
		}, 200);

	}
	return {
		sizeImageChange,
		handleUpload,
		localBlobUrl,
		blobImage
	}
}

export default useActionsImageUpload;