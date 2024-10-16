import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {TemplateContext} from "./TemplateContext";

function ToolBlock(props) {

	const { questionIndex } = props;

	const { handleEditorAnchor, editorAnchor } = useContext(TemplateContext);

	return (<div className="d-flex justify-content-center toolBlockPosition">
		<IconButton
			sx={{
				padding: '1px'
			}}
			onClick={() => handleEditorAnchor(questionIndex)}
			aria-label="edit"
		>
			{
				editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue ? (
					<img style={{maxWidth: '22px', maxHeight: '22px'}}
					     src="https://res.cloudinary.com/dewxfivxh/image/upload/v1729100035/save-floppy-svgrepo-com_1_imis3i.svg"
					/>
				): (
					<img
						style={{maxWidth: '25px', maxHeight: '25px'}}
						src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728643368/edit-2-svgrepo-com_zvrazo.svg"
						alt="Delete icon"
					/>
				)
			}


		</IconButton>
		<IconButton
			sx={{
				padding: '1px'
			}}
			// onClick={() => handleDeleteOption(index)}
			aria-label="delete"
		>
			<img
				style={{maxWidth: '30px', maxHeight: '30px'}}
				src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728644862/delete-svgrepo-com_2_hucmdi.svg"
				alt="Delete icon"
			/>
		</IconButton>
	</div>);
}

export default ToolBlock;