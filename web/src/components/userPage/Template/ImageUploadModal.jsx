import React from 'react';
import {Button, Modal, Box, Typography, IconButton} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import useActionsImageUpload from "../../hooks/useActionsImageUpload";

const ImageUploadModal = (props) => {

	const { open, handleClose, setBlobUrl } = props;
	const { sizeImageChange, handleUpload, localBlobUrl, blobImage } = useActionsImageUpload(handleClose, setBlobUrl);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box className="imgUploadBox">
				<div className="absolute_right_corner_pos">
					<Box>
						<IconButton
							onClick={() => handleClose(false)}
						>
							<AddIcon/>
						</IconButton>
					</Box>
				</div>
				<Typography id="modal-title" variant="h6">
					Загрузить изображение
				</Typography>
				{localBlobUrl && (
					<Box
						className="preViewBox"
						component="img"
						src={localBlobUrl}
						alt="Предварительный просмотр"
					/>
				)}
				<input
					type="file"
					id="upload-button"
					style={{display: 'none'}}
					onChange={sizeImageChange}
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
