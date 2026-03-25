import React, {useContext} from 'react';
import { Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import ActionButton from "./AcctionBtn";
import useActionsQuestion from "@/features/template-editor/model/hooks/useActionsQuestion";
import {EXIT_LEFT} from "@/shared/lib/url/url";
import {HistoryContext} from "@/features/history-navigation/model/HistoryContext";
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/entities/session/model/AuthContext";

const SidePanel = (props ) => {

	const {
		showImgModalOnClick
	} = props;

	const { handleAddQuestionOnClick } = useActionsQuestion();
	const { popView } = useContext(HistoryContext);
	const { setMessage, config, currentView } = useContext(TemplateContext);
	const { isAuthenticated } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleExitOnClick = () => {
		if (!isAuthenticated) {
			navigate('/');
			setMessage('');
		}
		popView();

		// if (currentView === 'allTemplates') {
		// 	navigate('/templates');
		// }
	}

	return (
		config?.baseConfig?.sidePanel?.mainBlock || config?.baseConfig?.sidePanel?.exit  ? (
			<Box
				className="absolutePosition_0_30px"
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
