import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import {IconButton, Tooltip} from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatClearIcon from '@mui/icons-material/FormatClear';
function MarkdownEditor() {
	const {description} = useContext(TemplateContext);

	const applyFormat = (format) => {
		const selection = window.getSelection();
		const selectedText = selection.toString();

		if (!selectedText) {
			return;
		}
		let formattedText = '';
		switch (format) {
			case 'bold':
				formattedText = `**${selectedText}**`;
				break;
			case 'italic':
				formattedText = `*${selectedText}*`;
				break;
			case 'underline':
				formattedText = `__${selectedText}__`;
				break;
			case 'clear':
				formattedText = selectedText.replace(/[*_]/g, ''); // Удаление форматирования
				break;
			default:
				break;
		}


	const start = description.indexOf(selectedText);
	const end = start + selectedText.length;

	const newDescription =
		description.slice(0, start) +
		formattedText +
		description.slice(end);
}

		return (
			<div>
				<Tooltip title="Жирный шрифт">
					<IconButton onClick={() => applyFormat('bold')}>
						<FormatBoldIcon/>
					</IconButton>
				</Tooltip>
				<Tooltip title="Курсив">
					<IconButton onClick={() => applyFormat('italic')}>
						<FormatItalicIcon/>
					</IconButton>
				</Tooltip>
				<Tooltip title="Подчёркивание">
					<IconButton onClick={() => applyFormat('underline')}>
						<FormatUnderlinedIcon/>
					</IconButton>
				</Tooltip>
				<Tooltip title="Удалить форматирование">
					<IconButton onClick={() => applyFormat('clear')}>
						<FormatClearIcon/>
					</IconButton>
				</Tooltip>
			</div>
		);
}

export default MarkdownEditor;