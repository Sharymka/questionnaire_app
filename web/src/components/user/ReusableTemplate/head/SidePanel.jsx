import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import {FILLED_FORMS_ICON_URL} from "../../../../url/url";

const SidePanel = (props ) => {

	const { selectedTemplate, handleAddQuestion, setShowModalAnchor, showFormsTableAnchor, setShowFormsTableAnchor} = props;
	return (
		<Box
			className="sidePanelPosition"
		>
			<IconButton
				onClick={handleAddQuestion}
			>
				<AddIcon/>
			</IconButton>

			<IconButton
				onClick={() => setShowModalAnchor(true)}
			>
				<ImageIcon/>
			</IconButton>
			{
				selectedTemplate && (
					<IconButton
						onClick={ ()=> setShowFormsTableAnchor(!showFormsTableAnchor)}
					>
						<img
							style={{maxWidth: '25px', maxHeight: '25px'}}
							src={FILLED_FORMS_ICON_URL}
							alt="Filled Formes icon"
						/>
					</IconButton>
				)
			}
		</Box>
	);
};

export default SidePanel;
