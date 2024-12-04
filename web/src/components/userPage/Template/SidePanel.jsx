import React from 'react';
import { Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import ActionButton from "./AcctionBtn";
import useActionsQuestion from "../../hooks/useActionsQuestion";

const SidePanel = (props ) => {

	const {
		showImgModalOnClick
	} = props;

	const { handleAddQuestionOnClick } = useActionsQuestion();

	return (
		<Box
			className="sidePanelPosition"
		>
			<ActionButton
				icon={<AddIcon/>}
				altText="Add question template"
				onClick={handleAddQuestionOnClick}
			/>
			<ActionButton
				icon={<ImageIcon/>}
				altText="show image modal window"
				onClick={() => showImgModalOnClick(true)}
			/>
		</Box>
	);
};

export default SidePanel;
