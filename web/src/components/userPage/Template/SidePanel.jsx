import React, {useContext} from 'react';
import { Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import ActionButton from "./AcctionBtn";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import {EXIT_LEFT} from "../../../url/url";
import {HistoryContext} from "../../contexts/HistoryContext";
import {TemplateContext} from "../../contexts/TemplateContext";
import {useNavigate} from "react-router-dom";

const SidePanel = (props ) => {

	const {
		showImgModalOnClick,
		config,
	} = props;

	const { handleAddQuestionOnClick } = useActionsQuestion();
	const { popView } = useContext(HistoryContext);
	const { setMessage } = useContext(TemplateContext);

	const navigate = useNavigate();

	const handleExitOnClick = () => {
		navigate('/home');
		popView();
		setMessage('');

	}

	return (
		config?.baseConfig?.sidePanel?.mainBlock || config?.baseConfig?.sidePanel?.exit  ? (
			<Box
				className="sidePanelPosition"
			> {
				config?.baseConfig?.sidePanel?.mainBlock && (
					<>
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
					</>
				)
			}
				{
					config?.baseConfig?.sidePanel?.exit && (
						<ActionButton
							imgSrc={EXIT_LEFT}
							altText="exit"
							onClick={handleExitOnClick}
						/>
					)
				}
			</Box>
		) : null
	);
};

export default SidePanel;
