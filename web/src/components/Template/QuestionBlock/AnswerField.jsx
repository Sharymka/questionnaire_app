import AnswerTextField from "../TextFields/AnswerTextField";
import {Button, FormControlLabel, IconButton, Radio, RadioGroup} from "@mui/material";
import CheckboxTextField from "../TextFields/CheckboxTextField";
import {PARAGRAPH, SINGLE_LINE, CHECKBOXES}  from "../../../const/const";
import React from "react";

const AnswerField = (props) => {

	const { question, checkboxOptions, editorAnchor } = props;
	switch (question.answerType) {
		case SINGLE_LINE:
		case PARAGRAPH:
			return <AnswerTextField answerType={question.answerType} />;

		case CHECKBOXES:
			return (
				<>
					<RadioGroup className="col-md-6">
						{checkboxOptions.map((option, index) => (
							<div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
								<FormControlLabel
									value={option.value}
									control={<Radio checked={option.selected} />}
									label=""
								/>
								<span style={{ color: 'black', marginRight: '8px' }}>{index + 1}.</span>
								<CheckboxTextField option={option.value} />
								{editorAnchor && (
									<IconButton onClick={() => handleDeleteOption(index)} aria-label="delete">
										<img
											style={{ maxWidth: '20px', maxHeight: '20px' }}
											src="https://res.cloudinary.com/dewxfivxh/image/upload/v1728645223/cross-svgrepo-com_oq7fmk.svg"
											alt="Delete icon"
										/>
									</IconButton>
								)}
							</div>
						))}
					</RadioGroup>
					{
						editorAnchor && (
							<Button className='btn-primary btn-block' onClick={handleAddOption} variant="contained" style={{margin: '16px 0'}}>
								Добавить вариант
							</Button>
						)
					}

				</>



			);

		default:
			return null;
	}
};

export default AnswerField;



