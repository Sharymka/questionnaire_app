import React, {useContext, useState} from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	TextField,
} from '@mui/material';
import axios from "axios";
import {postData} from "../../../../Requests";
import {TemplateContext} from "../../contexts/TemplateContext";

// Стили для модального окна
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const ImageUploadModal = ({ open, handleClose }) => {

	const { imgUrl, setImgUrl } =  useContext(TemplateContext);

	const [image, setImage] = useState(false);
	const [imageName, setImageName] = useState('');
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState('');

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		console.log("file - " + file);
		if (file) {
			setImage(file);
			setImageName(file.name);
			setError(''); // Сбрасываем ошибку при новом выборе файла
		}
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('image', image);

		try {
			const response = await fetch('api/upload', { // Укажите URL вашего сервера
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setImgUrl(data.url);
			handleClose(false);
			console.log('Uploaded image URL:', data.url); // URL загруженного изображения
			document.getElementById('uploadedImage').innerHTML = `<img src="${data.url}" alt="Uploaded Image" style="max-width: 300px;" />`;
		} catch (error) {
			console.error('Error uploading image:', error);
			// alert('Image upload failed!');
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={style}>
				<Typography  className="d-flex flex-column aligh-items-center justify-content-center" id="modal-title" variant="h6" component="h2">
					Загрузить изображение
				</Typography>
				<TextField
					type="file"
					onChange={handleImageChange}
					sx={{ mt: 2,  accept: 'image/*' }}
				/>
				<Typography variant="body2" sx={{ mt: 1 }}>
					Выбранный файл: {imageName}
				</Typography>

				{image && (
					<Box
						component="img"
						src={URL.createObjectURL(image)}
						alt="Предварительный просмотр"
						sx={{
							mt: 2,
							maxWidth: '100%',
							maxHeight: 300,
							border: '1px solid #ccc',
							borderRadius: '4px',
						}}
					/>
				)}

				<Button
					variant="contained"
					color="primary"
					onClick={handleUpload}
					sx={{ mt: 2 }}
					disabled={!image}
				>
					Загрузить
				</Button>
			</Box>
		</Modal>
	);
};

export default ImageUploadModal;
