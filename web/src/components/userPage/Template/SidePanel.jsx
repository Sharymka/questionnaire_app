import React, {useContext} from 'react';
import { Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import ActionButton from "./AcctionBtn";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import {EXIT_LEFT} from "../../../url/url";
import {HistoryContext} from "../../contexts/HistoryContext";

const SidePanel = (props ) => {

	const {
		showImgModalOnClick
	} = props;

	const { handleAddQuestionOnClick } = useActionsQuestion();
	const { popView } = useContext(HistoryContext);

	const handleExitOnClick = () => {
		console.log("handleExitOnClick");
		popView();
	}

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
			<ActionButton
				imgSrc={EXIT_LEFT}
				altText="Add question template"
				onClick={handleExitOnClick}
			/>
		</Box>
	);
};

export default SidePanel;
