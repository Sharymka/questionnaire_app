import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import {FILLED_FORMS_ICON_URL} from "../../../../url/url";
import ActionButton from "../AcctionBtn";

const SidePanel = (props ) => {

	const {
		selectedTemplate,
		showQuestionTemp,
		addQuestionOnClick,
		showImgModalOnClick,
		showFormsTableAnchor,
		setShowFormsTableAnchor
	} = props;

	return (
		<Box
			className="sidePanelPosition"
		>
			<ActionButton
				icon={<AddIcon/>}
				altText="Add question template"
				onClick={() => addQuestionOnClick(!showQuestionTemp)}
			/>


			<ActionButton
				icon={<ImageIcon/>}
				altText="show image modal window"
				onClick={() => showImgModalOnClick(true)}
			/>
			{/*{*/}
			{/*	selectedTemplate && (*/}
			{/*		<IconButton*/}
			{/*			onClick={ ()=> setShowFormsTableAnchor(!showFormsTableAnchor)}*/}
			{/*		>*/}
			{/*			<img*/}
			{/*				style={{maxWidth: '25px', maxHeight: '25px'}}*/}
			{/*				src={FILLED_FORMS_ICON_URL}*/}
			{/*				alt="Filled Formes icon"*/}
			{/*			/>*/}
			{/*		</IconButton>*/}
			{/*	)*/}
			{/*}*/}
		</Box>
	);
};

export default SidePanel;
