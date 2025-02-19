import React, {useContext, useEffect, useState} from 'react';
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

	const { open, handleClose, setBlobUrl } = props;

	const { setImgUrl, imgUrl } =  useContext(TemplateContext);
	const [blobImage, setBlobImage] = useState(null);
	const [localBlobUrl, setLocalBlobUrl] = useState(null);

	useEffect(() => {
		if (blobImage) {
			const url = URL.createObjectURL(blobImage);
			setLocalBlobUrl(url);

			return () => URL.revokeObjectURL(url);
		}
	}, [blobImage]);

	const handleImageChange = async (event) => {
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

	// useEffect(() => {
	// 	if (localBlobUrl) {
	// 		return () => {
	// 			URL.revokeObjectURL(localBlobUrl);
	// 		};
	// 	}
	// }, [localBlobUrl]);


	const handleUpload = () => {
		setBlobUrl(localBlobUrl);
		setImgUrl(blobImage);
		setTimeout(()=> {
			handleClose(false);
		}, 200);

	}

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
				{localBlobUrl && (
					<Box
						component="img"
						src={localBlobUrl}
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
				<input
					type="file"
					id="upload-button"
					style={{display: 'none'}}
					onChange={handleImageChange}
				/>
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
						disabled={!blobImage}
					>
						Загрузить
					</Button>
				</label>
			</Box>
		</Modal>
);
};

export default ImageUploadModal;
