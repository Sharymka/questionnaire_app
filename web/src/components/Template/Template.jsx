import React, {useContext} from 'react';
import {
	Button,
	Typography,
} from '@mui/material';
import {TemplateContext} from "./TemplateContext";
import CheckBoxes from "./CheckBoxes";
import MarkdownEditor from "./MarkdownEditor";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";
import AutocompleteTags from "./AutocompleteTags";
import SidePanel from "./SidePanel";
import QuestionList from "./QuestionBlock/QuestionList";
import TitleTextField from "./TextFields/TitleTextField";
import TopicSelector from "./FormControlSelectors/TopicSelector";
import DescriptionTextField from "./TextFields/DescriptionTextField";
import QuestionTemplate from "./QuestionTemplate";
import AccessLevelSelector from "./FormControlSelectors/AccessLevelSelector";

function Template() {

	const { answerType, showUsers, saveTemplate, title, handleTitle, handleTopic, topic, description, handleDescription } = useContext(TemplateContext);
	const [markdownAnchor, setMarkdownAnchor] = React.useState(null);


	return (
		<div className="d-flex flex-column gap-1">
			<SidePanel/>
			<div className="p-4 card">
				<Typography variant="h5">Новая форма</Typography>
				<div className="d-flex flex-row justify-content-between align-items-center gap-5">
					<div className="flex-grow-1">
						<TitleTextField title={title} onChange={handleTitle}/>
					</div>
					<div className="flex-grow-1">
						<TopicSelector topic={topic} onChange={handleTopic} />
					</div>
				</div>
				<DescriptionTextField description={description} onChange={handleDescription} />
				<AutocompleteTags/>
				<div className="d-flex flex-row justify-content-between align-items-center gap-5">
					<div className="flex-grow-1">

						{/*{*/}
						{/*	markdownAnchor && (<MarkdownEditor className={`markdown-editor ${markdownAnchor ? 'visible' : ''}`}/>)*/}
						{/*}*/}
					</div>
					<div className="flex-grow-1">

					</div>
				</div>
			</div>
			<QuestionList/>
			<div className="p-4 card d-flex flex-column gap-5">
				<div>
					<QuestionTemplate/>
					{
						answerType === 'checkboxes' && (
							<div className="width-50">
								<CheckBoxes/>
							</div>

						)
					}
				</div>
				<div className='width-50'>
					<AccessLevelSelector/>
					{
						showUsers && (
							<AutocompletePrivateUsers/>
						)
					}
				</div>
				<div className="align-self-end">
					<Button className='p-3 btn-primary btn-block'
						onClick={saveTemplate}
						    variant="contained"
					>
						сохранить шаблон
					</Button>
				</div>
			</div>

		</div>
	);
}

export default Template;