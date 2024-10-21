import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const SidePanel = (props ) => {

	const { handleAddQuestion, setShowModalAnchor} = props;
	return (
		<Box
			className="sidePanelPosition"
		>
			<IconButton
				onClick={handleAddQuestion}
			>
				<AddIcon/>
			</IconButton>
			{/*<IconButton>*/}
			{/*	<DescriptionIcon />*/}
			{/*</IconButton>*/}
			{/*<IconButton>*/}
			{/*	<TextFieldsIcon />*/}
			{/*</IconButton>*/}
			<IconButton
				onClick={() => setShowModalAnchor(true)}
			>
				<ImageIcon/>
			</IconButton>
			{/*<IconButton>*/}
			{/*	<VideoLibraryIcon />*/}
			{/*</IconButton>*/}
			{/*<IconButton>*/}
			{/*	<ViewHeadlineIcon />*/}
			{/*</IconButton>*/}
		</Box>
	);
};

export default SidePanel;
