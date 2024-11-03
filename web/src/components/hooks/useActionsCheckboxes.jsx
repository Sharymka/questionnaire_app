import {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsCheckboxes = () => {

	const {checkboxes, setCheckboxes} =useContext(TemplateContext);
	const checkboxOnChange = (value) => {
		//value -это option id
		setCheckboxes((prevState) =>
			prevState.map((option) => {

				if(option.id === parseInt(value)) {
					return {...option, selected: true}
				}else {
					return {...option, selected: false}
				}

			})
		);
	};
	const addOptionOnClick = () => {
		setCheckboxes([...checkboxes, { id:checkboxes.length + 1, value: '', selected: false }]);
	};

	const deleteOptionOnClick = (selectedId) => {
		setCheckboxes(prevState => (prevState.filter((option, index)=> option.id!== selectedId)));
	};

	const textFieldOnChange = (value, selectedId)=> {
		setCheckboxes((prevState) => (
			prevState.map((option, index)=> option.id === selectedId ? {...option, value: value}  : option )
		));
	}

	return {
		checkboxOnChange,
		addOptionOnClick,
		deleteOptionOnClick,
		textFieldOnChange
	}


}
export default useActionsCheckboxes;