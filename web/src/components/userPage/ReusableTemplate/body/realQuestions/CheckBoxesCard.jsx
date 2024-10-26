import React, {useContext, useEffect, useRef} from 'react';
import {TemplateContext} from "../../../contexts/TemplateContext";
import CustomCheckBoxes from "../../reusableSimpleComp/CustomCheckBoxes";
import CustomBtn from "../../reusableSimpleComp/CustomBtn";
function CheckBoxesCard(props) {

	const { questionIndex } = props;
	const { questions, setQuestions } =useContext(TemplateContext);
	const btnRef = useRef(null);


	const handleAddCheckboxOption = () => {
		setQuestions((prevState) => prevState.map((item, index) => {
			if(index === questionIndex) {
				return {...item, checkboxes: [...item.checkboxes, { id: item.checkboxes.length + 1,  value: '', selected: false }]}
			} else {
				return item;
			}
		}))
	}

	const handleDeleteCheckboxOption = (selectedCheckboxId)=> {
		setQuestions((prevState) => prevState.map((question, index) => {
			if(index === questionIndex) {
				return {...question, checkboxes: question.checkboxes.filter((item, index) => item.id !== selectedCheckboxId)}
			}
		}))
	}
	const handleCheckboxTextField = (val, selectedCheckboxIndex) => {

		setQuestions(prevState =>
			prevState.map((item, index) => {
				if (index === questionIndex) {
					return {
						...item,
						checkboxes: item.checkboxes.map((checkBox, checkboxIndex) => {
							if (selectedCheckboxIndex === checkBox.id) {
								return { ...checkBox, value:val };
							}
							return checkBox;
						})
					};
				}
				return item;
			})
		);
	};

	useEffect(() => {
	}, [questions]);

	const handleCheckboxes = () => {
	}
	const checkboxes = questions.find((item, index)=>  index === questionIndex).checkboxes;



	return (
		<div data-component="CheckBoxesCard">
			<CustomCheckBoxes
				btnRef={btnRef}
				options={checkboxes}
				onChange={handleCheckboxes}
				addOptionOnClick={handleAddCheckboxOption}
				deleteOnClick={handleDeleteCheckboxOption}
				textFieldOnChange={handleCheckboxTextField}
				btnName='Добавить вариант'
			/>
			<CustomBtn ref={btnRef} btnName="Добавить вариант" onClick={handleAddCheckboxOption}/>
		</div>

	);
}

export default CheckBoxesCard;