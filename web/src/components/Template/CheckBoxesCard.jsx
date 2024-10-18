import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomCheckBoxes from "../ReusableComponents/CustomCheckBoxes";
function CheckBoxes(props) {

	const { questionIndex } = props;
	const { questions, setQuestions } =useContext(TemplateContext);


	const handleAddCheckboxOption = () => {
		setQuestions((prevState) => prevState.map((item, index) => {
			if(index === questionIndex) {
				return {...item, checkboxOptions: [...item.checkboxOptions, { value: '', selected: false }]}
			} else {
				return item;
			}
		}))
	}

	const handleDeleteCheckboxOption = (selectedCheckboxIndex)=> {
		setQuestions((prevState) => prevState.map((question, index) => {
			if(index === questionIndex) {
				return {...question, checkboxOptions: question.checkboxOptions.filter((item, index) => index !== selectedCheckboxIndex)}
			}
		}))
	}
	const handleCheckboxTextField = (event, selectedCheckboxIndex) => {
		setQuestions(prevState =>
			prevState.map((item, index) => {
				if (index === questionIndex) {
					return {
						...item,
						checkboxOptions: item.checkboxOptions.map((checkBox, checkboxIndex) => {
							if (selectedCheckboxIndex === checkboxIndex) {
								return { ...checkBox, value: event.target.value };
							}
							return checkBox;
						})
					};
				}
				return item;
			})
		);
	};

	const handleCheckboxes = () => {
		console.log("handleCheckboxesCard");
	}
	const checkboxOptions = questions.find((item, index)=>  index === questionIndex).checkboxOptions;

	return (
		<CustomCheckBoxes
			options={checkboxOptions}
			onChange={handleCheckboxes}
			addOptionOnClick={handleAddCheckboxOption}
			deleteOnClick={handleDeleteCheckboxOption}
			textFieldOnChange={handleCheckboxTextField}
			btnName='Добавить вариант'
		/>
	);
}

export default CheckBoxes;