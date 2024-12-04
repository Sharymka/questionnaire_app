import React, { useContext, useState } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	TextField, IconButton,
} from '@mui/material';
import { postFileData } from "../../../Requests";
import { TemplateContext } from "../../contexts/TemplateContext";
import AddIcon from "@mui/icons-material/Add";
import imageCompression from 'browser-image-compression';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 400,
	bgcolor: 'background.paper',
	border: '1px solid #3e3d3d',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
};

const ImageUploadModal = (props) => {

	const { open, handleClose } = props;

	const { imgUrl, setImgUrl } =  useContext(TemplateContext);
	const [image, setImage] = useState(false);

	const handleImageChange = async (event) => {
		const file = event.target.files[0];
		if (file) {

			try {
				const compressedFile = await imageCompression(file, {
					maxSizeMB: 1,
					maxWidthOrHeight: 1024,
					useWebWorker: true,
				});
				setImage(compressedFile);
			} catch (error) {
				console.error('Error during image compression:', error);
			}
		}
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('image', image);

		try {
			const response = await postFileData('api/upload', formData);
			handleClose(!open);
			if (response.status === 202) {
				const { uploadId } = await response.json();
				handleClose(false);
				console.log('File hase been accepted, uploading is continuing.  Upload ID:', uploadId);

				// Периодически проверяем статус загрузки
				const checkUploadStatus = async () => {
					const statusResponse = await fetch(`/api/upload-status/${uploadId}`);
					const data = await statusResponse.json();

					if (data.url) {
						console.log('Uploading successfully finished. URL:', data.url);
						setImgUrl(data.url);
					} else if (data.error) {
						console.log('Uploading failed.');
					} else {
						setTimeout(checkUploadStatus, 1000);
					}
				};

				checkUploadStatus();
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};


	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={style} className="d-flex flex-column align-items-center justify-content-center ">
				<div className="absolute_right_corner_pos">
					<Box>
						<IconButton
							onClick={() => handleClose(false)}
						>
							<AddIcon/>
						</IconButton>
					</Box>
				</div>
				<Typography className="d-flex flex-column align-items-center justify-content-center" id="modal-title"
				            variant="h6" component="h2">
					Загрузить изображение
				</Typography>
				<input
					type="file"
					id="upload-button"
					style={{display: 'none'}}
					onChange={handleImageChange}
				/>
				{image && (
					<Box
						component="img"
						src={URL.createObjectURL(image)}
						alt="Предварительный просмотр"
						sx={{
							mt: 2,
							maxWidth: '100%',
							maxHeight: '300px',
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
				)}
				<label htmlFor="upload-button" className="col-5">
					<Button
						variant="contained"
						component="span"
						className="w-100 mt-4"
					>
						Обзор
					</Button>
				</label>
				<label htmlFor="upload-button" className="col-5">
					<Button
						variant="contained"
						color="primary"
						onClick={handleUpload}
						className="w-100 mt-3"
						disabled={!image}
					>
						Загрузить
					</Button>
				</label>
			</Box>
		</Modal>
);
};

export default ImageUploadModal;
